const SERVER_GET_URL = 'https://22.javascript.pages.academy/kekstagram/data';
const SERVER_POST_URL = 'https://22.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(SERVER_GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw 'Не удалось загрузить данные';
    })
    .then(onSuccess)
    .catch(onFail);
};

const sendData = (onSuccess, onError, body) => {
  fetch(SERVER_POST_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      throw 'Не удалось загрузить данные :(';
    })
    .catch(onError);
};

export { getData, sendData }
