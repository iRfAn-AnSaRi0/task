📌 Investment & Referral Management System
📖 Project Overview

This project is a full-stack Investment & Referral Management System built using Node.js, Express, MongoDB, and React.
It allows users to invest in plans, earn daily ROI, and receive level-based referral income.
A scheduled cron job ensures ROI is calculated automatically every day, and a React dashboard visualizes all earnings.

🛠 Tech Stack
Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

node-cron

bcrypt

Frontend

React (Vite)

Axios

Basic CSS

📂 Project Structure
Backend
backend/
├─ src/
│  ├─ controller/
│  ├─ model/
│  ├─ routes/
│  ├─ utils/
│  │   └─ cronJobs.js
│  ├─ db/
│  ├─ app.js
│  └─ index.js

Frontend
frontend/
├─ src/
│  ├─ api/
│  ├─ components/
│  ├─ pages/
│  ├─ App.jsx
│  └─ main.jsx

🗄 Database Models
User

username

email

password (hashed)

referrer (self-reference)

balance

roiIncome

levelIncome

Investment

user

amount

plan

dailyROI

startDate

endDate

status (ACTIVE / COMPLETED)

ROI History

user

investment

date

amount

Ensures ROI is recorded once per day per investment

Level Income

fromUser

toUser

level

amount

date

🔐 API Endpoints
Authentication

POST /api/register → Register user

POST /api/login → Login user

Investment

POST /api/investment/create → Create new investment

Dashboard

GET /api/dashboard → Fetch total investment, ROI, level income

Referral

GET /api/referral-tree → Fetch nested referral tree

⚙️ Business Logic

Users can create multiple investments

Daily ROI is calculated for active investments

Referral income is distributed across multiple levels

User balances are updated automatically

Investment status changes to COMPLETED after end date

⏰ Cron Job (Daily ROI Calculation)

Runs daily at midnight

Calculates ROI for all active investments

Prevents duplicate calculation using date-based check

Updates user balances and ROI history

Implemented using node-cron

📊 React Dashboard Features

Displays:

Total Investment

Daily ROI

Level Income

Shows Referral Tree in nested format

Handles loading states

Fetches real-time data from backend APIs

🚀 Setup Instructions
Backend
npm install
npm run dev

Frontend
npm install
npm run dev

✅ Key Highlights

Scalable schema design

Secure authentication

Idempotent ROI calculation

Clean referral hierarchy

Separation of concerns (models, controllers, utils)

Production-ready structure

📌 Conclusion

This project demonstrates a real-world implementation of investment tracking, referral income distribution, and automated financial calculations, following industry best practices.
