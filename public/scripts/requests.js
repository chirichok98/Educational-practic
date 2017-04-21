const requests = (function () {
  function sendGetHttp(url) {
    return new Promise((resolve, reject) => {
      const oReq = new XMLHttpRequest();
      oReq.open('GET', url);
      oReq.addEventListener('load', handle);
      function handle() {
        if (this.status === 200) {
          resolve(JSON.parse(this.response));
          oReq.removeEventListener('load', handle);
          return;
        }
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
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
        const error = new Error(this.statusText);
        error.code = this.status;
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
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }

      oReq.onerror = function () {
        reject(new Error("Article isn't valid"));
      };
      console.log(article);
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
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
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
