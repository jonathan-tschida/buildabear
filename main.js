var backgroundButtons = document.getElementById("background-buttons");
var itemButtonParent = document.querySelector(".left-column");
var saveButton = document.querySelector('.save-button');
var titleInput = document.getElementById('save-title-input');
var bearBox = document.getElementById("bear-container");
var savedOutfits = document.querySelector('.saved-cards-container');

//Store outfit Objects inside of an array(Should make this a local storage item)
var outfits = loadOutfitsFromLocalStorage();;
var currentOutfit = new Outfit();

localStorage.setItem('currentBackground', 'blue')

saveButton.disabled = true;

backgroundButtons.addEventListener('click', changeBackground);
itemButtonParent.addEventListener('click', changeGarment);
saveButton.addEventListener('click', saveOutfit);
itemButtonParent.addEventListener('click', selectButton);
titleInput.addEventListener('keyup', enableSaveButton);
savedOutfits.addEventListener('click', removeCard);

function changeBackground() {
  if (event.target.classList.contains('item-button')) {
    var newBackground = event.target.innerText.toLowerCase();
    var currentBackground = localStorage.getItem('currentBackground');
    localStorage.setItem('currentBackground', newBackground)
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
  if (event.target.classList.contains('item-button')) {
    if (event.target.classList.contains('selected-button')) {
      event.target.classList.remove('selected-button');
    } else {
      var garmentButtons = event.target.parentElement.querySelectorAll('.item-button')
      for(var i = 0; i < garmentButtons.length; i++) {
        garmentButtons[i].classList.remove('selected-button')
      }
      event.target.classList.add('selected-button');
    }
  }
}

function showGarmentOnBear(garmentName, garmentBox) {
  var garmentContainer = document.getElementById(garmentBox);
  if (garmentContainer.classList.contains(garmentName)) {
    garmentContainer.classList.remove(garmentName);
  } else {
    var className = garmentContainer.className.split(" ")[0];
    garmentContainer.className = className;
    garmentContainer.classList.add(garmentName);
  }
}

function enableSaveButton() {
  if (titleInput.value == '') {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

function saveOutfit() {
  var curId = parseInt(localStorage.getItem('id'));
  currentOutfit.id = new Date().valueOf();
  currentOutfit.title = titleInput.value;
  outfits.push(currentOutfit);
  createSavedOutfitCard(currentOutfit);
  clearBearDisplay();
  titleInput.value = '';
  enableSaveButton();
  addOutfitsToLocalStorage()
  currentOutfit = new Outfit();
}

function addOutfitsToLocalStorage() {
  localStorage.setItem('outfits', JSON.stringify(outfits));
}

function loadOutfitsFromLocalStorage() {
  var savedOutfits = localStorage.getItem('outfits');
  var arrayOfOutfits;
  if (savedOutfits) {
    arrayOfOutfits = JSON.parse(savedOutfits);
    arrayOfOutfits.forEach(outfit => createSavedOutfitCard(outfit));
  }
  return arrayOfOutfits || [];
}

function createSavedOutfitCard(outfit) {
  var domString = `<figure id="${outfit.id}" class = "saved_outfit active">
            <h3>${outfit.title}</h3>
            <button class="close-outfit-button">
            x
            </button>
          </figure>`;
  var el = document.createElement('div');
  el.innerHTML = domString;
  var parent = document.querySelector('.saved-cards-container');
  parent.prepend(el.firstChild);
}

function clearBearDisplay() {
  var garmentButtons = document.querySelectorAll('.item-button')
  for(var i = 0; i < garmentButtons.length; i++) {
    garmentButtons[i].classList.remove('selected-button')
  }
  document.getElementById('hat-container').classList = "hat-box";
  document.getElementById('clothing-container').classList = "clothing-box";
  document.getElementById('accessory-container').classList = "accessory-box";
  document.getElementById('bear-container').classList = "bear-box blue background";
}

function removeCard(event) {
  if (event.target.classList.contains('close-outfit-button')) {
    event.target.parentNode.remove();
    var outfitId = Number.parseInt(event.target.parentNode.id);
    var index = outfits.findIndex(outfit => outfit.id === outfitId);
    outfits.splice(index, 1);
    addOutfitsToLocalStorage();
  }
}
