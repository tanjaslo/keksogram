const SERVER_GET_URL = 'https://22.javascript.pages.academy/kekstagram/data';
const SERVER_POST_URL = 'https://22.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onError) => {
  fetch(SERVER_GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw 'Не удалось загрузить данные';
    })
    .then(onSuccess)
    .catch(onError);
};

const sendData = (onSuccess, onFail, body) => {
  fetch(SERVER_POST_URL, {
      method: 'POST',
      credentials: 'same-origin',
      body: body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData }
