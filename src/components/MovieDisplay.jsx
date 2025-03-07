import '../styles/MovieDisplay.css'

import MovieRating from "./MovieRating"

function MovieDisplay({ movie }) {
  if (!movie) {
    return <div className="movie-display-empty">No movie selected</div>
  }

  const { Title, Year, Poster, Plot, Director, Actors, Genre, Runtime, Released, imdbRating, Ratings } = movie

  
  const backdropStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${movie.Poster !== "N/A" ? movie.Poster : ""})`,
  }

  return (
    <div className="movie-display">
      <div className="movie-backdrop" style={backdropStyle}></div>
      <div className="movie-content">
        <div className="movie-poster-container">
          {Poster !== "N/A" ? (
            <img src={movie.Poster || "/placeholder.svg"} alt={`${movie.Title} poster`} className="movie-poster" />
          ) : (
            <div className="movie-poster-placeholder">No Poster Available</div>
          )}
        </div>

        <div className="movie-info">
          <h1 className="movie-title">
            {Title} <span className="movie-year">({movie.Year})</span>
          </h1>

          <div className="movie-meta">
            <span className="movie-released">{movie.Year}</span>
            <span className="movie-runtime">{movie.Runtime}</span>
            <span className="movie-genre">{movie.Genre}</span>
          </div>

          <div className="movie-ratings">
            <MovieRating rating={imdbRating} />

            <div className="other-ratings">
              {Ratings &&
                Ratings.map((rating, index) => (
                  <div key={index} className="rating-source">
                    <span className="rating-source-name">{rating.Source}:</span>
                    <span className="rating-source-value">{rating.Value}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="movie-plot">
            <h3>Overview</h3>
            <p>{movie.Plot}</p>
          </div>

          <div className="movie-credits">
            <div className="movie-director">
              <h3>Director</h3>
              <p>{movie.Director}</p>
            </div>

            <div className="movie-cast">
              <h3>Cast</h3>
              <p>{movie.Actors}</p>
            </div>
          </div>

          <div className="movie-actions">
            <button className="btn-watch">▶ Watch Trailer</button>
            <button className="btn-add">+ Add to Watchlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDisplay




