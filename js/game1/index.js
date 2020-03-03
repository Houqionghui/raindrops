(function (doc) {
  let probability = doc.querySelector('.probability');
   let myRadio = probability.querySelectorAll('input');
   let finallyContent=doc.querySelector('.finallyContent');
    array = [];
    arrRight = [];
    number = '';
    text='';
    tallSweet='';
    lowSweet='';
    integral='';
  function init() {
    getValue();
  }
  function provinceaData() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', './json/data.json', false);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        window.data = JSON.parse(xhr.responseText);
        console.log(data);
      }
    };
    xhr.send(null);
  }
  function maizeHtml() {
    for (let i = 0; i < data.length; i++) {
      const element = data[i].queer.tall[0];
      console.log(element);

      let str = '';
      str += `
   <-- <div><div class="left"><span>${data[i].queer.tall[0]}%产高甜玉米，收益${data[i].queer.tall[1]}积分<br>${data[i].queer.low[0]}%产低甜玉米，收益${data[i].queer.low[0]}积分。</span><br><input type="radio"name="box1"></div>
   <div class="right"><span>${data[i].right.tall[0]}%产高甜玉米，收益${data[i].right.tall[1]}积分<br>${data[i].right.low[0]}%产低甜玉米，收益${data[i].right.tall[1]}积分。</span><br><input type="radio" name="box1"></div>
   </div>-->
    `;
      console.log(str);

      // probability.innerHTML+=str;
    }
  }

  function getValue() {
    $(".probability input[name=box1]").click(function (e) {
      let num = e.target.dataset.index;
      var order = $(this).val();
      if (num == 2) {
        number = order;
        console.log(number);
        randomDigit(number)
        skip();
      }
    });
    $("input[name=box2]").click(function (e) {
      var order = $(this).val();
      let num = e.target.dataset.index;
      if (num == 2) {
        number = order;
        console.log(number);
        randomDigit(number)
        skip();
      }
    });
    $("input[name=box3]").click(function (e) {
      var order = $(this).val();
      let num = e.target.dataset.index;
      if (num == 2) {
        number = order;
        console.log(number);
        randomDigit(number)
        skip();
      }
    });
    $("input[name=box4]").click(function (e) {
      var order = $(this).val();
      let num = e.target.dataset.index;
      if (num == 2) {
        number = order;
        console.log(number);
        randomDigit(number)
        skip();
      }
    });
    $("input[name=box5]").click(function (e) {
      var order = $(this).val();
      let num = e.target.dataset.index;
      if (num == 2) {
        number = order;
        console.log(number);
        randomDigit(number)
        skip();
      }
    });
    $("input[name=box6]").click(function (e) {
      var order = $(this).val();
      let num = e.target.dataset.index;
      if (num == 2) {
        number = order;
        console.log(number);
        randomDigit(number)
        skip();
      }
    });
    $("input[name=box7]").click(function (e) {
      var order = $(this).val();
      let num = e.target.dataset.index;
      if (num == 2) {
        number = order;
        console.log(number);
        randomDigit(number)
        skip();
      }
    });
    $("input[name=box8]").click(function (e) {
      var order = $(this).val();
      let num = e.target.dataset.index;
      if (num == 2) {
        number = order;
        console.log(number);
        randomDigit(number)
        skip();
      }
    });
    $("input[name=box9]").click(function (e) {
      var order = $(this).val();
      let num = e.target.dataset.index;
      if (num == 2) {
        number = order;
        console.log(number);
        randomDigit(number)
        skip();
      }
    });
  }

  function randomDigit(number) {
    var stochastic = Math.floor(Math.random() * 10) + 1;
    console.log();

    if (stochastic == 1) {
      array = [10, 90];
    } else if (stochastic == 2) {
      array = [20, 80];
    } else if (stochastic == 3) {
      array = [30, 70];
    } else if (stochastic == 4) {
      array = [40, 60];
    } else if (stochastic == 5) {
      array = [50, 50];
    } else if (stochastic == 6) {
      array = [60, 40];
    } else if (stochastic == 7) {
      array = [70, 30];
    } else if (stochastic == 8) {
      array = [80, 20];
    } else if (stochastic == 9) {
      array = [90, 10];
    } else if (stochastic == 10) {
      array = [100];
    }
    if (stochastic >= number) {
      arrRight=[38.5,1];
      text='右';
      let aa=arrRight[Math.floor((Math.random()*arrRight.length))];
      if(aa==38.5){
        tallSweet='高甜';
        integral=38.5;
      }else{
        tallSweet='低甜';
        integral=1;
      }
      console.log(text);
    } else {
      arrRight=[20,16];
      let aa=arrRight[Math.floor((Math.random()*arrRight.length))];
      if(aa==20){
        tallSweet='高甜';
        integral=20
      }else{
        tallSweet='低甜';
        integral=16
      }
      text='左';
      console.log(text);
    }
  }
  function skip(){
    setTimeout(function () {
      $('.chooseLand').fadeOut(500)
      $('.finally').fadeIn(500)
      finallyHTML();
  }, 30)
  }
  function finallyHTML(){
    let str='';
      str+=`
    <div class="finally_text">
    <div class="finallyContext">
    产出高甜玉米和低甜玉米的概率分别是<span>${array[0]}%</span>和<span>${array[1]}%</span>。您选择了<span>${text}</span>边的玉米地），产出了<span>${tallSweet}</span>，获得了<span>${integral}</span>积分！
    </div>
      
    </div>
      `;
      finallyContent.innerHTML=str;
  }
 
  init();
})(document)


