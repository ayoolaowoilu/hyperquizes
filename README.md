HyperQuizes
Learning made fun 🎉 — A modern quiz sharing platform where learners create, share, and explore quizzes that make knowledge addictive.
  

🚀 Overview
HyperQuizes is a community-driven quiz sharing platform designed to transform learning into an engaging, competitive, and social experience. Whether you’re a student preparing for exams, a teacher creating interactive lessons, or a trivia enthusiast challenging friends, HyperQuizes provides the tools to make knowledge acquisition addictive and fun.
Join 50,000+ learners who are already creating, sharing, and exploring quizzes across every topic imaginable.

✨ Features
🎯 Quiz Creation
Build engaging, multimedia-rich quizzes in minutes with our intuitive drag-and-drop creator. Support for multiple question types including multiple choice, true/false, fill-in-the-blank, and image-based questions.
🏆 Leaderboards & Rankings
Compete with friends, classmates, and the global community. Real-time leaderboards track your performance and crown the trivia champions.
📊 Analytics Dashboard
Track your learning progress with detailed insights and statistics. Identify strengths, discover knowledge gaps, and optimize your study sessions with data-driven feedback.
🎮 Live Games
Host real-time quiz competitions with anyone, anywhere. Perfect for classrooms, remote teams, trivia nights, and virtual events. Participants join via QR code or link — no download required.
🎨 Custom Themes
Personalize your quizzes with beautiful, customizable designs. Match your brand, school colors, or event theme with our flexible styling options.
🔥 Daily Streaks & Gamification
Stay consistent with daily streaks, earn bonus rewards, unlock achievements, and level up your learning journey. Gamification elements keep motivation high and retention strong.
🔗 Social Sharing
Share quizzes instantly via link, QR code, or embed them directly in websites and learning management systems. Seamless integration with Zoom, Teams, Google Meet, and other platforms.

🛠️ Tech Stack
Layer	Technology
Frontend	React / Next.js
Styling	Tailwind CSS
Backend	Node.js / Express
Database	PostgreSQL / MongoDB
Real-time	Socket.io
Authentication	JWT / OAuth 2.0
Deployment	Netlify (Frontend) / Vercel / AWS

📦 Installation
Prerequisites
•Node.js 18+
•npm or yarn
•Git
Clone the Repository
git clone https://github.com/yourusername/hyperquizes.git
cd hyperquizes
Install Dependencies
npm install
# or
yarn install
Environment Setup
Create a .env file in the root directory:
DATABASE_URL=postgresql://user:password@localhost:5432/hyperquizes
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000
SOCKET_IO_URL=http://localhost:3001
Run Development Server
npm run dev
# or
yarn dev
The application will be available at http://localhost:3000.

🎯 Usage
Creating a Quiz
1.Sign up or log in to your account
2.Click “Create Quiz” from the dashboard
3.Add questions, answers, and multimedia content
4.Configure settings (time limits, scoring, visibility)
5.Publish and share your quiz link or QR code
Hosting a Live Game
1.Open any quiz from your library
2.Click “Host Live Game”
3.Share the room code or QR code with participants
4.Control the pace as players answer in real-time
5.View the live leaderboard and celebrate the winners
Taking a Quiz
1.Click a shared link or scan a QR code
2.Enter your display name (no account required for anonymous play)
3.Answer questions within the time limit
4.View your score and ranking immediately

🏗️ Project Structure
hyperquizes/
├── apps/
│   ├── web/                 # Next.js frontend application
│   └── api/                 # Express backend API
├── packages/
│   ├── ui/                  # Shared UI component library
│   ├── config/              # Shared configuration (ESLint, Tailwind)
│   └── types/               # Shared TypeScript types
├── docs/                    # Documentation
├── scripts/                 # Build and deployment scripts
└── README.md

🤝 Contributing
We welcome contributions from the community! Here’s how to get started:
1.Fork the repository
2.Clone your fork: git clone https://github.com/yourusername/hyperquizes.git
3.Create a branch: git checkout -b feature/amazing-feature
4.Make your changes and commit: git commit -m 'Add amazing feature'
5.Push to your branch: git push origin feature/amazing-feature
6.Open a Pull Request with a detailed description
Contribution Guidelines
•Follow the existing code style and formatting
•Write meaningful commit messages
•Add tests for new features
•Update documentation as needed
•Ensure all tests pass before submitting
Good First Issues
Look for issues labeled good first issue or help wanted to find beginner-friendly tasks.

🗺️ Roadmap
•☐ AI-Powered Quiz Generation — Auto-generate quizzes from text, URLs, or documents
•☐ Mobile Applications — Native iOS and Android apps
•☐ Advanced Analytics — Detailed learning analytics and progress reports
•☐ Quiz Marketplace — Buy and sell premium quiz packs
•☐ Team/Organization Plans — Enterprise features for schools and companies
•☐ Offline Mode — Download quizzes for offline play
•☐ Multilingual Support — Support for 20+ languages

📸 Screenshots
Dashboard	Quiz Creator	Live Game
Dashboard	Creator	Live

📝 License
This project is licensed under the MIT License — see the LICENSE file for details.

🙏 Acknowledgments
•Built with ❤️ by the HyperQuizes team and community
•Inspired by the love of learning and friendly competition
•Special thanks to all contributors and beta testers

📬 Contact & Support
•Website: hyperquizes.netlify.app
•Issues: GitHub Issues
•Discussions: GitHub Discussions
•Email: hello@hyperquizes.com

Made with curiosity, built for learners. ⭐ Star this repo if you find it helpful!
