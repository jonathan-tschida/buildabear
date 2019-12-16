class Outfit{
  constructor(id=1,title='Test',garment=[],background='blue'){
    this.id = id;
    this.title = title;
    this.garment = garment;
    this.background = background;
  }
  addGarmet(garmentName){
    this.garment[0]=garmentName;
  }
  removeGarmet(garmetName){

  }
}

module.exports = Outfit;
