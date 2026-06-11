import { ReactNode, useEffect } from "react";
import {
  Award,
  Bell,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Compass,
  Flame,
  Medal,
  Search,
  Sparkles,
  Star,
  Trophy,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import { achievements, Book, SkillScore, Task, TestItem } from "../data/mockData";

export function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ProgressBar({ value, tone = "orange" }: { value: number; tone?: "orange" | "green" | "blue" | "purple" }) {
  const tones = {
    orange: "from-orange-500 to-amber-400",
    green: "from-green-500 to-emerald-400",
    blue: "from-blue-500 to-cyan-400",
    purple: "from-violet-500 to-fuchsia-400",
  };
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
      <div className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", tones[tone])} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Hoàn thành": "bg-green-50 text-green-700",
    "Đang thực hiện": "bg-blue-50 text-blue-700",
    "Đang làm": "bg-blue-50 text-blue-700",
    "Chưa bắt đầu": "bg-gray-100 text-gray-700",
    "Chưa thực hiện": "bg-gray-100 text-gray-700",
    "Đã thực hiện": "bg-green-50 text-green-700",
    "Sắp hết hạn": "bg-amber-50 text-amber-700",
    "Quá hạn": "bg-red-50 text-red-700",
    "Đã quá hạn": "bg-red-50 text-red-700",
    "Đã hoàn thành": "bg-green-50 text-green-700",
    "Đã mở khóa": "bg-violet-50 text-violet-700",
    "Chưa mở khóa": "bg-gray-100 text-gray-600",
    "Cần đọc lại": "bg-orange-50 text-orange-700",
  };
  return <span className={cn("rounded-full px-3 py-1 text-xs font-bold", styles[status] ?? "bg-orange-50 text-orange-700")}>{status}</span>;
}

export function Avatar({ label, size = "md" }: { label: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-9 w-9 text-xs", md: "h-11 w-11 text-sm", lg: "h-20 w-20 text-2xl" };
  return <div className={cn("grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 font-extrabold text-white shadow-sm", sizes[size])}>{label}</div>;
}

export function SearchInput({ placeholder = "Tìm kiếm sách..." }: { placeholder?: string }) {
  return (
    <label className="flex min-h-11 items-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 text-gray-500 shadow-sm">
      <Search size={18} />
      <input className="w-full border-0 bg-transparent text-sm outline-none" placeholder={placeholder} />
    </label>
  );
}

export function FilterChip({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={cn("min-h-10 rounded-full px-4 text-sm font-bold transition", active ? "bg-orange-500 text-white shadow-md shadow-orange-200" : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-700")}>
      {label}
    </button>
  );
}

export function BookCover({ book, className }: { book: Pick<Book, "title" | "cover">; className?: string }) {
  return (
    <div className={cn("book-cover flex aspect-[3/4] flex-col justify-between rounded-2xl bg-gradient-to-br p-4 text-white shadow-lg", book.cover, className)}>
      <BookOpen className="relative z-10" size={28} />
      <div className="relative z-10">
        <p className="text-sm font-black leading-tight">{book.title}</p>
        <div className="mt-3 h-1.5 w-14 rounded-full bg-white/70" />
      </div>
    </div>
  );
}

export function BookCard({ book, compact = false }: { book: Book; compact?: boolean }) {
  return (
    <article className="card-hover h-full rounded-[20px] border border-gray-100 bg-white p-3 shadow-sm">
      <Link to={`/library/${book.id}`} className={cn("flex h-full flex-col gap-3", compact && "grid grid-cols-[84px_1fr]")}>
        <BookCover book={book} className={compact ? "rounded-2xl" : "h-[300px]"} />
        <div className="flex flex-1 flex-col p-1 pt-0">
          <div className="flex min-h-[58px] items-start justify-between gap-2">
            <div>
              <h3 className="line-clamp-2 font-extrabold text-gray-800">{book.title}</h3>
              <p className="text-sm text-gray-500">{book.author}</p>
            </div>
            <StatusBadge status={book.status} />
          </div>
          <div className="mt-2 flex min-h-[28px] flex-wrap items-center gap-2 text-xs font-bold text-gray-500">
            <span className="rounded-full bg-orange-50 px-2 py-1 text-orange-700">{book.lexile}L</span>
            <span>{book.genre}</span>
            <span className="inline-flex items-center gap-1"><Star size={14} className="fill-amber-400 text-amber-400" />{book.rating}</span>
          </div>
          <div className="mt-4 mb-4 flex h-3 items-center">
            {book.progress > 0 ? <ProgressBar value={book.progress} /> : <div className="h-2.5 w-full rounded-full bg-gray-100" />}
          </div>
          <button className="mt-auto min-h-11 w-full rounded-2xl bg-orange-500 px-4 text-sm font-extrabold text-white hover:bg-orange-600">Làm bài đánh giá</button>
        </div>
      </Link>
    </article>
  );
}

export function StatCard({ icon, value, label, tone }: { icon: ReactNode; value: string; label: string; tone: string }) {
  return (
    <div className={cn("card-hover rounded-[20px] p-5 shadow-sm", tone)}>
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-white/80 text-orange-600">{icon}</div>
      <p className="text-3xl font-black text-gray-900">{value}</p>
      <p className="mt-1 text-sm font-semibold text-gray-600">{label}</p>
    </div>
  );
}

export function TaskCard({ task, onAction }: { task: Task; onAction: () => void }) {
  return (
    <article className="card-hover grid gap-4 rounded-[20px] border border-gray-100 bg-white p-4 shadow-sm sm:grid-cols-[86px_1fr]">
      <Link to={`/tasks/${task.bookId}`}>
        <BookCover book={{ title: task.bookTitle, cover: task.cover }} className="mx-auto max-w-[96px]" />
      </Link>
      <div className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-black text-gray-900">{task.title}</h3>
            <p className="text-sm font-semibold text-gray-500">{task.bookTitle} · {task.teacher} · Lớp {task.className}</p>
          </div>
          <StatusBadge status={task.status} />
        </div>
        <p className="text-sm text-gray-600">{task.requirement}</p>
        <div className="grid gap-2 text-sm text-gray-500 sm:grid-cols-3">
          <span>Bắt đầu: <b>{task.startDate}</b></span>
          <span>Hạn: <b>{task.dueDate}</b></span>
          <span>Loại: <b>{task.type}</b></span>
        </div>
        <div className="flex items-center gap-3">
          <ProgressBar value={task.progress} tone={task.progress === 100 ? "green" : "orange"} />
          <b className="text-sm text-gray-700">{task.progress}%</b>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to={`/tasks/${task.bookId}`} className="rounded-2xl bg-orange-50 px-4 py-2 text-sm font-extrabold text-orange-700">Xem nhiệm vụ</Link>
          <button onClick={onAction} className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-extrabold text-white hover:bg-orange-600">Tiếp tục thực hiện</button>
        </div>
      </div>
    </article>
  );
}

export function TestCard({ test, onAction }: { test: TestItem; onAction: () => void }) {
  const cta = test.status === "Đã hoàn thành" ? "Xem kết quả" : test.status === "Đang làm" ? "Tiếp tục" : "Bắt đầu làm bài";
  const to = test.status === "Đã hoàn thành" ? `/tests/${test.id}/result` : `/tests/${test.id}/start`;
  return (
    <article className="card-hover rounded-[20px] border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-orange-600">{test.type}</p>
          <h3 className="text-lg font-black text-gray-900">{test.title}</h3>
          <p className="text-sm text-gray-500">{test.bookTitle} · {test.teacher}</p>
        </div>
        <StatusBadge status={test.status} />
      </div>
      <div className="my-4 grid grid-cols-2 gap-3 text-sm text-gray-600 sm:grid-cols-4">
        <span><b>{test.questionCount}</b> câu</span>
        <span><b>{test.duration}</b> phút</span>
        <span><b>{test.attempts}</b> lượt</span>
        <span>Hạn <b>{test.dueAt}</b></span>
      </div>
      <Link onClick={onAction} to={to} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-orange-500 px-5 text-sm font-extrabold text-white hover:bg-orange-600">
        {cta}<ChevronRight size={18} />
      </Link>
    </article>
  );
}

export function AchievementBadge({ item = achievements[0] }: { item?: (typeof achievements)[number] }) {
  const icons = { Flame, Compass, Sparkles, Brain, Trophy, Medal };
  const Icon = icons[item.icon as keyof typeof icons] ?? Award;
  return (
    <article className={cn("card-hover rounded-[20px] border p-4 shadow-sm", item.unlocked ? "border-amber-100 bg-white" : "border-gray-100 bg-gray-50")}>
      <div className={cn("mb-3 grid h-14 w-14 place-items-center rounded-2xl", item.unlocked ? "bg-amber-100 text-amber-700" : "bg-gray-200 text-gray-500")}>
        <Icon size={28} />
      </div>
      <h3 className="font-black text-gray-900">{item.title}</h3>
      <p className="mt-1 min-h-10 text-sm text-gray-500">{item.desc}</p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <StatusBadge status={item.unlocked ? "Đã mở khóa" : "Chưa mở khóa"} />
        <span className="text-xs font-bold text-gray-500">{item.date}</span>
      </div>
      {!item.unlocked && <div className="mt-3"><ProgressBar value={item.progress} tone="purple" /></div>}
    </article>
  );
}

export function SkillChart({ data, type = "radar" }: { data: SkillScore[]; type?: "radar" | "bar" }) {
  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="value" fill="#F97316" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
        <Radar dataKey="value" stroke="#F97316" fill="#F97316" fillOpacity={0.35} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-gray-900/40 p-4">
      <div className="w-full max-w-md rounded-[20px] bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-gray-900">{title}</h2>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-gray-100" onClick={onClose} aria-label="Đóng"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ToastNotification({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const id = window.setTimeout(onClose, 2200);
    return () => window.clearTimeout(id);
  }, [onClose]);
  return (
    <div className="fixed bottom-24 right-4 z-50 flex items-center gap-3 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-bold text-white shadow-xl md:bottom-6">
      <CheckCircle2 className="text-green-400" size={20} /> {message}
    </div>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[20px] border border-dashed border-orange-200 bg-orange-50 p-8 text-center">
      <Sparkles className="mx-auto text-orange-500" />
      <h3 className="mt-3 font-black text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{text}</p>
    </div>
  );
}

export function LoadingSkeleton() {
  return <div className="h-28 animate-pulse rounded-[20px] bg-gradient-to-r from-gray-100 via-orange-50 to-gray-100" />;
}

export function NotificationItem({ item, onClick }: { item: { type: string; title: string; text: string; time: string; read: boolean }; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn("w-full rounded-[20px] border p-4 text-left transition hover:border-orange-200", item.read ? "border-gray-100 bg-white" : "border-orange-100 bg-orange-50")}>
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-orange-600"><Bell size={20} /></div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-black text-gray-900">{item.title}</h3>
            <span className="text-xs font-bold text-gray-500">{item.time}</span>
          </div>
          <p className="text-sm text-gray-600">{item.text}</p>
          <span className="mt-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-bold text-orange-700">{item.type}</span>
        </div>
      </div>
    </button>
  );
}

export function DiscussionCard({ item }: { item: { name: string; avatar: string; time: string; text: string; likes: number } }) {
  return (
    <article className="rounded-[20px] bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <Avatar label={item.avatar} />
        <div>
          <h3 className="font-black text-gray-900">{item.name}</h3>
          <p className="text-xs font-semibold text-gray-500">{item.time}</p>
          <p className="mt-2 text-sm text-gray-700">{item.text}</p>
          <div className="mt-3 flex gap-2">
            <button className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">Thích · {item.likes}</button>
            <button className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">Trả lời</button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm font-medium text-gray-500 sm:text-base">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
