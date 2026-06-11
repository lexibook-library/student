import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useToast } from "../components/AppLayout";
import { tasks, tests } from "../data/mockData";
import { FilterChip, PageHeader, StatusBadge } from "../components/ui";

type QuestionSetStatus = "Chưa thực hiện" | "Đã thực hiện" | "Đã quá hạn";

type AssignedQuestionSet = {
  id: string;
  title: string;
  bookTitle: string;
  teacher: string;
  type: string;
  source: "Sách được giao" | "Bài kiểm tra";
  questionCount: number;
  duration: number;
  attempts: number;
  dueAt: string;
  status: QuestionSetStatus;
  progress?: number;
};

const types = ["Tất cả", "Sách được giao", "Bài kiểm tra", "Bài tập về nhà", "Khảo sát", "Bộ câu hỏi Lexile", "Cuộc thi"];
const tabs: QuestionSetStatus[] = ["Chưa thực hiện", "Đã thực hiện", "Đã quá hạn"];

const taskQuestionSets: AssignedQuestionSet[] = tasks.map((task, index) => ({
  id: `task-${task.id}`,
  title: task.title,
  bookTitle: task.bookTitle,
  teacher: task.teacher,
  type: task.type,
  source: "Sách được giao",
  questionCount: [12, 10, 15, 8, 9][index] ?? 10,
  duration: [20, 18, 25, 15, 20][index] ?? 20,
  attempts: 2,
  dueAt: `${task.dueDate} 21:00`,
  status: task.status === "Hoàn thành" ? "Đã thực hiện" : task.status === "Quá hạn" ? "Đã quá hạn" : "Chưa thực hiện",
  progress: task.progress,
}));

const testQuestionSets: AssignedQuestionSet[] = tests.map((test) => ({
  id: test.id,
  title: test.title,
  bookTitle: test.bookTitle,
  teacher: test.teacher,
  type: test.type,
  source: "Bài kiểm tra",
  questionCount: test.questionCount,
  duration: test.duration,
  attempts: test.attempts,
  dueAt: test.dueAt,
  status: test.status === "Đã hoàn thành" ? "Đã thực hiện" : test.status === "Đã quá hạn" ? "Đã quá hạn" : "Chưa thực hiện",
}));

const questionSets = [...taskQuestionSets, ...testQuestionSets];

export default function TestsPage() {
  const [type, setType] = useState("Tất cả");
  const [tab, setTab] = useState("Chưa thực hiện");
  const { showToast } = useToast();
  const visible = useMemo(
    () =>
      questionSets.filter((item) => {
        const matchType = type === "Tất cả" || item.type === type || item.source === type;
        return matchType && item.status === tab;
      }),
    [type, tab],
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Làm bộ câu hỏi" subtitle="Hiển thị các bộ câu hỏi từ Nhiệm vụ của tôi, gồm sách được giao và bài kiểm tra theo trạng thái thực hiện" />
      <div className="flex flex-wrap gap-2">{types.map((item) => <FilterChip key={item} label={item} active={type === item} onClick={() => setType(item)} />)}</div>
      <div className="grid grid-cols-3 gap-2 rounded-[20px] bg-white p-2 shadow-sm">
        {tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`min-h-11 rounded-2xl text-sm font-black ${tab === item ? "bg-orange-500 text-white" : "text-gray-500 hover:bg-orange-50"}`}>{item}</button>)}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {visible.map((item) => (
          <QuestionSetCard key={item.id} item={item} onAction={() => showToast("Đã mở bộ câu hỏi được giao")} />
        ))}
        {!visible.length && (
          <div className="rounded-[20px] border border-dashed border-orange-200 bg-orange-50 p-8 text-center font-bold text-orange-700 lg:col-span-2">
            Không có bộ câu hỏi nào trong trạng thái này.
          </div>
        )}
      </div>
    </div>
  );
}

function QuestionSetCard({ item, onAction }: { item: AssignedQuestionSet; onAction: () => void }) {
  const to = item.status === "Đã thực hiện" ? `/tests/test-de-men/result` : `/tests/test-de-men/start`;
  const cta = item.status === "Đã thực hiện" ? "Xem kết quả" : item.status === "Đã quá hạn" ? "Xem chi tiết" : "Bắt đầu làm bài";

  return (
    <article className="card-hover rounded-[20px] border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-orange-600">{item.source} · {item.type}</p>
          <h3 className="text-lg font-black text-gray-900">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.bookTitle} · {item.teacher}</p>
        </div>
        <StatusBadge status={item.status} />
      </div>
      <div className="my-4 grid grid-cols-2 gap-3 text-sm text-gray-600 sm:grid-cols-4">
        <span><b>{item.questionCount}</b> câu</span>
        <span><b>{item.duration}</b> phút</span>
        <span><b>{item.attempts}</b> lượt</span>
        <span>Hạn <b>{item.dueAt}</b></span>
      </div>
      {typeof item.progress === "number" && (
        <div className="mb-4 text-sm font-semibold text-gray-500">Tiến độ nhiệm vụ: <b className="text-gray-800">{item.progress}%</b></div>
      )}
      <Link onClick={onAction} to={to} className={`inline-flex min-h-11 items-center gap-2 rounded-2xl px-5 text-sm font-extrabold text-white ${item.status === "Đã quá hạn" ? "bg-gray-500 hover:bg-gray-600" : "bg-orange-500 hover:bg-orange-600"}`}>
        {cta}<ChevronRight size={18} />
      </Link>
    </article>
  );
}
