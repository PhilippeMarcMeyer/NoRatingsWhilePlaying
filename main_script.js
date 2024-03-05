// Inspired by https://github.com/triton11/ChessTier

'use strict';

let noRating = true;
let isRunning = false;

const launchObserver = () => {
  const observer = new MutationObserver((mutations) => {
    if (window.location.pathname.includes('/game/') || window.location.pathname.includes('/play/')) {
      // only in games not in lists because otherwise it would freeze chrome
      if (!isRunning) run();
    }
  });
  observer.observe(document, { childList: true, subtree: true });
};

const run = () => {
  isRunning = true;
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
  // Hide chat ratings (from ChessTier)
  const chatStartRatings = document.querySelectorAll('div.live-game-start-component');
  for (let i = 0; i < chatStartRatings.length; i++) {
    if (chatStartRatings[i].style.display !== 'none') chatStartRatings[i].style.display = 'none';
  }
  const chatEndRatings = document.querySelectorAll('div.live-game-over-component');
  for (let i = 0; i < chatEndRatings.length; i++) {
    if (chatEndRatings[i].style.display !== 'none') chatEndRatings[i].style.display = 'none';
  }

  const botRating = document.querySelector('div.selected-bot-component span.selected-bot-rating');
  if (botRating !== null && botRating.style.display !== 'none') botRating.style.display = 'none';

  isRunning = false;
};

chrome.storage.sync.get('noRating', (result) => {
  if (result.noRating === undefined || result.noRating === false) {
    noRating = false;
    chrome.storage.sync.set({ noRating: false });
  } else {
    chrome.storage.sync.set({ noRating: true });
    noRating = true;
  }

  if (noRating) {
    launchObserver();
  }
});