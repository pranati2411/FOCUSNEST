


//============MAIN GENERATOR===============

import {af, tl, ff, pred} from './pipom.js';

const disp = document.getElementById("disp");
const buttons = document.querySelectorAll(".q");

function updateDisplayWithFade(newText) {
  disp.style.opacity = 0;

  setTimeout(() => {
    disp.textContent = newText;
    disp.style.opacity = 1;
  }, 300);
}


buttons[0].addEventListener("click", () => {
  const random = af[Math.floor(Math.random() * af.length)];
  updateDisplayWithFade(random);
});

buttons[1].addEventListener("click", () => {
  const random = tl[Math.floor(Math.random() * tl.length)];
  updateDisplayWithFade(random);
});

buttons[2].addEventListener("click", () => {
  const random = ff[Math.floor(Math.random() * ff.length)];
  updateDisplayWithFade(random);
});

buttons[3].addEventListener("click", () => {
  const random = pred[Math.floor(Math.random() * pred.length)];
  updateDisplayWithFade(random);
});



//===============WEATHER HANDLER===========================================


const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");

const locationEl = document.getElementById("location");
const tempEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");



function fetchWeather(city) {
  const url = `/api/weather?city=${encodeURIComponent(city)}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(data => {
      locationEl.textContent = `${data.name}, ${data.sys.country}`;
      tempEl.textContent = `${data.main.temp}°C`;
      conditionEl.textContent = data.weather[0].description;
    })
    .catch(() => {
      locationEl.textContent = "Couldn't find that city";
      tempEl.textContent = "";
      conditionEl.textContent = "";
    });

}


getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return;

  localStorage.setItem("savedCity", city);
  fetchWeather(city);
});

window.addEventListener("DOMContentLoaded", () => {
  const savedCity = localStorage.getItem("savedCity");
  if (savedCity) {
    cityInput.value = savedCity;
    fetchWeather(savedCity);
  }
});


//=========================DAY DATE==============================================

function updateDateBanner() {
  const dateBanner = document.getElementById("daydate");

  const now = new Date();

  const options = {
    weekday: "long",
    day: "numeric", 
    month: "long",   
    year: "numeric"    
  };

  const formattedDate = now.toLocaleDateString("en-IN", options);

  dateBanner.textContent = formattedDate;
}

window.addEventListener("DOMContentLoaded", () => {
  updateDateBanner();
});



//==============================WEEKLY WINS=================================================

const winInput = document.getElementById("winInput");
const addWinBtn = document.getElementById("addWinBtn");
const clearWinsBtn = document.getElementById("clearWinsBtn");
const winsList = document.getElementById("winsList");


const STORAGE_KEY = "weeklyWins";


function loadWins() {
  const wins = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  winsList.innerHTML = "";
  wins.forEach(win => {
    const p = document.createElement("p");
    p.textContent = win;
    winsList.appendChild(p);
  });
}

function addWin() {
  const winText = winInput.value.trim();
  if (!winText) return;

  const wins = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  wins.push(winText);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wins));
  winInput.value = "";
  loadWins();
}

function clearWins() {
  localStorage.removeItem(STORAGE_KEY);
  loadWins();
}

addWinBtn.addEventListener("click", addWin);
clearWinsBtn.addEventListener("click", clearWins);

window.addEventListener("DOMContentLoaded", loadWins);





//======================MOOD LOGGER========================================

const moodSuggestions = {
  good: "Anchor this feeling. Notice what’s working today — energy, rest, mindset? Reuse this formula when needed.",  
  low: "Low days aren’t failures. They’re data. What’s dragging you down? You don’t need to fix it now — just name it.",
  frustrated: "Frustration = effort + stuckness. Step back. Breathe. Then ask: what’s one thing I can control right now?",
  drained: "You’re not lazy. You’re probably overloaded or under-recovered. Real rest isn’t earned — it’s necessary.",
  pumped: "This spark doesn’t last forever — direct it. Choose one task that matters and pour your focus into it.",
  uneasy: "Anxiety is just the brain guessing the future badly. You don’t have to answer every ‘what if’. Try ‘what now?’"
};

const moodButtons = document.querySelectorAll('.mood-btn');
const suggestionBox = document.getElementById('moodSuggestion');

moodButtons.forEach(button => {
  button.addEventListener('click', () => {
    const mood = button.dataset.mood;
    suggestionBox.textContent = moodSuggestions[mood] || "Mood not found";
    localStorage.setItem('currentMood', mood);
  });
});

// On page load: show last mood suggestion
window.addEventListener('DOMContentLoaded', () => {
  const savedMood = localStorage.getItem('currentMood');
  if (savedMood && moodSuggestions[savedMood]) {
    suggestionBox.textContent = moodSuggestions[savedMood];
  }
});







//==================HYDRATION===================================

document.addEventListener("DOMContentLoaded", () => {
  const hydrationContainer = document.getElementById("waterTracker");
  const resetBtn = document.getElementById("resetHydration");

  const TOTAL_CUPS = 8;
  const STORAGE_KEY = "hydrationCount";

  // Generate cups
  for (let i = 0; i < TOTAL_CUPS; i++) {
    const cup = document.createElement("div");
    cup.classList.add("water-cup");
    cup.dataset.index = i;
    hydrationContainer.appendChild(cup);
  }

  // Load saved count
  function loadHydration() {
    const count = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
    document.querySelectorAll('.water-cup').forEach((cup, idx) => {
      cup.classList.toggle("filled", idx < count);
    });
  }

  // Update count
  hydrationContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("water-cup")) return;

    const clickedIndex = parseInt(e.target.dataset.index);
    let newCount = clickedIndex + 1;

    localStorage.setItem(STORAGE_KEY, newCount);
    loadHydration();
  });

  // Reset
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    loadHydration();
  });

  loadHydration();
});






//============================PUZZLE OF THE DAY===================================================

const puzzleText = document.getElementById("puzzleText");
const answerText = document.getElementById("answerText");
const showAnswerBtn = document.getElementById("showAnswerBtn");

const today = new Date().toISOString().slice(0, 10);
const savedPuzzle = JSON.parse(localStorage.getItem("dailyPuzzle"));

if (savedPuzzle && savedPuzzle.date === today) {
  
  puzzleText.textContent = savedPuzzle.riddle;
  showAnswerBtn.onclick = () => {
    answerText.textContent = savedPuzzle.answer;
    answerText.style.display = "block";
  };
} else {

  fetch("https://riddles-api.vercel.app/random")
    .then(res => res.json())
    .then(data => {
      puzzleText.textContent = data.riddle;
      showAnswerBtn.onclick = () => {
        answerText.textContent = data.answer;
        answerText.style.display = "block";
      };

      localStorage.setItem("dailyPuzzle", JSON.stringify({
        date: today,
        riddle: data.riddle,
        answer: data.answer
      }));
    })
    .catch(() => {
      puzzleText.textContent = "Couldn't load today's puzzle";
    });
}


//===========================BOOK======================================

const bookInput = document.getElementById("bookInput");
const fetchBookBtn = document.getElementById("fetchBookBtn");
const clearBookBtn = document.getElementById("clearBookBtn");

const bookDisplay = document.getElementById("bookDisplay");
const bookCover = document.getElementById("bookCover");
const bookTitle = document.getElementById("bookTitle");

function fetchBookCover(title) {
  const query = encodeURIComponent(title);

  fetch(`https://openlibrary.org/search.json?title=${query}`)
    .then(res => res.json())
    .then(data => {
      if (data.docs && data.docs.length > 0) {
        const book = data.docs[0];
        const coverId = book.cover_i;
        const bookName = book.title;

        if (coverId) {
          bookCover.src = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
          bookCover.alt = bookName;
        } else {
          bookCover.src = "https://via.placeholder.com/150x220?text=No+Cover";
          bookCover.alt = "No cover available";
        }

        bookTitle.textContent = bookName;
        bookDisplay.style.display = "block";

        // Fade in
        requestAnimationFrame(() => {
          bookDisplay.style.opacity = "1";
        });

        localStorage.setItem("currentRead", JSON.stringify({ bookName, coverId }));
      } else {
        bookTitle.textContent = "Book not found.";
        bookCover.src = "";
        bookDisplay.style.opacity = "1";
      }
    })
    .catch(() => {
      bookTitle.textContent = "Something went wrong.";
      bookCover.src = "";
      bookDisplay.style.opacity = "1";
    });
}

