var backgroundButtons = document.getElementById("background-buttons");
var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('.save-title-input');
var bearBox = document.getElementById("bear-container");
var outfits =[];
var id = 0;
var currentOutfit = new Outfit();
// store default background in local storage
window.localStorage.setItem('currentBackground', 'blue')
// use event bubbling on background button container
backgroundButtons.addEventListener('click', changeBackground);
saveButton.addEventListener('click', saveOutfit);

function changeBackground() {
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

function saveOutfit(){
  //create new ID
  id +=1;
  currentOutfit.id = id;
  currentOutfit.title = titleInput.innerText;
  //push new object to the array
  outfits.push(currentOutfit);
}
