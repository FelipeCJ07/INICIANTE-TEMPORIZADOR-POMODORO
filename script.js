/*
  Este script contém toda a lógica para o funcionamento do Temporizador Pomodoro.
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos do DOM ---
    // Seleciona todos os elementos da página que serão manipulados.
    const body = document.getElementById('body');
    const timerDisplay = document.getElementById('timer-display');
    const startPauseBtn = document.getElementById('start-pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const focusBtn = document.getElementById('focus-btn');
    const breakBtn = document.getElementById('break-btn');
    const focusTimeInput = document.getElementById('focus-time');
    const breakTimeInput = document.getElementById('break-time');
    const progressRing = document.getElementById('progress-ring');
    const originalTitle = document.title;

    // --- Estado do Temporizador ---
    let countdown; // Variável para o setInterval
    let isRunning = false; // Indica se o temporizador está rodando
    let isPaused = false; // Indica se o temporizador está pausado
    let currentMode = 'focus'; // Modo atual: 'focus' ou 'break'
    
    let focusTime = 25 * 60; // Tempo de foco padrão em segundos
    let breakTime = 5 * 60; // Tempo de pausa padrão em segundos
    let totalTime = focusTime; // Tempo total do ciclo atual
    let timeLeft = focusTime; // Tempo restante no ciclo atual
    
    // --- Configuração da Barra de Progresso Circular ---
    const radius = progressRing.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    progressRing.style.strokeDasharray = circumference;

    // --- Sintetizador de Som (usando Tone.js) ---
    const synth = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
    }).toDestination();

    function playNotificationSound() {
        // Garante que o contexto de áudio seja iniciado por um gesto do usuário
        if (Tone.context.state !== 'running') {
            Tone.start();
        }
        const now = Tone.now();
        // Toca duas notas para o alerta
        synth.triggerAttackRelease('C5', '8n', now);
        synth.triggerAttackRelease('G5', '8n', now + 0.2);
    }

    // --- Funções Principais do Temporizador ---
    function timer(seconds) {
        clearInterval(countdown);
        isRunning = true;
        isPaused = false;
        
        const now = Date.now();
        const then = now + seconds * 1000;

        displayTimeLeft(seconds); // Atualiza a UI imediatamente

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            if (secondsLeft < 0) {
                clearInterval(countdown);
                isRunning = false;
                playNotificationSound();
                switchMode(); // Muda para o próximo modo (foco/pausa)
                return;
            }
            timeLeft = secondsLeft;
            displayTimeLeft(timeLeft);
        }, 1000);
    }
    
    function pauseTimer() {
        if (!isRunning) return;
        clearInterval(countdown);
        isRunning = false;
        isPaused = true;
        startPauseBtn.textContent = 'Continuar';
    }

    function startTimer() {
        if (isRunning) return;
        // Se estiver pausado, continua de onde parou. Senão, inicia um novo ciclo.
        timer(isPaused ? timeLeft : (currentMode === 'focus' ? focusTime : breakTime));
        isPaused = false;
        startPauseBtn.textContent = 'Pausar';
    }

    function resetTimer() {
        clearInterval(countdown);
        isRunning = false;
        isPaused = false;
        timeLeft = currentMode === 'focus' ? focusTime : breakTime;
        totalTime = timeLeft;
        displayTimeLeft(timeLeft);
        startPauseBtn.textContent = 'Iniciar';
    }

    function switchMode() {
        currentMode = currentMode === 'focus' ? 'break' : 'focus';
        updateTheme();
        resetTimer();
        startTimer(); // Inicia automaticamente a próxima fase
    }

    // --- Funções de Atualização da UI ---
    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        
        timerDisplay.textContent = display;
        // Atualiza o título da página para mostrar o tempo
        document.title = `${display} - ${currentMode === 'focus' ? 'Foco' : 'Pausa'} | ${originalTitle}`;
        updateProgress();
    }

    function updateProgress() {
        const offset = circumference - (timeLeft / totalTime) * circumference;
        // Garante que o offset não seja NaN se totalTime for 0
        progressRing.style.strokeDashoffset = isNaN(offset) ? circumference : offset;
    }

    function updateTheme() {
        const isFocus = currentMode === 'focus';
        
        // Atualiza a cor de fundo
        body.classList.toggle('bg-gray-900', isFocus);
        body.classList.toggle('bg-blue-900', !isFocus);
        
        // Atualiza a cor da barra de progresso
        progressRing.classList.toggle('text-cyan-400', isFocus);
        progressRing.classList.toggle('text-green-400', !isFocus);
        
        // Atualiza o estilo dos botões de modo
        focusBtn.classList.toggle('bg-cyan-500', isFocus);
        focusBtn.classList.toggle('text-white', isFocus);
        focusBtn.classList.toggle('text-gray-400', !isFocus);
        
        breakBtn.classList.toggle('bg-green-500', !isFocus);
        breakBtn.classList.toggle('text-white', !isFocus);
        breakBtn.classList.toggle('text-gray-400', isFocus);
    }
    
    // --- Event Listeners (Ouvintes de Eventos) ---
    startPauseBtn.addEventListener('click', () => {
        if (isRunning && !isPaused) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    resetBtn.addEventListener('click', resetTimer);

    focusBtn.addEventListener('click', () => {
        if (currentMode === 'focus' || isRunning) return;
        currentMode = 'focus';
        updateTheme();
        resetTimer();
    });

    breakBtn.addEventListener('click', () => {
        if (currentMode === 'break' || isRunning) return;
        currentMode = 'break';
        updateTheme();
        resetTimer();
    });

    focusTimeInput.addEventListener('change', (e) => {
        const newTime = parseInt(e.target.value, 10);
        if (newTime >= 1 && newTime <= 90) {
            focusTime = newTime * 60;
            if (currentMode === 'focus' && !isRunning) {
                resetTimer();
            }
        } else {
            e.target.value = focusTime / 60; // Reverte se o valor for inválido
        }
    });

    breakTimeInput.addEventListener('change', (e) => {
        const newTime = parseInt(e.target.value, 10);
        if (newTime >= 1 && newTime <= 30) {
            breakTime = newTime * 60;
             if (currentMode === 'break' && !isRunning) {
                resetTimer();
            }
        } else {
            e.target.value = breakTime / 60; // Reverte se o valor for inválido
        }
    });

    // --- Configuração Inicial ---
    // Define o tema e o temporizador para o estado inicial ao carregar a página.
    updateTheme();
    resetTimer();
});
