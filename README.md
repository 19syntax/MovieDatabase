# 🎬 Movie Database

A modern, responsive movie discovery application built with React, TypeScript, and the TMDB API. Search thousands of movies, filter by genre, sort by various criteria, and save your favorites.

![Movie Database Screenshot]()

## ✨ Features

- 🔍 **Smart Search** - Debounced search with instant results
- 🎭 **Genre Filtering** - Filter movies by genre (Action, Comedy, Drama, etc.)
- 📊 **Advanced Sorting** - Sort by popularity, rating, release date, or title
- ❤️ **Favorites System** - Save favorites with localStorage persistence
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Fast Performance** - Optimized with React.memo and useMemo
- 🎨 **Modern UI** - Clean, intuitive interface with loading skeletons

## 🚀 Live Demo

**[View Live Demo](https://your-movie-database.vercel.app)**

## 📸 Screenshots

### Homepage
![Homepage](<img width="300" height="300" alt="homepage" src="https://github.com/user-attachments/assets/e9ce0c4e-d467-4051-b63c-212621800a39" />)

### Movie Details
![Movie Details](<img width="300" height="300" alt="movie-details" src="https://github.com/user-attachments/assets/a9a8c780-be6d-467e-a6a6-fda298977244" />)

### Favorites Page
![Favorites](<img width="300" height="300" alt="favoritePage" src="https://github.com/user-attachments/assets/796fca2a-de18-4de9-8316-f7d21e755e92" />)

### Filters & Sorting
![Filters]<img width="300" height="300" alt="filterAndSorting" src="https://github.com/user-attachments/assets/6607eeba-8d23-46bb-8b79-0e135e92a44b" />

## 🛠️ Built With

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router v6** - Navigation
- **TMDB API** - Movie data
- **Context API** - State management
- **localStorage** - Data persistence


## 📁 Project Structure
movie-database/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── MovieCard.tsx
│   │   ├── MovieGrid.tsx
│   │   ├── SearchBar.tsx
│   │   ├── GenresFilter.tsx
│   │   └── SortDropdown.tsx
│   ├── pages/           # Page components
│   │   ├── HomePage.tsx
│   │   ├── MovieDetails.tsx
│   │   └── FavouritePage.tsx
│   ├── context/         # React Context providers
│   │   └── Favourite.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useDebounce.ts
│   ├── services/        # API services
│   │   └── tmdb.ts
│   ├── types/           # TypeScript type definitions
│   │   └── Movie.ts
│   ├── utils/           # Utility functions
│   │   └── formatters.ts
│   ├── App.tsx          # Root component with routing
│   └── main.tsx         # Entry point
├── .env.example         # Environment variables template
├── package.json
└── README.md
