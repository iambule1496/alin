var today = new Date();
var year = today.getFullYear();

var el = document.getElementById('copyright');
el.innerHTML = '<p>copyright&copy' + year + '</p>';

////////////////////////////////////////////////////////////////

$(function() {
    var $window = $(window);
    var $restbg = $('#slider2');
    var endZone = $('#slider2').offset().top;
    var $header = $('#header');



    $window.on('scroll', function() {

        if ((endZone) < $window.scrollTop()) {
            $header.animate({ 'top': '-200px' }, 500);
            // $header.addClass('fixed');
        } else {
            $header.stop(true).animate({ 'top': '0px' }, 500);
            // $header.stop(true).removeClass('fixed');
        }

    });
});