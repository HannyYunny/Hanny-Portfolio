/* Slider 구현하기 */

function Slider() {
  //초기 변수 저장
  this.pos_scenes = null //position pos_scenes
  this.bgr = null //position background classes
  this.window_width = null //get width in window
  this.window_height = null //get height in window
  this.client_body_width = null
  this.arrow_right = null
  this.arrow_left = null
  this.timerID = null
  this.fscene = null
  this.scenesheight = null

  this.init()
  this.initEvent()
}

Slider.prototype.init=function() {
  this.pos_scenes = document.getElementById('scenes')
  this.bgr = document.getElementsByClassName('background')
  this.window_width = window.innerWidth
  this.window_height = window.innerHeight
  this.client_body_width = document.getElementById('wrap').clientWidth
  this.arrow_right = document.getElementById('moveright')
  this.arrow_left = document.getElementById('moveleft')
  this.timerID=0
  this.fscene = this.pos_scenes.getElementsByClassName('scene')
  this.scenesheight = document.getElementById('main-visual')
}

Slider.prototype.initEvent = function() {
  var objthis = this
  for (var i = 0; i < this.bgr.length; i++) {
    this.bgr[i].style.width = this.window_width +'px'
    this.bgr[i].style.height = this.window_height-98 + 'px'
  }
  this.arrow_right.onclick=function() {
    objthis.moveright(this)
  }
  this.arrow_left.onclick=function() {
    objthis.moveleft(this)
  }
  objthis.addBar()
  this.scenesheight.style.height = this.window_height-98 + 'px'

  //window reload = scrolltop(0)
  window.onbeforeunload=function() {
    window.scrollTo(0,0)
  }
}

Slider.prototype.moveright = function() {
  var objthis = this
  if (this.timerID == 0) {
    this.timerID = setInterval(rightGallery, 20)
  }
  function rightGallery() {
    objthis.pos_scenes.style.left = parseInt(objthis.pos_scenes.style.left)-(objthis.window_width/50)+'px'
    if (parseInt(objthis.pos_scenes.style.left) < -1*objthis.window_width) {
      clearInterval(objthis.timerID)
      objthis.pos_scenes.style.left = -objthis.client_body_width + 'px'
      console.log(objthis.window_width);
      objthis.timerID=0
    }
  }
}
Slider.prototype.moveleft = function() {
  var objthis = this
  if (this.timerID == 0) {
    this.timerID = setInterval(leftGallery, 10)
  }
  function leftGallery() {
    objthis.pos_scenes.style.left = parseInt(objthis.pos_scenes.style.left)+(objthis.client_body_width/90)+'px'
    if (parseInt(objthis.pos_scenes.style.left) >= 0) {
      clearInterval(objthis.timerID)
      objthis.pos_scenes.style.left = 0 + 'px'
      objthis.timerID=0
    }
  }
}
Slider.prototype.addBar = function() {
  for (var i = 0; i < this.fscene.length; i++) {
    document.getElementsByClassName('scene-indicator')[0].innerHTML += "<div class='indicator_bar'></div>"
  }
}

/* 메뉴 클릭 시 이동하게 하기 */
function Movevertical() {
  this.getY = null //스크롤 이동할 Y 좌표. 배열임
  this.innermenu = null // 메뉴 구하기 위한 값
  this.clientY = null

  this.init() // 함수 실행
  this.initEvent() // 함수 실행
}
Movevertical.prototype.init = function () {
  this.clientY = parseInt(window.innerHeight)
  this.getY = [this.clientY, this.clientY+708, 2500]  //스크롤 이동할 Y 좌표. 배열임
  this.innermenu = document.getElementsByClassName('menu-inner')[0] // 메뉴 구하기 위한 값
}
Movevertical.prototype.initEvent = function() {
  var obj_this = this // 내부함수(익명함수 포함) 사용 시 이 객체의 소속이라는 것을 정의하기 위함
  for (var i = 0; i < this.innermenu.getElementsByTagName('li').length; i++) {
    this.innermenu.getElementsByTagName('li')[i].onclick = function() { // 메뉴 클릭 했을 때 movedown 실행
      obj_this.movedown(this)
    }
  }
}

Movevertical.prototype.movedown = function(selected) {
  var obj_this = this
  for (var i = 0; i < this.innermenu.getElementsByTagName('li').length; i++) {
    if (this.innermenu.getElementsByTagName('li')[i] == selected) {
      break
    }
  }
  movepage(i)
  function movepage(index) {
    scrollTo(0, obj_this.getY[index])
  }
}

//알러트 창 제어(닫기)
function Alertctr() {
  this.allWidth = null
  this.allHeight = null
  this.closebtn = null
  this.fdalert = null

  this.init()
  this.initEvent()
}

Alertctr.prototype.init = function() {
  this.allHeight = document.getElementById('wrap').offsetHeight
  this.closebtn = document.getElementsByClassName('closebtn')
  this.fdalert = document.getElementById('alert')
}
Alertctr.prototype.initEvent = function() {
  var objthis = this
  this.fdalert.style.height = this.allHeight + 'px'
  for (var i = 0; i < this.closebtn.length; i++) {
    this.closebtn[i].onclick = function() {
      objthis.alertclose()
    }
  }
}
Alertctr.prototype.alertclose = function() {
  this.fdalert.style.display = "none" //display none으로 변경하기
}

var showslider = new Slider() //객체화
var pagedown = new Movevertical()
var closealert = new Alertctr()
