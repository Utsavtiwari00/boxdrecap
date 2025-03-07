import "../styles/MovieRating.css"

function MovieRating({ rating }) {

  const numericRating = Number.parseFloat(rating)

  const percentage = (numericRating / 10) * 100

  let ratingColor = "#ff0000" 

  if (numericRating >= 7) {
    ratingColor = "#4CAF50" 
  } else if (numericRating >= 5) {
    ratingColor = "#FFC107" 
  }

  return (
    <div className="movie-rating">
      <div className="rating-circle" style={{ "--rating-color": ratingColor }}>
        <svg viewBox="0 0 36 36" className="rating-circle-svg">
          <path
            className="rating-circle-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="rating-circle-fill"
            strokeDasharray={`${percentage}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="rating-text">
            {numericRating}
          </text>
        </svg>
      </div>
      <div className="rating-label">IMDb Rating</div>
    </div>
  )
}

export default MovieRating


