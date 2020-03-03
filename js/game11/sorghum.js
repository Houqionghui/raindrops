(function (doc) {
  let nextPage = doc.querySelector('.nextPage');
  let btn = doc.querySelector('.btn');
  let scorePageText=doc.querySelector('.scorePageText');
  let quizleft = 8;
  let quizList = '';
  let arr = [];
  let num = ''; //用户选择的左边还是右边
  let order = '';//在第几题处选择了右边。
  let stochastic = ''; //概率随机
  let earningsLoss='';
  let integration='';//收益损失的积分
  function init() {
    nextPage.addEventListener('click', pageDown, false);
  }
  function pageDown() {
    setTimeout(function () {
      $('.sorghum').fadeOut(500)
      $('.choice').fadeIn(500)
      refresh();
    }, 30)
  }
  $.get('./json/sorghum.json').then(function (res) {
    quizList = res;
    console.log(quizList);
  })
  //题目更新
  function refresh() {
    quizleft--;
    // console.log(quizleft);
    if (quizleft <= 0) {
      alert('1')
      $('.choice').fadeOut(500)
      $('.scorePage').fadeIn(500)
      incident();
      finallyPage();
    } else {
      let questions = quizList.splice(0, 1)[0];
      arr.length = '';
      arr.push(questions);

      //开始新题目时重置时间
      $('.choiceMin').html(`
      <div class="choiceContent">
        <div class="choiceLeft"><input type="radio" name="box1" value="${arr[0].value}" data-index="${arr[0].index[0]}">50%概率会收益${arr[0].left[0]}积分；50%概率损失${arr[0].left[1]}积分。</div>
        <div class="choiceRight"><input type="radio" name="box1" value="${arr[0].value}"data-index="${arr[0].index[1]}">50%概率会收益${arr[0].right[0]}积分；50%概率损失${arr[0].right[1]}积分。</div>
      </div>
      <div class="btn">确定</div>
      `);
      $(".choiceContent input[name=box1]").click(function (e) {
        num = e.target.dataset.index;
        order = $(this).val();
      });
      $('.btn').click(function () {
        if(order==''){
          alert('请选择')
        }else{
          setTimeout(refresh, 1000)
        }
      })
      if (num == 2) {
        $('.choice').fadeOut(500)
        $('.scorePage').fadeIn(500)
        incident();
        finallyPage();
      }

    }

    function incident() {
      stochastic = Math.floor(Math.random() * 7) + 1;
      console.log(order);
      if (stochastic >= order) {
        text = '右';
        if (stochastic == 1) {
          data = [7.5, 6.5];
        } else if (stochastic == 2) {
          data = [7.5, 6.5]
        } else if (stochastic == 3) {
          data = [7.5, 6.5]
        } else if (stochastic == 4) {
          data = [7.5, 6.5]
        } else if (stochastic == 5) {
          data = [7.5, 5.0]
        } else if (stochastic == 6) {
          data = [7.5, 4.5]
        } else if (stochastic == 7) {
          data = [7.5, 4.0]
        }
      } else {
        text = '左';
        if (stochastic == 1) {
          data = [6, 3.5];        
        } else if (stochastic == 2) {
          data = [5.5, 3.5];         
        } else if (stochastic == 3) {
          data = [5, 3.5];        
        } else if (stochastic == 4) {
          data = [4.5, 3.5];         
        } else if (stochastic == 5) {
          data = [4, 3.5];        
        } else if (stochastic == 6) {
          data = [4, 3.5];        
        } else if (stochastic == 7) {
          data = [3.5, 3.5];        
        }
      }
    }
  }
function finallyPage(){
  console.log(text); //左右
let chance=Math.floor(Math.random() * 2) + 1;
  if(chance==1){
    earningsLoss='收益'
    integration=data[0];
  }else{
    integration=data[1];
    earningsLoss='损失';
  }
let str='';
str+=`
<div class="earnings">
收益和损失的概率分别是50%。
您选择了${text}边的高粱地，${earningsLoss}了${integration}积分！
</div>
`;
scorePageText.innerHTML=str;
}
  init();
})(document)

