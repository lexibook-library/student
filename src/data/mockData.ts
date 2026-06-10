export type Status = "Chưa bắt đầu" | "Đang thực hiện" | "Hoàn thành" | "Sắp hết hạn" | "Quá hạn";

export type SkillScore = {
  name: string;
  value: number;
};

export type Quiz = {
  id: string;
  title: string;
  questionCount: number;
  duration: number;
  attempts: number;
  bestScore?: number;
  status: Status;
};

export type Task = {
  id: string;
  bookId: string;
  title: string;
  bookTitle: string;
  teacher: string;
  className: string;
  type: string;
  startDate: string;
  dueDate: string;
  status: Status;
  progress: number;
  requirement: string;
  cover: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  pages: number;
  lexile: number;
  rating: number;
  progress: number;
  status: "Chưa bắt đầu" | "Đang thực hiện" | "Đã hoàn thành" | "Sắp hết hạn";
  description: string;
  cover: string;
  chapter: string;
  readers: number;
  quizzes: Quiz[];
  members: Student[];
};

export type Student = {
  id: string;
  name: string;
  className: string;
  school?: string;
  avatar: string;
  lexile: number;
  books: number;
  badges: number;
  progress?: number;
};

export type TestItem = {
  id: string;
  title: string;
  bookId: string;
  bookTitle: string;
  type: string;
  teacher: string;
  questionCount: number;
  duration: number;
  attempts: number;
  startAt: string;
  dueAt: string;
  status: "Chưa thực hiện" | "Đang làm" | "Đã hoàn thành" | "Đã quá hạn";
};

export type Question = {
  id: string;
  skill: string;
  type: "single" | "multi" | "truefalse" | "fill" | "order";
  text: string;
  options: string[];
  answer: string;
  explanation: string;
};

export const currentStudent: Student = {
  id: "s1",
  name: "Nguyễn Minh Anh",
  className: "6A3",
  school: "THCS Nguyễn Du",
  avatar: "MA",
  lexile: 860,
  books: 12,
  badges: 5,
};

export const students: Student[] = [
  currentStudent,
  { id: "s2", name: "Trần Gia Huy", className: "6A3", avatar: "GH", lexile: 920, books: 15, badges: 7, progress: 76 },
  { id: "s3", name: "Lê Ngọc Hà", className: "5A1", avatar: "NH", lexile: 900, books: 14, badges: 6, progress: 88 },
  { id: "s4", name: "Phạm Quang Minh", className: "7A2", avatar: "QM", lexile: 880, books: 13, badges: 6, progress: 64 },
  { id: "s5", name: "Võ Khánh Linh", className: "6A3", avatar: "KL", lexile: 830, books: 11, badges: 5, progress: 52 },
  { id: "s6", name: "Bùi Hoàng Nam", className: "4A2", avatar: "HN", lexile: 790, books: 10, badges: 4, progress: 42 },
  { id: "s7", name: "Nguyễn Thảo Vy", className: "3A1", avatar: "TV", lexile: 760, books: 9, badges: 4, progress: 70 },
  { id: "s8", name: "Trần Đức Anh", className: "5A1", avatar: "DA", lexile: 740, books: 8, badges: 3, progress: 35 },
];

const quizSet: Quiz[] = [
  { id: "q1", title: "Đọc hiểu chương 1-3", questionCount: 12, duration: 20, attempts: 2, bestScore: 88, status: "Hoàn thành" },
  { id: "q2", title: "Từ vựng và suy luận", questionCount: 15, duration: 25, attempts: 2, status: "Đang thực hiện" },
  { id: "q3", title: "Tóm tắt câu chuyện", questionCount: 8, duration: 15, attempts: 1, status: "Chưa bắt đầu" },
];

