function my$(id) {
  return document.getElementById(id);
};

function draw(ev) {
  var canvas = my$("canvas");
  if (canvas.getContext) {
    var context = canvas.getContext("2d");

    //================================封装============================
    //自适应视口大小
    function page() {
      var pageWidth = document.documentElement.clientWidth;
      var pageHeight = document.documentElement.clientHeight;
      canvas.width = pageWidth;
      canvas.height = pageHeight;
    }

    //画圆画线
    // function drawCircle(x, y, radius) {
    //   context.beginPath();
    //   context.arc(x, y, radius, 0, Math.PI * 2);
    //   context.fill();
    // };
    function drawLine(x1, y1, x2, y2) {
      context.beginPath();
      context.moveTo(x1, y1);//起点
      context.lineWidth = 2;//线条粗细
      context.lineTo(x2, y2);//终点
      context.stroke();
      context.closePath();
    };
    //====================================封装=================================

    //获取页面的宽高，视口自适应
    page();
    //监听视口宽高
    window.onresize = function () {
      page();
    };

    //监听事件===========================
    var using = false;
    var lastPoint = { x: undefined, y: undefined }
    //特性检测（区别pc端和移动端）
    if (document.body.ontouchstart !== undefined) {
      //触屏设备
      canvas.ontouchstart = function (e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        using = true;
        if (eraserEnable) {
          context.clearRect(x - 5, y - 5, 10, 10);
        } else {
          lastPoint = { "x": x, "y": y };
        }
      };
      canvas.ontouchmove = function (e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        if (!using) { return }
        if (eraserEnable) {
          context.clearRect(x - 5, y - 5, 10, 10);
        } else {
          var newPonit = { "x": x, "y": y }
          drawLine(lastPoint.x, lastPoint.y, newPonit.x, newPonit.y);
          lastPoint = newPonit;
        }
      };
      canvas.ontouchend = function (e) {
        using = false;
      };
    } else {
      //非触屏设备
      canvas.onmousedown = function (e) {
        var x = e.clientX;
        var y = e.clientY;
        using = true;
        if (eraserEnable) {
          context.clearRect(x - 5, y - 5, 10, 10);
        } else {
          lastPoint = { "x": x, "y": y };
        }
        // drawCircle(x, y, 1);
      };
      canvas.onmousemove = function (e) {
        var x = e.clientX;
        var y = e.clientY;
        if (!using) { return }
        if (eraserEnable) {
          context.clearRect(x - 5, y - 5, 10, 10);
        } else {
          var newPonit = { "x": x, "y": y }
          // drawCircle(x, y, 1);
          drawLine(lastPoint.x, lastPoint.y, newPonit.x, newPonit.y);
          lastPoint = newPonit;
        }
      };
      canvas.onmouseup = function (e) {
        using = false;
      };
    }
    //为橡皮擦注册点击事件=========================
    var eraserEnable = false;
    my$("eraser").onclick = function () {
      eraserEnable = !eraserEnable;
    };
    //为画笔注册点击事件
    my$("brush").onclick = function () {
      eraserEnable = false;
    }
  }

};




