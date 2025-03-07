"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import MovieDisplay from "./components/MovieDisplay"
import "./styles/App.css"

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dkey=import.meta.env.VITE_omdb_key

  
  const handleSearchResult = (movie) => {
    setSelectedMovie(movie)
  }

  
  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        setLoading(true)
        
        const response = await fetch(`https://www.omdbapi.com/?t=Inception&apikey=${dkey}`)

        if (!response.ok) {
          throw new Error("Failed to fetch featured movie")
        }

        const data = await response.json()

        if (data.Response === "False") {
          throw new Error(data.Error)
        }

        setSelectedMovie(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchFeaturedMovie()
  }, [])

  return (
    <div className="app">
      <Navbar onSearchResult={handleSearchResult} />
      <main>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading featured movie...</p>
          </div>
        ) : error ? (
          <div className="error">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        ) : (
          <MovieDisplay movie={selectedMovie} />
        )}
      </main>
      <footer>
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Boxdrecap:blend of letterbox and imdb</p>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

