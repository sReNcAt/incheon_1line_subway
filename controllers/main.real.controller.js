'use strict';

var model = require('../models/main.index.model');
var range = new Array;
var async = require('async');
var date = require('date-utils');
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

exports.index = function(req, res) {
    model.real('1',function(result){
        var xml = result;
        if(JSON.stringify(xml).search('realtimePosition')>0){
            var xml = result.realtimePosition;
            var xml2 = xml.row;
        }else{
            var xml2 = null;
        }
        res.render('../views/main/index.html',objecttest(JSON.stringify(xml2)));
        //console.log(date);
        global.gc(true);
        //gc(true);
    });
};

function objecttest(value){
    //console.log(value);
    var string = '{';
    string = string+'"ajax":"1234"';
    //------------------------------------------------------
    if(value==null||value=='undefined'){
        string = string+',"ajax":"1234"';
    }else{
        var dt = new Date();
        if(dt.getMonth()<10){
            if(dt.getDate()<10){
                dt = dt.getFullYear()+"0"+(dt.getMonth()+1)+"0"+dt.getDate();
            }else{
                dt = dt.getFullYear()+"0"+(dt.getMonth()+1)+dt.getDate();
            }
        }else{
            if(dt.getDate()<10){
                dt = dt.getFullYear()+(dt.getMonth()+1)+"0"+dt.getDate();
            }else{
                dt = dt.getFullYear()+(dt.getMonth()+1)+dt.getDate();
            }
        }
        console.log(dt);
        var data = JSON.parse(value);
        for(var i in data){
            if(data[i].lastRecptnDt!=dt){
            }else{
                var temp;
                if(parseInt(data[i].trainNo,10)%2==0){
                    for(var j in range){
                        temp=JSON.stringify(data[i].statnNm);
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
                    if(data[i].directAt==1){
                        string=string+'2":"';
                    }else{
                        string=string+'1":"';
                    }
                    //--------------------------------------------
                    string=string+data[i].trainNo+' '+data[i].statnNm;
                    switch(JSON.stringify(data[i].trainSttus)){
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
                }else if(parseInt(data[i].trainNo,10)%2==1){
                    for(var j in range){
                        temp=JSON.stringify(data[i].statnNm);
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
                    if(data[i].directAt==1){
                        string=string+'3":"';
                    }else{
                        string=string+'4":"';
                    }
                    //--------------------------------------------
                    string=string+data[i].trainNo+' '+data[i].statnNm;
                    switch(JSON.stringify(data[i].trainSttus)){
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
                }else{

                }
            }
        }
    }
    //------------------------------------------------------
    string = string+'}';
    //console.log(string);
    string = JSON.parse(string);
    //callback(string);
    return string;
}
