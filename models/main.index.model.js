'use strict';
var request = require('request');
var async = require('async');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

exports.ajax = function(x,callback){
    var resultarray;
    async.waterfall([
        function (callback){
            var headers = {
                'User-Agent':       'sReN Agent/0.0.1',
                'Content-Type':     'application/x-www-form-urlencoded'
            }
            var options = {
                url: 'http://swopenapi.seoul.go.kr/api/subway/424549685a73646a3632665a4e427a/xml/realtimeStationArrival/0/15/%EB%B6%80%EC%B2%9C',
        
                method: 'GET',
                encoding:'UTF-8'
            };
            callback (null,options);
        },
        function (options,callback){
            //*******************************************//
            request(options, function (response,error,body) {
                parser.parseString(body,function(err,result){
                    //console.log(JSON.stringify(result));
                    //resultarray = JSON.stringify(result);
                    resultarray = result;
                });
                callback (null,resultarray);
                return resultarray;
            });
            //******************************************//
        }
    ],
    function(err,result){
        if(err){
            console.log('err : '+err);
            callback('error');
            result = 'error';
            return result;
        }else{
            callback(result);
            return result;
        }
    });
}
exports.ajax2 = function(x,callback){
    var resultarray;
    async.waterfall([
        function (callback){
            var headers = {
                'User-Agent':       'sReN Agent/0.0.1',
                'Content-Type':     'application/x-www-form-urlencoded'
            }
            var options = {
                url: 'http://swopenapi.seoul.go.kr/api/subway/424549685a73646a3632665a4e427a/xml/realtimeStationArrival/0/15/%EB%8F%99%EC%95%94',
        
                method: 'GET',
                encoding:'UTF-8'
            };
            callback (null,options);
        },
        function (options,callback){
            //*******************************************//
            request(options, function (response,error,body) {
                parser.parseString(body,function(err,result){
                    //console.log(JSON.stringify(result));
                    //resultarray = JSON.stringify(result);
                    resultarray = result;
                });
                callback (null,resultarray);
                return resultarray;
            });
            //******************************************//
        }
    ],
    function(err,result){
        if(err){
            console.log('err : '+err);
            callback('error');
            result = 'error';
            return result;
        }else{
            callback(result);
            return result;
        }
    });
}
exports.ajax3 = function(x,callback){
    var resultarray;
    async.waterfall([
        function (callback){
            var headers = {
                'User-Agent':       'sReN Agent/0.0.1',
                'Content-Type':     'application/x-www-form-urlencoded'
            }
            var options = {
                url: 'http://swopenapi.seoul.go.kr/api/subway/424549685a73646a3632665a4e427a/xml/realtimeStationArrival/0/15/%EC%9D%B8%EC%B2%9C',
        
                method: 'GET',
                encoding:'UTF-8'
            };
            callback (null,options);
        },
        function (options,callback){
            //*******************************************//
            request(options, function (response,error,body) {
                parser.parseString(body,function(err,result){
                    //console.log(JSON.stringify(result));
                    //resultarray = JSON.stringify(result);
                    resultarray = result;
                });
                callback (null,resultarray);
                return resultarray;
            });
            //******************************************//
        }
    ],
    function(err,result){
        if(err){
            console.log('err : '+err);
            callback('error');
            result = 'error';
            return result;
        }else{
            callback(result);
            return result;
        }
    });
}
exports.ajax0 = function(x){
    var resultarray;
    var headers = {
        'User-Agent':       'sReN Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }
    var options = {
        url: 'http://swopenapi.seoul.go.kr/api/subway/sample/xml/realtimeStationArrival/0/5/%EC%A3%BC%EC%95%88',
        
        method: 'GET',
        encoding:'UTF-8'
        /*
        %EC%84%9C%EC%9A%B8 서울
        %EC%A3%BC%EC%95%88 주안
        %EB%B6%80%EC%B2%9C 부천
        %EC%9D%B8%EC%B2%9C 인천
        %EB%B6%80%ED%8F%89 부평
        %EB%8F%99%EC%95%94 동암
        %ED%98%B8%EC%84%A0 호선
        */
    };
    console.log('ajax start');
    request(options, function (response,error,body) {
        parser.parseString(body,function(err,result){
            console.log(JSON.stringify(result));
            resultarray = JSON.stringify(result);
        });
        if(resultarray!=null){
            return resultarray;
        }
    });
    return resultarray;
}

exports.index = function(x, y, z) {
     var info = new Object();
     var index = '';
     info.name = '메인';
     info.value = '메인값';
     info.clients=[];
     for(var i=1; i<=z; i++){
        var index = new Object();
        index.name = '서브';
        index.value = '서브값';
        info.clients.push(index);
     }
     index=JSON.stringify(info);
     //console.log(index);
     return index;
};

exports.real = function(x,callback){
    var resultarray;
    async.waterfall([
        function (callback){
            var headers = {
                'User-Agent':       'sReN Agent/0.0.1',
                'Content-Type':     'application/x-www-form-urlencoded'
            }
            var options = {
                url: 'http://swopenapi.seoul.go.kr/api/subway/424549685a73646a3632665a4e427a/xml/realtimePosition/0/600/1%ED%98%B8%EC%84%A0',
        
                method: 'GET',
                encoding:'UTF-8'
            };
            callback (null,options);
        },
        function (options,callback){
            //*******************************************//
            request(options, function (response,error,body) {
                parser.parseString(body,function(err,result){
                    //console.log(JSON.stringify(result));
                    //resultarray = JSON.stringify(result);
                    resultarray = result;
                });
                callback (null,resultarray);
                return resultarray;
            });
            //******************************************//
        }
    ],
    function(err,result){
        if(err){
            console.log('err : '+err);
            callback('error');
            result = 'error';
            return result;
        }else{
            callback(result);
            return result;
        }
    });
}
