const pagination = (function () {
  let TOTAL;
  const PER_PAGE = 6;
  let CURRENT_PAGE = 1;
  let SHOW_MORE_BUTTON;
  let SHOW_MORE_CALLBACK;

  function init(total, showMoreCb) {
    TOTAL = total;
    CURRENT_PAGE = 1;
    SHOW_MORE_CALLBACK = showMoreCb;
    SHOW_MORE_BUTTON = byId('pagination-show-more');
    SHOW_MORE_BUTTON.addEventListener('click', handleShowMoreClick);
    SHOW_MORE_BUTTON.hidden = false;
    if (getTotalPages() <= CURRENT_PAGE) {
      hideShowMoreButton();
    }
    return getParams();
  }

  function handleShowMoreClick() {
    const paginationParams = nextPage();
    SHOW_MORE_CALLBACK(paginationParams.skip, paginationParams.top);
  }

  function getTotalPages() {
    return Math.ceil(TOTAL / PER_PAGE);
  }

  function nextPage() {
    CURRENT_PAGE += 1;
    if (getTotalPages() <= CURRENT_PAGE) {
      hideShowMoreButton();
    }
    return getParams();
  }

  function getParams() {
    return {
      top: PER_PAGE,
      skip: (CURRENT_PAGE - 1) * PER_PAGE,
    };
  }

  function hideShowMoreButton() {
    SHOW_MORE_BUTTON.hidden = true;
  }

  return {
    init,
  };
}());
