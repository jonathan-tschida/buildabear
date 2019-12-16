var backgroundButtons = document.getElementById("background-buttons");
var itemButtonParent = document.querySelector(".left-column");
var itemButtons = document.querySelectorAll(".item-button");
var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('.save-title-input');
var bearBox = document.getElementById("bear-container");
var outfits =[];
var id = 0;
var currentOutfit = new Outfit();
var garmentNodeList = generateNestedNodeList();
// store default background in local storage
window.localStorage.setItem('currentBackground', 'blue')
// use event bubbling on background button container
backgroundButtons.addEventListener('click', changeBackground);
itemButtonParent.addEventListener('click', changeGarment);
saveButton.addEventListener('click', saveOutfit);

function generateNestedNodeList(){
  var tempNodeList = Array.prototype.slice.call(document.querySelectorAll('.item-button'));
  return[tempNodeList.slice(0,4),tempNodeList.slice(4,7),tempNodeList.slice(7,12)]
}

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
  var garmentName = event.target.innerText;
  for (var i = 0; i < garmentNodeList.length; i++) {
    for (var j = 0; j < garmentNodeList[i].length; j++) {
      if (garmentNodeList[i][j] === garmentName) {
        garmentName = garmentName.toLowerCase().replace(/ /g,'');
        currentOutfit.addGarment(i, garmentName);
      }
    }
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
