(function (doc) {
  let nextPage = doc.querySelector('.unicursal_nextPage');
  let topicText = doc.querySelector('.topicText');
  let trailerContent=doc.querySelector('.trailerPage_Content');
  let unicursals = '';
  let integral='';//获得的积分和
  let topic = 7;
  function skipPage() {
    nextPage.addEventListener('click', function () {
      setTimeout(function () {
        $('.unicursal').fadeOut(500)
        $('.unicursalContent').fadeIn(500)
        regulation();
      }, 50)
    }, false)
  }
  skipPage();
  $.get('./json/unicursal.json').then(function (res) {
    unicursals = res;
  })
  function regulation() {
    topic--;
    if (topic <= 0) {
      setTimeout(function () {
        $('.unicursalContent').fadeOut(500)
        $('.trailerPage').fadeIn(500)
        mychoice();
      }, 50);
    } else {
      timeleft = 30;
      $('.unicursalContent .timeout').html('30');
      let countDown = setInterval(function () {
        timeleft--
        $('.unicursalContent .timeout').html(`${timeleft}`)
        if (timeleft == 0) {
          clearInterval(countDown)
          setTimeout(regulation, 2000);
        }
      }, 1000)
      let questions = unicursals.splice(0, 1)[0];
      console.log(questions);
      let str = '';
      str += `
        <div class="topicText_img"><img src="${questions.img}" alt=""></div>
        <label class="topicSelect">
          <input type="radio" value="${questions.value[0]}" name="box"><span>想到了</span><br>
          <br>
          <input type="radio" value="${questions.value[1]}" name="box"><span>没想到</span>
        </label>
        `;
      topicText.innerHTML = str;
      $(".topicSelect input[name=box]").click(function (e) {
        var order = $(this).val();
        console.log(order);
        if (order == 1) {
          integral++;
        }
        setTimeout(regulation, 1000)
      });
    }
  };
  function mychoice() {
    let html='';
    html+=`
    <div class="text">您一共想出来了<span>${integral}</span>道题，得到<span>${integral}</span>积分</div>
    <div class="btnPage">确定</div>
    `;
    trailerContent.innerHTML=html;
    let btnPage=document.getElementsByClassName('btnPage')[0];
    btnPage.addEventListener('click',function(){
      window.location.href='index5.html'
    },false)
  }
})(document)