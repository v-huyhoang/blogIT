# 🚀 Blog Platform

> **Blog System** built with **Laravel 12 · PHP 8.2 · Inertia.js · MySQL**

✨ Focused on **clean architecture**, **scalable CRUD**, and **system‑design thinking**

---

## 🧭 Overview

A content platform supporting publishing, interaction, and moderation with a design that scales from **small datasets → high‑traffic systems**.

- SEO‑friendly content
- Role‑based access control
- Event‑driven side effects (notification‑ready)
- Performance‑aware schema & queries

---

## 👥 Roles & Access (RBAC)

| Role | Capabilities |
|---|---|
| 👤 Guest | View published posts |
| 🙋 User | Comment · Like · Follow |
| ✍️ Author | CRUD own posts · Manage drafts |
| 🛠 Admin | Full CRUD · Moderation · Config |

🔐 Implemented via **Laravel Policies & Gates** (ownership + role override).

---

## 🧩 Core Domains

- 📂 **Category** — hierarchical classification
- 🏷 **Tag** — many‑to‑many discovery
- 📝 **Post** — draft → publish lifecycle, SEO‑ready
- 💬 **Comment** — polymorphic, nested, moderated
- ❤️ **Like** — polymorphic, unique per user

All domains follow **clean CRUD boundaries** and production‑safe constraints.

---

## ⚙️ Technical Highlights

- 🧱 **Laravel 12** modular, domain‑oriented structure
- ⚡ **Inertia.js** server‑driven UI (SEO‑friendly)
- 🛢 **MySQL** with timeline & aggregation indexes
- 🔔 **Domain Events** (PostPublished, CommentCreated, Liked)
- 📨 **Notification‑ready** (async / queue‑first)
- 🚀 **Cache‑ready** for read‑heavy workloads

---

## 📈 Scalability Mindset

- Simple monolith → modular monolith
- Async side effects via events
- No premature microservices
- Designed for **real production growth**

---

✨ *Built as a system‑design showcase, not a toy project.*
