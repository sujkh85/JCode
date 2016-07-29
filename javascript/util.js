var UFS = {};

//배열에 있는 값중 id와 일치되는 오브젝트를 반환합니다.
UFS.searchId = function(arr,id){
  for(let i in arr){
    if(id == arr[i].id){
      return arr[i]
    }
  }
}

//호출하면 날짜와 시간을 반환한다.
//output : 5월 10일 화요일
UFS.timeStamp1 = function(){
  var now = new Date();
  var day = '';
  switch (now.getDay()) {
    case 0:
      day = '일요일';
      break;
    case 1:
      day = '월요일';
      break;
    case 2:
      day = '화요일';
      break;
    case 3:
      day = '수요일';
      break;
    case 4:
      day = '목요일';
      break;
    case 5:
      day = '금요일';
      break;
    case 6:
      day = '토요일';
      break;
    default:
      day = '';
  }
  return (now.getMonth()+1) + '월 ' + (now.getDate()) + '일 ' + day;
}
//output 20160511 오늘 년일시
UFS.timeStamp2 = function(){
  var now = newDate();
  return (now.getFullYear) + (now.getMonth()+1) + (now.getDate())
}

//1970년 1월 1일기준 시간을 넣으면 년월일이 계산되어 스트링으로 반환
//1453539610336  = >  '2016-01-23''
//1467186081000
UFS.TearMonthDate2 = function(date){
  if(date){
    var showDate = new Date(date*1);

    var month = showDate.getMonth() +1
    var day = showDate.getDate()
    if( 10 > (showDate.getMonth() +1 )){
      month = "0" + (showDate.getMonth() +1 );
    }
    if( 10 > showDate.getDate()){
      day = "0" + showDate.getDate();
    }

    return showDate.getFullYear() +"-"+month +"-" +day;
  }
  else{
    return '';
  }
}
//input 2011-04-01
//output 일
UFS.dayWeek = function(sDate){
  var arr = sDate.split('-');
  var d = new Date(arr[0]*1,((arr[1]*1) - 1), arr[2]*1);
  var week = [];
  week[0] = '일'
  week[1] = '월'
  week[2] = '화'
  week[3] = '수'
  week[4] = '목'
  week[5] = '금'
  week[6] = '토'
  return week[d.getDay()]
}

//1970년 1월 1일기준 시간을 넣으면 년월일이 계산되어 스트링으로 반환
//예 1453539610336  = >  '2016년 01월 23일''
UFS.TearMonthDate = function(date){
  if(date){
    var showDate = new Date(date*1);
    var month =showDate.getMonth() +1;
    var day  = showDate.getDate();
    if( 10 > (showDate.getMonth() +1 )){
      month = "0" + (showDate.getMonth() +1 );
    }
    if( 10 > showDate.getDate()){
      day = "0" + showDate.getDate();
    }

    return showDate.getFullYear() +"년 "+month +"월 " +day+ "일";
  }
  else{
    return '';
  }
}

