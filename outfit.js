class Outfit{
  constructor() {
    this.id = null
    this.title = ''
    this.garments = [null, null, null];
    this.background = 'blue';
  }

  toggleGarment(i, garmentName){
    if (this.garments[i] == garmentName) {
      this.garments[i] = null;
    } else {
      this.garments[i] = garmentName;
    }
  }
}

// module.exports = Outfit;
