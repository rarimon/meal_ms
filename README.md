# 🍽️ Meal Management System

A complete **Meal & Expense Management System** built with **React (Vite)**.  
This project helps manage daily meals, expenses, and reports for mess/society meal management in an organized way.

---

## 🚀 Features

### 🏠 Dashboard
- Overview of total meals, total expenses, and balance summary  
- Member-wise and date-wise analysis  
- Graphical summary using **Recharts**

### 👥 User Management
- Add new members/users  
- Edit and delete users  
- View each member’s total meals, expenses, and balance

### 🍛 Meal Management
- Add meal entries (member, date, quantity)  
- Edit or delete any meal  
- View meal list and total count  
- Category-wise and member-wise summary

### 💰 Expense Management
- Add new expenses with category, amount, and date  
- Edit and delete expenses  
- Date-wise and category-wise expense tracking  

### 📊 Reports & Analytics
- **Date-wise report:** Total meals & total expenses between selected dates  
- **Member-wise report:** Individual meal and cost calculation  
- **Category-wise report:** Expense tracking per category  
- **Combined summary:** All meals, all expenses, and total calculation in one place  
- **Chart Visualization:** Meal vs Expense comparison

---

## 🧩 Main Components
| Component | Description |
|------------|-------------|
| `DashboardSummary.jsx` | Shows total meals, total expenses, and charts |
| `UserSummary.jsx` | Add/Edit/Delete users and view user details |
| `MealManager.jsx` | Manage meal CRUD operations |
| `ExpenseManager.jsx` | Manage expense CRUD operations |
| `Report.jsx` | Generate date-wise and member-wise reports |

---

## 💻 Tech Stack
| Category | Tools Used |
|-----------|-------------|
| Frontend | React (Vite) |
| Styling | TailwindCSS / Bootstrap |
| Icons | React Icons |
| State Management | Zustand |
| Backend (optional) | Node.js, Express.js, MongoDB |

---

## 🌐 Live Demo
Check the live demo here: [https://meal-ms.vercel.app](https://meal-ms.vercel.app)

**Admin Credentials**  
- Email: `admin@gmail.com`  
- Password: `123`  
- Role: `admin`

**User Credentials**  
- Email: `user@gmail.com`  
- Password: `123`  
- Role: `user`

---

## ⚙️ Installation & Setup

### 🧠 Prerequisites
Make sure you have **Node.js** and **npm** installed.

### 🧩 Steps
```bash
# Clone this repository
git clone https://github.com/rarimon/meal_ms.git

# Go to the frontend folder
cd Meal_Management_System_Frontend

# Install dependencies
npm install

# Start development server
npm run dev
