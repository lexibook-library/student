import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Send } from "lucide-react";
import { books, discussions, skillScores } from "../data/mockData";
import { Avatar, BookCover, DiscussionCard, PageHeader, ProgressBar, SkillChart, StatusBadge } from "../components/ui";
import { useToast } from "../components/AppLayout";

const tabs = ["Bộ câu hỏi", "Thảo luận", "Điểm", "Thành viên"];

export default function TaskDetailPage() {
  const { bookId } = useParams();
  const [tab, setTab] = useState(tabs[0]);
  const { showToast } = useToast();
  const book = books.find((item) => item.id === bookId) ?? books[0];
  return (
    <div className="space-y-6">
      <section className="grid gap-5 rounded-[20px] bg-white p-5 shadow-sm lg:grid-cols-[180px_1fr]">
        <BookCover book={book} className="max-w-[180px]" />
        <div className="space-y-4">
          <PageHeader title={book.title} subtitle={`${book.author} · ${book.genre} · ${book.lexile} Lexile · ${book.readers} học sinh tham gia kế hoạch`} />
          <p className="max-w-4xl text-gray-600">{book.description}</p>
          <div className="flex items-center gap-3"><ProgressBar value={book.progress} /><b>{book.progress}%</b></div>
        </div>
      </section>
      <div className="flex gap-2 overflow-x-auto rounded-[20px] bg-white p-2 shadow-sm">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`min-h-11 rounded-2xl px-4 text-sm font-black ${tab === item ? "bg-orange-500 text-white" : "text-gray-500 hover:bg-orange-50"}`}>{item}</button>)}</div>
      {tab === "Bộ câu hỏi" && <div className="grid gap-4 lg:grid-cols-3">{book.quizzes.map((quiz) => <article key={quiz.id} className="rounded-[20px] bg-white p-5 shadow-sm"><h3 className="font-black">{quiz.title}</h3><p className="mt-2 text-sm text-gray-500">{quiz.questionCount} câu · {quiz.duration} phút · {quiz.attempts} lượt</p>{quiz.bestScore && <p className="mt-2 text-sm font-bold text-green-600">Điểm cao nhất: {quiz.bestScore}</p>}<div className="mt-4 flex items-center justify-between"><StatusBadge status={quiz.status} /><Link to="/tests/test-de-men/start" className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-bold text-white">Bắt đầu làm bài</Link></div></article>)}</div>}
      {tab === "Thảo luận" && <div className="space-y-4">{discussions.map((item) => <DiscussionCard key={item.id} item={item} />)}<div className="rounded-[20px] bg-white p-4 shadow-sm"><textarea className="min-h-24 w-full rounded-2xl border border-gray-100 p-3 outline-none focus:border-orange-300" placeholder="Viết bình luận tích cực về cuốn sách..." /><button onClick={() => showToast("Bình luận đã được gửi")} className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-2 font-bold text-white"><Send size={18} />Gửi bình luận</button></div></div>}
      {tab === "Điểm" && <div className="grid gap-4 lg:grid-cols-[1fr_1fr]"><div className="rounded-[20px] bg-white p-5 shadow-sm"><h3 className="font-black">Kết quả bộ câu hỏi</h3><p className="mt-2 text-gray-600">Điểm cao nhất: <b>88/100</b> · Hoàn thành: <b>92%</b></p><SkillChart data={skillScores} /></div><div className="rounded-[20px] bg-white p-5 shadow-sm"><h3 className="font-black">Lịch sử làm bài</h3>{[88, 76, 82].map((score, i) => <div key={score} className="mt-3 rounded-2xl bg-gray-50 p-3 font-bold">Lần {i + 1}: {score}/100</div>)}</div></div>}
      {tab === "Thành viên" && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{book.members.map((student) => <article key={student.id} className="flex items-center gap-3 rounded-[20px] bg-white p-4 shadow-sm"><Avatar label={student.avatar} /><div className="flex-1"><h3 className="font-black">{student.name}</h3><p className="text-sm text-gray-500">Lớp {student.className}</p><ProgressBar value={student.progress ?? 60} /></div><StatusBadge status={(student.progress ?? 0) > 75 ? "Hoàn thành" : "Đang thực hiện"} /></article>)}</div>}
    </div>
  );
}