//숫자를 입력하면 콤마는 찍어 반환한다.
UFS.unitChangeComma = function(num){
  if(!num){
    return 0;
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//dev용 로그
UFS.co = function(para){
   console.log(para);
}

/*
jquery가 필요합니다.
ex)
  UFS.ajax({
    that : this,
    url : '/api/chatbot/news',
    data : {
      financeid : processingObj.id,
      period : 1
    },
    type :'GET',
    beforeSend : false,
    failCallback : this.failNewsfeedAsk,
    successCallback : this.successNewsfeed,
    processingObj : processingObj,
  });
*/
UFS.ajax = (obj) => {
  var processData = {};

  if('POST' === obj.type){
    processData = JSON.stringify(obj.data)
  }
  else{
    processData = obj.data;
  }
  console.log('processingData',processData);
  $.ajax({
   url:Setting.host+obj.url,
   type:obj.type,
   headers:{
     'x-auth-token':localStorage['token']
   },
   contentType:'application/json',
   dataType:"json",
   data:processData,
   timeout:3000,
   cache:false,
   beforeSend : function(){
     if(obj.beforeSend){
       UFS.startLoading();
     }
   },
   complete : function(){
     if(obj.beforeSend){
       UFS.endLoading();
     }
   },
   success: function(result, status, xhr){
     obj.successCallback(result,obj.processingObj,obj.that);
   }.bind(this),
   error: function(xhr, status,error){
     console.log(xhr,status,error);
     console.log(Setting.host+obj.url);
     obj.failCallback(xhr);
   }.bind(this)
 });
}

//객체를 CSV파일을 만들때 사용합니다.
//args.data는 파일로 만드고 싶은 객체 입니다.
//args.filename은 파일명을 만드는 인자 입니다.
UFS.downloadCSV = function(args) {
  var data, filename, link;

  var csv = UFS._convertArrayOfObjectsToCSV({
      data: args.data
  });
  if (csv == null) return;

  filename = args.filename || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}

//이메일형식인지 확인합니다.
UFS.emailChecker = (email) =>{
  var regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  if(regex.test(email) === false){
    return false
  }
  return true
}
//비밀번호가 올바른지 체크합니다.
UFS.passwordChecker = (pass) =>{
  if(pass.length < 6){
    return false
  }
  if(pass.length > 16){
    return false
  }
  //특수문자 있는지 검사
  if(!pass.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)){
    return false
  }

  return true
}

//fileId는 jquery id값을 입력하면됩니다.
//ex
//command : doc , img 2가지
UFS.fileTypeChecker = function(fileId,command){
  if(!fileId)return false;
  if(!$('#'+fileId)) return false;
  if(!$('#'+fileId)[0].files[0].name) return false;
  var name = $('#'+fileId)[0].files[0].name;
  return UFS._fileTypeChecker(name,command);
}

//스트링 배열을 넣으면 콤마로 구분한 스트링으로 변환
UFS.arrConverter = function(arr){
  let length = arr.length;
  var text = ''
  for(var i=0 ; i < length ; i++){
    if(i != (length-1)){
      text = text + arr[i]+','
    }
    else{
      text = text + arr[i]
    }
  }
  return text;
}

//객체를 넣으면 속성값을 get방식으로 넘기는 파라미터 스트링으로 바꿔준다.
/*
  {dis:'aa'} => 'dis=aa'
*/
UFS.objUrlConverter = function(obj){
  var str =''
  for(let i in obj){
    str = str + i + '=' + obj[i] + '&'
  }
  console.log(str);
  return str
}

//숫자 배열의 합을 반환합니다.
//input [1,2,3]
//output 6
UFS.arrSum = function(arr){
  var val = 0
  for(let i in arr){
    val = val + (arr[i] * 1)
  }
  return val;
}

//숫자를 넣어주면 숫자만큼 *을 만들어 반환합니다.
//input 123
//output ***
UFS.makeStar = function(len){
  if('number' != typeof len){
    return 0;
  }
  if(0 >= len){
    return 0;
  }

  var star = '';
  for(var i =0 ;i < len ;i++){
    star = star + '*';
  }
  return star;
}

//주민번호 검사
//input 850925 - 1234123
//output true or false
UFS.ssnConfirm =  function(num){
 if(num==''){
  //alert("주민등록번호를 정확하게 입력해주세요.");
  return false;
 }
 if(num.length!==13){
   //alert('주민등록번호를 - 를 제외한 13자리 숫자로 입력하세요.');
  return false;
 }
 if(isNaN(num)){
 // alert("주민등록번호는 숫자만 입력이 가능합니다.");
  return false;
 }
 var ssn1 = num.substring(0, 6);
 var ssn2 = num.substring(6, 13);
 if((ssn1.length==6) &&(ssn2.length==7)){
  var ssn=ssn1+ssn2;
  var a = [];
  for (var i=0; i < 13; i++) {
   a[i] = parseInt(ssn.charAt(i));
  }
  var k = 11 - (((a[0] * 2) + (a[1] * 3) + (a[2] * 4) + (a[3] * 5) + (a[4] * 6) + (a[5] * 7) + (a[6] * 8) + (a[7] * 9) + (a[8] * 2) + (a[9] * 3) + (a[10] * 4) + (a[11] * 5)) % 11);
  if (k > 9){
   k -= 10;
  }
  if (k == a[12]){
   return true;
  }else{
  // alert("잘못된 주민등록번호 입니다.\n\n다시 입력해 주세요.");
   return false;
  }
 }
}

//숫자 두개를 넣으면 큰쪽에서 작은쪽을 나누고 소수점 comma자리 만 리턴한다.
//input 10,30,2
//output 3.00
UFS.percent = function(one, two, comma){
  one = one * 1;
  two = two * 1;
  var num ;
  if(one >= two){
    num = two / one
  }
  else{
    num = one / two
  }
  num = num * 100 ;
  return num.toFixed(comma)
}

//20150611 = > 2015.06.11로 변경
UFS.addPointDate = function (date){
  if(8 === date.length){
    var num = date* 1
    var year = Math.floor(num /10000);
    var month =Math.floor( (num - year*10000) / 100) ;
    var day = Math.floor((num - year*10000 - month*100))  ;
    if(month < 10){
      month = '0' +month;
    }
    if(day < 10){
      day = '0' + day;
    }
    return year + '.' + month + '.' + day;
  }
  else{
  }
}
//7812634300000 = > 2015.6.1로 변경
UFS.addPointDate2 = function (date){
  if(date){
    var showDate = new Date(date * 1);
    var month = showDate.getMonth() +1 ;
    var day =showDate.getDate() ;
    return showDate.getFullYear() +"."+month +"." +day;
  }
  else{
    return '';
  }
}

//20150601 = > 2015.6.1로 변경
UFS.addPointDate3 = function (date){
  if(8 === date.length){
    var num = date*1;
    var year = Math.floor(num /10000);
    var month =Math.floor( (num - year*10000) / 100);
    var day = Math.floor((num - year*10000 - month*100));
    return year + '.' + month + '.' + day;
  }
  else{
    return '';
  }
}

//만단위 금액을 넘으면
//15000
//[['1억'],[5천만원]]
UFS.unitAmountChange = function(amount){
  if("" === amount){
    return [];
  }
  var goalAmount=[];
  var goalUnit=[];
  amount = amount/10000;
  if(amount>=10000){
    goalAmount.push(Math.floor(amount/10000));
    goalUnit.push('억');
    if (amount%10000!=0){
      goalAmount.push(amount%10000);
      goalUnit.push('만원');
      return [[goalAmount[0],goalUnit[0]],[goalAmount[1],goalUnit[1]]];
    }
    else{
      goalUnit=['억원'];
      return [[goalAmount[0],goalUnit[0]]];
    }
  }
  else{
    goalAmount.push(amount);
    goalUnit.push('만원');
    return [[goalAmount[0],goalUnit[0]]];
  }
}

UFS.isbrowser = function(){
  var agt = navigator.userAgent.toLowerCase();
   var word;
   var version = "N/A";

   var agent = navigator.userAgent.toLowerCase();
   var name = navigator.appName;

   // IE old version ( IE 10 or Lower )
   if ( name == "Microsoft Internet Explorer" ) word = "msie ";

   else {
     // IE 11
     if ( agent.search("trident") > -1 ) word = "trident/.*rv:";

     // IE 12  ( Microsoft Edge )
     else if ( agent.search("edge/") > -1 ) word = "edge/";
   }

   var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );

   if (  reg.exec( agent ) != null  ) version = RegExp.$1 + RegExp.$2;

   if(version !== 'N/A'){
      if(version === '11.0'){
        return true;
      }
      else if(version === '10.0'){
        return true;
      }
      else if(version === '9.0'){
        return true;
      }
      else{
        return false;
      }
   }
   else{
    return false;
   }

}

