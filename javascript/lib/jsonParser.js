
  var getParam = function(key){
	    var _parammap = {};
	    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
	        function decode(s) {
	            return decodeURIComponent(s.split("+").join(" "));
	        }

	        _parammap[decode(arguments[1])] = decode(arguments[2]);
	    });

	    return _parammap[key];
	};
// uri디코더 get방식 주소값을 받아서 decodeURI를 통해 디코딩된값을 jsontext로 받는다.
var jsonText = decodeURI(getParam("json"));

// else 이곳에 로그인 버튼 제어문 (숨김/보임)필요해보임

// 제이슨 데이터를 자바스크립트 객체로 변환
var jData = JSON.parse(jsontext);
//JSON.stringify();