const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadFileElement = document.querySelector('#upload-file');
const previewElement = document.querySelector('.img-upload__preview img');

uploadFileElement.addEventListener('change', () => {
  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  }
});
