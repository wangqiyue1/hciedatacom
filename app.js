/**
 * 极速刷题 - iPhone & 移动端智能答题核心逻辑 (升级版)
 * 包含：实时正确率显示、一键清空记录重新测试、做题/背题模式无缝切换
 */
(function () {
  'use strict';

  // ==================== Storage Keys ====================
  const STORAGE_BANKS_KEY = 'quiz_app_banks_v1';
  const STORAGE_ACTIVE_BANK_KEY = 'quiz_app_active_bank_v1';
  const STORAGE_PROGRESS_KEY = 'quiz_app_progress_v1';
  const STORAGE_SETTINGS_KEY = 'quiz_app_settings_v1';

  // ==================== Default Settings ====================
  const defaultSettings = {
    shuffle_options: true,
    auto_next: true,
    auto_next_delay: 500,
    auto_mistake: true,
    sound_haptic: true,
    theme: 'auto',
    font_scale: '1.0'
  };

  // ==================== App State ====================
  const state = {
    banks: [],
    currentBankId: 'default_hcie',
    currentBank: null,
    mode: 'seq', // 'seq' | 'study' | 'random' | 'mistakes' | 'favorites' | 'exam'
    questions: [],
    currentIndex: 0,
    currentQuestion: null,
    displayOptions: [],
    displayAnswer: '',
    userAnswers: {},
    multiSelected: new Set(),
    mistakes: new Set(),
    favorites: new Set(),
    progressIndex: 0,
    settings: Object.assign({}, defaultSettings),
    autoNextTimer: null
  };

  // ==================== DOM Elements ====================
  const views = {
    home: document.getElementById('view-home'),
    practice: document.getElementById('view-practice'),
    import: document.getElementById('view-import'),
    settings: document.getElementById('view-settings')
  };

  const header = {
    title: document.getElementById('header-title-text'),
    btnBack: document.getElementById('btn-back-home'),
    btnPalette: document.getElementById('btn-open-palette'),
    btnRetest: document.getElementById('btn-retest-practice')
  };

  const tabBtns = document.querySelectorAll('.tab-btn');

  const practiceDom = {
    btnModeDo: document.getElementById('btn-mode-do'),
    btnModeStudy: document.getElementById('btn-mode-study'),
    accuracyBadge: document.getElementById('practice-accuracy-badge'),
    progressFill: document.getElementById('practice-progress-fill'),
    typeBadge: document.getElementById('q-type-badge'),
    modeBadge: document.getElementById('q-mode-badge'),
    currentIdx: document.getElementById('q-current-idx'),
    totalCount: document.getElementById('q-total-count'),
    title: document.getElementById('q-title'),
    optionsContainer: document.getElementById('q-options-container'),
    btnMultiSubmit: document.getElementById('btn-submit-multichoice'),
    explanationCard: document.getElementById('q-explanation-card'),
    correctAnswerText: document.getElementById('q-correct-answer-text'),
    userResultText: document.getElementById('q-user-result-text'),
    explanationBody: document.getElementById('q-explanation-body'),
    btnPrev: document.getElementById('btn-prev-q'),
    btnNext: document.getElementById('btn-next-q'),
    btnFav: document.getElementById('btn-toggle-favorite'),
    favLabel: document.getElementById('fav-btn-label'),
    btnPalette: document.getElementById('btn-show-palette'),
    scrollWrapper: document.getElementById('question-scroll-wrapper')
  };

  const modals = {
    palette: document.getElementById('modal-palette'),
    guide: document.getElementById('modal-guide'),
    exam: document.getElementById('modal-exam-result')
  };
  // ==================== Audio & Toast ====================
  let audioCtx = null;
  function playBeep(type) {
    if (!state.settings.sound_haptic) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      if (type === 'tap') {
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now); osc.stop(now + 0.04);
      } else if (type === 'correct') {
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now); osc.stop(now + 0.18);
        if (navigator.vibrate) navigator.vibrate(25);
      } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(220, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now); osc.stop(now + 0.15);
        if (navigator.vibrate) navigator.vibrate([40, 30, 40]);
      }
    } catch (e) {}
  }

  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('toast-notify');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
  }

  // ==================== Question Banks & Progress ====================
  function initQuestionBanks() {
    let savedBanks = [];
    try {
      const raw = localStorage.getItem(STORAGE_BANKS_KEY);
      if (raw) savedBanks = JSON.parse(raw);
    } catch (e) {}

    const hasDefault = savedBanks.some(b => b.id === 'default_hcie');
    if (!hasDefault && window.DEFAULT_QUESTIONS && window.DEFAULT_QUESTIONS.length > 0) {
      savedBanks.unshift({
        id: 'default_hcie',
        title: 'HCIE-Datacom 认证题库',
        desc: '数通高级新题库 — 单选、多选、判断、填空与匹配全集解析',
        count: window.DEFAULT_QUESTIONS.length,
        questions: window.DEFAULT_QUESTIONS,
        created_at: new Date().toISOString()
      });
    }

    state.banks = savedBanks;
    const savedActiveId = localStorage.getItem(STORAGE_ACTIVE_BANK_KEY);
    if (savedActiveId && state.banks.some(b => b.id === savedActiveId)) {
      state.currentBankId = savedActiveId;
    } else if (state.banks.length > 0) {
      state.currentBankId = state.banks[0].id;
    }

    saveBanksToStorage();
    setCurrentBank(state.currentBankId);
  }

  function saveBanksToStorage() {
    try {
      localStorage.setItem(STORAGE_BANKS_KEY, JSON.stringify(state.banks));
      localStorage.setItem(STORAGE_ACTIVE_BANK_KEY, state.currentBankId);
    } catch (e) {}
  }

  function setCurrentBank(bankId) {
    state.currentBankId = bankId;
    state.currentBank = state.banks.find(b => b.id === bankId) || state.banks[0] || null;
    localStorage.setItem(STORAGE_ACTIVE_BANK_KEY, bankId);
    loadProgress();
    updateHomeDashboard();
    renderBanksList();
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_PROGRESS_KEY + '_' + state.currentBankId);
      if (raw) {
        const data = JSON.parse(raw);
        state.progressIndex = data.progressIndex || 0;
        state.userAnswers = data.userAnswers || {};
        state.mistakes = new Set(data.mistakes || []);
        state.favorites = new Set(data.favorites || []);
      } else {
        state.progressIndex = 0;
        state.userAnswers = {};
        state.mistakes = new Set();
        state.favorites = new Set();
      }
    } catch (e) {
      state.progressIndex = 0;
      state.userAnswers = {};
      state.mistakes = new Set();
      state.favorites = new Set();
    }
  }

  function saveProgress() {
    if (!state.currentBankId) return;
    try {
      const data = {
        progressIndex: state.progressIndex,
        userAnswers: state.userAnswers,
        mistakes: Array.from(state.mistakes),
        favorites: Array.from(state.favorites),
        updated_at: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_PROGRESS_KEY + '_' + state.currentBankId, JSON.stringify(data));
    } catch (e) {}
  }
  // ==================== Settings ====================
  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_SETTINGS_KEY);
      if (raw) state.settings = Object.assign({}, defaultSettings, JSON.parse(raw));
    } catch (e) {}

    document.getElementById('setting-shuffle-options').checked = state.settings.shuffle_options;
    document.getElementById('setting-auto-next').checked = state.settings.auto_next;
    document.getElementById('setting-auto-delay').value = String(state.settings.auto_next_delay);
    document.getElementById('setting-auto-mistake').checked = state.settings.auto_mistake;
    document.getElementById('setting-sound-haptic').checked = state.settings.sound_haptic;
    document.getElementById('setting-theme').value = state.settings.theme;
    document.getElementById('setting-font-scale').value = state.settings.font_scale;
    applyThemeAndFont();
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(state.settings));
    } catch (e) {}
    applyThemeAndFont();
  }

  function applyThemeAndFont() {
    if (state.settings.theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (state.settings.theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
    document.documentElement.style.setProperty('--font-scale', state.settings.font_scale);
  }

  // ==================== View Switcher ====================
  function switchView(viewName) {
    Object.keys(views).forEach(name => {
      if (views[name]) views[name].classList.toggle('active', name === viewName);
    });

    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === viewName);
    });

    if (viewName === 'home') {
      header.title.textContent = '极速刷题';
      header.btnBack.style.display = 'none';
      header.btnPalette.style.display = 'none';
      header.btnRetest.style.display = 'none';
      updateHomeDashboard();
    } else if (viewName === 'practice') {
      const modeTitles = {
        seq: '顺序做题', study: '背题模式', random: '随机乱序',
        mistakes: '错题专练', favorites: '我的收藏', exam: '模拟考试'
      };
      header.title.textContent = modeTitles[state.mode] || '练习';
      header.btnBack.style.display = 'flex';
      header.btnPalette.style.display = 'flex';
      header.btnRetest.style.display = 'flex';
      updatePracticeAccuracyBadge();
    } else if (viewName === 'import') {
      header.title.textContent = '题库中心';
      header.btnBack.style.display = 'none';
      header.btnPalette.style.display = 'none';
      header.btnRetest.style.display = 'none';
      renderBanksList();
    } else if (viewName === 'settings') {
      header.title.textContent = '设置与帮助';
      header.btnBack.style.display = 'none';
      header.btnPalette.style.display = 'none';
      header.btnRetest.style.display = 'none';
    }
  }

  // ==================== Real-time Accuracy Calculation ====================
  function updatePracticeAccuracyBadge() {
    let answered = 0, correct = 0;
    state.questions.forEach(q => {
      const r = state.userAnswers[q.id];
      if (r && r.answered) {
        answered++;
        if (r.isCorrect) correct++;
      }
    });

    if (answered === 0) {
      practiceDom.accuracyBadge.textContent = '正确率: 100%';
      practiceDom.accuracyBadge.className = 'badge-tag green';
    } else {
      const pct = Math.round((correct / answered) * 100);
      practiceDom.accuracyBadge.textContent = `正确率: ${pct}% (${correct}/${answered})`;
      practiceDom.accuracyBadge.className = `badge-tag ${pct >= 80 ? 'green' : pct >= 60 ? 'purple' : 'red'}`;
    }
  }

  function updateHomeDashboard() {
    if (!state.currentBank) return;
    document.getElementById('home-bank-title').textContent = state.currentBank.title;
    document.getElementById('home-bank-count').textContent = state.currentBank.count + ' 题';
    document.getElementById('home-bank-desc').textContent = state.currentBank.desc || '随时随地，在 iPhone 上高效刷题';

    document.getElementById('stat-progress-text').textContent = `进度: ${Math.min(state.progressIndex + 1, state.currentBank.count)} / ${state.currentBank.count}`;
    document.getElementById('stat-mistake-count').textContent = `${state.mistakes.size} 道待复习`;
    document.getElementById('stat-favorite-count').textContent = `${state.favorites.size} 道重点题`;

    let totalAnswered = 0, correctCount = 0, wrongCount = 0;
    Object.values(state.userAnswers).forEach(r => {
      if (r.answered) {
        totalAnswered++;
        if (r.isCorrect) correctCount++;
        else wrongCount++;
      }
    });

    const percent = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    document.getElementById('stat-overall-percent').textContent = `正确率 ${percent}%`;
    document.getElementById('stat-answered-num').textContent = totalAnswered;
    document.getElementById('stat-correct-num').textContent = correctCount;
    document.getElementById('stat-wrong-num').textContent = wrongCount;
  }

  // ==================== Retest / Clear Records ====================
  function handleRetestSession() {
    if (confirm('🔄 确定要清空当前的做题记录并重新开始测试吗？\n（将从第 1 题开始，重置答题卡与正确率）')) {
      state.userAnswers = {};
      state.progressIndex = 0;
      state.currentIndex = 0;
      saveProgress();
      updateHomeDashboard();
      updatePracticeAccuracyBadge();
      renderCurrentQuestion();
      showToast('做题记录已重置，重新开始测试 🚀');
    }
  }

  header.btnRetest.addEventListener('click', handleRetestSession);
  document.getElementById('btn-home-retest').addEventListener('click', handleRetestSession);

  // ==================== Start Practice ====================
  function startPractice(mode) {
    if (!state.currentBank || !state.currentBank.questions || state.currentBank.questions.length === 0) {
      showToast('当前题库为空，请先导入题目');
      return;
    }

    state.mode = mode;
    const allQuestions = state.currentBank.questions;

    if (mode === 'seq' || mode === 'study') {
      state.questions = [...allQuestions];
      state.currentIndex = Math.min(state.progressIndex, state.questions.length - 1);
    } else if (mode === 'random') {
      state.questions = shuffleArray([...allQuestions]);
      state.currentIndex = 0;
    } else if (mode === 'mistakes') {
      const mistakeList = allQuestions.filter(q => state.mistakes.has(q.id));
      if (mistakeList.length === 0) {
        showToast('太棒了！当前没有任何错题记录 🎉');
        return;
      }
      state.questions = mistakeList;
      state.currentIndex = 0;
    } else if (mode === 'favorites') {
      const favList = allQuestions.filter(q => state.favorites.has(q.id));
      if (favList.length === 0) {
        showToast('收藏夹还是空的，练习时点击“收藏”即可添加 ⭐');
        return;
      }
      state.questions = favList;
      state.currentIndex = 0;
    } else if (mode === 'exam') {
      const examCount = Math.min(50, allQuestions.length);
      state.questions = shuffleArray([...allQuestions]).slice(0, examCount);
      state.currentIndex = 0;
    }

    // Update Segmented Mode Buttons
    updateModeSegmentUI();

    switchView('practice');
    renderCurrentQuestion();
  }

  function updateModeSegmentUI() {
    const isStudy = state.mode === 'study';
    practiceDom.btnModeDo.classList.toggle('active', !isStudy);
    practiceDom.btnModeStudy.classList.toggle('active', isStudy);
  }

  // Segmented Mode Switcher Taps
  practiceDom.btnModeDo.addEventListener('click', () => {
    if (state.mode === 'study') {
      state.mode = 'seq';
      updateModeSegmentUI();
      renderCurrentQuestion();
      showToast('已切换至：✍️ 做题模式');
    }
  });

  practiceDom.btnModeStudy.addEventListener('click', () => {
    if (state.mode !== 'study') {
      state.mode = 'study';
      updateModeSegmentUI();
      renderCurrentQuestion();
      showToast('已切换至：💡 背题模式（直接看答案解析）');
    }
  });

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  // ==================== Render Current Question ====================
  function renderCurrentQuestion() {
    clearTimeout(state.autoNextTimer);
    if (!state.questions || state.questions.length === 0) return;

    state.currentQuestion = state.questions[state.currentIndex];
    const q = state.currentQuestion;

    if (state.mode === 'seq' || state.mode === 'study') {
      state.progressIndex = state.currentIndex;
      saveProgress();
    }

    practiceDom.scrollWrapper.scrollTop = 0;
    const progressPercent = ((state.currentIndex + 1) / state.questions.length) * 100;
    practiceDom.progressFill.style.width = `${progressPercent}%`;

    const typeNames = { single: '单选题', multiple: '多选题', judge: '判断题', fill: '填空题', drag: '匹配题' };
    practiceDom.typeBadge.textContent = q.type_name || typeNames[q.type] || '选择题';
    practiceDom.currentIdx.textContent = state.currentIndex + 1;
    practiceDom.totalCount.textContent = state.questions.length;

    const modeLabels = { seq: '顺序练习', random: '随机乱序', mistakes: '错题专练', favorites: '我的收藏', exam: '模拟考试', study: '背题模式' };
    practiceDom.modeBadge.textContent = modeLabels[state.mode] || '练习';
    practiceDom.title.textContent = q.title;

    // Update Accuracy badge
    updatePracticeAccuracyBadge();

    // Option Shuffling (Disable shuffle when in Study Mode so it's clean A/B/C/D order)
    let optionsToDisplay = [];
    let mappedAnswer = (q.answer || '').toUpperCase().trim();

    if (q.options && q.options.length > 0) {
      if (state.settings.shuffle_options && state.mode !== 'study') {
        const originalWithIdx = q.options.map((opt, idx) => ({
          originalKey: opt.key || String.fromCharCode(65 + idx),
          text: opt.text
        }));

        const shuffled = shuffleArray(originalWithIdx);
        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        optionsToDisplay = shuffled.map((opt, idx) => ({
          key: alphabet[idx] || String(idx + 1),
          originalKey: opt.originalKey,
          text: opt.text
        }));

        const origAnsLetters = mappedAnswer.split('');
        const newAnsLetters = [];
        optionsToDisplay.forEach(opt => {
          if (origAnsLetters.includes(opt.originalKey)) newAnsLetters.push(opt.key);
        });
        mappedAnswer = newAnsLetters.sort().join('');
      } else {
        optionsToDisplay = q.options.map((opt, idx) => ({
          key: opt.key || String.fromCharCode(65 + idx),
          originalKey: opt.key || String.fromCharCode(65 + idx),
          text: opt.text
        }));
      }
    }

    state.displayOptions = optionsToDisplay;
    state.displayAnswer = mappedAnswer;
    state.multiSelected.clear();

    const existingRecord = state.userAnswers[q.id];
    const isStudyMode = state.mode === 'study';

    renderOptionsList(existingRecord, isStudyMode);

    if (isStudyMode || (existingRecord && existingRecord.answered)) {
      showExplanation(existingRecord ? existingRecord.isCorrect : true);
    } else {
      hideExplanation();
    }

    updateFavoriteButton();
    practiceDom.btnPrev.style.opacity = state.currentIndex === 0 ? '0.5' : '1';
    practiceDom.btnNext.style.opacity = state.currentIndex === state.questions.length - 1 ? '0.7' : '1';
  }

  function renderOptionsList(existingRecord, isStudyMode) {
    practiceDom.optionsContainer.innerHTML = '';
    const q = state.currentQuestion;
    const isMulti = q.type === 'multiple' || state.displayAnswer.length > 1;
    practiceDom.btnMultiSubmit.style.display = (isMulti && !existingRecord?.answered && !isStudyMode) ? 'flex' : 'none';

    state.displayOptions.forEach(opt => {
      const optEl = document.createElement('div');
      optEl.className = 'option-item';
      optEl.dataset.key = opt.key;

      const isRightKey = state.displayAnswer.includes(opt.key);

      optEl.innerHTML = `
        <div class="option-circle">${opt.key}</div>
        <div class="option-text">${escapeHtml(opt.text)}</div>
      `;

      if (isStudyMode) {
        // Study Mode: Direct Answer Highlight
        if (isRightKey) {
          optEl.classList.add('correct');
        }
      } else if (existingRecord && existingRecord.answered) {
        const userChoice = existingRecord.selected || '';
        if (isRightKey) {
          optEl.classList.add('correct');
        } else if (userChoice.includes(opt.key)) {
          optEl.classList.add('wrong');
        }
      }

      optEl.addEventListener('click', () => handleOptionClick(opt.key, optEl));
      practiceDom.optionsContainer.appendChild(optEl);
    });
  }

  function handleOptionClick(key, optEl) {
    const q = state.currentQuestion;
    if (!q) return;

    if (state.mode === 'study') {
      showToast('💡 当前为背题模式，直接浏览答案与解析');
      return;
    }

    if (state.userAnswers[q.id] && state.userAnswers[q.id].answered) return;

    const isMulti = q.type === 'multiple' || state.displayAnswer.length > 1;
    if (isMulti) {
      playBeep('tap');
      if (state.multiSelected.has(key)) {
        state.multiSelected.delete(key);
        optEl.classList.remove('selected');
      } else {
        state.multiSelected.add(key);
        optEl.classList.add('selected');
      }
    } else {
      playBeep('tap');
      const isCorrect = key === state.displayAnswer;
      submitAnswer(key, isCorrect);
    }
  }

  function submitAnswer(userChoiceStr, isCorrect) {
    const q = state.currentQuestion;
    if (!q) return;

    state.userAnswers[q.id] = {
      selected: userChoiceStr,
      isCorrect: isCorrect,
      answered: true,
      answered_at: new Date().toISOString()
    };

    if (!isCorrect && state.settings.auto_mistake) {
      state.mistakes.add(q.id);
    } else if (isCorrect && state.mode === 'mistakes') {
      state.mistakes.delete(q.id);
    }
    saveProgress();
    updatePracticeAccuracyBadge();

    const allOptionEls = practiceDom.optionsContainer.querySelectorAll('.option-item');
    allOptionEls.forEach(el => {
      const k = el.dataset.key;
      el.classList.remove('selected');
      if (state.displayAnswer.includes(k)) el.classList.add('correct');
      else if (userChoiceStr.includes(k)) el.classList.add('wrong');
    });

    practiceDom.btnMultiSubmit.style.display = 'none';
    showExplanation(isCorrect);

    if (isCorrect) {
      playBeep('correct');
      if (state.settings.auto_next) {
        clearTimeout(state.autoNextTimer);
        const delay = parseInt(state.settings.auto_next_delay, 10) || 500;
        state.autoNextTimer = setTimeout(() => nextQuestion(), delay);
      }
    } else {
      playBeep('wrong');
    }
  }

  practiceDom.btnMultiSubmit.addEventListener('click', () => {
    if (state.multiSelected.size === 0) {
      showToast('请至少选择一个选项');
      return;
    }
    const selectedKeys = Array.from(state.multiSelected).sort().join('');
    const isCorrect = selectedKeys === state.displayAnswer;
    submitAnswer(selectedKeys, isCorrect);
  });

  function showExplanation(isCorrect) {
    const q = state.currentQuestion;
    if (!q) return;
    practiceDom.correctAnswerText.textContent = state.displayAnswer || q.answer || '无';
    practiceDom.userResultText.textContent = state.mode === 'study' ? '参考答案' : (isCorrect ? '回答正确 ✓' : '回答错误 ✗');
    practiceDom.userResultText.className = `badge-tag ${state.mode === 'study' ? 'blue' : (isCorrect ? 'green' : 'red')}`;
    practiceDom.explanationBody.textContent = q.explanation || '本题暂无详细解析';
    practiceDom.explanationCard.classList.add('show');
  }

  function hideExplanation() {
    practiceDom.explanationCard.classList.remove('show');
  }

  function updateFavoriteButton() {
    const q = state.currentQuestion;
    if (!q) return;
    const isFav = state.favorites.has(q.id);
    practiceDom.btnFav.classList.toggle('active', isFav);
    practiceDom.favLabel.textContent = isFav ? '已收藏' : '收藏';
  }

  practiceDom.btnFav.addEventListener('click', () => {
    const q = state.currentQuestion;
    if (!q) return;
    playBeep('tap');
    if (state.favorites.has(q.id)) {
      state.favorites.delete(q.id);
      showToast('已取消收藏');
    } else {
      state.favorites.add(q.id);
      showToast('已加入收藏 ⭐');
    }
    saveProgress();
    updateFavoriteButton();
  });

  function nextQuestion() {
    clearTimeout(state.autoNextTimer);
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex++;
      renderCurrentQuestion();
    } else {
      if (state.mode === 'exam') finishExam();
      else showToast('已是本轮最后一题 🏁');
    }
  }

  function prevQuestion() {
    clearTimeout(state.autoNextTimer);
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderCurrentQuestion();
    } else {
      showToast('已经是第一题了');
    }
  }

  practiceDom.btnNext.addEventListener('click', () => { playBeep('tap'); nextQuestion(); });
  practiceDom.btnPrev.addEventListener('click', () => { playBeep('tap'); prevQuestion(); });

  // Swipe Gestures
  let touchStartX = 0, touchStartY = 0;
  practiceDom.scrollWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  practiceDom.scrollWrapper.addEventListener('touchend', (e) => {
    const diffX = e.changedTouches[0].screenX - touchStartX;
    const diffY = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX < 0) nextQuestion();
      else prevQuestion();
    }
  }, { passive: true });

  window.addEventListener('keydown', (e) => {
    if (!views.practice.classList.contains('active')) return;
    if (e.key === 'ArrowRight') nextQuestion();
    else if (e.key === 'ArrowLeft') prevQuestion();
  });
  // ==================== Question Palette ====================
  function openPalette() {
    const grid = document.getElementById('palette-grid-container');
    grid.innerHTML = '';

    state.questions.forEach((q, idx) => {
      const btn = document.createElement('div');
      btn.className = 'palette-btn-item';
      btn.textContent = idx + 1;

      const record = state.userAnswers[q.id];
      if (idx === state.currentIndex) btn.classList.add('current');
      if (record && record.answered) {
        btn.classList.add(record.isCorrect ? 'correct' : 'wrong');
      }

      btn.addEventListener('click', () => {
        playBeep('tap');
        state.currentIndex = idx;
        closeModal(modals.palette);
        renderCurrentQuestion();
      });

      grid.appendChild(btn);
    });

    openModal(modals.palette);
  }

  practiceDom.btnPalette.addEventListener('click', openPalette);
  header.btnPalette.addEventListener('click', openPalette);
  document.getElementById('btn-close-palette').addEventListener('click', () => closeModal(modals.palette));

  function finishExam() {
    let correctCount = 0;
    state.questions.forEach(q => {
      const r = state.userAnswers[q.id];
      if (r && r.answered && r.isCorrect) correctCount++;
    });

    const score = Math.round((correctCount / state.questions.length) * 100);
    const pass = score >= 60;

    document.getElementById('exam-score-display').textContent = score;
    document.getElementById('exam-score-display').style.color = pass ? 'var(--ios-blue)' : 'var(--ios-red)';

    const passBadge = document.getElementById('exam-pass-badge');
    passBadge.textContent = pass ? '恭喜通过 🎉' : '未达及格线';
    passBadge.className = `badge-tag ${pass ? 'green' : 'red'}`;

    document.getElementById('exam-accuracy-text').textContent = `${score}%`;
    document.getElementById('exam-time-text').textContent = '完成';
    document.getElementById('exam-wrong-count-text').textContent = (state.questions.length - correctCount);

    openModal(modals.exam);
  }

  document.getElementById('btn-close-exam').addEventListener('click', () => {
    closeModal(modals.exam);
    switchView('home');
  });

  document.getElementById('btn-review-exam-mistakes').addEventListener('click', () => {
    closeModal(modals.exam);
    startPractice('mistakes');
  });

  function openModal(modal) { if (modal) modal.classList.add('show'); }
  function closeModal(modal) { if (modal) modal.classList.remove('show'); }

  Object.values(modals).forEach(m => {
    m.addEventListener('click', (e) => { if (e.target === m) closeModal(m); });
  });

  document.getElementById('btn-show-install-guide').addEventListener('click', () => openModal(modals.guide));
  document.getElementById('btn-close-guide').addEventListener('click', () => closeModal(modals.guide));
  header.btnBack.addEventListener('click', () => switchView('home'));

  document.querySelectorAll('.dash-mode-card').forEach(card => {
    card.addEventListener('click', () => {
      playBeep('tap');
      startPractice(card.dataset.mode);
    });
  });

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playBeep('tap');
      switchView(btn.dataset.tab);
    });
  });

  // ==================== Import Page ====================
  const fileDropZone = document.getElementById('file-drop-zone');
  const fileInput = document.getElementById('file-upload-input');
  const pasteTextInput = document.getElementById('paste-text-input');
  const btnParseText = document.getElementById('btn-parse-text');
  const customBankNameInput = document.getElementById('custom-bank-name-input');
  const banksListContainer = document.getElementById('banks-list-container');

  document.querySelectorAll('[data-import-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-import-tab]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const isUpload = btn.dataset.importTab === 'upload';
      document.getElementById('panel-import-upload').style.display = isUpload ? 'block' : 'none';
      document.getElementById('panel-import-banks').style.display = isUpload ? 'none' : 'block';
    });
  });

  fileDropZone.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = file.name;
    showToast(`正在读取 ${fileName}...`);

    try {
      if (fileName.endsWith('.json')) {
        const text = await file.text();
        const json = JSON.parse(text);
        const questions = Array.isArray(json) ? json : json.questions || [];
        if (questions.length > 0) saveNewBank(fileName.replace('.json', ''), questions);
        else showToast('JSON 中未找到题目');
      } else if (fileName.endsWith('.docx')) {
        if (window.mammoth) {
          const arrayBuffer = await file.arrayBuffer();
          const result = await window.mammoth.extractRawText({ arrayBuffer: arrayBuffer });
          const parsed = parseQuestionsFromText(result.value);
          if (parsed.length > 0) saveNewBank(fileName.replace('.docx', ''), parsed);
          else showToast('Word 文件中未识别出题目');
        } else {
          showToast('Word 解析引擎加载中，请稍后');
        }
      } else {
        const text = await file.text();
        const parsed = parseQuestionsFromText(text);
        if (parsed.length > 0) saveNewBank(fileName.replace(/\.[^/.]+$/, ''), parsed);
        else showToast('未识别出题目内容');
      }
    } catch (err) {
      showToast('导入失败: ' + err.message);
    }
    fileInput.value = '';
  });

  btnParseText.addEventListener('click', () => {
    const text = pasteTextInput.value.trim();
    if (!text) { showToast('请先输入题目文本'); return; }
    const parsed = parseQuestionsFromText(text);
    if (parsed.length === 0) { showToast('未识别到题目'); return; }
    const name = customBankNameInput.value.trim() || `导入题库 (${parsed.length}题)`;
    saveNewBank(name, parsed);
    pasteTextInput.value = '';
    customBankNameInput.value = '';
  });

  document.getElementById('btn-fill-template').addEventListener('click', () => {
    pasteTextInput.value = `1.【单选题】交换机工作在OSI模型的哪一层？\nA. 物理层\nB. 数据链路层\nC. 网络层\nD. 传输层\n正确答案：B\n解析：二层交换机工作在数据链路层，根据MAC地址转发。\n\n2.【多选题】以下属于TCP/IP模型应用层协议的有？\nA. HTTP\nB. DNS\nC. IP\nD. FTP\n正确答案：ABD\n解析：IP属于网络层协议。`;
    showToast('已填充范例，点击“智能识别”即可');
  });

  function parseQuestionsFromText(rawText) {
    const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const questions = [];
    let currentQ = null;

    lines.forEach(line => {
      const qMatch = line.match(/^(\d+)[\.、\s]\s*(?:【(.*?)】)?\s*(.*)$/);
      if (qMatch && !line.match(/^[A-Z][\.、\s]/) && !line.startsWith('正确答案') && !line.startsWith('答案') && !line.startsWith('解析')) {
        if (currentQ) questions.push(currentQ);
        const qNum = parseInt(qMatch[1], 10);
        const typeStr = qMatch[2] || '';
        const title = qMatch[3] || line;

        let qType = 'single';
        if (typeStr.includes('多选')) qType = 'multiple';
        else if (typeStr.includes('判断')) qType = 'judge';
        else if (typeStr.includes('填空')) qType = 'fill';
        else if (typeStr.includes('匹配') || typeStr.includes('拖拽')) qType = 'drag';

        currentQ = {
          id: qNum || (questions.length + 1),
          type: qType,
          type_name: typeStr || (qType === 'multiple' ? '多选题' : '单选题'),
          title: title,
          options: [],
          answer: '',
          explanation: ''
        };
        return;
      }

      if (!currentQ) return;

      const optMatch = line.match(/^([A-Z])[\.、\s]\s*(.*)$/);
      if (optMatch && !line.startsWith('正确答案') && !line.startsWith('答案') && !line.startsWith('解析')) {
        currentQ.options.push({ key: optMatch[1], text: optMatch[2] });
        return;
      }

      if (line.startsWith('正确答案') || line.startsWith('答案')) {
        const ans = line.replace(/^(?:正确答案|答案)[：:\s]*/, '').trim();
        currentQ.answer = ans;
        if (ans.length > 1 && currentQ.type !== 'multiple') {
          currentQ.type = 'multiple';
          currentQ.type_name = '多选题';
        }
        return;
      }

      if (line.startsWith('解析') || line.startsWith('【解析】')) {
        currentQ.explanation = line.replace(/^(?:【解析】|解析[（\(].*?[）\)]|解析)[：:\s]*/, '').trim();
        return;
      }

      if (currentQ.explanation) currentQ.explanation += '\n' + line;
      else if (currentQ.options.length > 0 && !currentQ.answer) currentQ.options[currentQ.options.length - 1].text += '\n' + line;
      else if (!currentQ.answer) currentQ.title += '\n' + line;
    });

    if (currentQ) questions.push(currentQ);
    return questions;
  }

  function saveNewBank(title, questions) {
    const newBank = {
      id: 'bank_' + Date.now(),
      title: title,
      desc: `共 ${questions.length} 道题目`,
      count: questions.length,
      questions: questions,
      created_at: new Date().toISOString()
    };

    state.banks.unshift(newBank);
    state.currentBankId = newBank.id;
    saveBanksToStorage();
    setCurrentBank(newBank.id);
    showToast(`成功导入: ${title} (${questions.length}题) 🎉`);
    switchView('home');
  }

  function renderBanksList() {
    banksListContainer.innerHTML = '';
    state.banks.forEach(bank => {
      const item = document.createElement('div');
      item.className = 'ios-list-item';
      const isActive = bank.id === state.currentBankId;

      item.innerHTML = `
        <div class="item-left" style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="item-title" style="font-weight: 600;">${escapeHtml(bank.title)}</div>
            ${isActive ? '<span class="badge-tag blue">使用中</span>' : ''}
          </div>
          <div class="item-desc">${bank.count} 题 · ${bank.desc || ''}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          ${!isActive ? `<button class="btn-activate header-icon-btn" style="font-size: 13px;">选择</button>` : ''}
          ${bank.id !== 'default_hcie' ? `<button class="btn-delete header-icon-btn" style="color: var(--ios-red); font-size: 13px;">删除</button>` : ''}
        </div>
      `;

      const btnActivate = item.querySelector('.btn-activate');
      if (btnActivate) {
        btnActivate.addEventListener('click', (e) => {
          e.stopPropagation();
          setCurrentBank(bank.id);
          showToast(`已切换至: ${bank.title}`);
        });
      }

      const btnDelete = item.querySelector('.btn-delete');
      if (btnDelete) {
        btnDelete.addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm(`确定要删除题库「${bank.title}」吗？`)) {
            state.banks = state.banks.filter(b => b.id !== bank.id);
            if (state.currentBankId === bank.id) state.currentBankId = state.banks[0]?.id || '';
            saveBanksToStorage();
            setCurrentBank(state.currentBankId);
            showToast('已删除题库');
          }
        });
      }

      banksListContainer.appendChild(item);
    });
  }

  document.getElementById('btn-export-current-bank').addEventListener('click', () => {
    if (!state.currentBank) return;
    const blob = new Blob([JSON.stringify(state.currentBank, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.currentBank.title}_题库备份.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('题库备份已导出');
  });

  document.getElementById('btn-switch-bank').addEventListener('click', () => {
    switchView('import');
    document.querySelector('[data-import-tab="banks"]').click();
  });

  // Settings
  document.getElementById('setting-shuffle-options').addEventListener('change', (e) => {
    state.settings.shuffle_options = e.target.checked;
    saveSettings();
    showToast(state.settings.shuffle_options ? '已开启选项乱序' : '已关闭选项乱序');
  });

  document.getElementById('setting-auto-next').addEventListener('change', (e) => {
    state.settings.auto_next = e.target.checked;
    saveSettings();
    showToast(state.settings.auto_next ? '已开启答对自动跳转' : '已关闭自动跳转');
  });

  document.getElementById('setting-auto-delay').addEventListener('change', (e) => {
    state.settings.auto_next_delay = parseInt(e.target.value, 10);
    saveSettings();
  });

  document.getElementById('setting-auto-mistake').addEventListener('change', (e) => {
    state.settings.auto_mistake = e.target.checked;
    saveSettings();
  });

  document.getElementById('setting-sound-haptic').addEventListener('change', (e) => {
    state.settings.sound_haptic = e.target.checked;
    saveSettings();
  });

  document.getElementById('setting-theme').addEventListener('change', (e) => {
    state.settings.theme = e.target.value;
    saveSettings();
  });

  document.getElementById('setting-font-scale').addEventListener('change', (e) => {
    state.settings.font_scale = e.target.value;
    saveSettings();
  });

  document.getElementById('btn-reset-mistakes').addEventListener('click', () => {
    if (confirm('确定要清空当前的错题本记录吗？')) {
      state.mistakes.clear();
      saveProgress();
      updateHomeDashboard();
      showToast('错题记录已清空');
    }
  });

  document.getElementById('btn-reset-all-data').addEventListener('click', () => {
    if (confirm('确定要重置当前题库的所有练习记录吗？')) {
      state.progressIndex = 0;
      state.userAnswers = {};
      state.mistakes.clear();
      state.favorites.clear();
      saveProgress();
      updateHomeDashboard();
      showToast('所有练习记录已重置');
    }
  });

  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {});
    });
  }

  // Init
  loadSettings();
  initQuestionBanks();
  switchView('home');
})();
