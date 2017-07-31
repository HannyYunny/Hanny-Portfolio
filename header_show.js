function Header_hidden() {
  this.scroll_V = null
  this.getheader = null
  this.timerID_header = null
  this.get_scroll = null

  this.init()
  this.initEvent()
}

Header_hidden.prototype.init = function() {
  this.scroll_V = window.scrollY
  this.getheader = document.getElementsByClassName('header-inner')[0]
  this.timerID_header = 0
  this.get_scroll = document.getElementsByTagName('body')[0]
}
Header_hidden.prototype.initEvent = function() {
  var obj_this = this
  this.getheader.style.top = 0 +'px'
  this.get_scroll.onscroll = function() {
    obj_this.hidden_Head(this)
  }
}

Header_hidden.prototype.hidden_Head = function() {
  var obj_this = this
  if (this.timerID_header == 0) {
    this.timerID_header = setInterval(noheader, 10)
  }
  function noheader() {
    if (obj_this.get_scroll.scrollTop > 98) {
      obj_this.getheader.style.top = parseFloat(obj_this.getheader.style.top)-(obj_this.get_scroll.scrollTop/100) + 'px'
      if (parseFloat(obj_this.getheader.style.top)*(-1) > 98) {
        clearInterval(obj_this.timerID_header)
        obj_this.getheader.style.top = -98 + 'px'
        obj_this.timerID_header = 0
      }
    }
    if (parseFloat(obj_this.getheader.style.top)+obj_this.get_scroll.scrollTop < 0) {
      obj_this.getheader.style.top = parseFloat(obj_this.getheader.style.top)+((obj_this.get_scroll.scrollTop+10)/2) + 'px'
      if (parseFloat(obj_this.getheader.style.top)*(-1) < 0.5) {
        obj_this.getheader.style.top = 0 + 'px'
        obj_this.timerID_header = 0
      }
    }
  }
}

var showheader = new Header_hidden()
