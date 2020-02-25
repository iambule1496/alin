$('.slider').each(function() { //尋訪每個內容面版
    var $this = $(this); //取得目前的面板
    var $group = $this.find('.slide-group'); //取得他的slide-group(容器)
    var $slides = $this.find('.slide'); //以jquery 物件保存所有的的內容面板
    var buttonArray = []; //建立陣列保存導覽按鈕
    var currentIndex = 0; //目前面板的索引編號
    var timeout; //保存計時器

    function move(newIndex) { //移動至新得頁面
        var animateLeft, slideLeft; //宣告變數

        advance(); //當版面移動時,再次呼叫advance()函式

        //如果目前內容面板正在顯示或是處於動畫效果中,則不須執行任何動作
        if ($group.is(':animated') || currentIndex === newIndex) {
            return;
        }

        buttonArray[currentIndex].removeClass('active'); //至目前面板移除active 類別
        buttonArray[newIndex].addClass('active'); //將active類別加入至新面板

        if (newIndex > currentIndex) { //若新面板的引索值大於目前的引索值
            slideLeft = '100%'; //設定新面板至於右方
            animateLeft = '-100%'; //設定目前面板向左移動
        } else {
            slideLeft = '-100%'; //設定新面板至於左方
            animateLeft = '100%'; //設定目前面板向右移動
        }

        $slides.eq(newIndex).css({ left: slideLeft, display: 'block' });

        $group.animate({ left: animateLeft }, function() { // Animate slides and
            $slides.eq(currentIndex).css({ display: 'none' }); // Hide previous slide      
            $slides.eq(newIndex).css({ left: 0 }); // Set position of the new item
            $group.css({ left: 0 }); // Set position of group of slides
            currentIndex = newIndex; // Set currentIndex to the new image
        });
    }

    function advance() { //內容面板設定一個計時器
        clearTimeout(timeout); //清除timeout 變數計時器
        //設定計時器每四秒鐘便執行一匿名函式
        timeout = setTimeout(function() {
            if (currentIndex < ($slides.length - 1)) { //若非最後一個內容面板
                move(currentIndex + 1); //移至下一個內容面板
            } else { //否則
                move(0); //移至第一個面板
            }
        }, 4000); //等待毫秒時間
    }

    $.each($slides, function(index) {
        //為每個按鈕建立button元件
        var $button = $('<button type="button" class="slide-btn">&bull;</button>');
        if (index === currentIndex) { //若索引值等於目前面板的索引值
            $button.addClass('active'); //加入active類別屬性
        }
        $button.on('click', function() { //為按鈕加入事件處理器
            move(index); //呼叫move()函式
        }).appendTo('.slide-buttons'); //加入至按鈕容器中
        buttonArray.push($button); //加入至按鈕陣列中
    });

    advance();
});

//////////////////////////////////////////////////////////////////////////////

//Run after DOM is ready.
$("#slider2 > div:gt(0)").hide();
setInterval(function() {
    $('#slider2 > div:first')
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .appendTo('#slider2');
}, 3000);