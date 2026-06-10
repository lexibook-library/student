import { Award, BookOpen, ClipboardCheck, Flame, Trophy } from "lucide-react";
import type { ReactNode } from "react";
import { achievements, currentStudent, lexileProgress, skillScores } from "../data/mockData";
import { AchievementBadge, Avatar, PageHeader, ProgressBar, SkillChart, StatCard } from "../components/ui";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AchievementsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[20px] bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm">
        <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
          <Avatar label={currentStudent.avatar} size="lg" />
          <div>
            <PageHeader title={currentStudent.name} subtitle={`Lớp ${currentStudent.className} · ${currentStudent.lexile} Lexile · Cấp độ Chinh phục câu hỏi`} />
            <div className="mt-4 max-w-xl"><ProgressBar value={72} /><p className="mt-2 text-sm font-bold text-gray-500">Còn 140 Lexile để lên cấp tiếp theo · 7 ngày hoàn thành đúng hạn</p></div>
          </div>
        </div>
      </section>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={<Trophy />} value="2.460" label="tổng Lexile đã đạt" tone="bg-orange-50" />
        <StatCard icon={<BookOpen />} value="12" label="sách hoàn thành" tone="bg-blue-50" />
        <StatCard icon={<Award />} value="9" label="bài kiểm tra vượt qua" tone="bg-green-50" />
        <StatCard icon={<ClipboardCheck />} value="8" label="nhiệm vụ hoàn thành" tone="bg-amber-50" />
        <StatCard icon={<Flame />} value="5" label="huy hiệu đã đạt" tone="bg-violet-50" />
      </div>
      <section className="space-y-4"><h2 className="text-xl font-black">Bộ sưu tập huy hiệu</h2><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{achievements.map((item) => <AchievementBadge key={item.id} item={item} />)}</div></section>
      <div className="grid gap-5 xl:grid-cols-3">
        <ChartBox title="Điểm Lexile theo tháng"><ResponsiveContainer width="100%" height={260}><LineChart data={lexileProgress}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="lexile" stroke="#F97316" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartBox>
        <ChartBox title="Sách hoàn thành"><ResponsiveContainer width="100%" height={260}><BarChart data={lexileProgress}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Bar dataKey="books" fill="#3B82F6" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></ChartBox>
        <ChartBox title="6 tiêu chí đọc hiểu Lexile"><SkillChart data={skillScores} /></ChartBox>
      </div>
      <section className="rounded-[20px] bg-white p-5 shadow-sm"><h2 className="font-black">Lịch sử hoạt động</h2>{["Hoàn thành bộ câu hỏi Cô bé quàng khăn đỏ", "Nhận huy hiệu Người làm bài chăm chỉ", "Tăng 25 điểm Lexile", "Đạt hạng 4 trong lớp"].map((item) => <div key={item} className="mt-3 rounded-2xl bg-gray-50 p-3 font-semibold text-gray-700">{item}</div>)}</section>
    </div>
  );
}

function ChartBox({ title, children }: { title: string; children: ReactNode }) {
  return <section className="rounded-[20px] bg-white p-5 shadow-sm"><h2 className="mb-4 font-black">{title}</h2>{children}</section>;
}
