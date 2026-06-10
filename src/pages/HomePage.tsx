import { Award, BookOpen, ClipboardCheck, Library, Rocket, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Section, useToast } from "../components/AppLayout";
import { currentStudent, books, tasks, achievements } from "../data/mockData";
import { AchievementBadge, Avatar, BookCard, BookCover, ProgressBar, StatCard, TaskCard } from "../components/ui";

export default function HomePage() {
  const { showToast } = useToast();
  const reading = books.filter((book) => book.progress > 0).slice(0, 4);
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-orange-50 via-white to-amber-100 p-5 shadow-sm md:p-7">
        <div className="absolute right-8 top-8 h-20 w-20 rounded-full bg-orange-200/40" />
        <div className="absolute bottom-10 right-32 h-10 w-10 rounded-full bg-amber-300/40" />
        <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-extrabold text-orange-700 shadow-sm">
              <Sparkles size={18} /> Kế hoạch đọc của trường
            </div>
            <h1 className="text-3xl font-black text-gray-900 md:text-4xl">Chào buổi sáng, Minh Anh!</h1>
            <p className="mt-3 max-w-2xl text-base font-medium text-gray-600">Sau khi đọc sách trên hệ thống của trường, hãy vào đây để hoàn thành bộ câu hỏi và nhận điểm Lexile.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/tests" className="inline-flex min-h-12 items-center rounded-2xl bg-orange-500 px-5 font-extrabold text-white shadow-lg shadow-orange-200 hover:bg-orange-600">Làm bộ câu hỏi</Link>
              <Link to="/tasks" className="inline-flex min-h-12 items-center rounded-2xl bg-white px-5 font-extrabold text-orange-700 shadow-sm">Xem kế hoạch được giao</Link>
            </div>
          </div>
          <div className="grid grid-cols-[0.85fr_1fr] items-center gap-4">
            <div className="rounded-[20px] bg-white/80 p-4 shadow-sm">
              <Avatar label={currentStudent.avatar} size="lg" />
              <p className="mt-3 font-black text-gray-900">{currentStudent.name}</p>
              <p className="text-sm font-bold text-orange-600">{currentStudent.lexile} Lexile</p>
            </div>
            <div className="relative rounded-[20px] bg-white p-4 shadow-sm">
              <div className="grid grid-cols-3 gap-2">
                {reading.slice(0, 3).map((book) => <BookCover key={book.id} book={book} className="rounded-xl p-2 text-xs" />)}
              </div>
              <Rocket className="absolute -right-2 -top-3 text-orange-500" size={38} />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Library />} value="12" label="bộ câu hỏi đã hoàn thành" tone="bg-orange-50" />
        <StatCard icon={<BookOpen />} value="860" label="điểm Lexile hiện tại" tone="bg-blue-50" />
        <StatCard icon={<ClipboardCheck />} value="8" label="nhiệm vụ đã hoàn thành" tone="bg-green-50" />
        <StatCard icon={<Award />} value="5" label="huy hiệu đã đạt được" tone="bg-violet-50" />
      </div>

      <Section title="Bộ câu hỏi cần làm">
        <div className="grid gap-4 lg:grid-cols-2">
          {reading.map((book) => (
            <article key={book.id} className="card-hover grid gap-4 rounded-[20px] bg-white p-4 shadow-sm sm:grid-cols-[92px_1fr]">
              <BookCover book={book} />
              <div className="space-y-3">
                <div>
                  <h3 className="font-black text-gray-900">{book.title}</h3>
                  <p className="text-sm text-gray-500">{book.author} · Theo kế hoạch giáo viên giao</p>
                </div>
                <div className="flex items-center gap-3"><ProgressBar value={book.progress} /><b className="text-sm">{book.progress}%</b></div>
                <Link to={`/library/${book.id}`} className="inline-flex min-h-10 items-center rounded-2xl bg-orange-500 px-4 text-sm font-extrabold text-white">Làm câu hỏi</Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <div className="grid gap-7 xl:grid-cols-[1.15fr_0.85fr]">
        <Section title="Nhiệm vụ sắp đến hạn">
          <div className="space-y-4">{tasks.slice(0, 3).map((task) => <TaskCard key={task.id} task={task} onAction={() => showToast("Đã lưu tiến độ nhiệm vụ")} />)}</div>
        </Section>
        <div className="space-y-7">
          <Section title="Kế hoạch sách được giao">
            <div className="grid gap-4 sm:grid-cols-2">{books.slice(4, 8).map((book) => <BookCard key={book.id} book={book} />)}</div>
          </Section>
          <Section title="Thành tích mới nhất">
            <div className="grid gap-4 sm:grid-cols-2">{achievements.slice(0, 2).map((item) => <AchievementBadge key={item.id} item={item} />)}</div>
          </Section>
        </div>
      </div>
    </div>
  );
}