export const books: Book[] = [
  {
    id: "de-men",
    title: "Dế Mèn phiêu lưu ký",
    author: "Tô Hoài",
    genre: "Phiêu lưu",
    pages: 180,
    lexile: 760,
    rating: 4.8,
    progress: 68,
    status: "Sắp hết hạn",
    description: "Câu chuyện về hành trình trưởng thành, lòng dũng cảm và tình bạn qua những chuyến phiêu lưu sống động.",
    cover: "from-orange-500 to-amber-300",
    chapter: "Chương 8: Bài học đường đời",
    readers: 128,
    quizzes: quizSet,
    members: students.slice(0, 6),
  },
  {
    id: "khan-do",
    title: "Cô bé quàng khăn đỏ",
    author: "Charles Perrault",
    genre: "Cổ tích",
    pages: 48,
    lexile: 520,
    rating: 4.5,
    progress: 100,
    status: "Đã hoàn thành",
    description: "Một truyện cổ tích quen thuộc giúp rèn kỹ năng dự đoán và nhận diện chi tiết quan trọng.",
    cover: "from-red-500 to-rose-300",
    chapter: "Đã hoàn thành",
    readers: 96,
    quizzes: quizSet.slice(0, 2),
    members: students.slice(1, 7),
  },
  {
    id: "dat-rung",
    title: "Đất rừng phương Nam",
    author: "Đoàn Giỏi",
    genre: "Thiếu nhi",
    pages: 280,
    lexile: 840,
    rating: 4.9,
    progress: 42,
    status: "Đang thực hiện",
    description: "Bức tranh miền Tây Nam Bộ giàu cảm xúc qua hành trình của cậu bé An.",
    cover: "from-emerald-500 to-lime-300",
    chapter: "Chương 5: Rừng U Minh",
    readers: 154,
    quizzes: quizSet,
    members: students,
  },
  {
    id: "tuoi-tho",
    title: "Cho tôi xin một vé đi tuổi thơ",
    author: "Nguyễn Nhật Ánh",
    genre: "Gia đình",
    pages: 208,
    lexile: 820,
    rating: 4.7,
    progress: 24,
    status: "Đang thực hiện",
    description: "Những lát cắt trong trẻo về tuổi thơ, trí tưởng tượng và tình bạn.",
    cover: "from-sky-500 to-cyan-300",
    chapter: "Chương 3: Trò chơi mới",
    readers: 210,
    quizzes: quizSet.slice(1),
    members: students.slice(0, 5),
  },
  {
    id: "kinh-van-hoa",
    title: "Kính vạn hoa",
    author: "Nguyễn Nhật Ánh",
    genre: "Học đường",
    pages: 320,
    lexile: 780,
    rating: 4.6,
    progress: 0,
    status: "Chưa bắt đầu",
    description: "Những câu chuyện học trò hài hước, gần gũi và giàu tình bạn.",
    cover: "from-violet-500 to-fuchsia-300",
    chapter: "Chưa bắt đầu",
    readers: 176,
    quizzes: quizSet,
    members: students.slice(2),
  },
  {
    id: "hoang-tu-be",
    title: "Hoàng tử bé",
    author: "Antoine de Saint-Exupéry",
    genre: "Triết lý",
    pages: 96,
    lexile: 710,
    rating: 4.9,
    progress: 80,
    status: "Đang thực hiện",
    description: "Một hành trình dịu dàng về tình bạn, trách nhiệm và cách nhìn thế giới bằng trái tim.",
    cover: "from-yellow-500 to-orange-300",
    chapter: "Hành tinh của nhà địa lý",
    readers: 188,
    quizzes: quizSet,
    members: students,
  },
  {
    id: "hoa-vang",
    title: "Tôi thấy hoa vàng trên cỏ xanh",
    author: "Nguyễn Nhật Ánh",
    genre: "Tuổi thơ",
    pages: 378,
    lexile: 830,
    rating: 4.8,
    progress: 0,
    status: "Chưa bắt đầu",
    description: "Câu chuyện cảm động về anh em, làng quê và những bài học trưởng thành.",
    cover: "from-lime-500 to-yellow-300",
    chapter: "Chưa bắt đầu",
    readers: 132,
    quizzes: quizSet,
    members: students.slice(0, 4),
  },
  {
    id: "tom-sawyer",
    title: "Cuộc phiêu lưu của Tom Sawyer",
    author: "Mark Twain",
    genre: "Phiêu lưu",
    pages: 260,
    lexile: 850,
    rating: 4.6,
    progress: 0,
    status: "Chưa bắt đầu",
    description: "Tác phẩm kinh điển về sự tinh nghịch, lòng can đảm và tình bạn.",
    cover: "from-blue-500 to-indigo-300",
    chapter: "Chưa bắt đầu",
    readers: 118,
    quizzes: quizSet.slice(0, 2),
    members: students.slice(1, 6),
  },
];

