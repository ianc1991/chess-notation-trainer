# Chess Notation Trainer

## Overview

Chess Notation Trainer is a web-based application designed to help users learn and practice chess notation. The application is built with a Vue 3 frontend and an ASP.NET Core backend, offering a modern and responsive user interface to enhance the learning experience.

## Features

- **Interactive Chess Board**: Utilizes `chess.js` and `chessground` for rendering chess boards and handling chess game logic.
- **PGN Support**: Allows users to load games in Portable Game Notation (PGN) format for practice and analysis.
- **Notation Training**: Users can practice chess notation by making moves on the board and getting immediate feedback.
- **Responsive Design**: Built with Vue 3 and Tailwind CSS for a responsive, mobile-friendly design.

## Getting Started

### Prerequisites

- Node.js
- .NET SDK 7.0

### Installation

1. **Frontend Setup**:

    ```sh
    cd frontend
    npm install
    npm run dev
    ```

2. **Backend Setup**:

    ```sh
    cd backend/NotationTrainerAPI
    dotnet run
    ```

## Usage

- Load a chess game in PGN format to start practicing notation.
- Make moves on the board and compare them with the actual game notation.
- Reset and load different games for varied practice sessions.

## Technologies Used

- **Frontend**: Vue 3, TypeScript, Vite, Tailwind CSS, Chess.js, Chessground
- **Backend**: ASP.NET Core
