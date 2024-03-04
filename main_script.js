
// ***********************************************************
// Inspired by https://github.com/triton11/ChessRating
// ***********************************************************

let noRating = true;
const emptyRating = '∅';

function run() {

  // Hide rating
  const tagline = document.querySelectorAll('div.user-tagline-component');
  for (let i = 0; i < tagline.length; i++) {
    const ratingTag = tagline[i].querySelector('span.user-tagline-rating');
    if (ratingTag !== null && ratingTag.style.display !== 'none') {
      ratingTag.style.display = 'none';
    }
  }

  const gameOverCollection = document.querySelectorAll('div.player-game-over-component');
  for (let i = 0; i < gameOverCollection.length; i++) {
    const ratingTag = gameOverCollection[i].querySelector('span.rating-score-rating');
    if (ratingTag !== null && ratingTag.style.display !== 'none') {
      ratingTag.style.display = 'none';
    }
  }
}

chrome.storage.sync.get(['noRating'], (items) => {

if (items['noRating'] === undefined) {
    chrome.storage.sync.set({ 'noRating': noRating });
  }

  var observer = new MutationObserver(function (mutations) {
    if(window.location.pathname.includes("/game/") || window.location.pathname.includes("/play/")) {
      // only in games not in lists because otherwise it would freeze chrome
      run();
    }
  });

  observer.observe(document, { childList: true, subtree: true });
});

