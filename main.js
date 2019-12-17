var backgroundButtons = document.getElementById("background-buttons");
var itemButtonParent = document.querySelector(".left-column");
var itemButtons = document.querySelectorAll(".item-button");
var saveButton = document.querySelector('.save-button');
var titleInput = document.getElementById('save-title-input');
var bearBox = document.getElementById("bear-container");

//Store outfit Objects inside of an array(Should make this a local storage item)
var outfits =[];
window.localStorage.setItem('id','0');
var currentOutfit = new Outfit();
var garmentNodeList = generateNestedNodeList();

window.localStorage.setItem('currentBackground', 'blue')

backgroundButtons.addEventListener('click', changeBackground);
itemButtonParent.addEventListener('click', changeGarment);
saveButton.addEventListener('click', saveOutfit);

function generateNestedNodeList(){
  var tempNodeList = Array.prototype.slice.call(document.querySelectorAll('.item-button'));
  return[tempNodeList.slice(0,4),tempNodeList.slice(4,7),tempNodeList.slice(7,12)]
}

function changeBackground() {
  if (event.target.classList.contains('item-button')) {
    var background = event.target.innerText.toLowerCase();
    var currentBackground = window.localStorage.getItem('currentBackground');
    window.localStorage.setItem('currentBackground', background)
    bearBox.classList.remove(currentBackground);
    bearBox.classList.add(background);
  }
}
function changeGarment() {
  var garmentName = event.target.innerText;
  for (var i = 0; i < garmentNodeList.length; i++) {
    for (var j = 0; j < garmentNodeList[i].length; j++) {
      if (garmentNodeList[i][j].innerText === garmentName) {
        garmentName = garmentName.toLowerCase().replace(/ /g,'');
        currentOutfit.addGarment(i, garmentName);
      }
    }
  }
}

function saveOutfit(){
  var curId = parseInt(localStorage.getItem("id"));
  currentOutfit.id = curId;
  localStorage.setItem("id",++curId);
  currentOutfit.title = titleInput.value;
  //push new object to the array
  outfits.push(currentOutfit);
}
