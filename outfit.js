class Outfit{
  constructor(id=1,title='Test',garment=[],background='blue'){
    this.id = id;
    this.title = title;
    this.garment = garment;
    this.background = background;
  }
  addGarment(i,garmentName){
    //Find garmetName in a list. Assign it to position [0,1,2]
    // based on [head,body,accessories]
    this.garment[i]=garmentName;
  }
  removeGarmet(garmetName){
    this.garment[this.garment.indexOf(garmentName)] = "";
  }
  logMessage(){
    console.log(event.target);
  }
}

// module.exports = Outfit;
