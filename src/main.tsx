import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import TestsPage from "./pages/TestsPage";
import TestStartPage from "./pages/TestStartPage";
import TestResultPage from "./pages/TestResultPage";
import LibraryPage from "./pages/LibraryPage";
import LibraryDetailPage from "./pages/LibraryDetailPage";
import AchievementsPage from "./pages/AchievementsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:bookId" element={<TaskDetailPage />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/library/:bookId" element={<LibraryDetailPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/tests/:testId/start" element={<TestStartPage />} />
        <Route path="/tests/:testId/result" element={<TestResultPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
