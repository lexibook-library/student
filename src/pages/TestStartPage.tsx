import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertTriangle, Bookmark, Check, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { questions, tests } from "../data/mockData";
import { Modal, ProgressBar, StatusBadge } from "../components/ui";

export default function TestStartPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const test = tests.find((item) => item.id === testId) ?? tests[0];
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [marked, setMarked] = useState<string[]>([]);
  const [confirm, setConfirm] = useState(false);
  const current = questions[index];
  const answered = Object.keys(answers).length;
  const unanswered = questions.length - answered;
  const progress = useMemo(() => Math.round((answered / questions.length) * 100), [answered]);

  const choose = (value: string) => setAnswers((old) => ({ ...old, [current.id]: value }));
  const toggleMarked = () => setMarked((old) => old.includes(current.id) ? old.filter((id) => id !== current.id) : old.concat(current.id));

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <header className="sticky top-0 z-20 border-b border-gray-100 bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div><Link to="/tests" className="text-sm font-bold text-orange-700">Quay lại</Link><h1 className="font-black text-gray-900">{test.title}</h1></div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-orange-50 px-3 py-2 font-black text-orange-700"><Clock size={18} /> 18:45</span>
            <span className="font-bold text-gray-600">{answered}/{questions.length} câu</span>
            <button onClick={() => setConfirm(true)} className="min-h-11 rounded-2xl bg-orange-500 px-5 font-extrabold text-white">Nộp bài</button>
          </div>
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[20px] bg-white p-4 shadow-sm">
          <h2 className="font-black text-gray-900">Câu hỏi</h2>
          <div className="my-4"><ProgressBar value={progress} /></div>
          <div className="grid grid-cols-5 gap-2 lg:grid-cols-4">
            {questions.map((question, i) => (
              <button key={question.id} onClick={() => setIndex(i)} className={`grid h-11 place-items-center rounded-2xl text-sm font-black ${i === index ? "bg-orange-500 text-white" : answers[question.id] ? "bg-green-50 text-green-700" : marked.includes(question.id) ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500"}`}>{i + 1}</button>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-sm font-semibold text-gray-600">
            <p><span className="inline-block h-3 w-3 rounded bg-green-100" /> Đã trả lời</p>
            <p><span className="inline-block h-3 w-3 rounded bg-gray-100" /> Chưa trả lời</p>
            <p><span className="inline-block h-3 w-3 rounded bg-amber-100" /> Đánh dấu xem lại</p>
          </div>
        </aside>
        <section className="rounded-[20px] bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><StatusBadge status={current.skill} /><h2 className="mt-3 text-2xl font-black text-gray-900">Câu {index + 1}</h2></div>
            <button onClick={toggleMarked} className={`inline-flex min-h-11 items-center gap-2 rounded-2xl px-4 font-bold ${marked.includes(current.id) ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}><Bookmark size={18} />Đánh dấu xem lại</button>
          </div>
          <p className="mt-5 text-lg font-bold leading-relaxed text-gray-800">{current.text}</p>
          <div className="mt-5 grid gap-3">
            {current.options.map((option) => (
              <button key={option} onClick={() => choose(option)} className={`min-h-14 rounded-2xl border p-4 text-left font-bold transition ${answers[current.id] === option ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-100 hover:border-orange-200"}`}>{option}</button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-between gap-3">
            <button disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-gray-100 px-4 font-bold text-gray-700 disabled:opacity-40"><ChevronLeft size={18} />Câu trước</button>
            <button disabled={index === questions.length - 1} onClick={() => setIndex((value) => Math.min(questions.length - 1, value + 1))} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-orange-500 px-4 font-bold text-white disabled:opacity-40">Câu tiếp theo<ChevronRight size={18} /></button>
          </div>
        </section>
      </main>
      <Modal open={confirm} title="Xác nhận nộp bài" onClose={() => setConfirm(false)}>
        {unanswered > 0 && <div className="mb-4 flex gap-3 rounded-2xl bg-amber-50 p-3 text-amber-700"><AlertTriangle />Bạn còn {unanswered} câu chưa trả lời.</div>}
        <p className="text-gray-600">Hệ thống sẽ lưu đáp án tạm thời và chuyển sang màn hình kết quả demo.</p>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={() => setConfirm(false)} className="rounded-2xl bg-gray-100 px-4 py-2 font-bold">Xem lại</button>
          <button onClick={() => navigate(`/tests/${test.id}/result`)} className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-2 font-bold text-white"><Check size={18} />Nộp bài</button>
        </div>
      </Modal>
    </div>
  );
}
