import { useState } from "react";
import { notifications as initial } from "../data/mockData";
import { EmptyState, FilterChip, NotificationItem, PageHeader } from "../components/ui";
import { useToast } from "../components/AppLayout";

export default function NotificationsPage() {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState("Tất cả");
  const { showToast } = useToast();
  const types = ["Tất cả", ...Array.from(new Set(initial.map((item) => item.type)))];
  const visible = filter === "Tất cả" ? items : items.filter((item) => item.type === filter);
  return (
    <div className="space-y-6">
      <PageHeader title="Thông báo" subtitle="Theo dõi nhiệm vụ, bài kiểm tra, huy hiệu và phản hồi mới" action={<button onClick={() => { setItems((old) => old.map((item) => ({ ...item, read: true }))); showToast("Đã đánh dấu tất cả là đã đọc"); }} className="rounded-2xl bg-orange-500 px-4 py-2 font-bold text-white">Đánh dấu tất cả đã đọc</button>} />
      <div className="flex flex-wrap gap-2">{types.map((item) => <FilterChip key={item} label={item} active={filter === item} onClick={() => setFilter(item)} />)}</div>
      <div className="space-y-3">{visible.length ? visible.map((item) => <NotificationItem key={item.id} item={item} onClick={() => { setItems((old) => old.map((n) => n.id === item.id ? { ...n, read: true } : n)); showToast("Đã mở nội dung liên quan"); }} />) : <EmptyState title="Không có thông báo" text="Bạn đã xử lý hết thông báo trong mục này." />}</div>
    </div>
  );
}
