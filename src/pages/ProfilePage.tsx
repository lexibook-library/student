import { useState } from "react";
import { currentStudent } from "../data/mockData";
import { Avatar, PageHeader } from "../components/ui";
import { useToast } from "../components/AppLayout";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [dark, setDark] = useState(false);
  const { showToast } = useToast();
  return (
    <div className="space-y-6">
      <PageHeader title="Hồ sơ cá nhân" subtitle="Thông tin học sinh và cài đặt trải nghiệm làm bộ câu hỏi" />
      <section className="grid gap-5 rounded-[20px] bg-white p-5 shadow-sm lg:grid-cols-[220px_1fr]">
        <div className="text-center"><div className="mx-auto w-fit"><Avatar label={currentStudent.avatar} size="lg" /></div><h2 className="mt-3 font-black">{currentStudent.name}</h2><p className="text-sm text-gray-500">{currentStudent.className} · {currentStudent.school}</p></div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Họ và tên" value={currentStudent.name} editing={editing} />
          <Field label="Lớp" value={currentStudent.className} editing={editing} />
          <Field label="Trường" value={currentStudent.school ?? ""} editing={editing} />
          <Field label="Email" value="minhanh@student.iread.vn" editing={editing} />
          <Field label="Ngày sinh" value="12/09/2013" editing={editing} />
          <Field label="Thể loại sách quan tâm" value="Phiêu lưu, học đường, truyện thiếu nhi" editing={editing} />
          <Field label="Dạng câu hỏi yêu thích" value="Suy luận, truy xuất thông tin, tóm tắt" editing={editing} />
          <label className="rounded-2xl bg-gray-50 p-4"><span className="text-sm font-bold text-gray-500">Cài đặt thông báo</span><select className="mt-2 w-full rounded-xl border border-gray-100 bg-white p-2"><option>Nhận thông báo quan trọng</option><option>Tắt thông báo ngoài giờ học</option></select></label>
          <label className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"><span><b>Giao diện tối</b><p className="text-sm text-gray-500">Demo chuyển chế độ</p></span><input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} /></label>
          <button onClick={() => showToast("Đã mở form đổi mật khẩu demo")} className="rounded-2xl bg-orange-50 p-4 text-left font-bold text-orange-700">Đổi mật khẩu</button>
        </div>
      </section>
      <div className="flex flex-wrap gap-3">
        {!editing ? <button onClick={() => setEditing(true)} className="rounded-2xl bg-orange-500 px-5 py-3 font-extrabold text-white">Chỉnh sửa thông tin</button> : <><button onClick={() => { setEditing(false); showToast("Đã lưu thay đổi hồ sơ"); }} className="rounded-2xl bg-orange-500 px-5 py-3 font-extrabold text-white">Lưu thay đổi</button><button onClick={() => setEditing(false)} className="rounded-2xl bg-gray-100 px-5 py-3 font-extrabold text-gray-700">Hủy</button></>}
      </div>
    </div>
  );
}

function Field({ label, value, editing }: { label: string; value: string; editing: boolean }) {
  return <label className="rounded-2xl bg-gray-50 p-4"><span className="text-sm font-bold text-gray-500">{label}</span>{editing ? <input defaultValue={value} className="mt-2 w-full rounded-xl border border-gray-100 bg-white p-2 outline-none focus:border-orange-300" /> : <p className="mt-2 font-black text-gray-900">{value}</p>}</label>;
}
