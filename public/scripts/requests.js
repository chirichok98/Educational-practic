const requests = (function () {
  function sendGetHttp(url) {
    return new Promise((resolve, reject) => {
      const oReq = new XMLHttpRequest();

      const spinner = byId('loader');
      display(spinner, false);

      oReq.open('GET', url);
      oReq.addEventListener('load', handle);
      function handle() {
        if (this.status === 200) {
          resolve(this.response);
          oReq.removeEventListener('load', handle);
          return;
        }
        const error = { err: 'Troubles with getting answer from server' };
        reject(JSON.stringify(error));
      }

      oReq.onerror = function () {
        reject(new Error('Network Error'));
      };

      oReq.send();
    });
  }

  function sendPostHttp(url, article) {
    return new Promise((resolve, reject) => {
      const oReq = new XMLHttpRequest();
      oReq.open('POST', url);
      oReq.setRequestHeader('content-type', 'application/json');
      oReq.addEventListener('load', handle);
      function handle() {
        if (this.status === 200) {
          resolve(JSON.parse(this.response));
          oReq.removeEventListener('load', handle);
          return;
        }
        const error = this.response;
        reject(error);
      }

      oReq.onerror = function () {
        reject(new Error("Article isn't valid"));
      };

      oReq.send(JSON.stringify(article));
    });
  }

  function sendPutHttp(url, article) {
    return new Promise((resolve, reject) => {
      const oReq = new XMLHttpRequest();
      oReq.open('PUT', url);
      oReq.setRequestHeader('content-type', 'application/json');
      oReq.addEventListener('load', handle);
      function handle() {
        if (this.status === 200) {
          resolve();
          oReq.removeEventListener('load', handle);
          return;
        }
        const error = this.response;
        reject(error);
      }

      oReq.onerror = function () {
        reject(new Error("Article isn't valid"));
      };
      oReq.send(JSON.stringify(article));
    });
  }

  function sendDeleteHttp(url) {
    return new Promise((resolve, reject) => {
      const oReq = new XMLHttpRequest();
      oReq.open('DELETE', url);
      oReq.addEventListener('load', handle);
      function handle() {
        if (this.status === 200) {
          resolve();
          oReq.removeEventListener('load', handle);
          return;
        }
        const error = { err: 'Troubles with deleting. It may be server error' };
        reject(JSON.stringify(error));
      }

      oReq.onerror = function () {
        reject(new Error('Network error'));
      };

      oReq.send();
    });
  }

  return {
    sendGetHttp,
    sendPostHttp,
    sendPutHttp,
    sendDeleteHttp,
  };
}());
