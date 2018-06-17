!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("ts-window",[],e):"object"==typeof exports?exports["ts-window"]=e():t["ts-window"]=e()}(window,function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);var n=function(){function t(){}return t.getNumber=function(t){for(var e="",i=0;i<t.length&&!isNaN(Number(t[i]));i++)e+=t[i];return Number(e)},t}(),s=function(){function t(t,e,i,n,s){this.xDiff=-1,this.yDiff=-1,this.isDragging=!1,this.panel=null,this.header=null,this.selector=t,this.parent=document.querySelector(e),this.bounds=i,this.moveStart=n,this.moveEnd=s}return t.prototype.addListeners=function(){if(this.panel=document.querySelector("#"+this.selector),this.header=document.querySelector("#"+this.selector+" header"),null==this.header)throw"No header found";this.header.addEventListener("mousedown",this.mousedown.bind(this),!1),document.addEventListener("mousemove",this.mousemove.bind(this),!1),document.addEventListener("mouseup",this.mouseup.bind(this),!1)},t.prototype.removeListeners=function(){null!=this.header&&this.header.removeEventListener("mousedown",this.mousedown.bind(this)),document.removeEventListener("mousemove",this.mousemove.bind(this)),document.removeEventListener("mouseup",this.mouseup.bind(this))},t.prototype.mouseup=function(t){this.isDragging&&this.moveEnd(),this.isDragging=!1,this.xDiff=-1,this.yDiff=-1,null!=this.panel&&(this.panel.style.userSelect="all")},t.prototype.mousedown=function(t){var e;this.setZIndices(),this.isDragging=!0,e=null!=this.parent?this.parent.getBoundingClientRect():{left:0,top:0},this.xDiff=t.clientX-e.left,this.yDiff=t.clientY-e.top,this.moveStart()},t.prototype.mousemove=function(t){var e,i,s,o,l;e=null!=this.parent?this.parent.getBoundingClientRect():{left:0,top:0},i=t.clientX-e.left,s=t.clientY-e.top,o=this.panel&&this.panel.style.left?n.getNumber(this.panel.style.left):0,l=this.panel&&this.panel.style.top?n.getNumber(this.panel.style.top):0,null!=this.panel&&this.isDragging&&(this.panel.style.userSelect="none",i<this.xDiff&&(this.panel.style.left=o-(this.xDiff-i)+"px"),i>this.xDiff&&(this.panel.style.left=o+(i-this.xDiff)+"px"),s<this.yDiff&&(this.panel.style.top=l-(this.yDiff-s)+"px"),s>this.yDiff&&(this.panel.style.top=l+(s-this.yDiff)+"px"),this.xDiff=i,this.yDiff=s,this.checkBounds())},t.prototype.checkBounds=function(){if(null!=this.panel&&this.panel.style&&null!=this.parent){var t=this.parent.getBoundingClientRect(),e=this.panel.getBoundingClientRect();if(e.left<t.left&&this.bounds.left&&(this.panel.style.left="0px"),e.top<t.top&&this.bounds.top&&(this.panel.style.top="0px"),e.bottom>t.bottom&&this.bounds.bottom&&this.panel.style.top){var i=e.bottom-t.bottom,s=n.getNumber(this.panel.style.top);this.panel.style.top=s-i+"px"}if(e.right>t.right&&this.bounds.right&&this.panel.style.left){i=e.right-t.right;var o=n.getNumber(this.panel.style.left);this.panel.style.left=o-i+"px"}}},t.prototype.setZIndices=function(){null!=this.panel&&(this.panel.style.zIndex="9999999")},t}(),o=function(){function t(t,e,i,n,s){this.isResizing=!1,this.canResizeRight=!1,this.canResizeDown=!1,this.canResizeDiag=!1,this.xDiff=-1,this.yDiff=-1,this.panel=null,this.parent=null,this.selector=t,this.parentSelector=e,this.bounds=i,this.resizeStart=n,this.resizeEnd=s}return t.prototype.addListeners=function(){this.panel=document.querySelector("#"+this.selector),this.parent=document.querySelector(this.parentSelector),null!=this.panel&&(this.panel.addEventListener("mousedown",this.mousedown.bind(this)),document.addEventListener("mouseup",this.mouseup.bind(this)),document.addEventListener("mousemove",this.mousemove.bind(this)))},t.prototype.removeListeners=function(){null!=this.panel&&this.panel.removeEventListener("mousedown",this.mousedown.bind(this)),document.removeEventListener("mouseup",this.mouseup.bind(this)),document.removeEventListener("mousemove",this.mousemove.bind(this))},t.prototype.mousedown=function(t){if(this.canResizeDiag||this.canResizeDown||this.canResizeRight){this.isResizing=!0;var e=void 0;e=null!=this.parent?this.parent.getBoundingClientRect():{right:0,bottom:0},this.xDiff=t.clientX-e.right,this.yDiff=t.clientY-e.bottom,this.resizeStart()}},t.prototype.mouseup=function(t){this.isResizing&&this.resizeEnd(),this.isResizing=!1,this.xDiff=-1,this.yDiff=-1,null!=this.panel&&(this.panel.style.userSelect="all")},t.prototype.mousemove=function(t){if(this.isResizing){null!=this.panel&&(this.panel.style.userSelect="none");var e,i,s=void 0,o=void 0,l=void 0;s=null!=this.parent?this.parent.getBoundingClientRect():{right:0,bottom:0},e=t.clientX-s.right,i=t.clientY-s.bottom,o=this.panel&&this.panel.style.width?n.getNumber(this.panel.style.width):0,l=this.panel&&this.panel.style.height?n.getNumber(this.panel.style.height):0,null!=this.panel&&((this.canResizeDiag||this.canResizeRight)&&(e<this.xDiff&&(this.panel.style.width=o-(this.xDiff-e)+"px"),e>this.xDiff&&(this.panel.style.width=o+(e-this.xDiff)+"px"),this.xDiff=e),(this.canResizeDiag||this.canResizeDown)&&(i<this.yDiff&&(this.panel.style.height=l-(this.yDiff-i)+"px"),i>this.yDiff&&(this.panel.style.height=l+(i-this.yDiff)+"px"),this.yDiff=i)),this.checkBounds()}else this.styleCursor(t)},t.prototype.styleCursor=function(t){var e,i,n;if(null==this.parent||null==this.panel)throw"How'd you even get here?";this.parent.getBoundingClientRect(),n=this.panel.getBoundingClientRect(),e=t.clientX,i=t.clientY,e<=n.right&&e>n.right-4?this.canResizeRight=!0:this.canResizeRight=!1,i<=n.bottom&&i>n.bottom-4?this.canResizeDown=!0:this.canResizeDown=!1,e<=n.right&&e>n.right-10&&i<=n.bottom&&i>n.bottom-10?this.canResizeDiag=!0:this.canResizeDiag=!1,this.canResizeDiag?this.panel.style.cursor="nwse-resize":this.canResizeDown?this.panel.style.cursor="ns-resize":this.canResizeRight?this.panel.style.cursor="ew-resize":this.panel.style.cursor="default"},t.prototype.checkBounds=function(){if(null!=this.panel&&this.panel.style&&null!=this.parent){var t=this.parent.getBoundingClientRect(),e=this.panel.getBoundingClientRect();if(e.bottom>t.bottom&&this.bounds.bottom&&this.panel.style.height){var i=e.bottom-t.bottom,s=n.getNumber(this.panel.style.height);this.panel.style.height=s-i+"px"}if(e.right>t.right&&this.bounds.right&&this.panel.style.width){i=e.right-t.right;var o=n.getNumber(this.panel.style.width);this.panel.style.width=o-i+"px"}}},t}(),l=function(){function t(t){var e,i,n,l,h={top:!0,right:!0,bottom:!0,left:!0};this.config=t,this.config.bounds&&(this.config.bounds.top||(h.top=!1),this.config.bounds.right||(h.right=!1),this.config.bounds.bottom||(h.bottom=!1),this.config.bounds.left||(h.left=!1)),e=this.config.onMoveStart?this.config.onMoveStart:function(){},i=this.config.onMoveEnd?this.config.onMoveEnd:function(){},n=this.config.onResizeStart?this.config.onResizeStart:function(){},l=this.config.onResizeEnd?this.config.onResizeEnd:function(){},this.draggable=new s(this.config.id,this.config.parentSelector,h,e,i),this.resizeable=new o(this.config.id,this.config.parentSelector,h,n,l),this.parent=document.querySelector(this.config.parentSelector),this.panel=null}return t.prototype.buildPanel=function(){if(null===this.parent)throw"Parent selector could not be found";var t=this.addPanelStyle(),e=this.addHeaderStyle();this.parent.innerHTML+='\n                <section style="'+t+'" id="'+this.config.id+'">\n                    <header style="'+e+'">\n                        <span>'+this.config.header+'</span>\n                        <div style="float:right;position:relative;right:4px;top:1px;cursor:pointer;" class="ts-panel-close">\n                            <span style="font-family:sans-serif;">X</span>\n                        </div>\n                        <div style="float:right;position;position:relative;right:15px;top:3px;cursor:pointer;background:white;" class="ts-panel-max">\n                            <span style="display:inline-block;border:1px solid black;width:10px;height:10px;"></span>\n                        </div>\n                        <div style="float:right;position;position:relative;right:4px;top:4px;cursor:pointer;visibility:hidden;" class="ts-panel-normal">\n                            <span style="display:inline-block;border:1px solid black;width:10px;height:10px; background:white;position:absolute"></span>\n                            <span style="display:inline-block;border:1px solid black;width:10px;height:10px; background:white;position:relative;bottom:2px;left:2px;"></span>\n                        </div>\n                    </header>\n                    <main>'+this.config.body+"</main>\n                </section>\n            ",this.addListeners(),this.panel=document.querySelector("#"+this.config.id)},t.prototype.closePanel=function(t){t&&t.stopPropagation();var e=document.querySelector(this.config.parentSelector);if(this.config.onClose&&this.config.onClose(),null!=e&&null!=this.parent){var i=this.parent.querySelector("#"+this.config.id);null!=i&&e.removeChild(i)}},t.prototype.addListeners=function(){this.addPanelListeners(),this.draggable.addListeners(),this.resizeable.addListeners()},t.prototype.addPanelListeners=function(){var t=document.querySelector("#"+this.config.id+" .ts-panel-close"),e=document.querySelector("#"+this.config.id+" .ts-panel-max"),i=document.querySelector("#"+this.config.id+" .ts-panel-normal");null!=t&&(t.addEventListener("click",this.closePanel.bind(this),!1),t.addEventListener("mousedown",this.stopMove.bind(this),!1)),null!=e&&(e.addEventListener("click",this.maximizePanel.bind(this),!1),e.addEventListener("mousedown",this.stopMove.bind(this),!1)),null!=i&&(i.addEventListener("click",this.normalizePanel.bind(this),!1),i.addEventListener("mousedown",this.stopMove.bind(this),!1))},t.prototype.stopMove=function(t){t.stopPropagation(),this.panel&&this.panel.style&&(this.panel.style.userSelect="none")},t.prototype.removeListeners=function(){this.draggable.removeListeners(),this.resizeable.removeListeners(),this.removePanelListeners()},t.prototype.removePanelListeners=function(){var t=document.querySelector("#"+this.config.id+" .ts-panel-close"),e=document.querySelector("#"+this.config.id+" .ts-panel-max"),i=document.querySelector("#"+this.config.id+" .ts-panel-normal");null!=t&&(t.removeEventListener("click",this.closePanel.bind(this)),t.removeEventListener("mousedown",this.stopMove.bind(this))),null!=e&&(e.removeEventListener("click",this.maximizePanel.bind(this)),e.removeEventListener("mousedown",this.stopMove.bind(this))),null!=i&&(i.removeEventListener("click",this.normalizePanel.bind(this)),i.removeEventListener("mousedown",this.stopMove.bind(this)))},t.prototype.maximizePanel=function(t){t.stopPropagation();var e=document.querySelector("#"+this.config.id+" .ts-panel-normal"),i=document.querySelector("#"+this.config.id+" .ts-panel-max");if(null!=this.panel&&this.panel.style&&this.parent){var n=this.parent.clientWidth,s=this.parent.clientHeight;this.panel.style.width=n+"px",this.panel.style.height=s+"px",this.panel.style.left="0px",this.panel.style.top="0px",this.panel.style.userSelect="all"}null!=e&&null!=i&&e.style&&i.style&&(e.style.visibility="visible",i.style.visibility="hidden"),this.config.onMax&&this.config.onMax()},t.prototype.normalizePanel=function(t){t.stopPropagation();var e=document.querySelector("#"+this.config.id+" .ts-panel-normal"),i=document.querySelector("#"+this.config.id+" .ts-panel-max");null!=this.panel&&this.panel.style&&(this.panel.style.width=this.config.width+"px",this.panel.style.height=this.config.height+"px",this.panel.style.userSelect="all"),null!=e&&null!=i&&e.style&&i.style&&(e.style.visibility="hidden",i.style.visibility="visible"),this.config.onNormalize&&this.config.onNormalize()},t.prototype.addPanelStyle=function(){var t,e,i="box-sizing:border-box;border:1px solid black;position:absolute;top:0;left:0;width:"+this.config.width+";height:"+this.config.height+";";if(i+="min-height:200px;min-width:200px;",null!=this.parent?(e=this.parent.getBoundingClientRect().bottom-this.parent.getBoundingClientRect().top,t=this.parent.getBoundingClientRect().right-this.parent.getBoundingClientRect().left):(e=0,t=0),this.config.style&&this.config.style.panel){if(this.config.style.panel.maxHeight){var s=this.config.style.panel.maxHeight;"string"==typeof s&&(s=e*(n.getNumber(s)/100)),i+="max-height:"+s+";"}if(this.config.style.panel.maxWidth){var o=this.config.style.panel.maxWidth;"string"==typeof o&&(o=t*(n.getNumber(o)/100)),i+="max-width:"+this.config.style.panel.maxWidth+";"}if(this.config.style.panel.minWidth){var l=this.config.style.panel.minWidth;"string"==typeof l&&(l=e*(n.getNumber(l)/100)),i+="min-width:"+this.config.style.panel.minWidth+";"}if(this.config.style.panel.minHeight){var h=this.config.style.panel.minHeight;"string"==typeof h&&(h=e*(n.getNumber(h)/100)),i+="min-height:"+this.config.style.panel.minHeight+";"}this.config.style.panel.left&&(i+="left:"+this.config.style.panel.left+"px;"),this.config.style.panel.top&&(i+="top:"+this.config.style.panel.top+"px")}return i},t.prototype.addHeaderStyle=function(){var t="border-bottom:1px solid black;cursor:move;padding-left:3px;";return this.config.style&&this.config.style.header&&(this.config.style.header.borderBottom&&(t+=this.config.style.header.borderBottom),this.config.style.header.cursor&&(t+=this.config.style.header.cursor)),t},t}();e.default=l}])});