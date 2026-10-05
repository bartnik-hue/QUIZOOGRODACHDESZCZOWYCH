// QUIZ O OGRODACH DESZCZOWYCH - KIOSK CONTROLLER
(function () {
  'use strict';

  // State
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let currentScreen = 'start';
  let idleTimer = null;
  let idleCountdownInterval = null;
  let idleSecondsRemaining = 10;
  let isAnswerLocked = false;
  let autoAdvanceTimeout = null;

  // DOM Elements
  const screenStart = document.getElementById('screen-start');
  const screenQuestion = document.getElementById('screen-question');
  const screenFeedback = document.getElementById('screen-feedback');
  const screenScore = document.getElementById('screen-score');
  const screenEnd = document.getElementById('screen-end');
  const bgVideo = document.getElementById('bg-video');
  const bgAudio = document.getElementById('bg-audio');
  const sfxGood = document.getElementById('sfx-good');
  const sfxWrong = document.getElementById('sfx-wrong');

  const btnStartQuiz = document.getElementById('btn-start-quiz');
  const btnNextQuestion = document.getElementById('btn-next-question');
  const btnScoreContinue = document.getElementById('btn-score-continue');
  const btnRestartQuiz = document.getElementById('btn-restart-quiz');

  const qCurrentNum = document.getElementById('q-current-num');
  const qText = document.getElementById('q-text');
  const optionsContainer = document.getElementById('options-container');
  const qBottomHint = document.getElementById('q-bottom-hint');

  const feedbackImg = document.getElementById('feedback-img');
  const feedbackExplanation = document.getElementById('feedback-explanation');

  const scoreMainPoints = document.getElementById('score-main-points');
  const scoreExactCount = document.getElementById('score-exact-count');
  const scoreTierTitle = document.getElementById('score-tier-title');
  const scoreTierDesc = document.getElementById('score-tier-desc');
  const scoreFooterText = document.getElementById('score-footer-text');

  const idleWarning = document.getElementById('idle-warning');
  const idleSecondsSpan = document.getElementById('idle-seconds');

  // -------------------------------------------------------------
  // Randomization (Fisher-Yates Shuffle)
  // -------------------------------------------------------------
  function shuffleQuestions() {
    currentQuestions = [...QUIZ_DATA.questions];
    for (let i = currentQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentQuestions[i], currentQuestions[j]] = [currentQuestions[j], currentQuestions[i]];
    }
  }

  // -------------------------------------------------------------
  // Navigation & Screen transitions
  // -------------------------------------------------------------
  function showScreen(name) {
    currentScreen = name;
    clearTimeout(autoAdvanceTimeout);
    const screens = [screenStart, screenQuestion, screenFeedback, screenScore, screenEnd];
    screens.forEach(s => s.classList.remove('active'));

    if (name === 'start') {
      screenStart.classList.add('active');
    } else if (name === 'question') {
      screenQuestion.classList.add('active');
    } else if (name === 'feedback') {
      screenFeedback.classList.add('active');
    } else if (name === 'score') {
      screenScore.classList.add('active');
    } else if (name === 'end') {
      screenEnd.classList.add('active');
    }

    resetIdleTimer();
  }

  // -------------------------------------------------------------
  // Quiz Lifecycle
  // -------------------------------------------------------------
  function startQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    isAnswerLocked = false;
    renderQuestion();
    showScreen('question');
  }

  function renderQuestion() {
    isAnswerLocked = false;
    clearTimeout(autoAdvanceTimeout);
    const currentQ = currentQuestions[currentQuestionIndex];
    if (!currentQ) return;

    // Natural numbering: 1, 2, 3 ...
    qCurrentNum.textContent = currentQuestionIndex + 1;

    // Text
    qText.textContent = currentQ.question;

    // Hint
    qBottomHint.textContent = 'Wybierz jedną odpowiedź.';

    // Options
    optionsContainer.innerHTML = '';
    currentQ.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.dataset.key = opt.key;
      btn.innerHTML = `
        <span class="option-badge">${opt.key}</span>
        <span class="option-label">${opt.text}</span>
      `;
      btn.addEventListener('click', () => handleOptionClick(opt.key, currentQ));
      optionsContainer.appendChild(btn);
    });
  }

  // -------------------------------------------------------------
  // Sound Effects Controller (good.mp3 / wrong.mp3)
  // -------------------------------------------------------------
  function playSfx(type) {
    try {
      const sfx = (type === 'good') ? sfxGood : sfxWrong;
      if (sfx) {
        sfx.currentTime = 0;
        sfx.volume = 1.0;
        const p = sfx.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      }
    } catch (_) {}
  }

  function handleOptionClick(selectedKey, currentQ) {
    if (isAnswerLocked) return;
    isAnswerLocked = true;
    resetIdleTimer();

    const isCorrect = (selectedKey === currentQ.correct);
    if (isCorrect) {
      score++;
      playSfx('good');
    } else {
      playSfx('wrong');
    }

    // Highlight options immediately
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
      const key = btn.dataset.key;
      if (key === currentQ.correct) {
        btn.classList.add('selected-correct');
      } else if (key === selectedKey && !isCorrect) {
        btn.classList.add('selected-wrong');
      }
    });

    qBottomHint.textContent = isCorrect ? 'Dobra odpowiedź!' : 'Niestety, pomyłka!';

    // Automatic smooth transition to feedback screen
    autoAdvanceTimeout = setTimeout(() => {
      showFeedbackScreen(isCorrect, currentQ, selectedKey);
    }, 650);
  }

  function showFeedbackScreen(isCorrect, currentQ, selectedKey) {
    clearTimeout(autoAdvanceTimeout);
    if (isCorrect) {
      feedbackImg.src = 'assets/dobraodpowiedz.png';
      feedbackImg.alt = 'DOBRA ODPOWIEDŹ! Brawo! Tak trzymaj.';
      feedbackExplanation.style.display = 'none';
    } else {
      feedbackImg.src = 'assets/zlaodpowiedz.png';
      feedbackImg.alt = 'NIESTETY, POMYŁKA! Spróbuj ponownie przy następnym pytaniu.';

      const correctOpt = currentQ.options.find(o => o.key === currentQ.correct);
      if (correctOpt) {
        feedbackExplanation.className = 'feedback-info-box wrong-info';
        feedbackExplanation.innerHTML = `<strong>Prawidłowa odpowiedź (${correctOpt.key}):</strong> ${correctOpt.text}`;
        feedbackExplanation.style.display = 'block';
      } else {
        feedbackExplanation.style.display = 'none';
      }
    }

    const isLastQuestion = (currentQuestionIndex === currentQuestions.length - 1);
    btnNextQuestion.querySelector('span').textContent = isLastQuestion ? 'Zobacz wynik >' : 'Następne pytanie >';

    showScreen('feedback');
  }

  function handleNextQuestion() {
    clearTimeout(autoAdvanceTimeout);
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
      renderQuestion();
      showScreen('question');
    } else {
      showScoreScreen();
    }
  }

  function showScoreScreen() {
    const total = currentQuestions.length;
    scoreExactCount.textContent = `Twój wynik: ${score} / ${total} punktów`;

    let tier = QUIZ_DATA.scoreTiers.find(t => score >= t.min && score <= t.max);
    if (!tier) {
      tier = QUIZ_DATA.scoreTiers[QUIZ_DATA.scoreTiers.length - 1];
    }

    scoreMainPoints.textContent = `${tier.min}–${tier.max} punktów`;
    scoreTierTitle.textContent = tier.title;
    scoreTierDesc.textContent = tier.description;
    scoreFooterText.textContent = tier.footer;

    showScreen('score');
  }

  // -------------------------------------------------------------
  // KIOSK IDLE TIMEOUT (1 MINUTA)
  // -------------------------------------------------------------
  function resetIdleTimer() {
    clearTimeout(idleTimer);
    clearInterval(idleCountdownInterval);
    idleWarning.classList.remove('show');

    // Only active when not on the start screen
    if (currentScreen === 'start') return;

    const timeoutSec = QUIZ_DATA.idleTimeoutSeconds || 60; // 60 sekund
    const warningLeadTimeSec = 10;
    const timeBeforeWarningMs = Math.max(3000, (timeoutSec - warningLeadTimeSec) * 1000);

    idleTimer = setTimeout(() => {
      idleSecondsRemaining = warningLeadTimeSec;
      idleSecondsSpan.textContent = idleSecondsRemaining;
      idleWarning.classList.add('show');

      idleCountdownInterval = setInterval(() => {
        idleSecondsRemaining--;
        idleSecondsSpan.textContent = idleSecondsRemaining;
        if (idleSecondsRemaining <= 0) {
          clearInterval(idleCountdownInterval);
          showScreen('start');
        }
      }, 1000);
    }, timeBeforeWarningMs);
  }

  // Activity listeners
  const activityEvents = ['pointerdown', 'touchstart', 'mousemove', 'keydown', 'scroll'];
  activityEvents.forEach(evt => {
    window.addEventListener(evt, () => {
      resetIdleTimer();
    }, { passive: true });
  });

  // -------------------------------------------------------------
  // KIOSK HARDENING & GESTURE NAVIGATION BLOCK
  // -------------------------------------------------------------
  // Prevent context menu
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // Prevent drag
  window.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Prevent browser zoom with Ctrl + wheel or shortcuts
  window.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  }, { passive: false });

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && ['+', '-', '0', '=', 'r', 'R'].includes(e.key)) {
      e.preventDefault();
    }
    // Block Alt + Left Arrow (History Back)
    if (e.altKey && e.key === 'ArrowLeft') {
      e.preventDefault();
    }
    // Block Backspace from going back if not in an input
    if (e.key === 'Backspace' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
      e.preventDefault();
    }
  });

  // Block swipe-from-edge gesture navigation (Back / Forward gesture)
  try {
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', () => {
      window.history.pushState(null, '', window.location.href);
    });
  } catch (_) {}

  let touchStartX = 0;
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const diffX = Math.abs(touchX - touchStartX);
      const diffY = Math.abs(touchY - touchStartY);

      // Cancel horizontal swipe if initiated near screen edges (edge swipe back)
      if (touchStartX < 70 || touchStartX > window.innerWidth - 70) {
        if (diffX > diffY) {
          e.preventDefault();
        }
      }
    }
  }, { passive: false });

  // -------------------------------------------------------------
  // Event Bindings
  // -------------------------------------------------------------
  btnStartQuiz.addEventListener('click', startQuiz);
  btnNextQuestion.addEventListener('click', handleNextQuestion);
  btnScoreContinue.addEventListener('click', () => showScreen('end'));
  btnRestartQuiz.addEventListener('click', startQuiz);

  // -------------------------------------------------------------
  // Background Audio Controller (bgsound.mp3)
  // -------------------------------------------------------------
  function initBackgroundAudio() {
    // Keep background video muted
    if (bgVideo) {
      bgVideo.muted = true;
      bgVideo.play().catch(() => {});
    }

    // Play soundtrack bgsound.mp3
    if (!bgAudio) return;
    bgAudio.volume = 0.55;
    bgAudio.loop = true;

    // Safety fallback for looping in case browser ends playback
    bgAudio.addEventListener('ended', () => {
      bgAudio.currentTime = 0;
      bgAudio.play().catch(() => {});
    });

    const tryPlayAudio = () => {
      if (!bgAudio.paused) return;
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked by browser policy without user gesture
        });
      }
    };

    // Attempt playback right away
    tryPlayAudio();

    // If browser policy prevents autoplay on startup, unlock audio upon ANY interaction anywhere on the screen
    const unlockEvents = ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'click'];
    const unlockAudio = () => {
      tryPlayAudio();
      if (!bgAudio.paused) {
        unlockEvents.forEach(evt => {
          window.removeEventListener(evt, unlockAudio, true);
        });
      }
    };
    unlockEvents.forEach(evt => {
      window.addEventListener(evt, unlockAudio, { capture: true, passive: true });
    });

    // Also retry playing when window regains visibility/focus
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && bgAudio.paused) {
        tryPlayAudio();
      }
    });
    window.addEventListener('focus', () => {
      if (bgAudio.paused) {
        tryPlayAudio();
      }
    });
  }

  // Initialize
  initBackgroundAudio();
  showScreen('start');
})();
