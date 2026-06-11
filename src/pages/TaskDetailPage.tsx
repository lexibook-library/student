import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Send } from "lucide-react";
import { BookOpen, ChevronDown, FileQuestion, MinusCircle, Paperclip, Rocket, Send } from "lucide-react";
import { books, discussions, skillScores } from "../data/mockData";
import { Avatar, BookCover, DiscussionCard, PageHeader, ProgressBar, SkillChart, StatusBadge } from "../components/ui";
import { useToast } from "../components/AppLayout";

const tabs = ["Bộ câu hỏi", "Thảo luận", "Điểm", "Thành viên"];
const tabs = ["Nhiệm vụ", "Bộ câu hỏi", "Thảo luận", "Điểm", "Thành viên"];

const weeklyTasks = [
  {
    week: "Tuần 1",
    items: [
      { title: "Bộ câu hỏi chương 1", meta: "0 điểm", type: "quiz" },
      { title: "Tài liệu đọc", meta: "Tài liệu tham khảo từ kế hoạch của giáo viên", type: "material" },
      { title: "Bộ câu hỏi chương 2", meta: "16 Th11 | 22 điểm", type: "quiz" },
      { title: "Bộ câu hỏi chương 2.1", meta: "14 Th11 | 20 điểm", type: "quiz", removable: true },
    ],
  },
  {
    week: "Tuần 2",
    items: [
      { title: "Học tập", meta: "Hoạt động củng cố trước khi làm bộ câu hỏi tiếp theo", type: "study" },
    ],
  },
];

export default function TaskDetailPage() {
  const { bookId } = useParams();
  const [tab, setTab] = useState(tabs[0]);
        </div>
      </section>
      <div className="flex gap-2 overflow-x-auto rounded-[20px] bg-white p-2 shadow-sm">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`min-h-11 rounded-2xl px-4 text-sm font-black ${tab === item ? "bg-orange-500 text-white" : "text-gray-500 hover:bg-orange-50"}`}>{item}</button>)}</div>
      {tab === "Nhiệm vụ" && (
        <section className="overflow-hidden rounded-[20px] border border-gray-200 bg-gray-50 shadow-sm">
          {weeklyTasks.map((group, index) => (
            <div key={group.week} className={index > 0 ? "border-t border-dashed border-gray-300" : ""}>
              <button className="flex w-full items-center gap-2 px-5 py-4 text-left font-black text-gray-800">
                <ChevronDown size={18} className="text-gray-500" />
                {group.week}
              </button>
              <div className="mx-5 mb-5 overflow-hidden rounded-lg border border-gray-200 bg-white">
                {group.items.map((item, itemIndex) => (
                  <div key={`${group.week}-${item.title}`} className={`flex min-h-16 items-center gap-4 px-4 py-3 ${itemIndex > 0 ? "border-t border-gray-200" : ""}`}>
                    <TaskWeekIcon type={item.type} />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-800">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{item.meta}</p>
                    </div>
                    {item.removable && <MinusCircle size={18} className="text-red-400" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
      {tab === "Bộ câu hỏi" && <div className="grid gap-4 lg:grid-cols-3">{book.quizzes.map((quiz) => <article key={quiz.id} className="rounded-[20px] bg-white p-5 shadow-sm"><h3 className="font-black">{quiz.title}</h3><p className="mt-2 text-sm text-gray-500">{quiz.questionCount} câu · {quiz.duration} phút · {quiz.attempts} lượt</p>{quiz.bestScore && <p className="mt-2 text-sm font-bold text-green-600">Điểm cao nhất: {quiz.bestScore}</p>}<div className="mt-4 flex items-center justify-between"><StatusBadge status={quiz.status} /><Link to="/tests/test-de-men/start" className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-bold text-white">Bắt đầu làm bài</Link></div></article>)}</div>}
      {tab === "Thảo luận" && <div className="space-y-4">{discussions.map((item) => <DiscussionCard key={item.id} item={item} />)}<div className="rounded-[20px] bg-white p-4 shadow-sm"><textarea className="min-h-24 w-full rounded-2xl border border-gray-100 p-3 outline-none focus:border-orange-300" placeholder="Viết bình luận tích cực về cuốn sách..." /><button onClick={() => showToast("Bình luận đã được gửi")} className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-2 font-bold text-white"><Send size={18} />Gửi bình luận</button></div></div>}
      {tab === "Điểm" && <div className="grid gap-4 lg:grid-cols-[1fr_1fr]"><div className="rounded-[20px] bg-white p-5 shadow-sm"><h3 className="font-black">Kết quả bộ câu hỏi</h3><p className="mt-2 text-gray-600">Điểm cao nhất: <b>88/100</b> · Hoàn thành: <b>92%</b></p><SkillChart data={skillScores} /></div><div className="rounded-[20px] bg-white p-5 shadow-sm"><h3 className="font-black">Lịch sử làm bài</h3>{[88, 76, 82].map((score, i) => <div key={score} className="mt-3 rounded-2xl bg-gray-50 p-3 font-bold">Lần {i + 1}: {score}/100</div>)}</div></div>}
    </div>
  );
}

function TaskWeekIcon({ type }: { type: string }) {
  const iconClass = "text-gray-500";
  if (type === "material") return <Paperclip size={19} className={iconClass} />;
  if (type === "study") return <BookOpen size={19} className={iconClass} />;
  if (type === "quiz") return <FileQuestion size={19} className={iconClass} />;
  return <Rocket size={19} className={iconClass} />;
}
