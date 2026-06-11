import { Link, useParams } from "react-router-dom";
import { CheckCircle2, RefreshCcw, Trophy } from "lucide-react";
import { books, resultRows, skillScores, tests } from "../data/mockData";
import { SkillChart, StatusBadge } from "../components/ui";

export default function TestResultPage() {
  const { testId } = useParams();
  const test = tests.find((item) => item.id === testId) ?? tests[0];
  const book = books.find((item) => item.id === test.bookId) ?? books[0];
  const correct = 5;
  const percent = Math.round((correct / resultRows.length) * 100);
  const earnedLexile = percent >= 80 ? book.lexile : 0;
  return (
    <div className="min-h-screen bg-[#F3F4F6] px-4 py-6">
      <main className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[20px] bg-gradient-to-br from-orange-500 to-amber-400 p-6 text-center text-white shadow-lg">
          <Trophy className="mx-auto mb-3" size={54} />
          <h1 className="text-3xl font-black">Bạn đã hoàn thành bài kiểm tra!</h1>
          <p className="mt-2 font-semibold text-white/90">{test.title}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-5">
            <Metric label="Điểm số" value={`${percent}`} />
            <Metric label="Tỷ lệ đúng" value={`${percent}%`} />
            <Metric label="Thời gian" value="18:45" />
            <Metric label="Câu đúng" value={`${correct}/${resultRows.length}`} />
            <Metric label="Lexile nhận" value={earnedLexile ? `${earnedLexile}L` : "0L"} />
          </div>
        </section>
        <div className="rounded-[20px] bg-white p-5 shadow-sm">
          <StatusBadge status={earnedLexile ? "Đạt yêu cầu Lexile" : "Cần đọc lại"} />
          <p className="mt-3 text-gray-600">{earnedLexile ? `Bạn đạt từ 80% trở lên nên nhận trọn ${book.lexile} điểm Lexile của cuốn sách.` : "Bạn chưa đạt 80%. Hãy xem lại nội dung trên hệ thống đọc sách của trường rồi thử lại bộ câu hỏi nhé."}</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[20px] bg-white p-5 shadow-sm"><h2 className="font-black">Kết quả theo kỹ năng</h2><SkillChart data={skillScores} /></section>
          <section className="rounded-[20px] bg-white p-5 shadow-sm"><h2 className="mb-3 font-black">Danh sách câu hỏi</h2><div className="space-y-3">{resultRows.map((row, i) => <article key={row.id} className="rounded-2xl bg-gray-50 p-3"><div className="flex items-start justify-between gap-2"><h3 className="font-bold">Câu {i + 1}: {row.text}</h3>{row.correct ? <CheckCircle2 className="text-green-500" /> : <RefreshCcw className="text-red-500" />}</div><p className="mt-2 text-sm text-gray-600">Bạn chọn: <b>{row.chosen}</b></p><p className="text-sm text-gray-600">Đáp án đúng: <b>{row.answer}</b></p><p className="mt-1 text-sm text-gray-500">{row.explanation}</p></article>)}</div></section>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/tests" className="rounded-2xl bg-white px-5 py-3 font-extrabold text-orange-700 shadow-sm">Quay lại danh sách bài</Link>
          <Link to={`/library/${book.id}`} className="rounded-2xl bg-orange-50 px-5 py-3 font-extrabold text-orange-700">Xem sách trong tủ sách</Link>
          <Link to={`/tests/${test.id}/start`} className="rounded-2xl bg-orange-500 px-5 py-3 font-extrabold text-white">Làm lại bài</Link>
        </div>
      </main>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-white/18 p-3"><p className="text-sm font-bold text-white/80">{label}</p><p className="text-2xl font-black">{value}</p></div>;
}
