const thumbsUpButton = document.querySelector('.thumbs-up');
const heartButton = document.querySelector('.heart');
const starList = document.querySelector('.star-list');
const ratingButton = document.querySelector('.start-rating-btn');
const cancelButton = document.querySelector('.cancel-rating-btn');
const starArr = document.getElementsByClassName('.star-btn');

thumbsUpButton.addEventListener('click', () => thumbsUpButton.classList.toggle('clicked'));
heartButton.addEventListener('click', () => heartButton.classList.toggle('clicked'));

const toggleRating = () => {
  starList.classList.toggle('is-visible');
  ratingButton.classList.toggle('is-visible');
  cancelButton.classList.toggle('is-visible');
};

ratingButton.addEventListener('click', toggleRating);
cancelButton.addEventListener('click', toggleRating);

// const fillStar = index => {
//   return ({ offsetX, offsetY, target }) => {
//     const { width, height } = target;
//     if (offsetX >= 0 && offsetX < width/2 && offsetY >= 0 && offsetY < height/2) {
//       target.classList
//     }
//   };
// };