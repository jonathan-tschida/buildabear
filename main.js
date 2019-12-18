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
itemButtonParent.addEventListener('click', selectButton);


function changeBackground() {
  if (event.target.classList.contains('item-button')) {
    var newBackground = event.target.innerText.toLowerCase();
    var currentBackground = window.localStorage.getItem('currentBackground');
    window.localStorage.setItem('currentBackground', newBackground)
    currentOutfit.background = newBackground;
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

function selectButton() {
  if(event.target.classList.contains('item-button')) {
    var garmentButtons = event.target.parentElement.querySelectorAll('.item-button')
    for(var i = 0; i < garmentButtons.length; i++) {
      garmentButtons[i].classList.remove('selected-button')
    }
    event.target.classList.add('selected-button');
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
  if(titleInput.value != ''){
    createSavedOutfitCard();
  }
  currentOutfit = new Outfit();
}

function createSavedOutfitCard() {
  var domString = `<figure class = "saved_outfit active">
            <h3>${currentOutfit.title}</h3>
            <button class="close-outfit-button">
              <div class="cross"></div>
              <div class="cross vertical"></div>
            </button>
          </figure>`;
  var el = document.createElement('div');
  el.innerHTML = domString;
  var parent = document.querySelector('.saved-cards-container');
  parent.prepend(el.firstChild);
}
