import { useState } from "react";
import { Medal } from "lucide-react";
import { currentStudent, students } from "../data/mockData";
import { Avatar, FilterChip, PageHeader } from "../components/ui";

export default function LeaderboardPage() {
  const [mode, setMode] = useState("Lexile");
  const sorted = [...students].sort((a, b) => mode === "Lexile" ? b.lexile - a.lexile : b.books - a.books);
  const top = sorted.slice(0, 3);
  return (
    <div className="space-y-6">
      <PageHeader title="Bảng xếp hạng" subtitle="Mỗi ngày đọc thêm một chút, bạn sẽ tiến bộ hơn chính mình ngày hôm qua." />
      <div className="flex flex-wrap gap-2">{["Lexile", "Số sách", "Lớp", "Khối", "Trường"].map((item) => <FilterChip key={item} label={item} active={mode === item} onClick={() => setMode(item)} />)}</div>
      <section className="grid items-end gap-4 md:grid-cols-3">
        {top.map((student, i) => <div key={student.id} className={`rounded-[20px] bg-white p-5 text-center shadow-sm ${i === 0 ? "md:order-2 md:pb-10" : i === 1 ? "md:order-1" : "md:order-3"}`}><Medal className={`mx-auto ${i === 0 ? "text-amber-500" : i === 1 ? "text-gray-400" : "text-orange-700"}`} size={38} /><div className="mx-auto mt-3 w-fit"><Avatar label={student.avatar} size="lg" /></div><h3 className="mt-3 font-black">{student.name}</h3><p className="text-sm text-gray-500">Lớp {student.className}</p><p className="mt-2 text-2xl font-black text-orange-600">#{i + 1}</p><p className="font-bold">{mode === "Lexile" ? `${student.lexile} Lexile` : `${student.books} sách`}</p></div>)}
      </section>
      <section className="overflow-hidden rounded-[20px] bg-white shadow-sm">
        {sorted.map((student, i) => <div key={student.id} className={`grid grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-gray-100 p-4 last:border-b-0 md:grid-cols-[60px_1fr_110px_110px_140px] ${student.id === currentStudent.id ? "bg-orange-50" : ""}`}><b className="text-lg text-gray-700">#{i + 1}</b><div className="flex items-center gap-3"><Avatar label={student.avatar} /><div><h3 className="font-black">{student.name}</h3><p className="text-sm text-gray-500">Lớp {student.className}</p></div></div><b>{student.books} sách</b><b className="hidden md:block">{student.lexile}L</b><span className="hidden rounded-full bg-violet-50 px-3 py-1 text-center text-sm font-bold text-violet-700 md:block">{student.badges} huy hiệu</span></div>)}
      </section>
    </div>
  );
}
