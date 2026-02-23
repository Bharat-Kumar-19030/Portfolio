# Bharat Kumar - Portfolio Website

A modern, responsive portfolio website built with the **MERN Stack** featuring stunning animations, GitHub API integration, and a contact form backed by MongoDB.

![Portfolio Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![MERN](https://img.shields.io/badge/Stack-MERN-purple) ![Tailwind](https://img.shields.io/badge/CSS-TailwindCSS-06b6d4)

## ✨ Features

- **Stunning Dark Theme** with glass morphism and gradient effects
- **Animated Hero Section** with typing animation and floating particles
- **Interactive Skills Section** with progress bars and tech stack marquee
- **Project Showcase** with image upload support via MongoDB
- **GitHub Integration** - Live repository data via GitHub API
- **Contact Form** - Messages saved to MongoDB
- **Responsive Design** - Works beautifully on all devices
- **Smooth Animations** - Powered by Framer Motion
- **Resume Download** - One-click resume access

## 🛠️ Tech Stack

| Layer      | Technology                         |
|------------|-----------------------------------|
| Frontend   | React.js, Vite, Tailwind CSS     |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB                            |
| Animation  | Framer Motion                      |
| API        | GitHub REST API                    |
| Icons      | React Icons                        |

## 📁 Project Structure

```
portfolio/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/       # Multer file upload
│   ├── uploads/         # Project images
│   ├── server.js        # Express server
│   ├── seed.js          # Database seeder
│   └── .env             # Environment variables
├── frontend/
│   ├── public/          # Static assets (resume.pdf)
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── utils/       # API helper
│   │   ├── App.jsx      # Main app
│   │   └── index.css    # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone & Setup Backend

```bash
cd backend
npm install
```

Configure environment variables in `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
GITHUB_USERNAME=bharatkumar19030
```

Start the backend server:
```bash
npm run dev
```

Optionally seed default projects:
```bash
npm run seed
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000` and proxies API calls to the backend.

### 3. Add Your Resume

Place your resume PDF at `frontend/public/resume.pdf` for the download button to work.

## 📡 API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/projects`       | Get all projects         |
| POST   | `/api/projects`       | Create project (+ image) |
| PUT    | `/api/projects/:id`   | Update project           |
| DELETE | `/api/projects/:id`   | Delete project           |
| POST   | `/api/contact`        | Submit contact form      |
| GET    | `/api/contact`        | Get all messages         |
| GET    | `/api/github/repos`   | Get GitHub repositories  |
| GET    | `/api/github/user`    | Get GitHub profile       |
| GET    | `/api/github/stats`   | Get aggregated stats     |

## 🎨 Customization

- **Colors**: Edit `frontend/tailwind.config.js` to change the color palette
- **Content**: Update personal info in the component files
- **GitHub Username**: Change `GITHUB_USERNAME` in `backend/.env`
- **Social Links**: Edit links in `Hero.jsx`, `Contact.jsx`, and `Footer.jsx`

## 📱 Sections

1. **Hero** - Introduction with typing animation
2. **About** - Bio, education, certifications, stats
3. **Skills** - Categorized skills with progress bars
4. **Projects** - Showcase with image upload
5. **GitHub** - Live repository data & stats
6. **Contact** - Form + social links
7. **Footer** - Quick links & copyright

---

**Built with ❤️ by Bharat Kumar**
