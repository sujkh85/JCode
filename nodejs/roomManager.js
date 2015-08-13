
var master = {};

var masterFunc = {
        start : function(m3u8Url){
                if(!this.isM3u8Url(m3u8Url)){
                        master[m3u8Url] = {
                                room : []
                         };
                          console.log("방갯수 증가 !  : " + m3u8Url + "  방개수 : " + 1 );
                         master[m3u8Url].room[0] = 1;
                }
                else{
                        this.inRoom(m3u8Url);
                }

        },
        isM3u8Url : function(m3u8Url){
                for(var i in master){
                        if(i === m3u8Url){
                                return true;
                        }
                }
                return false;
        },
        inRoom : function(m3u8Url){
                if(!Object.keys(master).length){
                    console.log("inRoom fail");
                        return false;
                }

                var maxRoomNum;
                for (var j in  master[m3u8Url].room){
                        if(master[m3u8Url].room[j] < 5){
                                console.log(master[m3u8Url].room[j] +1);
                                return ++master[m3u8Url].room[j];
                        }
                        maxRoomNum = j;
                }

                maxRoomNum =  parseInt(maxRoomNum)+2;
                console.log("방갯수 증가 !  : " + m3u8Url + "  방개수 : " + maxRoomNum );
                master[m3u8Url].room[maxRoomNum] = 1;

        },
        leaveRoom : function(m3u8Url, roomNum){
                 master.m3u8.room[roomNum]--;

                 if(master.m3u8.room[roomNum] === 0){
                        console.log("채널삭제 roomNum: "+roomNum +"  m3u8Url : " + m3u8Url);
                        delete master.m3u8.room[roomNum];
                 }
        }
}

masterFunc.start("m3u8");
masterFunc.start("m3u8");
masterFunc.start("m3u8");
masterFunc.start("m3u8");
masterFunc.start("m3u8");
masterFunc.start("m3u8");
masterFunc.start("m3u8");
masterFunc.start("m3u8");
masterFunc.start("m3u8");
masterFunc.start("m3u8");
masterFunc.start("m3u8");
masterFunc.start("m3u8");

masterFunc.start("www.naver.m3u8");
masterFunc.start("www.naver.m3u8");
masterFunc.start("www.naver.m3u8");
masterFunc.start("www.naver.m3u8");
masterFunc.start("www.naver.m3u8");
masterFunc.start("www.naver.m3u8");


console.log(master);
console.log("채널수 " +Object.keys(master).length);