var format={};
format.unFormat = function(s){
  if(StringUtil.null2void(s) == "") return "";
  return s.replace(/[^a-zA-Zㄱ-ㅎ가-힣ㅏ-ㅣ0-9]/gi,"");
};
format.comma = function(n){
  n = StringUtil.null2void(n).replace(/,/gi,'');
  if(isNaN(n)) return n;
  var reg = /(^[+-]?\d+)(\d{3})/;
  while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
  return n;
};
var arrayUtil = {};
arrayUtil.asc = function(){
  arguments[0].sort(function (a, b){
      return  (a[2]<b[2]) ? -1 : ((a[2]>b[2]) ? 1 : 0);
  });
}
var numberUtil = {};
numberUtil.null2void = function(s){
  if(s == null || s == "null" || !(typeof s == "string" || typeof s == "number")) return 0;
  else return (isNaN(s))?s:parseInt(s,10);
};
numberUtil.remainNumber = function(n){
  n = numberUtil.null2void(n);
  return n.replace(/[^0-9]/gi,"");
};
numberUtil.hex = function(bg){
  bg = StringUtil.null2void(bg);
    if (bg.search("rgb") == -1){
      return bg;
    }else {
        bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
    }
};
var StringUtil = {};
StringUtil.null2void = function(s){
  if(s == null || s == "null" || !(typeof s == "string" || typeof s == "number")) return "";
  else return (isNaN(s))?s:s.toString();
};
StringUtil.rpad = function(s,p,n){
  s = StringUtil.null2void(s);
  p = StringUtil.null2void(p);
  n = numberUtil.null2void(n);
  for(var i=0,len=n-s.length;i<len;i++) s += p;
  return s;
};
StringUtil.lpad = function(s,p,n){
  var r = "";
  s = StringUtil.null2void(s);
  p = StringUtil.null2void(p);
  n = numberUtil.null2void(n);
  for(var i=0,len=n-s.length;i<len;i++) r += p;
  return r+s;
};
StringUtil.nvl = function(a,b){
  return "" != StringUtil.null2void(a)?a:b;
};
StringUtil.decode = function(){
  var d = arguments[0];
  for(var i in arguments){
    if(i%2 == 1 && d == arguments[i]) return arguments[numberUtil.null2void(i)+1];
  }
  return arguments.length%2==0?arguments[arguments.length-1]:"";
};
StringUtil.byteLength = function(str){
  var tcount = 0;
  var tmpStr = new String(str);
  var onechar;
  for (k=0,len=tmpStr.length;k<len;k++){
    onechar = tmpStr.charAt(k);
    if(escape(onechar).length>4) tcount += 2;
    else tcount += 1;
  }
  return tcount;
};
var net = {};
net.ajax = {};
net.ajax.submit = function(submitType, sendUrl, submitData, fnName){
  $.ajax({
    type: submitType,
    url: sendUrl,
        cache: false,
        data : submitData,
        beforeSend : function(){
          if(typeof net.ajax.beforeSend == "function") net.ajax.beforeSend();
        },
        success: function(obj){
          net.ajax.data = obj;
          if(fnName != null && fnName != ""){
            if(typeof fnName == "string") eval(fnName);
            else if(typeof fnName == "function") fnName();
          }
        },
        error: function (msg) {
          alert("msg:"+msg);
        },
        complete: function(){
          if(typeof net.ajax.complete == "function") net.ajax.complete();
        }
  });
};
net.ajax.jsonpSubmit = function(sendUrl, sendData, fnName){
  $.ajax({
    type: "GET",
    dataType:"jsonp",
    url: sendUrl,
        jsonp : "callback",
        cache: false,
        data : sendData,
        beforeSend : function(){
          if(typeof net.ajax.beforeSend == "function") net.ajax.beforeSend();
        },
        success: function(obj){
          net.ajax.data = obj;
          if(fnName != null && fnName != ""){
            if(typeof fnName == "string") eval(fnName);
              if(typeof fnName =="function") fnName();
          }
        },
        error: function (msg) {
            alert("XML Data에 오류가 발생되었습니다.");
        },
        complete: function(){
          if(typeof net.ajax.complete == "function") net.ajax.complete();
        }
  });
};
var dign = {};
/*
 * arguments[0] - url or id or class
 * arguments[1] - text replace target id / arguments[2] init contents 3,4 same
 * ex)dign.layer.view('#test','target','aavavavavavav','target','vvvvvvvvvvvvvvvvvvv');
 */
