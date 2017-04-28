const pagination = (function () {
  let TOTAL;
  const PER_PAGE = 6;

  const innerHeight = document.documentElement.clientHeight / 2;
  let CURRENT_PAGE = 1;
  let SHOW_MORE_BUTTON;
  let SHOW_MORE_CALLBACK;

  function init(total, showMoreCb) {
    TOTAL = total;
    CURRENT_PAGE = 1;
    SHOW_MORE_CALLBACK = showMoreCb;
    
    window.addEventListener('scroll', infiniteScroll);
    if (getTotalPages() <= CURRENT_PAGE) {
      window.removeEventListener('scroll', infiniteScroll);
      getParams();
    }
    return getParams();
  }

  function infiniteScroll() {
    let lastNode = byId('articles-list').lastChild;
    let el = lastNode.offsetTop + (lastNode.offsetHeight / 2);
    const win = window.innerHeight + window.pageYOffset;
    if (getTotalPages() <= CURRENT_PAGE) {
      window.removeEventListener('scroll', infiniteScroll);
    }
    if (el <= win && !byId('articles-wall').classList.contains('display-none')) {
      el = lastNode.offsetTop + (lastNode.offsetHeight / 2);
      lastNode = byId('articles-list').lastChild;
      const paginationParams = nextPage();
      SHOW_MORE_CALLBACK(paginationParams.skip, paginationParams.top);
    }
  }

  function getTotalPages() {
    return Math.ceil(TOTAL / PER_PAGE);
  }

  function nextPage() {
    CURRENT_PAGE += 1;
    return getParams();
  }

  function getParams() {
    return {
      top: PER_PAGE,
      skip: (CURRENT_PAGE - 1) * PER_PAGE,
    };
  }

  return {
    init,
  };
}());
