"use client"

import { useState } from "react"
import DropdownMenu from "./DropdownMenu"
import SearchBox from "./SearchBox"
import "../styles/Navbar.css"

function Navbar({ onSearchResult }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const dkey=import.meta.env.VITE_omdb_key

 
  const topMovies = [
    { id: 1, title: "The Shawshank Redemption", year: 1994 },
    { id: 2, title: "The Godfather", year: 1972 },
    { id: 3, title: "The Dark Knight", year: 2008 },
    { id: 4, title: "The Godfather Part II", year: 1974 },
    { id: 5, title: "12 Angry Men", year: 1957 },
    { id: 6, title: "Schindler's List", year: 1993 },
    { id: 7, title: "The Lord of the Rings: The Return of the King", year: 2003 },
    { id: 8, title: "Pulp Fiction", year: 1994 },
    { id: 9, title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
    { id: 10, title: "The Good, the Bad and the Ugly", year: 1966 },
  ]

  const topSeries = [
    { id: 1, title: "Breaking Bad", year: "2008-2013" },
    { id: 2, title: "Planet Earth II", year: "2016" },
    { id: 3, title: "Game of Thrones", year: "2011-2019" },
    { id: 4, title: "Planet Earth", year: "2006" },
    { id: 5, title: "Band of Brothers", year: "2001" },
    { id: 6, title: "Chernobyl", year: "2019" },
    { id: 7, title: "The Wire", year: "2002-2008" },
    { id: 8, title: "Blue Planet II", year: "2017" },
    { id: 9, title: "Avatar: The Last Airbender", year: "2005-2008" },
    { id: 10, title: "Cosmos: A Spacetime Odyssey", year: "2014" },
  ]

  const genres = [
    { id: 1, title: "Action" },
    { id: 2, title: "Adventure" },
    { id: 3, title: "Animation" },
    { id: 4, title: "Biography" },
    { id: 5, title: "Comedy" },
    { id: 6, title: "Crime" },
    { id: 7, title: "Documentary" },
    { id: 8, title: "Drama" },
    { id: 9, title: "Fantasy" },
    { id: 10, title: "Horror" },
  ]

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleItemClick = async (item) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(item.title)}&apikey=${dkey}`)

      if (!response.ok) {
        throw new Error("Failed to fetch movie data")
      }

      const data = await response.json()

      if (data.Response === "False") {
        throw new Error(data.Error)
      }

      onSearchResult(data)
    } catch (error) {
      console.error("Error fetching movie:", error)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/" className="logo">
          <img src='lb.png' alt="logo" className="logo-img"></img>
            Boxdrecaps
          </a>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="menu-icon"></span>
          </button>
        </div>

        <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <div className="navbar-start">
            <DropdownMenu title="Top 10 Movies" items={topMovies} onItemClick={handleItemClick} />
            <DropdownMenu title="Top 10 Series" items={topSeries} onItemClick={handleItemClick} />
            <DropdownMenu title="Genres" items={genres} onItemClick={() => {}} />
            <a href="#" className="navbar-item">
              New Releases
            </a>
            <a href="#" className="navbar-item">
              Coming Soon
            </a>
          </div>

          <div className="navbar-end">
            <SearchBox onSearchResult={onSearchResult} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