dign.layer = {};
dign.layer.obj = {};
dign.layer.ready = function(){
  if(typeof $("#layerBackground").attr("id") == "undefined"){
    $("body").append("<div id='layerBackground' style='z-index:100;position:absolute;filter:Alpha(opacity=30);width:100%;display:none;background:#000;top:0px;left:0px;opacity:0.3;'></div>");
  }
  if(typeof $("#layerContents").attr("id") == "undefined"){
    $("body").append("<div id='layerContents'></div>");
  }
};
dign.layer.view = function(){
  dign.layer.ready();
  var arg = new Array();
  for(var i in arguments) arg.push(arguments[i]);
  if(arguments[0].indexOf("#") ==0 || arguments[0].indexOf(".") ==0){
    $("#layerContents").append("<div style='position:absolute;display:block;background-color:white'></div>");
    var loc = numberUtil.null2void($("#layerBackground").css("z-index"))*2;
    dign.layer.obj.trg = $("#layerContents").children("div").last().html($(arguments[0]).html());
    dign.layer.obj.t = (window.screen.height-dign.layer.obj.trg.outerHeight())/2-80;
    dign.layer.obj.w = ($(window).width()-dign.layer.obj.trg.outerWidth())/2;
    dign.layer.obj.trg.css({"z-index":loc,"top":dign.layer.obj.t,"left":dign.layer.obj.w});
    $("#layerBackground").css({"z-index":loc-1,"height":$(window).height(),"display":"block"});
    dign.layer.replace(arg);
    dign.layer.bind();
  }else{
    net.ajax.submit("POST", arguments[0], "", function(){
      $("#layerContents").append("<div style='position:absolute;display:block;background-color:white'></div>");
      var loc = numberUtil.null2void($("#layerBackground").css("z-index"))*2;
      dign.layer.obj.trg = $("#layerContents").children("div").last().html(net.ajax.data);
      dign.layer.obj.t = (window.screen.height-dign.layer.obj.trg.outerHeight())/2-80;
      dign.layer.obj.w = ($(window).width()-dign.layer.obj.trg.outerWidth())/2;
      dign.layer.obj.trg.css({"z-index":loc,"top":dign.layer.obj.t,"left":dign.layer.obj.w});
      $("#layerBackground").css({"z-index":loc-1,"height":$(window).height(),"display":"block"});
      dign.layer.replace(arg);
      dign.layer.bind();
    });
  }
};
dign.layer.close = function(){
  $("#layerContents").children("div").last().unbind("scroll").remove();
  dign.layer.obj.trg = $("#layerContents").children("div").last();
  dign.layer.obj.t = (window.screen.height-dign.layer.obj.trg.outerHeight())/2-80;
  var loc = numberUtil.null2void(dign.layer.obj.trg.css("z-index"));
  if(loc == 0){
    $("#layerBackground").css({"z-index":100,"display":"none"});
  }else{
    $("#layerBackground").css({"z-index":loc-1});
    dign.layer.bind();
  }
};
dign.layer.bind = function(){
  $(window).unbind("scroll").scroll(function(){
    dign.layer.obj.trg.css({"top":dign.layer.obj.t+$(window).scrollTop()});
  });
};
dign.layer.replace = function(arg){
  if(arg.length > 1){
    for(var i=1,len=arg.length;i<len;i++){
      if(i%2 == 1) dign.layer.obj.trg.find("#"+arg[i]).html(arg[i+1]);
    }
  }
};