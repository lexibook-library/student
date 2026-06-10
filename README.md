# iRead Student

Website demo cho học sinh làm bộ câu hỏi Lexile theo kế hoạch admin hoặc giáo viên giao sau khi đã đọc sách trên hệ thống đọc sách của trường.

## Chạy dự án

```bash
npm install
npm run dev
```

Build kiểm tra TypeScript và bundle:

```bash
npm run build
```

## Công nghệ

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Lucide React Icons
- Recharts
- Mock data trong `src/data/mockData.ts`

## Các trang đã hoàn thiện

- `/home` Trang chủ học sinh
- `/tasks` Nhiệm vụ của tôi
- `/tasks/:bookId` Chi tiết nhiệm vụ theo sách
- `/tests` Danh sách bài kiểm tra
- `/tests/:testId/start` Màn hình làm bài
- `/tests/:testId/result` Kết quả sau khi nộp bài
- `/library` Kế hoạch đọc được giao
- `/library/:bookId` Chi tiết sách và bộ câu hỏi
- `/achievements` Thành tích
- `/leaderboard` Bảng xếp hạng
- `/notifications` Thông báo
- `/profile` Hồ sơ cá nhân

Các nút chính có tương tác demo bằng toast, modal, điều hướng route hoặc cập nhật trạng thái cục bộ.
