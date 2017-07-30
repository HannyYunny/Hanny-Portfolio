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

/* 헤더 스크롤 후 사라지게 하기 */
var showslider = new Slider() //객체화
