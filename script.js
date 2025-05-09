const apiKey = "API_KEY"; // Replace with your TMDB API key
const baseUrl = "https://api.themoviedb.org/3";
const imageBase = "https://image.tmdb.org/t/p/original";

fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    const banner = document.getElementById("banner");
    const bannerContent = document.getElementById("banner-content");
    const movie = data.results[0];
    banner.style.backgroundImage = `url(${imageBase + movie.backdrop_path})`;
    bannerContent.innerHTML = `
      <h2>${movie.title}</h2>
      <p>${movie.overview.substring(0, 150)}...</p>
      <button>Play</button>
    `;
  });

function populateRow(endpoint, rowId) {
  fetch(`${baseUrl}${endpoint}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const row = document.getElementById(rowId);
      data.results.forEach(movie => {
        const img = document.createElement("img");
        img.src = imageBase + movie.poster_path;
        img.alt = movie.title;
        row.appendChild(img);
      });
    });
}

populateRow("/trending/movie/week", "trending");
populateRow("/movie/top_rated", "topRated");
populateRow("/discover/movie&with_genres=28", "actionMovies");
