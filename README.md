# ♟️ Chess Evaluation App

An interactive full-stack chess analysis tool powered by **Stockfish**, **FastAPI**, and **Next.js**. Upload your PGN, and visualize the game with a real-time evaluation bar and board navigation — like a lightweight version of Chess.com’s Game Review.

---

## 🚀 Features

- 🔍 PGN parsing and move-by-move Stockfish evaluation  
- ♟️ Interactive chessboard using FEN positions  
- 📊 Real-time evaluation bar synced with current move  
- ⏩ Intuitive move navigation (forward/backward/skip)  
- 🧠 Displays player names, ELOs, and game result from PGN  
- ⚡ Clean and responsive UI with TailwindCSS  



## 😍 New
#### ✅ Stockfish analysis

#### ✅ Move classification (chess.com like):

   - Best move
   - Excellent move
   - Good move
   - Inaccuracy
   - Mistake
   - Blunder
###### Miss, Brilliant and Great moves soon to be added. Stay tuned! 🤩
---
## 📦 Setup

### ✅ 1. Download Stockfish

Download from the official site:  
👉 [https://stockfishchess.org/download/](https://stockfishchess.org/download/)

Place the binary in:

```bash
./stockfish/stockfish.exe       # For Windows  
./stockfish/stockfish           # For Linux/Mac
```
Make it executable on Linux/Mac:

chmod +x ./stockfish/stockfish

### ✅ 2. Backend (FastAPI)

cd backend
python -m venv venv
source venv/bin/activate         # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

Runs at: http://localhost:8000
### ✅ 3. Frontend (Next.js)

cd frontend
npm install
npm run dev

Runs at: http://localhost:3000
🧾 Project Structure
```plaintext
root/
├── backend/           # FastAPI backend (game parsing, evaluation)
│    ├── stockfish/    # Stockfish binary here
│    └── ...
├── frontend/          # Next.js frontend (UI, navigation, API calls)
└── README.md
```
### 🔮 Roadmap
💡 Classification of Miss, Great and Brilliant moves

💡 PGN file uploads

💡 Highlight best move vs played move

💡 Opening tree

---

### 🤝 Contributing

Pull requests are welcome! Feel free to fork and build upon it.
### 📄 License

MIT License. Use it, modify it, improve it — just give credit.
### 🙌 Credits

    Stockfish Engine

    UI: Next.js + TailwindCSS

    Backend: FastAPI + python-chess

    Built with ❤️ by Marcin Wiśniewski — because we love chess and code.


### Let me know if you'd like me to add badges or a demo screenshot section.