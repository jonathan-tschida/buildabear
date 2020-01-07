var backgroundButtons = document.getElementById("background-buttons");
var itemButtonParent = document.querySelector(".left-column");
var saveButton = document.querySelector('.save-button');
var titleInput = document.getElementById('save-title-input');
var bearBox = document.getElementById("bear-container");
var savedOutfits = document.querySelector('.saved-cards-container');

//Store outfit Objects inside of an array(Should make this a local storage item)
var outfits = loadOutfitsFromLocalStorage();
var currentOutfit = new Outfit();

localStorage.setItem('currentBackground', 'blue');

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
    localStorage.setItem('currentBackground', newBackground);
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

function selectButton(event) {
  if (event.target.classList.contains('item-button')) {
    var prevSelectedButton = event.target.parentElement.querySelector('.selected-button');
    if (prevSelectedButton != event.target && prevSelectedButton != null) {
      prevSelectedButton.classList.toggle('selected-button');
    }
    event.target.classList.toggle('selected-button');
  }
}

function setActiveButton(head, body, accessory, background) {
  var buttons = document.querySelectorAll('.item-button');
  for (var i = 0; i < buttons.length; i++) {
    if ([head, body, accessory, background].indexOf(buttons[i].innerText) >= 0) {
      buttons[i].classList.toggle('selected-button');
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
  if(!currentOutfit.id) currentOutfit.id = 'd' + new Date().valueOf();
  var existed = replacePrexistingOutfit(currentOutfit);
  currentOutfit.title = titleInput.value;
  if (existed == false) {
    outfits.push(currentOutfit);
    createSavedOutfitCard(currentOutfit)
  } else if(existed == true){
    var parent = document.getElementById(currentOutfit.id);
    parent.children[0].children[0].innerText = currentOutfit.title;
  }
  clearBearDisplay();
  titleInput.value = '';
  enableSaveButton();
  addOutfitsToLocalStorage();
  currentOutfit = new Outfit();
}

function replacePrexistingOutfit(outfit) {
  for (var i = 0; i < outfits.length; i++) {
    if(outfits[i].id === outfit.id) {
      outfits[i] = outfit;
      return true;
    }
  }
  return false;
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
  var cardElementHTML = `<figure id="${outfit.id}" class = "saved_outfit ${outfit.background}">
            <div class = "overlay">
            <h3 class = 'saved-outfit-title'>${outfit.title}</h3>
            </div>
            <button class="close-outfit-button">
            x
            </button>
          </figure>`;
  var parent = document.querySelector('.saved-cards-container');
  parent.insertAdjacentHTML('afterbegin',cardElementHTML);
}

function clearBearDisplay() {
  var garmentButtons = document.querySelectorAll('.item-button');
  for(var i = 0; i < garmentButtons.length; i++) {
    garmentButtons[i].classList.remove('selected-button');
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
  } else {
    var outfitId = event.target.closest('.saved_outfit').id;
    loadSavedOutfit(outfitId);
  }
}

function loadSavedOutfit(id) {
  clearBearDisplay();
  for (var i = 0; i < outfits.length; i++) {
    if (outfits[i].id == id) {
      Object.assign(currentOutfit, outfits[i]);
      var head = outfits[i].garments[0];
      var body = outfits[i].garments[1];
      var accessory = outfits[i].garments[2];
      (head != null) ? showGarmentOnBear(head.replace(/\s+/g, '-').toLowerCase(), 'hat-container'): '';
      (body != null) ? showGarmentOnBear(body.replace(/\s+/g, '-').toLowerCase(), 'clothing-container'): '';
      (accessory != null) ? showGarmentOnBear(accessory.replace(/\s+/g, '-').toLowerCase(), 'accessory-container'): '';
      bearBox.classList.add(outfits[i].background);
      titleInput.value = outfits[i].title;
      enableSaveButton();
      setActiveButton(head, body, accessory, outfits[i].background);
    }
  }
}
