var pagination = (function () {
    var TOTAL; // всего статей
    var PER_PAGE = 6; // статей на 1-ой странице
    var CURRENT_PAGE = 1; // текущая страница
    var SHOW_MORE_BUTTON;
    var SHOW_MORE_CALLBACK; // функция, которую вызывать, когда произошел клик по кнопке

    /*
        Total: Всего статей в ArticleModel. (Надо будет еще учесть, что total меняется при применении фильтров)
        showMoreCb: функция, которую надо вызвать при клике на кнопку "Показать Еще"
    */
    function init(total, showMoreCb) {
        TOTAL = total;
        CURRENT_PAGE = 1;
        SHOW_MORE_CALLBACK = showMoreCb;
        SHOW_MORE_BUTTON = document.getElementById('pagination-show-more');
        SHOW_MORE_BUTTON.addEventListener('click', handleShowMoreClick);
        SHOW_MORE_BUTTON.hidden = false;

        /* Не показывать кнопку если статей нет */
        if (getTotalPages() <= CURRENT_PAGE) {
            hideShowMoreButton();
        }

        /* Вернуть skip, top для начальной отрисовки статей */
        return getParams();
    }

    function handleShowMoreClick() {
        var paginationParams = nextPage();
        SHOW_MORE_CALLBACK(paginationParams.skip, paginationParams.top);
    }

    function getTotalPages() {
        return Math.ceil(TOTAL / PER_PAGE);
    }

    function nextPage() {
        CURRENT_PAGE++;
        if (getTotalPages() <= CURRENT_PAGE) {
            hideShowMoreButton();
        }

        return getParams();
    }

    function getParams() {
        return {
            top: PER_PAGE,
            skip: (CURRENT_PAGE - 1) * PER_PAGE
        };
    }

    function hideShowMoreButton() {
        SHOW_MORE_BUTTON.hidden = true;
    }

    return {
        init: init
    }

}());