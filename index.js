const images = [
        'https://adriellaurentino20-source.github.io/lorenaadrielsite/assets/fotolorena01.jpg',
        'https://adriellaurentino20-source.github.io/lorenaadrielsite/assets/fotolorena02.png',
        'https://adriellaurentino20-source.github.io/lorenaadrielsite/assets/fotolorena03.png'
    ];

    const romanceText = document.getElementById('romance-text');
    const mainImage = document.querySelector('.foto-principal');
    const nextButton = document.querySelector('.next-image');
    const backButton = document.querySelector('.back-image');
    const generateBtn = document.getElementById('generate-poem');
    let isGenerating = false;
    let index = 0;

    async function generatePoem() {
        if (isGenerating) return;
        isGenerating = true;
        const originalText = generateBtn.innerHTML;
        generateBtn.innerHTML = '<div class="loading-animation"></div>';

        const prompt = 'Crie um poema de amor romântico, sincero e emotivo com 150 palavras, em português, sobre um casal que se ama profundamente e superou desafios. Inclua referências a momentos de felicidade e a profundidade do sentimento entre os dois. A linguagem deve ser poética e sentimental. Não inclua título. Use quebras de linha (<br>) para formatar o poema.';
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            const result = await response.json();
            const text = result.candidates[0].content.parts[0].text;
            romanceText.innerHTML = text;
        } catch (error) {
            console.error('Erro ao gerar o poema:', error);
            romanceText.innerText = 'Não foi possível gerar um poema agora. Tente novamente mais tarde.';
        } finally {
            isGenerating = false;
            generateBtn.innerHTML = originalText;
        }
    }

    function updateCarousel() {
        mainImage.src = images[index];
    }
    
    nextButton.addEventListener('click', () => {
        index = (index + 1) % images.length;
        updateCarousel();
    });

    backButton.addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
    });

    generateBtn.addEventListener('click', generatePoem);

    updateCarousel();

    function updateTempoNamoro() {
        const start = new Date(2024, 0, 28, 22, 0, 0); 
        const now = new Date();
        let diff = now - start;

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
        playIcon.src = 'https://adriellaurentino20-source.github.io/lorenaadrielsite/assets/pause.svg';
        playIcon.alt = 'pausar';
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        playIcon.src = 'https://adriellaurentino20-source.github.io/lorenaadrielsite/assets/play.svg';
        playIcon.alt = 'iniciar';
    });

    audio.addEventListener('timeupdate', () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100 || 0;
        barLoaded.style.width = progressPercent + '%';
    });

    muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        audio.muted = isMuted;
        muteIcon.src = isMuted ? 'https://adriellaurentino20-source.github.io/lorenaadrielsite/assets/muted.svg' : 'https://adriellaurentino20-source.github.io/lorenaadrielsite/assets/mute.svg';
        muteIcon.alt = isMuted ? 'desmutar' : 'mutar';
    });

    audio.volume = 0.1;