//땡글이 로딩 시작
UFS.startLoading = function(){
 if(typeof $("#loadingImage").attr("id") == "undefined"){
     var xhtml = "";
     xhtml+="<div id='loadingImage' style='display:none'>";
     xhtml+="<div style='z-index:999999999999999;position:absolute;filter:Alpha(opacity=30);width:100%;height:100%;display:block;background:#000;top:0px;left:0px;opacity:0.3;'></div>";
     xhtml+="<img src='/images/loader.gif' style='z-index:999999999999999;position:absolute;top:48%;left:48%;width:70px;height:70px'>";
     xhtml+="</div>";
     $("body").append(xhtml);
 }
 $("#loadingImage").css({"display":"block"}).children("div").css({"height":$("body").height()});
 $("#loadingImage").find("img").css({"top":$(window).height()/2+$(window).scrollTop()-125});
};
// //땡글이 로딩 끝
UFS.endLoading = function(){
    $("#loadingImage").css({"display":"none"});
};

//내부 함수set

//배열을 CSV로 변경합니다.
UFS._convertArrayOfObjectsToCSV = function(args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
      return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
      ctr = 0;
      keys.forEach(function(key) {
          if (ctr > 0) result += columnDelimiter;

          result += item[key];
          ctr++;
      });
      result += lineDelimiter;
  });

  return result;
}

//파일명을 넣으면 뒤에서 4자리를 check하여 유효성검사를 진행합니다.
//유효한 파일이면 true 유효하지 않으면 false을 리턴합니다.
//파일 이름은 최소4글자 이상 100글자이하 이여야 합니다.
//command : doc , img 2가지
UFS._fileTypeChecker = function(fileName,command){
  var img = ['.gif','.png','.bmp','jpeg','.jpg','.psd','.pdd','tiff','.tif','.svg','svgz','.iff','.fpx','.frm','.pcx']
  var file = ['.hwp','.ppt','docx','.doc','dotx','.dot','pptx','.pdf','.gif','.png','.bmp','jpeg','.jpg','.psd','.pdd','tiff','.tif','.svg','svgz','.iff','.fpx','.frm','.pcx','.txt','.zip','.war','.jar']
  if('string' != typeof fileName){
    return false;
  }
  if(4 >= fileName.length || 100 <= fileName.length){
    return false;
  }

  var fileType = fileName.substring(fileName.length -4 , fileName.length);

  if('doc' === command){
    for(var i in file){
      if(fileType === file[i]){
        return true;
      }
    }
  }
  else if('img' === command){
    for(var i in img){
      if(fileType === img){
        return true;
      }
    }
  }
  else{
    return false;
  }


  return false;
}
