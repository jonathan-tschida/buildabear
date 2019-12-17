class Outfit{
  constructor(id=1,title='Test',garment=['','',''],background='blue'){
    this.id = id;
    this.title = title;
    this.garment = garment;
    this.background = background;
  }
  addGarment(i,garmentName){
    //Find garmentName in a list. Assign it to position [0,1,2]
    // based on [head,body,accessories]
    this.garment[i]=garmentName;
  }
  removeGarment(garmentName){
    this.garment[this.garment.indexOf(garmentName)] = "";
  }
}

// module.exports = Outfit;
