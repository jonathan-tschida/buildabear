var backgroundButtons = document.getElementById("background-buttons");
var itemButtonParent = document.querySelector(".left-column");
var saveButton = document.querySelector('.save-button');
var titleInput = document.getElementById('save-title-input');
var bearBox = document.getElementById("bear-container");

//Store outfit Objects inside of an array(Should make this a local storage item)
var outfits =[];
window.localStorage.setItem('id','0');
var currentOutfit = new Outfit();

window.localStorage.setItem('currentBackground', 'blue')

backgroundButtons.addEventListener('click', changeBackground);
itemButtonParent.addEventListener('click', changeGarment);
saveButton.addEventListener('click', saveOutfit);


function changeBackground() {
  if (event.target.classList.contains('item-button')) {
    var newBackground = event.target.innerText.toLowerCase();
    var currentBackground = window.localStorage.getItem('currentBackground');
    window.localStorage.setItem('currentBackground', newBackground)
    currentOutfit.background = currentBackground;
    bearBox.classList.remove(currentBackground);
    bearBox.classList.add(newBackground);
  }
}

function changeGarment() {
  switch (event.target.parentElement.id) {
    case 'hat-buttons':
      currentOutfit.addGarment(0, event.target.innerText);
      showGarmentOnBear(event.target.id, 'hat-container');
      break;
    case 'clothes-buttons':
      currentOutfit.addGarment(1, event.target.innerText);
      showGarmentOnBear(event.target.id, 'clothing-container');
      break;
    case 'accessory-buttons':
      currentOutfit.addGarment(2, event.target.innerText);
      showGarmentOnBear(event.target.id, 'accessory-container');
      break;
  }
}

function showGarmentOnBear(garmentName, garmentBox) {
  var garmentContainer = document.getElementById(garmentBox);
  garmentContainer.classList.add(garmentName);
}

function saveOutfit() {
  var curId = parseInt(localStorage.getItem('id'));
  currentOutfit.id = curId;
  localStorage.setItem('id', ++curId);
  currentOutfit.title = titleInput.value;
  outfits.push(currentOutfit);
  currentOutfit = new Outfit();
}
