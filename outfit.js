class Outfit{
  constructor(id,title,garment,background){
    this.id = id;
    this.title = 'title';
    this.garment = ['Hat','Clothes','Accessories'];
    this.background = background;
  }
  addGarmet(garmentName){
    this.garment[0]=garmentName;
    this.garment[1]=garmentName;
    this.garment[2]=garmentName;
  }
  removeGarmet(garmetName){

  }
}

module.exports = Outfit;
