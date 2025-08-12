const images = [
  'assets/fotolorena01.jpg',
  'assets/fotolorena02.png',
  'assets/fotolorena03.png'
];

const mainImage = document.querySelector('.foto-principal');
const nextButton = document.querySelector('.next-image');
const backButton = document.querySelector('.back-image');
const dotsContainer = document.querySelector('.box-dot');

let index = 0;
let isTransitioning = false;

// Cria as bolinhas do carrossel (dots) dinamicamente
function createDots() {
  dotsContainer.innerHTML = ''; // limpa dots existentes
  images.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === index) dot.classList.add('active');
    dot.addEventListener('click', () => {
      index = i;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });
}

// Preload para evitar delay de imagem
function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
  });
}

// Atualiza imagem, animações e dots
async function updateCarousel() {
  if (isTransitioning) return;
  isTransitioning = true;

  await preloadImage(images[index]);

  // Fade out
  mainImage.style.opacity = 0;

  setTimeout(() => {
    mainImage.src = images[index];
    // Fade in
    mainImage.style.opacity = 1;
    isTransitioning = false;
  }, 300);

  // Controle de botões com animação
  if (index > 0) {
    backButton.style.pointerEvents = 'auto';
    backButton.style.opacity = '1';
    backButton.style.transform = 'translateX(0)';
  } else {
    backButton.style.pointerEvents = 'none';
    backButton.style.opacity = '0';
    backButton.style.transform = 'translateX(-20px)';
  }

  if (index < images.length -1) {
    nextButton.style.pointerEvents = 'auto';
    nextButton.style.opacity = '1';
    nextButton.style.transform = 'translateX(0)';
  } else {
    nextButton.style.pointerEvents = 'none';
    nextButton.style.opacity = '0';
    nextButton.style.transform = 'translateX(20px)';
  }

  // Atualiza dots active
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Eventos dos botões
nextButton.addEventListener('click', () => {
  if (index < images.length - 1) {
    index++;
    updateCarousel();
  }
});

backButton.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

// Inicializações
mainImage.style.transition = 'opacity 0.3s ease';
backButton.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
nextButton.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

createDots();
updateCarousel();


// Contador do tempo de namoro
function updateTempoNamoro() {
  const start = new Date(2024, 0, 28, 22, 0, 0); // 28 jan 2024, 22:00
  const now = new Date();

  let diff = now - start; // diferença em ms

  if (diff < 0) {
    document.querySelector('.time').textContent = "Ainda não começou :D";
    return;
  }

  const segPorMs = 1000;
  const minPorMs = segPorMs * 60;
  const horaPorMs = minPorMs * 60;
  const diaPorMs = horaPorMs * 24;

  const diasTotais = Math.floor(diff / diaPorMs);

  const anos = Math.floor(diasTotais / 365);
  const meses = Math.floor((diasTotais % 365) / 30);
  const dias = (diasTotais % 365) % 30;

  const restoDiaMs = diff % diaPorMs;
  const horas = Math.floor(restoDiaMs / horaPorMs);
  const minutos = Math.floor((restoDiaMs % horaPorMs) / minPorMs);
  const segundos = Math.floor((restoDiaMs % minPorMs) / segPorMs);

  const texto = `${anos} ano${anos !== 1 ? 's' : ''}, ${meses} mes${meses !== 1 ? 'es' : ''} e ${dias} dia${dias !== 1 ? 's' : ''} <br> ${horas}h ${minutos}m ${segundos}s no total`;

  document.querySelector('.time').innerHTML = texto;
}

setInterval(updateTempoNamoro, 1000);
updateTempoNamoro();


const audio = document.querySelector('.audio-player');
const playBtn = document.querySelector('.play');
const muteBtn = document.querySelector('.mute');
const barLoaded = document.querySelector('.bar-loaded');
const playIcon = playBtn.querySelector('img');
const muteIcon = muteBtn.querySelector('img');

let isPlaying = false;
let isMuted = false;

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
});

audio.addEventListener('play', () => {
  isPlaying = true;
  // Troca o ícone play para pause (se quiser, tem que ter uma imagem pause)
  playIcon.src = 'assets/pause.svg'; // você precisa ter essa imagem
  playIcon.alt = 'pausar';
});

audio.addEventListener('pause', () => {
  isPlaying = false;
  playIcon.src = 'assets/play.svg';
  playIcon.alt = 'iniciar';
});

audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100 || 0;
  barLoaded.style.width = progressPercent + '%';
});

muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  audio.muted = isMuted;
  muteIcon.src = isMuted ? 'assets/muted.svg' : 'assets/mute.svg'; // tenha os ícones mute e muted
  muteIcon.alt = isMuted ? 'desmutar' : 'mutar';
});


audio.volume = 0.1