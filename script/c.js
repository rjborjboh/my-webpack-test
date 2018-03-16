var $ = require('jquery');
exports.sum = function(){
    var sum = 0;
    $.each(arguments, function(index, aParam){
        sum += !isNaN(aParam) ? parseInt(aParam, 10) : 0;
    });
    return sum;
};