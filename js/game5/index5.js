(function(doc){
let nextPage=doc.querySelector('.nextPage');

function Homeincident(){
  nextPage.addEventListener('click',function(){
    // setTimeout(function () {
    //   $('.raiseChickens').fadeOut(500)
    //   $('.dragBox').fadeIn(500)
    //   list();
    // }, 50)
    window.location.href='drag.html';
  },false)
}

Homeincident();

})(document)