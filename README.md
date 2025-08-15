# 🤖 RetroBot – Chat

**Repository:** [https://github.com/vayybhav/CodeAlpha_RetroBot](https://github.com/vayybhav/CodeAlpha_RetroBot)

---

## Overview

CodeAlpha_RetroBot is a lightweight browser-based AI chatbot built with **HTML**, **CSS**, and **JavaScript**.  
It supports multiple chat sessions, stores conversation history locally using `localStorage`, and responds to users based on a pre-defined knowledge base. The system is fully offline-capable and requires no external APIs.

---

## Features

- **Multi-Session Support** – Start new chats, save, and switch between sessions.
- **Persistent Chat History** – Conversations are saved locally in the browser.
- **Knowledge-Based Responses** – Pre-programmed answers for hundreds of questions.
- **Typing Indicator** – Simulates bot typing for a realistic chat experience.
- **Search & Filter Sessions** – Easily locate previous conversations.
- **Responsive Design** – Optimized for both desktop and mobile.
- **Keyboard Shortcuts** – Press **Enter** to send a message, **Shift+Enter** for a new line.

---


## Architecture & Workflow

**Workflow:**

1. User opens `index.html` in a browser.
2. User can type a message and hit **Enter** or click **Send**.
3. RetroBot searches its `knowledgeBase` for a matching response.
4. Bot message is displayed with a simulated typing animation.
5. All messages are stored in `localStorage` under their respective session.
6. User can start new sessions, and all sessions are listed in the sidebar for easy access.

---

## Setup & Usage

1. Clone the repository:

```bash
git clone https://github.com/vayybhav/CodeAlpha_RetroBot.git
cd CodeAlpha_RetroBot
```

2. Open index.html in your browser.

3. Start chatting with RetroBot!

---

## File Structure

```
CodeAlpha_RetroBot/
│
├─ index.html          # Main chat interface
├─ styles.css          # Chat UI styling
├─ retrobot.js         # JavaScript logic and knowledge base
└─ README.md           # Project documentation
```

---

## Customization

- Add new questions and answers in **retrobot.js** under `knowledgeBase`  
- Modify **styles.css** to change themes, colors, or layout  

---

## Tech Stack

- HTML5  
- CSS3 (Flexbox, gradients, animations)  
- Vanilla JavaScript (DOM manipulation, localStorage)  

---

## Notes

- No external API required  
- All data is stored locally in the browser  
- Fully offline-capable  

---

© 2025 Vaibhav Sachdeva. All rights reserved. For internship submission only.