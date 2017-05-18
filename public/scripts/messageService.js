const messageService = (function () {
  const BACKGROUND = byId('background');
  const MESSAGE_FORM = byId('message-form');
  const MESSAGE_TEXT = byId('message-text');
  const DELETE_BUT = byId('delete-answers');
  const REMOVE_ARTICLE = byId('agree-delete-button');
  const OK_BUTTON = byId('ok-button');

  function showMessage(text, id) {
    showVariantsToDelete(false);
    if (id) showVariantsToDelete(true);

    MESSAGE_FORM.dataset.id = id;
    MESSAGE_TEXT.textContent = text;
    
    BACKGROUND.addEventListener('click', checkAnswer);
    
    display(BACKGROUND, false);
  }

  function showVariantsToDelete(option) {
    display(OK_BUTTON, option);
    display(DELETE_BUT, !option);
  }

  function checkAnswer(event) {
    const ev = event.target.id;

    const agreeBut = 'agree-delete-button';
    const agree = ev === agreeBut;

    if (agree) {
      const id = MESSAGE_FORM.dataset.id;
      articleService.removeArticle(id);

      articleDOM.removeArticles();
      articleService.showArticlesWall();
      articleService.printArticles();
    }
    display(BACKGROUND, true);
  }

  return {
    showMessage,
  };
}());
