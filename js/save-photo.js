const savePhoto = (formElement, onSuccess, onError) =>
  fetch(
    'https://25.javascript.pages.academy/kekstagram', {
      method : 'POST',
      credentials: 'same-origin',
      body: new FormData(formElement),
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch((err) => {
      onError(err);
    });

export {savePhoto};
