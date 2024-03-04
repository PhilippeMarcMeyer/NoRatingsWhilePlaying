// Initialize check box
let noRatingCheckBox = document.getElementById("noRating");
chrome.storage.sync.get("noRating", ({ noRating }) => {
  noRating.checked = noRating;
});


// set the storage
noRatingCheckBox.addEventListener("click", async () => {
  chrome.storage.sync.get("noRating", ({ noRating }) => {
  	if (noRating === undefined || noRating === true) {
      chrome.storage.sync.set({ 'noRating': false });
  	} else {
	  chrome.storage.sync.set({ 'noRating': true });
  	}
  });
});

