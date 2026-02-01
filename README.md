# HRM System - Enterprise Human Resource Management

A comprehensive, modern HR management system built with Next.js, featuring employee management, attendance tracking, leave management, payroll processing, and AI-powered insights.

## 🚀 Features

### Multi-Role Dashboard System
- **Employee Portal**: Self-service for attendance, leave requests, payroll access, and performance tracking
- **HR Management**: Employee directory, attendance monitoring, leave approvals, and payroll processing
- **Admin Control**: System configuration, role management, organization structure, and security settings

### Core Modules
- 📊 **Attendance Management**: Real-time tracking, check-in/out, and attendance analytics
- 🏖️ **Leave Management**: Leave applications, approval workflows, and policy management
- 💰 **Payroll System**: Salary processing, payslip generation, and tax compliance
- 🎯 **Performance Management**: Goal setting, reviews, and performance insights
- 👥 **Employee Directory**: Comprehensive employee profiles and organizational structure
- 📢 **Announcements**: Company-wide communications and policy updates

### AI-Powered Features
- 🧠 **Attrition Prediction**: AI analyzes employee data to predict turnover risk
- 📈 **Performance Insights**: Automated performance analysis and recommendations
- 🚨 **Attendance Anomalies**: Smart detection of unusual attendance patterns
- 📄 **Resume Ranking**: AI-powered candidate scoring and ranking

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **State Management**: Redux Toolkit
- **Database**: SQLite with Prisma ORM
- **Authentication**: Custom JWT-based auth system
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React
- **Runtime**: Bun

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/surjeetIqsetters/hrm-system.git
   cd hrm-system
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up the database**
   ```bash
   bun run db:generate
   bun run db:push
   ```

4. **Start the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Accounts

The system comes with pre-configured demo accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| Employee | john.doe@company.com | password123 |
| HR Manager | jane.smith@company.com | password123 |
| Admin | admin@company.com | admin123 |

## 🏗️ Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── employee/       # Employee portal pages
│   │   ├── hr/             # HR management pages
│   │   ├── api/            # API routes
│   │   └── dashboard/      # Main dashboard
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   ├── redux/              # Redux store and slices
│   └── types/              # TypeScript type definitions
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
└── db/                     # SQLite database files
```

## 🚀 Deployment

### Production Build
```bash
bun run build
bun run start
```

### Docker Deployment
The project includes Docker configuration for containerized deployment:
```bash
docker build -t hrm-system .
docker run -p 3000:3000 hrm-system
```

### Caddy Reverse Proxy
For production deployment with Caddy:
```bash
# Build the application
bun run build

# Start with Caddy (configured in Caddyfile)
caddy run --config Caddyfile
```

## 📊 Database Schema

The system uses SQLite with Prisma ORM. Key models include:
- **User**: Employee information and authentication
- **Attendance**: Time tracking and attendance records
- **Leave**: Leave requests and approvals
- **Payroll**: Salary and compensation data
- **Performance**: Goals, reviews, and ratings

## 🔧 Configuration

### Environment Variables
Create a `.env` file with:
```env
DATABASE_URL="file:./db/custom.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Setup
```bash
# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push

# Reset database (if needed)
bun run db:reset
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Email: support@hrm-system.com

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Advanced AI features
- [ ] Third-party integrations (Slack, Teams, etc.)
- [ ] Multi-tenant support
- [ ] Advanced reporting and analytics
- [ ] Workflow automation builder

---

**Built with ❤️ for modern HR teams**