const cards = document.querySelectorAll(".card-js"),
  cardNum = cards.length,
  comment = document.querySelector(".game-comment-js"),
  finish = document.querySelector(".game-finish-js"),
  btn = document.querySelector(".btn-js");

let [flippedCard, lockedCard] = [false, false],
  firstCard,
  secondCard;

const FLIP_CN = "flip",
  SHOWING_CN = "showing",
  POP_CN = "game-comment-pop";

function checkSuccessAll() {
  const isAllFlipped = card => {
    return card.classList.contains(FLIP_CN);
  };
  if (Array.from(cards).every(isAllFlipped)) {
    setTimeout(() => {
      finish.classList.add(SHOWING_CN);
    }, 1000);
  }
}

function handleComment() {
  comment.classList.add(POP_CN);
}

function handleReset() {
  [flippedCard, lockedCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function successMatch() {
  firstCard.removeEventListener("click", handleFlip);
  secondCard.removeEventListener("click", handleFlip);
  handleReset();
  handleComment();
  checkSuccessAll();
}

function failedMatch() {
  lockedCard = true;
  setTimeout(() => {
    firstCard.classList.remove(FLIP_CN);
    secondCard.classList.remove(FLIP_CN);
    handleReset();
  }, 500);
}

function handleMatch() {
  const isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? successMatch() : failedMatch();
}

function handleFlip() {
  if (lockedCard) return;
  if (this === firstCard) return;
  this.classList.add(FLIP_CN);
  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    comment.classList.remove(POP_CN);
    handleMatch();
  }
}

Array.from(cards).map(card => {
  const randomCard = Math.ceil(Math.random() * cardNum);
  card.style.order = randomCard;
  card.addEventListener("click", handleFlip);
});

btn.addEventListener("mouseenter", function() {
  btn.innerText = "Yes!";
});

btn.addEventListener("mouseleave", function() {
  btn.innerText = "Play Again?";
});

btn.addEventListener("click", function() {
  window.location.reload();
});
