# 🎓 Scholarship Finder Website

A full-stack web application that helps students discover scholarships tailored to their needs. The platform features real-time search suggestions, filters, and a regularly updated database powered by a web scraper.

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB (via Mongoose)
- **Scraper**: Python + Scrapy

---

## 📂 Project Structure

```
scholarship-website/
├── backend/                 # Express server
│   └── routes, models/
├── frontend/                # React app
│   └── src/
├── scraper/                 # Scrapy project
│   └── spiders/
├── package.json             # Root-level scripts
├── README.md                # This file
└── vercel.json              # Optional Vercel config
```

---

## 🚀 Features

- 🎯 **Filter by GPA, Course, or Award Amount**
- 🔄 **Scraper Integration**: Keeps scholarship list up-to-date
- ⚙️ **REST API** to serve data from MongoDB
- add cron for better on run such that data will be up-to-date

---

## 🧪 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/scholarship-website.git
cd scholarship-website
```

### 2. Install Frontend & Backend Dependencies

```bash
cd frontend
npm install
cd ../backend
npm install
```

### 3. Build Frontend

```bash
cd ../frontend
npm run dev
```

### 4. Run Backend Server

```bash
cd ../backend
npm run dev
```

## 🕸️ Running the Scraper

Make sure Python and Scrapy are installed.

### Install Requirements

```bash
cd scraper
pip install scrapy
```

### Run Scraper

```bash
scrapy crawl scholarships
```

> The data will be stored in MongoDB under the `scholarships` collection.

---

## 🌐 Environment Variables

Create a `.env` file in the backend with the following:

```
MONGO_URI=mongodb://localhost:27017/scholarships
PORT=3000
NODE_ENV=development
```

---

## 📌 To Do

- [ ] Add many spider for it to be functional
- [ ] Add user accounts and favorites
- [ ] Integrate email alerts
- [ ] Add filters for location, degree type

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss changes.

---

## 📄 License

MIT License. See `LICENSE` for details.
