function MacBook(){
  this.memory = function(){
    return 1024;
  };
}
function MacBookPro(mackbook){
  this.memory = function(){
    return mackbook.memory() + 1024;
  };
}
var myMackBook = new MacBookPro(new MacBook());
console.log(myMackBook.memory() === 2048);