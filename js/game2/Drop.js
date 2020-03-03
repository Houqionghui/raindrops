export default class Drop {
  constructor(options, cb) {
    this.bucket = options.bucket; // 接水桶
    this.wrap = document.querySelector('.container'); // 外层容器
    this.bTop = this.bucket.offsetTop;
    this.bWidth = this.bucket.offsetWidth;
    this.vWidth = options.width - this.bWidth;
    this.vHeight = options.height;
    this.horiPos = Math.floor(Math.random() * this.vWidth); // 水滴下落时的水平位置
    this.speed = Math.random() * 2; // 初始速度
    this.acceleration = .3; // 加速度
    this.cb = cb || function () { }
    this.createDrop();
  
  }

  createDrop() {
    let vdom = document.createElement('div');   
    vdom.className = 'drop';
    vdom.style.left = this.horiPos + 'px';
    this.appendToBody(vdom);
    let caibin=this.wrap.children.length;
    localStorage.setItem("name",caibin)
  }

  appendToBody(water) {
    this.wrap.append(water);
    this.shiftWater(water);
  }

  shiftWater(water) {
    let t = null,
      _self = this, // 当前执行期上下文
      bucket = this.bucket, // 接水桶
      left = 0, // 桶的水平位置
      curSpeed = 0, // 当前下落的速度
      waterBottom = 0, // 水滴底部的位置 用来判断是否到达桶的位置
      waterWidth = water.offsetWidth,
      waterHeight = water.offsetHeight // 水滴的高度

    t = requestAnimationFrame(function fn() {
      left = bucket.offsetLeft;

      // 判断是否在范围屏幕范围内
      if (water.offsetTop <= _self.vHeight) {
        curSpeed = water.offsetTop + (_self.speed += _self.acceleration);
        waterBottom = water.offsetTop + waterHeight;
        water.style.top = curSpeed + 'px';

        // 如果到达桶的位置再去判断是否进桶
        if (waterBottom >= _self.bTop) {

          // 判断是否掉落进桶里
          if (_self.horiPos >= left && (_self.horiPos + waterWidth) <= left + _self.bWidth) {
            _self.removeWater(water);
            _self.cb();
          }
        }


        t = requestAnimationFrame(fn);
      } else {
        _self.removeWater(water);
      }
    });
  }

  removeWater(water) {
    water.remove();
  }
}