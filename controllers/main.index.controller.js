'use strict';

var model = require('../models/main.index.model');
var range = new Array;
var async = require('async');
range[0] = '인천',
    range[1] = '동인천',
    range[2] = '도원',
    range[3] = '제물포',
    range[4] = '도화',
    range[5] = '주안',
    range[6] = '간석',
    range[7] = '동암',
    range[8] = '백운',
    range[9] = '부평',
    range[10] = '부개',
    range[11] = '송내',
    range[12] = '중동',
    range[13] = '부천';
var range2 = new Array;
range2[0] = 'incheon',
    range2[1] = 'dincheon',
    range2[2] = 'dowon',
    range2[3] = 'jemul',
    range2[4] = 'dohwa',
    range2[5] = 'juan',
    range2[6] = 'gansuk',
    range2[7] = 'dongam',
    range2[8] = 'backun',
    range2[9] = 'bupyung',
    range2[10] = 'bugae',
    range2[11] = 'songnae',
    range2[12] = 'jungdong',
    range2[13] = 'buchun';


exports.test = function(req, res) {
    model.ajax('1',function(result){
        var xml = result.realtimeStationArrival;
        var xml2 = xml.row;
        res.render('../views/main/ajax.html',objecttest(JSON.stringify(xml2)));
        global.gc(true);
    });
};
exports.gc = function(req, res) {
        res.render('../views/main/ajax.html',{
            ajax : 'Garbage Colletion Clear'
        });
        global.gc(true);
};
exports.index = function(req,res){
    async.waterfall([
        function (callback){
            model.ajax('1',function(result){
                callback (null,result);
            });
        },
        function (result,callback){
            model.ajax3('1',function(result2){
                callback (null,result,result2);
            });
        },
        function (result,result2,callback){
            model.ajax2('1',function(result3){
                callback (null,result,result2,result3);
            });
        },
        function (result,result2,result3,callback){
            var xml = result;
            if(JSON.stringify(xml).search('realtimeStationArrival')>0){
                var xml = result.realtimeStationArrival;
                var xml2 = xml.row;
            }else{
                var xml2 = null;
            }
            var xml3 = result2
            if(JSON.stringify(xml3).search('realtimeStationArrival')>0){
                var xml3 = result2.realtimeStationArrival;
                var xml4 = xml3.row;
            }else{
                var xml4 = null;
            }
            var xml5 = result3
            if(JSON.stringify(xml5).search('realtimeStationArrival')>0){
                var xml5 = result3.realtimeStationArrival;
                var xml6 = xml5.row;
            }else{
                var xml6 = null;
            }
            objecttest(JSON.stringify(xml2),JSON.stringify(xml4),JSON.stringify(xml6),function(result4){
                callback (null,result4);
                global.gc(true);
                //console.log('gc');
            });
        }
    ],
                    function(err,result){
        if(err){
            return result;
        }else{
            res.render('../views/main/index.html',result);
        }
    });
}
exports.ajax = function(req, res) {
    model.ajax('1',function(result){
        var xml = result.RESULT;
        if(xml.status==200){
            var xml = result.realtimeStationArrival;
            var xml2 = xml.row;
        }else{
            var xml2 = null;
        }
        res.render('../views/main/ajax.html',{
            ajax : array(JSON.stringify(xml2)),
        });
        global.gc(true);
    });
};
function objecttest(value,value2,value3,callback){
    var string = '{';
    string = string+'"ajax":"1234"';
    //------------------------------------------------------
    if(value==null||value=='undefined'){
        string = string+',"ajax":"1234"';
    }else{
        var data = JSON.parse(value);
        for(var i in data){
            var temp;
            if(data[i].updnLine=='상행'){
                for(var j in range){
                    temp=JSON.stringify(data[i].arvlMsg3);
                    if(temp.search(range[j])>0){
                        if(temp.search('인천')>0){
                            if(temp.search(range[j])<3){
                                string=string+',"'+range2[j];
                                break;
                            }else if(temp.search('동인천')>2) {
                                string=string+',"'+'dincheon';
                                break;
                            }
                        }else{
                            string=string+',"'+range2[j];
                            break;
                        }
                    }else{
                        if(j>12){
                            string=string+',"'+'unknown';
                            break;
                        }
                    }
                }
                //역명+노선구분---------------------------------
                var search = JSON.stringify(data[i].bstatnNm);
                if(search.search('급행')>0){
                    string=string+'2":"';
                }else{
                    string=string+'1":"';
                }
                //--------------------------------------------
                string=string+data[i].btrainNo+' '+data[i].bstatnNm;
                switch(JSON.stringify(data[i].arvlCd)){
                    case '["0"]':
                        string = string+' 진입"';
                        break;
                    case '["1"]':
                        string = string+' 도착"';
                        break;
                    default:
                        string = string+' 출발"';
                        break;
                }
            }
        }
    }
    if(value3==null||value3=='undefined'){
        string = string+',"ajax":"1234"';
    }else{
        var data3 = JSON.parse(value3);
        for(var i in data3){
            var temp;
            if(data3[i].updnLine=='상행'){
                for(var j in range){
                    temp=JSON.stringify(data3[i].arvlMsg3);
                    if(temp.search(range[j])>0){
                        if(temp.search('인천')>0){
                            if(temp.search(range[j])<3){
                                string=string+',"'+range2[j];
                                break;
                            }else if(temp.search('동인천')>2) {
                                string=string+',"'+'dincheon';
                                break;
                            }
                        }else{
                            string=string+',"'+range2[j];
                            break;
                        }
                    }else{
                        if(j>12){
                            string=string+',"'+'unknown';
                            break;
                        }
                    }
                }
                //역명+노선구분---------------------------------
                var search = JSON.stringify(data3[i].bstatnNm);
                if(search.search('급행')>0){
                    string=string+'2":"';
                    //console.log('급행');
                }else{
                    string=string+'1":"';
                }
                //--------------------------------------------
                string=string+data3[i].btrainNo+' '+data3[i].bstatnNm;
                switch(JSON.stringify(data3[i].arvlCd)){
                    case '["0"]':
                        string = string+' 진입"';
                        break;
                    case '["1"]':
                        string = string+' 도착"';
                        break;
                    default:
                        string = string+' 출발"';
                        break;
                }
            }
        }

        for(var i in data){
            if(data[i].updnLine=='하행'){
                for(var j in range){
                    temp=JSON.stringify(data[i].arvlMsg3);
                    if(temp.search(range[j])>0){
                        if(temp.search('인천')>0){
                            if(temp.search('인천')>2){
                                string=string+',"'+range2[j];
                                break;
                            }else if(temp.search('인천')<3) {
                                string=string+',"'+range2[j];
                                break;
                            }
                        }else{
                            string=string+',"'+range2[j];
                            break;
                        }
                    }else{
                        if(j>12){
                            string=string+',"'+'unknown';
                            break;
                        }
                    }
                }
                //역명+노선구분---------------------------------
                var search = JSON.stringify(data[i].bstatnNm);
                if(search.search('급행')>0){
                    string=string+'3":"';
                }else{
                    string=string+'4":"';
                }
                //--------------------------------------------
                string=string+data[i].btrainNo+' '+data[i].bstatnNm;
                switch(JSON.stringify(data[i].arvlCd)){
                    case '["0"]':
                        string = string+' 진입"';
                        break;
                    case '["1"]':
                        string = string+' 도착"';
                        break;
                    default:
                        string = string+' 출발"';
                        break;
                }
            }
        }
    }
    if(value2==null||value2=='undefined'){
        string = string+',"ajax":"1234"';
    }else{
        var data2 = JSON.parse(value2);
        for(var i in data2){
            if(data2[i].updnLine=='하행'){
                for(var j in range){
                    temp=JSON.stringify(data2[i].arvlMsg3);
                    if(temp.search(range[j])>0){
                        if(temp.search('인천')>0){
                            if(temp.search('인천')>2){
                                string=string+',"'+range2[j];
                                break;
                            }else if(temp.search('인천')<3) {
                                string=string+',"'+range2[j];
                                break;
                            }
                        }else{
                            string=string+',"'+range2[j];
                            break;
                        }
                    }else{
                        if(j>12){
                            string=string+',"'+'unknown';
                            break;
                        }
                    }
                }
                //역명+노선구분---------------------------------
                var search = JSON.stringify(data2[i].bstatnNm);
                if(search.search('급행')>0){
                    string=string+'3":"';
                }else{
                    string=string+'4":"';
                }
                //--------------------------------------------
                string=string+data2[i].btrainNo+' '+data2[i].bstatnNm;
                switch(JSON.stringify(data2[i].arvlCd)){
                    case '["0"]':
                        string = string+' 진입"';
                        break;
                    case '["1"]':
                        string = string+' 도착"';
                        break;
                    default:
                        string = string+' 출발"';
                        break;
                }
            }
        }

    }
    //------------------------------------------------------
    string = string+'}';
    //console.log(string);
    string = JSON.parse(string);
    callback(string);
    return string;
}
function array(value){
    var result = '';
    var object = new Object;
    if(value==null||value=='undefined'){
        return null;
    }else{
        var data = JSON.parse(value);
        for(var i in data){
            if(data[i].updnLine=='상행'){
                result = result+'종착역 : '+data[i].bstatnNm+'<br>열차 번호 : '+data[i].btrainNo+'<br>현재 위치 : '+data[i].arvlMsg2+'<br>';
                //console.log('Code : '+JSON.stringify(data[i].arvlCd));
                switch(JSON.stringify(data[i].arvlCd)){
                    case '["0"]':
                        result = result+'상태 : 진입'+'<hr>';
                        break;
                    case '["1"]':
                        result = result+'상태 : 도착'+'<hr>';
                        break;
                    case '["2"]':
                        result = result+'상태 : 출발'+'<hr>';
                        break;
                    default:
                        result = result+'상태 : 운행중'+'<hr>';
                        break;
                }
            }
        }
        for(var i in data){
            if(data[i].updnLine=='하행'){
                result = result+'종착역 : '+data[i].bstatnNm+'<br>열차 번호 : '+data[i].btrainNo+'<br>현재 위치 : '+data[i].arvlMsg2+'<br>';
                //console.log('Code : '+JSON.stringify(data[i].arvlCd));
                switch(JSON.stringify(data[i].arvlCd)){
                    case '["0"]':
                        result = result+'상태 : 진입'+'<hr>';
                        break;
                    case '["1"]':
                        result = result+'상태 : 도착'+'<hr>';
                        break;
                    case '["2"]':
                        result = result+'상태 : 출발'+'<hr>';
                        break;
                    default:
                        result = result+'상태 : 운행중'+'<hr>';
                        break;
                }
                object.id ='1';
                object.id ='1';
                var tempmsg = JSON.stringify(data[i].arvlMsg2);
                var tempmsg2 = tempmsg.search('부평')
                //console.log(tempmsg2);
            }
        }
        //console.log(object);
        return result;
    }
} 
