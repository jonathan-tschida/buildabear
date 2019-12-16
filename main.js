var backgroundButtons = document.getElementById("background-buttons");
var itemButtons = document.querySelector(".items");
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
itemButtons.addEventListener('click', changeGarment);
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
function changeGarment() {
  if (event.target.classList.contains('item-button')) {
    var garment = event.target.innerText.toLowerCase();
    garment = garment.replace(/\s/g, "");
    var i = null;
    if (event.target.ParentElement.classList.contains('hat')) {
      i = 0;
    } else if (event.target.ParentElement.classList.contains('clothes')) {
      i = 1;
    } else {
      i = 2;
    }
    // console.log( event.target.parentElement.classList.contains('hat'));
    currentOutfit.addGarment(garment,i);
    //Add class to bearBox display elements.
  }
}
function saveOutfit(){
  //create new ID
  id +=1;
  currentOutfit.id = id;
  currentOutfit.title = titleInput.innerText;
  //push new object to the array
  outfits.push(currentOutfit);
}
function updateDisplay(){
  //this should be called to update the bearBox display.
}
