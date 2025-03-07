"use client"

import { useState } from "react"
import "../styles/DropdownMenu.css"

function DropdownMenu({ title, items, onItemClick }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (item) => {
    onItemClick(item)
    setIsOpen(false)
  }

  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        onClick={toggleDropdown}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {title} <span className="dropdown-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
          {items.map((item) => (
            <div key={item.id} className="dropdown-item" onClick={() => handleItemClick(item)}>
              {item.title}
              {item.year && <span className="year">({item.year})</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownMenu

