const authentication = (function () {
  const LOGIN = byClass('log-in')[0];
  const LOGOUT = byClass('log-out')[0];
  const USER_NAME = byClass('user-name')[0];
  const LOGIN_FORM = byId('loginForm');
  const LOGOUT_FORM = byId('userForm');
  const EXTRA_BUTTONS = byClass('addition-buttons');
  const EXTRA_BUTTONS_DETAIL = byId('detail-additional-buttons');

  function getCurrentUser(cb) {
    requests.sendGetHttp('/user').then(
      (res) => {
        if (!res) {
          if (cb) cb();
          return;
        }
        const user = JSON.parse(res).login || null;
        if (cb) cb();
        checkUser(user);
        return user;
      }
    );
  }

  function logIn() {
    const login = LOGIN_FORM.login.value;
    const password = LOGIN_FORM.password.value;
    if (login && password) {
      const user = {
        login,
        password,
      };
      sendLogInRequest(user);
      return;
    }
    const message = 'Empty fields of login and/or password';
    messageService.showMessage(message);
  }

  function logOut() {
    sendLogOutRequest();
  }

  function sendLogInRequest(user) {
    requests.sendPostHttp('/login', user).then(
      (res) => {
        const name = res.login;
        checkUser(name);
      },
      (rej) => {
        const err = JSON.parse(rej);
        messageService.showMessage(err.err);
      }
    );
  }

  function sendLogOutRequest() {
    requests.sendGetHttp('/logout').then(
      () => {
        cleanLogFields();
        checkUser();
      },
      (error) => {
        const err = JSON.parse(error);
        messageService.showMessage(err.err);
      }
    );
  }

  function cleanLogFields() {
    LOGIN_FORM.login.value = '';
    LOGIN_FORM.password.value = '';
  }

  function checkUser(user) {
    if (user) {
      userIn(user);
      return;
    }
    userOut();
  }

  function userIn(user) {
    USER_NAME.textContent = user;
    showLogForm(true);
    showExtraButtons(user);
  }

  function userOut() {
    cleanLogFields();
    showLogForm(false);
    showExtraButtons();
  }

  function showLogForm(param) {
    display(LOGIN, param);
    display(LOGOUT, !param);
  }

  function showExtraButtons(user) {
    if (user) {
      extraButtons(false);
      return;
    }
    extraButtons(true);
  }

  function extraButtons(param) {
    display(EXTRA_BUTTONS_DETAIL, param);
    [].forEach.call(EXTRA_BUTTONS, (item) => {
      display(item, param);
    });
  }

  return {
    getCurrentUser,
    logIn,
    logOut,
  };
}());
