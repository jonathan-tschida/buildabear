var backgroundButtons = document.getElementById("background-buttons");
var bearBox = document.getElementById("bear-container");

window.localStorage.setItem('currentBackground', 'blue')
backgroundButtons.addEventListener('click', changeBackground);

function changeBackground() {
  if (event.target.classList.contains('item-button')) {
    var background = event.target.innerText.toLowerCase();
    var currentBackground = window.localStorage.getItem('currentBackground');
    window.localStorage.setItem('currentBackground', background)
    bearBox.classList.remove(currentBackground);
    bearBox.classList.add(background);
  }
}
