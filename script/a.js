var $ = require('jquery');
var com = require('common');
var c = require('cAlia');
import '../css/style1.css';

$(document).ready(function(){
    $(document.body).append('<div class="hello"><p>HHHSSSASAS</p></div>');
    com.min('a.js');
    com.min(c.sum(1,2,3,4,5));
});