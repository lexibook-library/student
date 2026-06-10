import { useMemo, useState } from "react";
import { useToast } from "../components/AppLayout";
import { tests } from "../data/mockData";
import { FilterChip, PageHeader, TestCard } from "../components/ui";

const types = ["Tất cả", "Bài tập về nhà", "Khảo sát", "Bộ câu hỏi Lexile", "Cuộc thi"];
const tabs = ["Chưa thực hiện", "Đang làm", "Đã hoàn thành", "Đã quá hạn"];

export default function TestsPage() {
  const [type, setType] = useState("Tất cả");
  const [tab, setTab] = useState("Chưa thực hiện");
  const { showToast } = useToast();
  const visible = useMemo(() => tests.filter((test) => (type === "Tất cả" || test.type === type) && test.status === tab), [type, tab]);
  return (
    <div className="space-y-6">
      <PageHeader title="Làm bộ câu hỏi" subtitle="Trả lời các bộ câu hỏi theo kế hoạch admin hoặc giáo viên giao để nhận điểm Lexile của sách" />
      <div className="flex flex-wrap gap-2">{types.map((item) => <FilterChip key={item} label={item} active={type === item} onClick={() => setType(item)} />)}</div>
      <div className="grid grid-cols-2 gap-2 rounded-[20px] bg-white p-2 shadow-sm md:grid-cols-4">
        {tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`min-h-11 rounded-2xl text-sm font-black ${tab === item ? "bg-orange-500 text-white" : "text-gray-500 hover:bg-orange-50"}`}>{item}</button>)}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {(visible.length ? visible : tests.filter((test) => type === "Tất cả" || test.type === type)).map((test) => <TestCard key={test.id} test={test} onAction={() => showToast("Đã lưu trạng thái bài kiểm tra")} />)}
      </div>
    </div>
  );
}
