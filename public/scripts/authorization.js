const authorization = (function () {
  const NONE = 'display-none';
  const LOGIN = byClass('log-in')[0];
  const LOGOUT = byClass('log-out')[0];
  const USER_NAME = byClass('user-name')[0];
  const LOGIN_FORM = byId('loginForm');
  const LOGOUT_FORM = byId('userForm');
  const EXTRA_BUTTONS = byClass('addition-buttons');
  const EXTRA_BUTTONS_DETAIL = byId('detail-additional-buttons');

  function startUser(cb) {
    requests.sendGetHttp('/user').then(
      (res) => {
        if (!res) {
          cb();
          return;
        }
        res = JSON.parse(res);
        const user = res.login || null;
        cb();
        checkUser(user);
      },
      // TODO server can't send username
      () => console.log
    );
  }

  function logInFunc() {
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
    // TODO message about empty fields of login or password
    console.log('Empty fields of login and/or password');
  }

  function logOutFunc() {
    sendLogOutRequest();
  }

  function sendLogInRequest(user) {
    requests.sendPostHttp('/login', user).then(
      (res) => {
        const name = res.login;
        checkUser(name);
      },
      // TODO message about invalid user information
      rej => console.log
    );
  }

  function sendLogOutRequest() {
    requests.sendGetHttp('/logout').then(
      () => {
        cleanLogFields();
        checkUser();
        // TODO go away from add or edit form
      },
      // TODO message about error with logouting
      () => console.log
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
    LOGIN_FORM.login.value = '';
    LOGIN_FORM.password.value = '';
    showLogForm(false);
    showExtraButtons();
  }

  function showLogForm(param) {
    LOGIN.classList.toggle(NONE, param);
    LOGOUT.classList.toggle(NONE, !param);
  }

  function showExtraButtons(user) {
    if (user) {
      extraButtons(false);
      return;
    }
    extraButtons(true);
  }

  function extraButtons(param) {
    EXTRA_BUTTONS_DETAIL.classList.toggle(NONE, param);
    [].forEach.call(EXTRA_BUTTONS, (item) => {
      item.classList.toggle(NONE, param);
    });
  }

  return {
    startUser,
    logInFunc,
    logOutFunc,
    checkUser,
  };
}());
