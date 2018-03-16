var $ = require('jquery');
var com = require('common');
var numWord = require('numWord');

$(document).ready(function(){
    com.max('b.js');
    com.max(numWord.numToWord(5));
});