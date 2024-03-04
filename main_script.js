
// ***********************************************************
// Inspired by https://github.com/triton11/ChessRating
// ***********************************************************

let noRating = true;

function launchObserver() {
  var observer = new MutationObserver(function (mutations) {
    if (window.location.pathname.includes("/game/") || window.location.pathname.includes("/play/")) {
      // only in games not in lists because otherwise it would freeze chrome
      run();
    }
  });
  observer.observe(document, { childList: true, subtree: true });
}

function run() {

  // Hide rating in games
  const gameCollection = document.querySelectorAll('div.user-tagline-component');

  for (let i = 0; i < gameCollection.length; i++) {
    const ratingTag = gameCollection[i].querySelector('span.user-tagline-rating');
    if (ratingTag !== null && ratingTag.style.display !== 'none') {
      ratingTag.style.display = 'none';
    }
  }

  // Hide ratings in already played games
  const gameOverCollection = document.querySelectorAll('div.player-game-over-component');

  for (let i = 0; i < gameOverCollection.length; i++) {
    const ratingTag = gameOverCollection[i].querySelector('span.rating-score-rating');
    if (ratingTag !== null && ratingTag.style.display !== 'none') {
      ratingTag.style.display = 'none';
    }
  }
}


chrome.storage.sync.get('noRating', (result) => {
  if (result.noRating === undefined || result.noRating === false) {
    noRating = false;
    chrome.storage.sync.set({ 'noRating': false });
  } else {
    chrome.storage.sync.set({ 'noRating': true });
    noRating = true;
  }

  if (noRating) {
    launchObserver();
  }
});