fetchBookBtn.addEventListener("click", () => {
  const title = bookInput.value.trim();
  if (!title) return;
  bookDisplay.style.opacity = "0";
  fetchBookCover(title);
});

clearBookBtn.addEventListener("click", () => {
  bookDisplay.style.opacity = "0";
  localStorage.removeItem("currentRead");
  setTimeout(() => {
    bookDisplay.style.display = "none";
    bookCover.src = "";
    bookTitle.textContent = "";
  }, 400);
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("currentRead"));
  if (saved) {
    const { bookName, coverId } = saved;
    bookCover.src = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : "https://via.placeholder.com/150x220?text=No+Cover";
    bookTitle.textContent = bookName;
    bookDisplay.style.display = "block";
    requestAnimationFrame(() => {
      bookDisplay.style.opacity = "1";
    });
  }
});


//========================Current Watch==================================================

const TMDB_API_KEY = "ab6c75414c8de412b865ed876c78d2bb";

const watchInput = document.getElementById("watchInput");
const fetchWatchBtn = document.getElementById("fetchWatchBtn");
const clearWatchBtn = document.getElementById("clearWatchBtn");

const watchDisplay = document.getElementById("watchDisplay");
const watchPoster = document.getElementById("watchPoster");
const watchTitle = document.getElementById("watchTitle");