export const tasks: Task[] = [
  { id: "t1", bookId: "de-men", title: "Hoàn thành bộ câu hỏi chương 8", bookTitle: "Dế Mèn phiêu lưu ký", teacher: "Cô Lan", className: "6A3", type: "Bộ câu hỏi Lexile", startDate: "08/06", dueDate: "12/06", status: "Sắp hết hạn", progress: 70, requirement: "Trả lời các câu hỏi về ba chi tiết thể hiện sự thay đổi của Dế Mèn.", cover: books[0].cover },
  { id: "t2", bookId: "dat-rung", title: "Tóm tắt hành trình của An", bookTitle: "Đất rừng phương Nam", teacher: "Thầy Bình", className: "6A3", type: "Tóm tắt", startDate: "05/06", dueDate: "16/06", status: "Đang thực hiện", progress: 45, requirement: "Viết tóm tắt 120 từ và chọn một hình ảnh tiêu biểu.", cover: books[2].cover },
  { id: "t3", bookId: "hoang-tu-be", title: "Bộ câu hỏi suy luận", bookTitle: "Hoàng tử bé", teacher: "Cô Hạnh", className: "6A3", type: "Kiểm tra", startDate: "01/06", dueDate: "18/06", status: "Đang thực hiện", progress: 80, requirement: "Hoàn thành bộ câu hỏi và xem lại lời giải thích.", cover: books[5].cover },
  { id: "t4", bookId: "khan-do", title: "Hoàn thành bộ câu hỏi cổ tích", bookTitle: "Cô bé quàng khăn đỏ", teacher: "Cô Lan", className: "6A3", type: "Bài tập về nhà", startDate: "02/06", dueDate: "09/06", status: "Hoàn thành", progress: 100, requirement: "Trả lời câu hỏi về bài học rút ra từ câu chuyện.", cover: books[1].cover },
  { id: "t5", bookId: "kinh-van-hoa", title: "Bộ câu hỏi sách mới", bookTitle: "Kính vạn hoa", teacher: "Thầy Bình", className: "6A3", type: "Bộ câu hỏi Lexile", startDate: "10/06", dueDate: "20/06", status: "Chưa bắt đầu", progress: 0, requirement: "Sau khi đọc sách trên hệ thống của trường, hãy hoàn thành bộ câu hỏi được giao.", cover: books[4].cover },
];

export const tests: TestItem[] = [
  { id: "test-de-men", title: "Kiểm tra đọc hiểu Dế Mèn", bookId: "de-men", bookTitle: "Dế Mèn phiêu lưu ký", type: "Bài tập về nhà", teacher: "Cô Lan", questionCount: 8, duration: 20, attempts: 2, startAt: "10/06 08:00", dueAt: "12/06 21:00", status: "Chưa thực hiện" },
  { id: "test-dat-rung", title: "Khảo sát chi tiết Đất rừng", bookId: "dat-rung", bookTitle: "Đất rừng phương Nam", type: "Khảo sát", teacher: "Thầy Bình", questionCount: 10, duration: 25, attempts: 1, startAt: "09/06 07:00", dueAt: "16/06 21:00", status: "Đang làm" },
  { id: "test-hoang-tu", title: "Suy luận cùng Hoàng tử bé", bookId: "hoang-tu-be", bookTitle: "Hoàng tử bé", type: "Bộ câu hỏi Lexile", teacher: "Cô Hạnh", questionCount: 12, duration: 30, attempts: 2, startAt: "01/06 07:00", dueAt: "18/06 21:00", status: "Đã hoàn thành" },
  { id: "test-tuoi-tho", title: "Cuộc thi: Trang sách tuổi thơ", bookId: "tuoi-tho", bookTitle: "Cho tôi xin một vé đi tuổi thơ", type: "Cuộc thi", teacher: "Cô Lan", questionCount: 15, duration: 35, attempts: 1, startAt: "01/06 07:00", dueAt: "08/06 21:00", status: "Đã quá hạn" },
];

export const questions: Question[] = [
  { id: "1", skill: "Truy xuất thông tin", type: "single", text: "Dế Mèn nhận ra điều gì sau bài học đầu tiên?", options: ["Cần biết lắng nghe và khiêm tốn", "Nên đi thật xa ngay lập tức", "Không cần quan tâm bạn bè", "Chỉ cần mạnh là đủ"], answer: "Cần biết lắng nghe và khiêm tốn", explanation: "Chi tiết trong truyện cho thấy nhân vật trưởng thành hơn sau sai lầm." },
  { id: "2", skill: "Từ vựng", type: "multi", text: "Những từ nào phù hợp để miêu tả Dế Mèn ở phần đầu truyện?", options: ["Tự tin", "Kiêu căng", "Nhút nhát", "Tò mò"], answer: "Tự tin, Kiêu căng, Tò mò", explanation: "Nhân vật vừa ham khám phá vừa có phần chủ quan." },
  { id: "3", skill: "Suy luận", type: "truefalse", text: "Dế Mèn thay đổi vì biết suy nghĩ về hậu quả hành động của mình.", options: ["Đúng", "Sai"], answer: "Đúng", explanation: "Sự thay đổi đến từ trải nghiệm và khả năng nhìn lại bản thân." },
  { id: "4", skill: "Giải thích", type: "fill", text: "Điền từ thích hợp: Một người đọc tốt cần biết đặt câu hỏi và ____ chi tiết.", options: ["kết nối"], answer: "kết nối", explanation: "Kết nối chi tiết giúp hiểu sâu hơn ý nghĩa câu chuyện." },
  { id: "5", skill: "Trình tự hoặc tóm tắt", type: "order", text: "Sắp xếp các bước đọc hiểu theo trình tự hợp lý.", options: ["Đọc câu hỏi", "Tìm chi tiết", "Chọn đáp án", "Kiểm tra lại"], answer: "Đọc câu hỏi > Tìm chi tiết > Chọn đáp án > Kiểm tra lại", explanation: "Quy trình này giúp trả lời chắc chắn và ít bỏ sót." },
  { id: "6", skill: "Dự đoán", type: "single", text: "Nếu Dế Mèn gặp một người bạn mới, điều gì có thể xảy ra?", options: ["Bạn ấy sẽ thử lắng nghe trước khi hành động", "Bạn ấy sẽ bỏ đi ngay", "Bạn ấy không thay đổi gì", "Bạn ấy chỉ khoe sức mạnh"], answer: "Bạn ấy sẽ thử lắng nghe trước khi hành động", explanation: "Dựa trên sự trưởng thành trước đó của nhân vật." },
];

