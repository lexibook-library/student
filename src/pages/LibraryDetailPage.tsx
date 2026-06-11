import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { books, discussions, skillScores } from "../data/mockData";
import { useToast } from "../components/AppLayout";
import { BookCover, DiscussionCard, ProgressBar, SkillChart, StatusBadge } from "../components/ui";

const tabs = ["Giới thiệu", "Bộ câu hỏi", "Điểm của tôi", "Thảo luận"];

export default function LibraryDetailPage() {
  const { bookId } = useParams();
  const [tab, setTab] = useState(tabs[0]);
  const { showToast } = useToast();
  const book = books.find((item) => item.id === bookId) ?? books[0];
  return (
    <div className="space-y-6">
      <section className="grid gap-6 rounded-[20px] bg-white p-5 shadow-sm lg:grid-cols-[220px_1fr]">
        <BookCover book={book} className="max-w-[220px]" />
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><h1 className="text-3xl font-black text-gray-900">{book.title}</h1><p className="mt-1 font-semibold text-gray-500">{book.author} · {book.genre}</p></div>
            <StatusBadge status={book.status} />
          </div>
          <p className="mt-4 max-w-3xl text-gray-600">{book.description}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Info label="Số trang" value={`${book.pages}`} />
            <Info label="Lexile" value={`${book.lexile}L`} />
            <Info label="Học sinh tham gia" value={`${book.readers}`} />
            <Info label="Đánh giá" value={`${book.rating} ★`} />
          </div>
          {book.progress > 0 && <div className="mt-4 flex items-center gap-3"><ProgressBar value={book.progress} /><b>{book.progress}%</b></div>}
        </div>
      </section>
      <div className="flex gap-2 overflow-x-auto rounded-[20px] bg-white p-2 shadow-sm">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`min-h-11 rounded-2xl px-4 text-sm font-black ${tab === item ? "bg-orange-500 text-white" : "text-gray-500 hover:bg-orange-50"}`}>{item}</button>)}</div>
      {tab === "Giới thiệu" && <div className="rounded-[20px] bg-white p-5 shadow-sm"><h2 className="font-black">Thông tin kế hoạch</h2><p className="mt-2 text-gray-600">Học sinh đọc cuốn sách này trên hệ thống đọc sách của trường. Sau khi đọc xong, học sinh vào đây để hoàn thành bộ câu hỏi; nếu đạt yêu cầu, hệ thống ghi nhận điểm Lexile của cuốn sách.</p><div className="mt-4 flex items-center gap-2 text-amber-500">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={22} className="fill-amber-400" />)}</div></div>}
      {tab === "Bộ câu hỏi" && <div className="grid gap-4 lg:grid-cols-3">{book.quizzes.map((quiz) => <article key={quiz.id} className="rounded-[20px] bg-white p-5 shadow-sm"><h3 className="font-black">{quiz.title}</h3><p className="mt-2 text-sm text-gray-500">{quiz.questionCount} câu · {quiz.duration} phút</p><div className="mt-4 flex items-center justify-between"><StatusBadge status={quiz.status} /><Link to="/tests/test-de-men/start" className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-bold text-white">Làm bài</Link></div></article>)}</div>}
      {tab === "Điểm của tôi" && <div className="rounded-[20px] bg-white p-5 shadow-sm"><h2 className="font-black">Kết quả đọc hiểu của tôi</h2><SkillChart data={skillScores} type="bar" /></div>}
      {tab === "Thảo luận" && <div className="space-y-4">{discussions.map((item) => <DiscussionCard key={item.id} item={item} />)}</div>}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-orange-50 p-3"><p className="text-xs font-bold text-orange-700">{label}</p><p className="text-lg font-black text-gray-900">{value}</p></div>;
}
