var backgroundButtons = document.getElementById("background-buttons");
var saveButton = document.getElementById('save-')
var bearBox = document.getElementById("bear-container");
var outfits =[];
var currentOutfit = new Outfit();
// store default background in local storage
window.localStorage.setItem('currentBackground', 'blue')
// use event bubbling on background button container
backgroundButtons.addEventListener('click', changeBackground);

function changeBackground(currentOutfit) {
  // button text and convert to lower case
  var background = event.target.innerText.toLowerCase();
  // get current background to delete the bear box class
  // and change the currentBackground in local storage
  var currentBackground = window.localStorage.getItem('currentBackground');
  window.localStorage.setItem('currentBackground', background);
  //Update object background
  currentOutfit.background = background;
  bearBox.classList.remove(currentBackground);
  // add new background that was stored in button text
  bearBox.classList.add(background);
}