export const skillScores: SkillScore[] = [
  { name: "Từ vựng", value: 86 },
  { name: "Suy luận", value: 78 },
  { name: "Dự đoán", value: 82 },
  { name: "Giải thích", value: 74 },
  { name: "Truy xuất", value: 92 },
  { name: "Tóm tắt", value: 80 },
];

export const lexileProgress = [
  { month: "T1", lexile: 690, books: 1 },
  { month: "T2", lexile: 720, books: 2 },
  { month: "T3", lexile: 760, books: 2 },
  { month: "T4", lexile: 800, books: 3 },
  { month: "T5", lexile: 835, books: 2 },
  { month: "T6", lexile: 860, books: 2 },
];

export const achievements = [
  { id: "a1", title: "Người làm bài chăm chỉ", desc: "Hoàn thành bộ câu hỏi đúng hạn 7 ngày liên tiếp", date: "09/06", unlocked: true, progress: 100, icon: "Flame" },
  { id: "a2", title: "Nhà thám hiểm sách", desc: "Khám phá 5 thể loại khác nhau", date: "07/06", unlocked: true, progress: 100, icon: "Compass" },
  { id: "a3", title: "Bậc thầy từ vựng", desc: "Đạt trên 85% tiêu chí từ vựng", date: "05/06", unlocked: true, progress: 100, icon: "Sparkles" },
  { id: "a4", title: "Chuyên gia suy luận", desc: "Hoàn thành 10 câu suy luận", date: "Đang mở khóa", unlocked: false, progress: 70, icon: "Brain" },
  { id: "a5", title: "Hoàn thành 10 cuốn sách", desc: "Bạn đã đi rất gần cột mốc mới", date: "Đang mở khóa", unlocked: false, progress: 80, icon: "Trophy" },
  { id: "a6", title: "Điểm tuyệt đối", desc: "Vượt qua bài kiểm tra với 100 điểm", date: "Đang mở khóa", unlocked: false, progress: 40, icon: "Medal" },
];

export const notifications = [
  { id: "n1", type: "Nhiệm vụ", title: "Cô Lan giao nhiệm vụ mới", text: "Đọc chương 8 Dế Mèn và trả lời câu hỏi.", time: "10 phút trước", read: false },
  { id: "n2", type: "Kiểm tra", title: "Bài kiểm tra sắp hết hạn", text: "Kiểm tra Dế Mèn cần hoàn thành trước 12/06.", time: "1 giờ trước", read: false },
  { id: "n3", type: "Huy hiệu", title: "Bạn nhận huy hiệu mới", text: "Người làm bài chăm chỉ đã được mở khóa.", time: "Hôm qua", read: true },
  { id: "n4", type: "Phản hồi", title: "Thầy Bình đã nhận xét", text: "Bài tóm tắt của bạn có ý chính rõ ràng.", time: "2 ngày trước", read: true },
  { id: "n5", type: "Bình luận", title: "Có trả lời mới trong thảo luận", text: "Khánh Linh nhắc tới một chi tiết thú vị.", time: "3 ngày trước", read: true },
];

export const discussions = [
  { id: "d1", name: "Võ Khánh Linh", avatar: "KL", time: "15 phút trước", text: "Mình thích cách Dế Mèn học được bài học từ sai lầm. Nhân vật trở nên gần gũi hơn.", likes: 8 },
  { id: "d2", name: "Trần Gia Huy", avatar: "GH", time: "1 giờ trước", text: "Chi tiết miêu tả thiên nhiên rất sống động, đọc lên thấy như đang đi cùng nhân vật.", likes: 5 },
];

export const resultRows = questions.map((q, index) => ({
  ...q,
  chosen: index === 1 ? "Tự tin, Tò mò" : q.answer,
  correct: index !== 1,
}));