function fetchWatchPoster(title) {
  const query = encodeURIComponent(title);
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${query}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const posterPath = result.poster_path;
        const titleName = result.title || result.name;

        if (posterPath) {
          watchPoster.src = `https://image.tmdb.org/t/p/w300${posterPath}`;
          watchPoster.alt = titleName;
        } else {
          watchPoster.src = "https://via.placeholder.com/150x220?text=No+Poster";
          watchPoster.alt = "No poster available";
        }

        watchTitle.textContent = titleName;
        watchDisplay.style.display = "block";

        requestAnimationFrame(() => {
          watchDisplay.style.opacity = "1";
        });

        localStorage.setItem("currentWatch", JSON.stringify({ titleName, posterPath }));
      } else {
        watchTitle.textContent = "Not found.";
        watchPoster.src = "";
        watchDisplay.style.opacity = "1";
      }
    })
    .catch(() => {
      watchTitle.textContent = "Something went wrong.";
      watchPoster.src = "";
      watchDisplay.style.opacity = "1";
    });
}

fetchWatchBtn.addEventListener("click", () => {
  const title = watchInput.value.trim();
  if (!title) return;
  watchDisplay.style.opacity = "0";
  fetchWatchPoster(title);
});

clearWatchBtn.addEventListener("click", () => {
  watchDisplay.style.opacity = "0";
  localStorage.removeItem("currentWatch");
  setTimeout(() => {
    watchDisplay.style.display = "none";
    watchPoster.src = "";
    watchTitle.textContent = "";
  }, 400);
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("currentWatch"));
  if (saved) {
    const { titleName, posterPath } = saved;
    watchPoster.src = posterPath
      ? `https://image.tmdb.org/t/p/w300${posterPath}`
      : "https://via.placeholder.com/150x220?text=No+Poster";
    watchTitle.textContent = titleName;
    watchDisplay.style.display = "block";
    requestAnimationFrame(() => {
      watchDisplay.style.opacity = "1";
    });
  }
});



//========================rant itttttttttttttt========================================================

const rantInput = document.getElementById("rantInput");
const saveRantBtn = document.getElementById("saveRantBtn");
const clearRantBtn = document.getElementById("clearRantBtn");

const RANT_KEY = "userRant";

saveRantBtn.addEventListener("click", () => {
  const rantText = rantInput.value.trim();
  localStorage.setItem(RANT_KEY, rantText);
});

clearRantBtn.addEventListener("click", () => {
  rantInput.value = "";
  localStorage.removeItem(RANT_KEY);
});

window.addEventListener("DOMContentLoaded", () => {
  const savedRant = localStorage.getItem(RANT_KEY);
  if (savedRant) {
    rantInput.value = savedRant;
  }
});
