import { useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { books } from "../data/mockData";
import { BookCard, FilterChip, PageHeader, SearchInput } from "../components/ui";

const filters = ["Tất cả", "Đang thực hiện", "Đã hoàn thành", "Chưa bắt đầu", "Sắp hết hạn", "Phiêu lưu", "Học đường"];

export default function LibraryPage() {
  const [filter, setFilter] = useState("Tất cả");
  const visible = useMemo(() => filter === "Tất cả" ? books : books.filter((book) => book.status === filter || book.genre === filter), [filter]);
  return (
    <div className="space-y-6">
      <section className="rounded-[20px] bg-gradient-to-br from-orange-500 to-amber-400 p-5 text-white shadow-lg md:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white/20"><BookOpen /></div>
            <h1 className="text-3xl font-black">Kế hoạch đọc được giao</h1>
            <p className="mt-2 font-semibold text-white/90">Xem sách trong kế hoạch và hoàn thành bộ câu hỏi Lexile sau khi đã đọc trên hệ thống của trường</p>
          </div>
          <div className="self-end"><SearchInput placeholder="Tìm sách hoặc bộ câu hỏi..." /></div>
        </div>
      </section>
      <PageHeader title="Sách và bộ câu hỏi" subtitle="Chỉ hiển thị các sách thuộc kế hoạch admin hoặc giáo viên giao" />
      <div className="flex flex-wrap gap-2">{filters.map((item) => <FilterChip key={item} label={item} active={filter === item} onClick={() => setFilter(item)} />)}</div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {visible.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
}
