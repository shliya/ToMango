
const $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
    $section = $('section');
var numOfPages = $section.length - 1, // 取得section
    curPage = 0, //起始頁
    scrollLock = false; //滾動開關
// 上滾動
function navigateUp() {
    if (curPage === 0) return;
    curPage--;
    pagination();
};
// 下滾動
function navigateDown() {
    if (curPage === numOfPages) return;
    curPage++;
    pagination();
};
// 滾動至上/下區塊
function pagination() {
    scrollLock = true;
    $body.stop().animate({
        scrollTop: $section.eq(curPage).offset().top
    }, 1000, 'swing', function () {
        scrollLock = false;
    });
};

export default function scrollPage() {
    //滑鼠滾動
    $(document).on("mousewheel DOMMouseScroll", function (e) {
        if (scrollLock) return;
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0)
            navigateUp();
        else
            navigateDown();
    });
    //鍵盤上下鍵
    $(document).on("keydown", function (e) {
        if (scrollLock) return;
        if (e.which === 38)
            navigateUp();
        else if (e.which === 40)
            navigateDown();
    });
    //手機滑動
    $(document).on("scrollstart", function (e) {
        console.log(e)
        if (scrollLock) return;
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0)
            navigateUp();
        else
            navigateDown();
    });
}