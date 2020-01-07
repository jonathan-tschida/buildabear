var backgroundButtons = document.getElementById('background-buttons');
var itemButtonParent = document.querySelector('.left-column');
var saveButton = document.querySelector('.save-button');
var titleInput = document.getElementById('save-title-input');
var bearBox = document.getElementById('bear-container');
var savedOutfits = document.querySelector('.saved-cards-container');

//Store outfit Objects inside of an array(Should make this a local storage item)
var outfits = loadOutfitsFromLocalStorage();
var currentOutfit = new Outfit();

saveButton.disabled = true;

backgroundButtons.addEventListener('click', changeBackground);
itemButtonParent.addEventListener('click', changeGarment);
saveButton.addEventListener('click', saveOutfit);
titleInput.addEventListener('keyup', enableSaveButton);
savedOutfits.addEventListener('click', removeCard);

function changeBackground() {
  if (event.target.classList.contains('item-button')) {
    var newBackground = event.target.innerText.toLowerCase();
    var currentBackground = currentOutfit.background;
    currentOutfit.background = newBackground;
    bearBox.classList.remove(currentBackground);
    bearBox.classList.add(newBackground);
  }
}

function changeGarment(event) {
  selectButton(event);
  switch (event.target.parentElement.id) {
    case 'hat-buttons':
      currentOutfit.toggleGarment(0, event.target.innerText);
      showGarmentOnBear(event.target.id, 'hat-container');
      break;
    case 'clothes-buttons':
      currentOutfit.toggleGarment(1, event.target.innerText);
      showGarmentOnBear(event.target.id, 'clothing-container');
      break;
    case 'accessory-buttons':
      currentOutfit.toggleGarment(2, event.target.innerText);
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

function setActiveLoadedButtons(head, body, accessory, background) {
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
    var className = garmentContainer.className.split(' ')[0];
    garmentContainer.className = className;
    garmentContainer.classList.add(garmentName);
  }
}

function enableSaveButton() {
  if (!titleInput.value) {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

function saveOutfit() {
  if(!currentOutfit.id) currentOutfit.id = 'd' + new Date().valueOf();
  var existed = replacePrexistingOutfit(currentOutfit);
  currentOutfit.title = titleInput.value;
  if (!existed) {
    outfits.push(currentOutfit);
    createSavedOutfitCard(currentOutfit)
  } else if(existed){
    var parent = document.getElementById(currentOutfit.id);
    parent.className = `saved_outfit ${currentOutfit.background}`;
    parent.querySelector('.saved-outfit-title').innerText = currentOutfit.title;
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
  var parsedOutfits;
  if (savedOutfits) {
    parsedOutfits = JSON.parse(savedOutfits);
    for(var i = 0; i < parsedOutfits.length; i++) {
      createSavedOutfitCard(parsedOutfits[i]);
    }
  }
  return parsedOutfits || [];
}

function createSavedOutfitCard(outfit) {
  var cardElementHTML = `<figure id='${outfit.id}' class = 'saved_outfit ${outfit.background}'>
            <div class = 'overlay'>
            <h3 class = 'saved-outfit-title'>${outfit.title}</h3>
            </div>
            <button class='close-outfit-button'>
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
  document.getElementById('hat-container').classList = 'hat-box';
  document.getElementById('clothing-container').classList = 'clothing-box';
  document.getElementById('accessory-container').classList = 'accessory-box';
  document.getElementById('bear-container').classList = 'bear-box blue background';
}

function removeCard(event) {
  if (event.target.classList.contains('close-outfit-button')) {
    event.target.parentNode.remove();
    var outfitId = event.target.parentNode.id;
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
    if (outfits[i].id === id) {
      Object.assign(currentOutfit, outfits[i]);
      var head = outfits[i].garments[0];
      var body = outfits[i].garments[1];
      var accessory = outfits[i].garments[2];
      var background = outfits[i].background;
      background = background.charAt(0).toUpperCase() + background.slice(1);
      (head != null) ? showGarmentOnBear(head.replace(/\s+/g, '-').toLowerCase(), 'hat-container'): '';
      (body != null) ? showGarmentOnBear(body.replace(/\s+/g, '-').toLowerCase(), 'clothing-container'): '';
      (accessory != null) ? showGarmentOnBear(accessory.replace(/\s+/g, '-').toLowerCase(), 'accessory-container'): '';
      bearBox.classList.add(outfits[i].background);
      titleInput.value = outfits[i].title;
      enableSaveButton();
      changeBackground();
      setActiveLoadedButtons(head, body, accessory, background);
    }
  }
}
