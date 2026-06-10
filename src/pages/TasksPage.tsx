import { useMemo, useState } from "react";
import { useToast } from "../components/AppLayout";
import { tasks } from "../data/mockData";
import { FilterChip, PageHeader, SearchInput, StatCard, TaskCard } from "../components/ui";
import { AlertTriangle, CheckCircle2, Clock, ListChecks } from "lucide-react";

const filters = ["Tất cả", "Hôm nay", "Tuần này", "Đang thực hiện", "Đã hoàn thành", "Quá hạn"];

export default function TasksPage() {
  const [filter, setFilter] = useState("Tất cả");
  const { showToast } = useToast();
  const visible = useMemo(() => filter === "Tất cả" ? tasks : tasks.filter((task) => task.status.includes(filter.replace("Đã hoàn thành", "Hoàn thành"))), [filter]);
  return (
    <div className="space-y-6">
      <PageHeader title="Nhiệm vụ của tôi" subtitle="Hoàn thành bộ câu hỏi theo kế hoạch admin hoặc giáo viên giao" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<ListChecks />} value={`${tasks.length}`} label="tổng số nhiệm vụ" tone="bg-orange-50" />
        <StatCard icon={<CheckCircle2 />} value="1" label="đã hoàn thành" tone="bg-green-50" />
        <StatCard icon={<Clock />} value="3" label="đang thực hiện" tone="bg-blue-50" />
        <StatCard icon={<AlertTriangle />} value="1" label="sắp hết hạn" tone="bg-amber-50" />
      </div>
      <div className="flex flex-col gap-3 rounded-[20px] bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">{filters.map((item) => <FilterChip key={item} label={item} active={filter === item} onClick={() => setFilter(item)} />)}</div>
        <div className="lg:w-80"><SearchInput placeholder="Tìm nhiệm vụ hoặc sách..." /></div>
      </div>
      <div className="space-y-4">
        {visible.map((task) => <TaskCard key={task.id} task={task} onAction={() => showToast(`Đang mở: ${task.title}`)} />)}
      </div>
    </div>
  );
}
