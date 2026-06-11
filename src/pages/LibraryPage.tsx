import { useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { books } from "../data/mockData";
import { BookCard, FilterChip, PageHeader, SearchInput } from "../components/ui";

const filters = ["Tất cả", "Đã hoàn thành", "Đang thực hiện", "Chưa thực hiện"];

export default function LibraryPage() {
  const [filter, setFilter] = useState("Tất cả");
  const visible = useMemo(() => {
    const sorted = [...books].sort((a, b) => a.lexile - b.lexile);
    if (filter === "Tất cả") return sorted;
    if (filter === "Chưa thực hiện") return sorted.filter((book) => book.status === "Chưa bắt đầu");
    return sorted.filter((book) => book.status === filter || book.genre === filter);
  }, [filter]);
  return (
    <div className="space-y-6">
      <section className="rounded-[20px] bg-gradient-to-br from-orange-500 to-amber-400 p-5 text-white shadow-lg md:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white/20"><BookOpen /></div>
            <h1 className="text-3xl font-black">Tủ sách</h1>
            <p className="mt-2 font-semibold text-white/90">Tất cả sách được sắp xếp theo điểm Lexile. Sách nào học sinh đã đọc xong thì vào đây làm bài tập để đánh giá Lexile của sách đó.</p>
          </div>
          <div className="self-end"><SearchInput placeholder="Tìm sách theo tên, tác giả hoặc Lexile..." /></div>
        </div>
      </section>
      <PageHeader title="Danh sách sách theo Lexile" subtitle="Chọn cuốn sách đã đọc để làm bài tập/bộ câu hỏi đánh giá và ghi nhận điểm Lexile" />
      <div className="flex flex-wrap gap-2">{filters.map((item) => <FilterChip key={item} label={item} active={filter === item} onClick={() => setFilter(item)} />)}</div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {visible.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
}
