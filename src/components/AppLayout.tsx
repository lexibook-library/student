import { createContext, ReactNode, useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Award,
  Bell,
  BookOpen,
  ClipboardCheck,
  Home,
  Library,
  Menu,
  PanelLeftClose,
  Search,
  Trophy,
  User,
} from "lucide-react";
import { currentStudent } from "../data/mockData";
import { Avatar, cn, SearchInput, ToastNotification } from "./ui";

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue>({ showToast: () => undefined });

export function useToast() {
  return useContext(ToastContext);
}

const navItems = [
  { label: "Trang chủ", to: "/home", icon: Home },
  { label: "Nhiệm vụ của tôi", to: "/tasks", icon: ClipboardCheck },
  { label: "Làm bài kiểm tra", to: "/tests", icon: BookOpen },
  { label: "Kế hoạch đọc", to: "/library", icon: Library },
  { label: "Thành tích", to: "/achievements", icon: Award },
  { label: "Bảng xếp hạng", to: "/leaderboard", icon: Trophy },
  { label: "Hồ sơ cá nhân", to: "/profile", icon: User },
];

function StudentSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside className={cn("fixed inset-y-0 left-0 z-30 hidden border-r border-orange-100 bg-white/95 p-4 shadow-sm backdrop-blur lg:block", collapsed ? "w-[88px]" : "w-[268px]")}>
      <div className="mb-6 flex min-h-12 items-center justify-between gap-2">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-lg"><BookOpen /></div>
          {!collapsed && <div><p className="text-lg font-black text-gray-900">iRead</p><p className="text-xs font-bold text-orange-600">Học sinh</p></div>}
        </div>
        {!collapsed && <button className="grid h-10 w-10 place-items-center rounded-full bg-orange-50 text-orange-700" onClick={onToggle} aria-label="Thu gọn"><PanelLeftClose size={18} /></button>}
      </div>
      {collapsed && <button className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-orange-50 text-orange-700" onClick={onToggle} aria-label="Mở rộng"><Menu size={18} /></button>}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-extrabold transition",
                isActive ? "bg-orange-50 text-orange-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                collapsed && "justify-center",
              )
            }
            title={item.label}
          >
            <item.icon size={21} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

function MobileBottomNavigation() {
  const profileItem = navItems.find((item) => item.to === "/profile");
  const items = profileItem ? navItems.slice(0, 4).concat(profileItem) : navItems.slice(0, 4);
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-orange-100 bg-white px-2 py-2 shadow-[0_-10px_30px_rgba(55,65,81,0.08)] lg:hidden">
      {items.map((item) => (
        <NavLink key={item.to} to={item.to} className={({ isActive }) => cn("flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-extrabold", isActive ? "bg-orange-50 text-orange-700" : "text-gray-500")}>
          <item.icon size={20} />
          <span className="max-w-full truncate">{item.label.replace(" của tôi", "").replace("Làm bài ", "")}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function StudentHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-[#F3F4F6]/85 px-4 py-3 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-gray-700 shadow-sm lg:hidden" onClick={onMenu} aria-label="Mở menu"><Menu /></button>
        <div className="hidden flex-1 md:block"><SearchInput /></div>
        <label className="flex min-h-11 flex-1 items-center gap-2 rounded-2xl bg-white px-3 shadow-sm md:hidden">
          <Search size={18} className="text-gray-400" />
          <input className="w-full border-0 bg-transparent text-sm outline-none" placeholder="Tìm sách..." />
        </label>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            cn(
              "relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-gray-600 shadow-sm transition hover:text-orange-600",
              isActive && "text-orange-600 ring-2 ring-orange-100",
            )
          }
          aria-label="Thông báo"
          title="Thông báo"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-white" />
        </NavLink>
        <div className="hidden items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm sm:flex">
          <Avatar label={currentStudent.avatar} size="sm" />
          <div>
            <p className="text-sm font-black text-gray-900">{currentStudent.name}</p>
            <p className="text-xs font-bold text-orange-600">{currentStudent.lexile} Lexile · {currentStudent.className}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [toast, setToast] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const showToast = (message: string) => setToast(message);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="min-h-screen bg-[#F3F4F6]">
        <StudentSidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
        {mobileMenu && (
          <div className="fixed inset-0 z-50 bg-gray-900/30 lg:hidden" onClick={() => setMobileMenu(false)}>
            <div className="h-full w-[286px] bg-white p-4" onClick={(event) => event.stopPropagation()}>
              <StudentSidebar collapsed={false} onToggle={() => setMobileMenu(false)} />
              <div className="space-y-2 pt-16">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} onClick={() => setMobileMenu(false)} className={({ isActive }) => cn("flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-extrabold", isActive ? "bg-orange-50 text-orange-700" : "text-gray-600")}>
                    <item.icon size={20} /> {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className={cn("transition-all", collapsed ? "lg:pl-[88px]" : "lg:pl-[268px]")}>
          <StudentHeader onMenu={() => setMobileMenu(true)} />
          <main className="mx-auto max-w-[1480px] px-4 py-5 pb-28 md:px-6 md:py-7 lg:pb-8">
            <Outlet />
          </main>
        </div>
        <MobileBottomNavigation />
        {toast && <ToastNotification message={toast} onClose={() => setToast("")} />}
      </div>
    </ToastContext.Provider>
  );
}

export function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-black text-gray-900">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
