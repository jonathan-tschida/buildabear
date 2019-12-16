class Outfit{
  constructor(id=1,title='Test',garment=[],background='blue'){
    this.id = id;
    this.title = title;
    this.garment = garment;
    this.background = background;
  }
  addGarmet(garmentName){
    //Find garmetName in a list. Assign it to position [0,1,2]
    // based on [head,body,accessories]
  }
  removeGarmet(garmetName){
    this.garment[this.garment.indexOf(garmentName)] = "";
  }
}

// module.exports = Outfit;
