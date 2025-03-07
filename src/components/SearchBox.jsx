"use client"

import { useState } from "react"
import "../styles/Searchbox.css"

function SearchBox({ onSearchResult }) {
  const imgkey=import.meta.env.VITE_omdb_img_key
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!searchTerm.trim()) return

    try {
      setIsSearching(true)
      const response = await fetch(`https://www.omdbapi.com/?apikey=${imgkey}=${encodeURIComponent(searchTerm)}`)

      if (!response.ok) {
        throw new Error("Failed to fetch movie data")
      }

      const data = await response.json()

      if (data.Response === "False") {
        throw new Error(data.Error)
      }

      onSearchResult(data)
      setSearchTerm("")
    } catch (error) {
      console.error("Error searching movie:", error)
      alert(`Error: ${error.message}`)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="search-box">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" disabled={isSearching}>
          {isSearching ? <span className="search-spinner"></span> : <span className="search-icon">🔍</span>}
        </button>
      </form>
    </div>
  )
}

export default SearchBox

