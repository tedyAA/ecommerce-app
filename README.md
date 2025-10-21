# 🛍️ React + Vite E-Commerce

> A sleek and modern clothing store built with **React + Vite**, seamlessly integrated with a full **Rails backend** for real data, authentication, and order management.

---
<img width="1918" height="1107" alt="image" src="https://github.com/user-attachments/assets/a2938019-1062-4ac3-acba-b70edf9e5f4c" />

## ✨ Overview

This project is a **complete e-commerce web application** where users can:

- Browse clothing collections 👕  
- Add items to their cart 🛒  
- Create an account & log in 🔐  
- Place orders 📦  
- Fetch and persist data via a **Rails API backend**  

It’s fast ⚡ and responsive 📱
---

## 🚀 Features

| Category | Description |
|-----------|-------------|
| 🛒 **Cart System** | Add, update, and remove items in a persistent cart |
| 👤 **User Auth** | Secure login, signup, and session management |
| 📦 **Order Processing** | Send real orders to the backend |
| 🧥 **Product Catalog** | Browse items by type, category, or collection |
| 🎨 **Modern UI** | Built with Tailwind CSS for a clean, responsive layout |
| ⚡ **Super Fast** | Powered by Vite + React for instant updates |

---

## 🖼️ Preview

<img width="1905" height="1091" alt="image" src="https://github.com/user-attachments/assets/ee8832b6-a931-43a5-b76c-50f961d21097" />
<img width="1913" height="772" alt="image" src="https://github.com/user-attachments/assets/d7af7372-d0e4-4a30-91c3-927e2c1b804c" />
<img width="1897" height="586" alt="image" src="https://github.com/user-attachments/assets/946d4ef4-4485-4ab0-993e-5c832ecacb59" />

---

## 🧩 Tech Stack

| Frontend | Backend | Tools |
|-----------|----------|-------|
| React + Vite | Ruby on Rails | Axios |
| Tailwind CSS | SQLite3 | ESLint + Prettier |
| React Router | JWT Auth | 

---

## 🧠 Architecture

```mermaid
graph LR
A[React + Vite Frontend] -->|REST API Calls| B[Rails Backend]
B --> C[(SQLite3 Database)]
A --> D[Authentication / JWT Tokens]
```
## ⚙️ Setup
1️⃣ Clone Repositories
```bash
# Frontend
git clone https://github.com/tedyAA/ecommerce-app
cd ecommerce-app

# Backend
View how to setup the backend at https://github.com/tedyAA/rails-ecommerce-backend.git
```
2️⃣ Install Dependencies

```bash
npm install
```

3️⃣ Start the App

```bash
npm run dev
```
Frontend runs on http://localhost:5173
