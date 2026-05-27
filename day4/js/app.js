document.addEventListener('DOMContentLoaded', () => {
  // --- MBTI Question Bank (지표별 각 4개씩 총 16개 질문) ---
  const QUESTION_BANK = {
    EI: [
      {
        text: "주말에 약속이 없다면?",
        optionA: { text: "집에 있는다", scoreEffect: null },
        optionB: { text: "밖에 나가서 사람들을 만난다", scoreEffect: "E" }
      },
      {
        text: "사람이 아주 많은 핫플레이스에 다녀왔을 때 당신의 상태는?",
        optionA: { text: "기를 다 빨려서 빨리 집에 가고 싶다", scoreEffect: null },
        optionB: { text: "신나고 에너지가 충전되는 느낌이다", scoreEffect: "E" }
      },
      {
        text: "새로운 모임에 처음 나갔을 때 당신은 대개 어떤 모습인가요?",
        optionA: { text: "조용히 분위기를 살피며 낯선 대화는 삼가는 편이다", scoreEffect: null },
        optionB: { text: "먼저 반갑게 인사를 건네며 적극적으로 말을 거는 편이다", scoreEffect: "E" }
      },
      {
        text: "휴일에 내 에너지를 가장 빠르게 충전하는 방법은?",
        optionA: { text: "방 안에서 혼자 책을 보거나 유튜브를 감상한다", scoreEffect: null },
        optionB: { text: "친구들에게 전화를 걸어 밖에서 수다를 떨며 논다", scoreEffect: "E" }
      }
    ],
    SN: [
      {
        text: "사과를 생각했을 때 먼저 머릿속에 떠오르는 것은?",
        optionA: { text: "빨갛고 맛있는 과일, 동그란 모양", scoreEffect: "S" },
        optionB: { text: "아이폰, 백설공주, 뉴턴의 중력 법칙", scoreEffect: null }
      },
      {
        text: "드라이브 중 넓고 푸른 초원을 보았을 때 나의 생각은?",
        optionA: { text: "초원이 넓네, 공기가 맑겠다", scoreEffect: "S" },
        optionB: { text: "여기서 좀비 아포칼립스가 발생하면 어떻게 도망치지?", scoreEffect: null }
      },
      {
        text: "소설이나 영화를 볼 때 당신이 더 흥미를 느끼는 포인트는?",
        optionA: { text: "인물 묘사가 현실적이고 디테일이 살아있는 웰메이드 극", scoreEffect: "S" },
        optionB: { text: "상상조차 해보지 못한 우주, 타임슬립 등의 기발한 판타지", scoreEffect: null }
      },
      {
        text: "새로운 스마트 기기를 구매했을 때 당신의 행동은?",
        optionA: { text: "사용 설명서를 꼼꼼하게 읽어보고 기능을 정확히 쓴다", scoreEffect: "S" },
        optionB: { text: "이것저것 대충 만져보며 직관적으로 기능을 파악한다", scoreEffect: null }
      }
    ],
    TF: [
      {
        text: "친구에게 우울해서 화분을 샀다는 이야기를 들었을 때 나의 반응은?",
        optionA: { text: "무슨 화분 샀어? 키우기 쉬운 거야?", scoreEffect: "T" },
        optionB: { text: "왜 우울해? 무슨 일 있었어? 화분 이쁘다", scoreEffect: null }
      },
      {
        text: "친구가 '나 시험에서 떨어졌어...'라고 슬퍼할 때 나의 첫마디는?",
        optionA: { text: "무슨 시험이었는데? 몇 점 차이로 떨어진 거야?", scoreEffect: "T" },
        optionB: { text: "어떡해... 많이 노력했는데 속상하겠다...", scoreEffect: null }
      },
      {
        text: "친구가 갑작스런 사고 소식을 카톡으로 보냈을 때 당신의 머릿속에 먼저 드는 생각은?",
        optionA: { text: "상황은 수습됐어? 다친 곳은? 보험은 불렀어?", scoreEffect: "T" },
        optionB: { text: "아이고, 엄청 놀랐겠다! 다치지 않았길 바라는데 ㅠㅠ", scoreEffect: null }
      },
      {
        text: "갈등을 해결할 때 논리와 사실 규명 vs 감정과 조화 중 무엇이 우선인가요?",
        optionA: { text: "명백한 원인 규명과 잘잘못을 가리는 팩트체크", scoreEffect: "T" },
        optionB: { text: "서로 상처받지 않도록 기분을 살피는 둥근 해결책", scoreEffect: null }
      }
    ],
    JP: [
      {
        text: "친구들과 여행 계획을 세울 때 나의 평소 모습은?",
        optionA: { text: "시간대별 일정과 식당 동선까지 꼼꼼히 채운다", scoreEffect: "J" },
        optionB: { text: "비행기 표랑 숙소만 정해두고 현지에서 끌리는 대로 다닌다", scoreEffect: null }
      },
      {
        text: "갑자기 오늘 저녁 약속이 파토 났을 때 나의 반응은?",
        optionA: { text: "오늘 저녁에 하려던 계획이 다 흐트러져서 당황스럽다", scoreEffect: "J" },
        optionB: { text: "오히려 좋아! 혼자만의 여유로운 시간을 즐긴다", scoreEffect: null }
      },
      {
        text: "중요 과제나 보고서의 마감이 다음 주까지일 때 당신의 스타일은?",
        optionA: { text: "일정표를 미리 짜두고 매일 조금씩 완성해 나간다", scoreEffect: "J" },
        optionB: { text: "느긋하게 있다가 마감 직전 초인적인 벼락치기로 완료한다", scoreEffect: null }
      },
      {
        text: "나에게 있어 계획이란?",
        optionA: { text: "반드시 지켜서 목표를 성취하기 위한 이정표", scoreEffect: "J" },
        optionB: { text: "언제든지 바뀔 수 있는 유동적인 가이드라인", scoreEffect: null }
      }
    ]
  };

  // 16가지 MBTI 유형 판정 및 설명 데이터 (유머 상황별 응답 예시 추가)
  const MBTI_RESULTS = {
    "ISTJ": { 
      title: "청렴결백한 논리주의자", 
      desc: "매사에 철저하고 현실적이며 책임감이 매우 강합니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "이미 대피소 위치와 비상식량 칼로리 계산을 마치고 조용히 생존 모드로 돌입함. (구조 계획서 작성 완료)"
    },
    "ISFJ": { 
      title: "용감한 수호자", 
      desc: "주변 사람들을 따뜻하게 수호하고 헌신적으로 보살핍니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "모두를 구하겠다며 가방에 비상약품과 구급 상자, 초콜릿을 가득 채우고 다치지 말라고 잔소리하는 중."
    },
    "INFJ": { 
      title: "선의의 옹호자", 
      desc: "조용하고 신비로우며 마음 깊은 곳에서 사람들을 이끕니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "좀비 사태 이면에 숨겨진 인류의 종말론과 인간 본성에 대한 철학적 성찰에 혼자 깊이 잠겨있음."
    },
    "INTJ": { 
      title: "용의주도한 전략가", 
      desc: "체계적이고 상상력이 풍부하며 목표를 향해 전략을 세웁니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "이미 3년 전 독자적으로 구축한 좀비 방어 쉘터 매뉴얼 17조 4항을 실행하며, 예견된 일이었다는 듯 태연함."
    },
    "ISTP": { 
      title: "만능 재주꾼", 
      desc: "대담하고 현실적인 도구 제작자로, 직접 몸으로 부딪치며 탐구합니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "창고에서 전기톱과 무기를 개조해 최강의 킬링 머신을 뚝딱 만들고 무표정으로 헤드폰을 쓴 채 밖으로 나감."
    },
    "ISFP": { 
      title: "호기심 많은 예술가", 
      desc: "항상 새로운 영감을 찾아 헤매는 온화하고 유연한 예술가입니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "\"밖은 위험하니까...\" 일단 침대에 누워 넷플릭스 영화를 보며 세상의 종말을 이불 속에서 감상함."
    },
    "INFP": { 
      title: "열정적인 중재자", 
      desc: "이타주의적이고 상냥하며 본인의 가치관을 충실히 지켜나갑니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "좀비가 된 이웃의 슬픔에 공감하다가 좀비와 눈이 마주쳐 비명을 지르며 세상에서 가장 빠른 속도로 도망침."
    },
    "INTP": { 
      title: "논리적인 사색가", 
      desc: "끊임없이 새로운 아이디어를 갈구하는 혁신가이자 연구가입니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "방구석에서 좀비 바이러스의 감염 경로와 DNA 염기서열을 인터넷으로 분석하며 백신 제조 가설을 세움."
    },
    "ESTP": { 
      title: "모험을 즐기는 사업가", 
      desc: "벼랑 끝에서도 여유를 부리는 대담한 모험가이며 실행력이 빠릅니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "신나서 좀비 물리치는 라이브 스트리밍을 켜고 \"구독과 좋아요 누르면 좀비 헤드샷 갑니다!\" 외치는 중."
    },
    "ESFP": { 
      title: "자유로운 영혼의 연예인", 
      desc: "인생을 축제처럼 즐기며 주위 사람들을 행복하게 만들어 줍니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "어차피 한 번 사는 인생 맛있는 거나 실컷 먹자며 백화점 식품관 털이 크루를 조직해 맛집 투어 중."
    },
    "ENFP": { 
      title: "재기발랄한 활동가", 
      desc: "열정적이고 창의적이며 항상 사람들과 새로운 가능성을 찾습니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "\"영화 속 진짜 좀비다!\" 라며 신기해하다가 마주친 생존자들에게 \"좀비 구경 갈 파티원 모집해요!\" 함."
    },
    "ENTP": { 
      title: "뜨거운 논쟁을 즐기는 변론가", 
      desc: "지적인 도전을 마다하지 않는 개척자이며 똑똑하고 호기심이 많습니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "포획한 좀비에게 \"인간의 뇌를 섭취할 때의 만족도와 영양적 가치\"에 대해 1:1 토론을 시도하고 있음."
    },
    "ESTJ": { 
      title: "엄격한 관리자", 
      desc: "사물과 사람을 조직하고 이끄는데 탁월한 질서의 옹호자입니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "피난민들을 모아 즉각 자치 정부를 조직하고, 대장 완장을 찬 뒤 생존 보초 야간 당직 근무표를 엑셀로 작성함."
    },
    "ESFJ": { 
      title: "사교적인 외교관", 
      desc: "동정심이 많고 친절하며 집단의 화합을 이루기 위해 헌신합니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "생존 대피소 구석구석 사람들의 안부를 묻고 삼겹살 파티를 준비해 다 같이 부둥켜안고 울며 화합을 다짐."
    },
    "ENFJ": { 
      title: "정의로운 사회운동가", 
      desc: "카리스마와 깊은 배려로 타인을 격려하고 더 나은 세상을 만듭니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "\"우리는 결코 포기하지 않습니다!\" 생존자 대피소 연단 위로 올라가 눈물겨운 대국민 희망 연설을 진행함."
    },
    "ENTJ": { 
      title: "대담한 지도자", 
      desc: "강한 통솔력을 바탕으로 목표를 조직적으로 지휘하여 쟁취합니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "생존 정예 요원들을 이끌고 군 기지의 탱크와 헬기를 징발, 좀비 무리를 일망타진할 대규모 군사 소탕 작전 지휘."
    }
  };

  // --- State Management ---
  let currentQuestionIndex = 0;
  let currentQuestions = []; // 현재 테스트에 선정된 8개 질문
  
  // E, S, T, J 각 지표의 점수용으로 0으로 시작하는 변수 선언
  let scoreE = 0;
  let scoreS = 0;
  let scoreT = 0;
  let scoreJ = 0;

  // --- DOM Elements ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const startBtn = document.getElementById('start-btn');
  
  const startScreen = document.getElementById('start-screen');
  const questionScreen = document.getElementById('question-screen');
  const resultScreen = document.getElementById('result-screen');

  const progressFill = document.getElementById('progress-fill');
  const questionNumber = document.getElementById('question-number');
  const questionText = document.getElementById('question-text');
  
  const optionA = document.getElementById('option-a');
  const optionB = document.getElementById('option-b');
  const optionAText = document.getElementById('option-a-text');
  const optionBText = document.getElementById('option-b-text');

  // Result screen elements
  const mbtiTypeBadge = document.getElementById('mbti-type-badge');
  const mbtiTypeTitle = document.getElementById('mbti-type-title');
  const mbtiTypeDesc = document.getElementById('mbti-type-desc');
  const restartBtn = document.getElementById('restart-btn');
  
  // Character Image element
  const mbtiTypeImg = document.getElementById('mbti-type-img');
  
  // Humor Card elements
  const humorSituation = document.getElementById('humor-situation');
  const humorBehavior = document.getElementById('humor-behavior');

  const scoreEFill = document.getElementById('score-e-fill');
  const scoreSFill = document.getElementById('score-s-fill');
  const scoreTFill = document.getElementById('score-t-fill');
  const scoreJFill = document.getElementById('score-j-fill');

  const scoreELabel = document.getElementById('score-e-label');
  const scoreSLabel = document.getElementById('score-s-label');
  const scoreTLabel = document.getElementById('score-t-label');
  const scoreJLabel = document.getElementById('score-j-label');

  // --- Theme Toggle Setup ---
  const savedTheme = localStorage.getItem('mbti_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeUI(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('mbti_theme', newTheme);
    updateThemeUI(newTheme);
  });

  function updateThemeUI(theme) {
    const icon = themeToggleBtn.querySelector('.theme-icon');
    const text = themeToggleBtn.querySelector('.theme-text');
    if (theme === 'dark') {
      icon.textContent = '☀️';
      text.textContent = '라이트 모드';
    } else {
      icon.textContent = '🌙';
      text.textContent = '다크 모드';
    }
  }

  // --- Shuffle Helper (Fisher-Yates) ---
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // --- Dynamic Question Set Generation ---
  function generateQuestionSet() {
    currentQuestions = [];
    const categories = ['EI', 'SN', 'TF', 'JP'];
    
    categories.forEach(cat => {
      // 해당 카테고리 4개 질문 중 무작위 2개 추출
      const shuffledBank = shuffleArray(QUESTION_BANK[cat]);
      currentQuestions.push(shuffledBank[0]);
      currentQuestions.push(shuffledBank[1]);
    });
    
    // 전체 8개 질문 세트를 무작위로 한 번 더 셔플
    currentQuestions = shuffleArray(currentQuestions);
  }

  // --- Screen Transition Helper ---
  function transitionToScreen(fromScreen, toScreen) {
    fromScreen.classList.remove('active');
    
    setTimeout(() => {
      fromScreen.style.display = 'none';
      toScreen.style.display = 'flex';
      
      void toScreen.offsetHeight; // force reflow
      toScreen.classList.add('active');
    }, 400);
  }

  // --- Game Flow Functions ---
  function initQuestionScreen() {
    currentQuestionIndex = 0;
    scoreE = 0;
    scoreS = 0;
    scoreT = 0;
    scoreJ = 0;
    
    // 질문 생성 및 셔플
    generateQuestionSet();
    renderQuestion();
  }

  function renderQuestion() {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    
    // Update question details
    questionNumber.textContent = `Q${currentQuestionIndex + 1}`;
    questionText.textContent = currentQuestion.text;

    // 선택지(옵션 A, B) 50% 확률로 셔플
    const originalOptions = [currentQuestion.optionA, currentQuestion.optionB];
    const shuffledOptions = shuffleArray(originalOptions);

    optionAText.textContent = shuffledOptions[0].text;
    optionBText.textContent = shuffledOptions[1].text;
    
    // 엘리먼트에 실제 점수 효과 데이터 심기
    optionA.dataset.scoreEffect = shuffledOptions[0].scoreEffect || '';
    optionB.dataset.scoreEffect = shuffledOptions[1].scoreEffect || '';

    // Update progress bar width
    const progressPercent = (currentQuestionIndex / currentQuestions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
  }

  function handleAnswer(element) {
    const scoreEffect = element.dataset.scoreEffect;
    
    // 점수 기록 규칙 적용
    if (scoreEffect === 'E') scoreE++;
    if (scoreEffect === 'S') scoreS++;
    if (scoreEffect === 'T') scoreT++;
    if (scoreEffect === 'J') scoreJ++;

    console.log(`답변 선택: ${scoreEffect || 'None'} (E:${scoreE}, S:${scoreS}, T:${scoreT}, J:${scoreJ})`);

    // Advance to next question
    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuestions.length) {
      renderQuestion();
    } else {
      // Complete progress bar to 100% before transitioning
      progressFill.style.width = '100%';
      
      // Calculate final MBTI types and display results
      showResult();
    }
  }

  function showResult() {
    // 최종 MBTI 유형 판별 (1점 이상이면 해당 유형, 0점이면 대척점)
    const eOrI = scoreE >= 1 ? 'E' : 'I';
    const sOrN = scoreS >= 1 ? 'S' : 'N';
    const tOrF = scoreT >= 1 ? 'T' : 'F';
    const jOrP = scoreJ >= 1 ? 'J' : 'P';
    
    const finalMBTI = `${eOrI}${sOrN}${tOrF}${jOrP}`;
    
    // 결과 정보 매핑
    const resultInfo = MBTI_RESULTS[finalMBTI] || { 
      title: "신비로운 탐험가", 
      desc: "알 수 없는 새로운 유형입니다.",
      situation: "🚨 좀비 아포칼립스가 발생했을 때 이 유형은?",
      behavior: "좀비를 길들여 보려고 간식을 주다가 쫓겨남."
    };
    
    // 결과 화면 렌더링
    mbtiTypeBadge.textContent = finalMBTI;
    mbtiTypeTitle.textContent = resultInfo.title;
    mbtiTypeDesc.textContent = resultInfo.desc;
    
    // 캐릭터 이미지 동적 바인딩
    mbtiTypeImg.src = `images/mbti_${finalMBTI}.png`;
    mbtiTypeImg.alt = `${finalMBTI} Character Illustration`;
    
    // 유머 예시 반영
    humorSituation.textContent = resultInfo.situation;
    humorBehavior.textContent = resultInfo.behavior;
    
    // 점수 비주얼라이저 바 반영 (0점: 0%, 1점: 50%, 2점: 100%)
    const percentE = (scoreE / 2) * 100;
    const percentS = (scoreS / 2) * 100;
    const percentT = (scoreT / 2) * 100;
    const percentJ = (scoreJ / 2) * 100;
    
    scoreEFill.style.width = `${percentE}%`;
    scoreSFill.style.width = `${percentS}%`;
    scoreTFill.style.width = `${percentT}%`;
    scoreJFill.style.width = `${percentJ}%`;
    
    // 텍스트 라벨 업데이트
    scoreELabel.innerHTML = `외향성 (E) <span style="font-weight: 400; font-size: 0.8rem; color: var(--text-muted);">${scoreE} / 2점 (${percentE}%)</span>`;
    scoreSLabel.innerHTML = `감각성 (S) <span style="font-weight: 400; font-size: 0.8rem; color: var(--text-muted);">${scoreS} / 2점 (${percentS}%)</span>`;
    scoreTLabel.innerHTML = `사고성 (T) <span style="font-weight: 400; font-size: 0.8rem; color: var(--text-muted);">${scoreT} / 2점 (${percentT}%)</span>`;
    scoreJLabel.innerHTML = `판단성 (J) <span style="font-weight: 400; font-size: 0.8rem; color: var(--text-muted);">${scoreJ} / 2점 (${percentJ}%)</span>`;

    // 화면 전환
    transitionToScreen(questionScreen, resultScreen);
  }

  // --- Event Listeners ---
  startBtn.addEventListener('click', () => {
    initQuestionScreen();
    transitionToScreen(startScreen, questionScreen);
  });

  optionA.addEventListener('click', () => handleAnswer(optionA));
  optionB.addEventListener('click', () => handleAnswer(optionB));
  
  restartBtn.addEventListener('click', () => {
    transitionToScreen(resultScreen, startScreen);
  });
});
