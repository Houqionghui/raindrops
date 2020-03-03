import Drop from './Drop.js';

; (function (doc) {
  let bucket = doc.querySelector('.bucket'),
    btn=doc.querySelector('.btn'),
    clock=doc.getElementById('clocks'),
    rainwater=doc.getElementById('rainwater'),
    conversion=doc.getElementById('conversion'),
    rainwaterPercentage=doc.getElementById('rainwaterPercentage'),
    Array = [], 	//循环数据后,存到这里
     quizList='',
     timeleft=0,//答题倒计时
     percentage=0,//接到雨水的百分比
      t = 10,
    quizleft=3,
    quantity=0, //掉下来的雨滴数量
	  // time = document.getElementsByClassName("clock")[0],
    width = document.body.clientWidth || document.documentElement.clientWidth,
    height = document.body.clientHeight || document.documentElement.clientHeight,
    timer1 = null,
    timer2 = null,
    box=null,
    isDown = false,
    dountdown = 10, // 多少秒后结束 单位s
    frequency = 120, // 频率 每次间隔多少次下一次雨 不要设置得太低 画面会很卡
    result = 0; // 最后的结果
  let x = 0,
    l = 0;
  function init() {
  //  aa();
  bindEvent();
  }

  function aa(){
    btn.addEventListener('click',mybtn,false);
  }
  function bindEvent() {
    gameStart();
    bucket.addEventListener('touchstart', touchStart, false);
    window.addEventListener('touchmove', touchMove, false);
    bucket.addEventListener('touchend', touchEnd, false);
  }
  //点击开始
  function mybtn(){
    btn.style.display='none'
     bindEvent();
     console.log(clock);
  }
  function gameStart() {
    // 持续多少秒
    timer1 = setInterval(function () {
      new Drop({ bucket, width, height }, gotCallBack)
    }, frequency);

    // 多少秒后结束
    timer2 = setTimeout(function () {
      clearInterval(timer1);
      clearTimeout(timer2);
      timer1 = null;
      timer2 = null;
      gameOver();
      gae();
    }, dountdown * 1000);

    box=setInterval(function(){
      t--;     
      clock.innerHTML=t;
      if(t<=0){
        clearInterval(box);
      }
    },1000);
  }

  function gameOver() {
    setTimeout(function () {
      $('.container').fadeOut(500)
      $('.answerBox').fadeIn(500)
      refresh();
    }, 2000)
    console.log(result); // 游戏结束打印获取到的水滴数量
    rainwater.innerHTML=result;
    conversion.innerHTML=result;
  }
  // 每次接到水滴以后 把结果+1
  function gotCallBack() {
    result += 1; 
  }
  function gae(){
    console.log(result);
      quantity=localStorage.getItem("name");  //
      console.log(quantity);
       let indentRatio= quantity/result;
    let b = indentRatio.toFixed(2);
     percentage = b.slice(2, 4);
     console.log(percentage); //接到雨水的百分比
     rainwaterPercentage.innerHTML=percentage
  }
  function touchStart(ev) {
    let e = ev || window.event;
    x = e.clientX || e.changedTouches[0].clientX;
    //获取左部的偏移量
    l = bucket.offsetLeft;
    isDown = true;
  }
  function touchMove(ev) {
    if (isDown == false) return;
    let e = ev || window.event,
      nx = e.clientX || e.changedTouches[0].clientX,
      nl = nx - (x - l); //计算移动后的左偏移量和顶部的偏移量;
    if (nl <= 0) {
      nl = 0;
    } else if (nl >= width - bucket.offsetWidth) {
      nl = Math.ceil(width - bucket.offsetWidth);
    }
    bucket.style.left = nl + 'px';
  }
  function touchEnd() {
    isDown = false;
  }
  // 获取数据
  $.get('./json/data.json').then(function (res) {
    quizList = res;
    console.log(quizList); 
})
//题目更新
function refresh() {
  quizleft--;
  if (quizleft < 0) {
      $('.answerBox').fadeOut(500);
      $('.initPage').fadeIn(500);
      // alert('完成')
      // $('.scorePage .again').css('box-shadow', '0px 6px 10px dimgrey');
      initPage();
  } 
  else {
      // numb++;
      let questions = quizList.splice(0, 1)[0];
      Array.length = '';
      Array.push(questions);
      console.log(Array);

      //开始新题目时重置时间
      if (Array[0].options.length == 4) {
          $('.mainPage .qno').html(`
        <div class="question">${Array[0].title}</div>
          <div class="answer" data-index="1" id="a1">A、${Array[0].options[0]}</div>
          <div class="answer" data-index="2" id="a2">B、${Array[0].options[1]}</div>
          <div class="answer" data-index="3" id="a3">C、${Array[0].options[2]}</div>
          <div class="answer" data-index="4" id="a4">D、${Array[0].options[3]}</div>
    `)
      } else if (Array[0].options.length == 5) {
          $('.mainPage .qno').html(`
          <div class="question">${Array[0].title}</div>
          <div class="answer" data-index="1" id="a1">A、${Array[0].options[0]}</div>
          <div class="answer" data-index="2" id="a2">B、${Array[0].options[1]}</div>
          <div class="answer" data-index="3" id="a3">C、${Array[0].options[2]}</div>
          <div class="answer" data-index="4" id="a4">D、${Array[0].options[3]}</div>
          <div class="answer" data-index="5" id="a5">E、${Array[0].options[4]}</div>         
    `);
      }
      timeleft = 30;
      $('.answerBox .timeout').html('30');
      let countDown = setInterval(function () {
          timeleft--
          $('.answerBox .timeout').html(`${timeleft}`)
          if (timeleft == 0) {
              clearInterval(countDown)
              // $('.mainPage .qno').off('click')  //倒计时结束后,没有选择,就自动选择正确答案
              // $('#a' + question.answer).css('background-color','#92d050')
              setTimeout(refresh, 2000);
          }
      }, 1000)
      $('.mainPage .qno').click(function (e){ 
          if (e.target.className == 'answer') {
              clearInterval(countDown);
              $('.mainPage .qno').off('click')
             $('#a' + e.target.dataset.index).css('box-shadow', 'none')
              $('#a' + e.target.dataset.index).css('background-color', '#CDC881')
              let index = e.target.dataset.index;          
              setTimeout(refresh, 1000);
          }
      })
  }
}


function initPage(){

}
  init();
})(document);