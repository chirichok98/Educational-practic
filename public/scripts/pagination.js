const pagination = (function () {
  let TOTAL;
  const PER_PAGE = 6;

  const INNER_HEIGHT = document.documentElement.clientHeight / 2;
  let ARTICLE_LIST;
  let ARTICLE_WALL;
  let CURRENT_PAGE = 1;
  let SHOW_MORE_CALLBACK;
  let CATEGORY;

  function init(total, showMoreCb, category) {
    TOTAL = total;
    CURRENT_PAGE = 1;
    SHOW_MORE_CALLBACK = showMoreCb;
    CATEGORY = category;
    ARTICLE_LIST = byId('articles-list');
    ARTICLE_WALL = byId('articles-wall');

    window.addEventListener('scroll', infiniteScroll);
    if (getTotalPages() <= CURRENT_PAGE) {
      removeListener();
    }
    return getParams();
  }

  function infiniteScroll() {
    let lastNode = ARTICLE_LIST.lastChild;
    let el = countPosition(lastNode);
    const win = countPosition();

    if (getTotalPages() <= CURRENT_PAGE) {
      removeListener();
    }

    const isOnWallPage = !ARTICLE_WALL.classList.contains('display-none');
    const isSuitablePos = el <= win;

    if (isSuitablePos && isOnWallPage) {
      el = countPosition(lastNode);
      lastNode = ARTICLE_LIST.lastChild;
      const pagParams = nextPage();
      SHOW_MORE_CALLBACK(pagParams.skip, pagParams.top, CATEGORY);
    }
  }

  function countPosition(lastNode) {
    let pos = 0;
    pos = window.innerHeight + window.pageYOffset;
    if (lastNode) {
      pos = lastNode.offsetTop + (lastNode.offsetHeight / 2);
    }
    return pos;
  }

  function removeListener() {
    window.removeEventListener('scroll', infiniteScroll);
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
