const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const somHit = new Audio();
somHit.src = 'hit.wav';
const somPulo = new Audio();
somPulo.src = 'pulo.wav';


let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;
  somPulo.play();

  let upInterval = setInterval(() => {
    if (position >= 170) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1200;
  let randomTime = Math.random() * 3000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

 let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) 
    {
      somHit.play();
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      setTimeout(()=> {
        document.body.innerHTML = '<h1 class="game-over">Fim de jogo!</h1>';
      },100);

    
    } else {
      cactusPosition -= 12;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
