class Outfit{
  constructor() {
    this.id = null
    this.title = ''
    this.garments = [null, null, null];
    this.background = 'blue';
  }

  addGarment(i, garmentName){
    if (this.garments[i] == garmentName) {
      this.removeGarment(i);
    } else {
      this.garments[i] = garmentName;
    }
  }

  removeGarment(i){
    this.garments[i] = null;
  }
}

// module.exports = Outfit;
