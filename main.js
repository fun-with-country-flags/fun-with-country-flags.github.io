// Dark mode
(function initDarkMode() {
  const toggle = document.getElementById('darkModeToggle');
  const saved = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'true' || (saved === null && prefersDark);

  if (isDark) {
    document.body.classList.add('dark');
    toggle.textContent = '🌙';
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const dark = document.body.classList.contains('dark');
    toggle.textContent = dark ? '🌙' : '☀️';
    localStorage.setItem('darkMode', dark);
  });
})();

// Welcome modal
(function initWelcome() {
  const modal = document.getElementById('welcomeModal');
  const startBtn = document.getElementById('startTournament');
  const closeBtn = document.getElementById('closeModal');
  const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');

  if (hasSeenWelcome) {
    modal.classList.add('hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
    localStorage.setItem('hasSeenWelcome', 'true');
  }

  startBtn.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Learn more link
  const learnMore = document.getElementById('learnMore');
  learnMore.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Single-elimination tournament: Each match, one flag advances and one is eliminated. Continue until only one flag remains!');
  });
})();

// Help button
document.getElementById('helpToggle').addEventListener('click', () => {
  document.getElementById('welcomeModal').classList.remove('hidden');
});

// API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8787'
  : 'https://flag-tournament-api.martijnhollestelle.workers.dev';

// Session Management
function getOrCreateSessionId() {
  let sessionId = localStorage.getItem('tournament-session-id');
  if (!sessionId) {
    // Use crypto.randomUUID() if available, otherwise fallback
    if (crypto && crypto.randomUUID) {
      sessionId = crypto.randomUUID();
    } else {
      // Fallback UUID v4 generation
      sessionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    try {
      localStorage.setItem('tournament-session-id', sessionId);
    } catch (e) {
      // localStorage might be disabled
      console.warn('Could not save session ID to localStorage:', e);
    }
  }
  return sessionId;
}

const sessionId = getOrCreateSessionId();

// API Client Functions
async function submitTournamentResult(winnerCode) {
  // Check if already submitted
  if (localStorage.getItem('tournament-submitted')) {
    console.log('Tournament already submitted for this session');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        flagCode: winnerCode,
        sessionId: sessionId
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Vote submitted successfully:', data);
      try {
        localStorage.setItem('tournament-submitted', 'true');
      } catch (e) {
        console.warn('Could not save submission status:', e);
      }
      // Fetch and display leaderboard
      fetchLeaderboard();
    } else {
      const error = await response.json();
      console.error('Failed to submit vote:', error);
    }
  } catch (error) {
    console.error('Error submitting vote:', error);
    // Fail silently - don't block user experience
  }
}

async function fetchLeaderboard(limit = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard?limit=${limit}`);
    if (response.ok) {
      const data = await response.json();
      displayLeaderboard(data.leaderboard, data.totalVotes);
    } else {
      console.error('Failed to fetch leaderboard:', await response.text());
    }
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    // Fail silently
  }
}

function displayLeaderboard(leaderboard, totalVotes) {
  const container = document.getElementById('leaderboard');

  container.innerHTML = `
    <div class="global-leaderboard">
      <h3>Global Leaderboard</h3>
      <div class="leaderboard-stats">
        <p>Based on <span class="total-votes">${totalVotes.toLocaleString()}</span> votes worldwide</p>
      </div>
      <ol class="leaderboard-list">
        ${leaderboard.map(item => `
          <li>
            <span class="flag-info">
              <span class="flag-emoji">${item.emoji}</span>
              <span class="flag-name">${item.flagName}</span>
            </span>
            <span class="vote-count">${item.voteCount.toLocaleString()} votes</span>
          </li>
        `).join('')}
      </ol>
    </div>
  `;
}

const flags = [
  { name:"Afghanistan",emoji:"🇦🇫",code:"af"},{name:"Albania",emoji:"🇦🇱",code:"al"},
  { name:"Algeria",emoji:"🇩🇿",code:"dz"},{name:"Andorra",emoji:"🇦🇩",code:"ad"},
  { name:"Angola",emoji:"🇦🇴",code:"ao"},{name:"Argentina",emoji:"🇦🇷",code:"ar"},
  { name:"Armenia",emoji:"🇦🇲",code:"am"},{name:"Australia",emoji:"🇦🇺",code:"au"},
  { name:"Austria",emoji:"🇦🇹",code:"at"},{name:"Azerbaijan",emoji:"🇦🇿",code:"az"},
  { name:"Bahamas",emoji:"🇧🇸",code:"bs"},{name:"Bahrain",emoji:"🇧🇭",code:"bh"},
  { name:"Bangladesh",emoji:"🇧🇩",code:"bd"},{name:"Belarus",emoji:"🇧🇾",code:"by"},
  { name:"Belgium",emoji:"🇧🇪",code:"be"},{name:"Bolivia",emoji:"🇧🇴",code:"bo"},
  { name:"Bosnia",emoji:"🇧🇦",code:"ba"},{name:"Botswana",emoji:"🇧🇼",code:"bw"},
  { name:"Brazil",emoji:"🇧🇷",code:"br"},{name:"Bulgaria",emoji:"🇧🇬",code:"bg"},
  { name:"Cambodia",emoji:"🇰🇭",code:"kh"},{name:"Cameroon",emoji:"🇨🇲",code:"cm"},
  { name:"Canada",emoji:"🇨🇦",code:"ca"},{name:"Chile",emoji:"🇨🇱",code:"cl"},
  { name:"China",emoji:"🇨🇳",code:"cn"},{name:"Colombia",emoji:"🇨🇴",code:"co"},
  { name:"Costa Rica",emoji:"🇨🇷",code:"cr"},{name:"Croatia",emoji:"🇭🇷",code:"hr"},
  { name:"Cuba",emoji:"🇨🇺",code:"cu"},{name:"Cyprus",emoji:"🇨🇾",code:"cy"},
  { name:"Czechia",emoji:"🇨🇿",code:"cz"},{name:"Denmark",emoji:"🇩🇰",code:"dk"},
  { name:"Dominican Republic",emoji:"🇩🇴",code:"do"},{name:"Ecuador",emoji:"🇪🇨",code:"ec"},
  { name:"Egypt",emoji:"🇪🇬",code:"eg"},{name:"El Salvador",emoji:"🇸🇻",code:"sv"},
  { name:"Estonia",emoji:"🇪🇪",code:"ee"},{name:"Ethiopia",emoji:"🇪🇹",code:"et"},
  { name:"Finland",emoji:"🇫🇮",code:"fi"},{name:"France",emoji:"🇫🇷",code:"fr"},
  { name:"Georgia",emoji:"🇬🇪",code:"ge"},{name:"Germany",emoji:"🇩🇪",code:"de"},
  { name:"Ghana",emoji:"🇬🇭",code:"gh"},{name:"Greece",emoji:"🇬🇷",code:"gr"},
  { name:"Guatemala",emoji:"🇬🇹",code:"gt"},{name:"Honduras",emoji:"🇭🇳",code:"hn"},
  { name:"Hungary",emoji:"🇭🇺",code:"hu"},{name:"Iceland",emoji:"🇮🇸",code:"is"},
  { name:"India",emoji:"🇮🇳",code:"in"},{name:"Indonesia",emoji:"🇮🇩",code:"id"},
  { name:"Iran",emoji:"🇮🇷",code:"ir"},{name:"Iraq",emoji:"🇮🇶",code:"iq"},
  { name:"Ireland",emoji:"🇮🇪",code:"ie"},{name:"Israel",emoji:"🇮🇱",code:"il"},
  { name:"Italy",emoji:"🇮🇹",code:"it"},{name:"Jamaica",emoji:"🇯🇲",code:"jm"},
  { name:"Japan",emoji:"🇯🇵",code:"jp"},{name:"Jordan",emoji:"🇯🇴",code:"jo"},
  { name:"Kazakhstan",emoji:"🇰🇿",code:"kz"},{name:"Kenya",emoji:"🇰🇪",code:"ke"},
  { name:"Kuwait",emoji:"🇰🇼",code:"kw"},{name:"Latvia",emoji:"🇱🇻",code:"lv"},
  { name:"Lebanon",emoji:"🇱🇧",code:"lb"},{name:"Lithuania",emoji:"🇱🇹",code:"lt"},
  { name:"Luxembourg",emoji:"🇱🇺",code:"lu"},{name:"Malaysia",emoji:"🇲🇾",code:"my"},
  { name:"Mexico",emoji:"🇲🇽",code:"mx"},{name:"Moldova",emoji:"🇲🇩",code:"md"},
  { name:"Morocco",emoji:"🇲🇦",code:"ma"},{name:"Netherlands",emoji:"🇳🇱",code:"nl"},
  { name:"New Zealand",emoji:"🇳🇿",code:"nz"},{name:"Nigeria",emoji:"🇳🇬",code:"ng"},
  { name:"North Macedonia",emoji:"🇲🇰",code:"mk"},{name:"Norway",emoji:"🇳🇴",code:"no"},
  { name:"Oman",emoji:"🇴🇲",code:"om"},{name:"Pakistan",emoji:"🇵🇰",code:"pk"},
  { name:"Panama",emoji:"🇵🇦",code:"pa"},{name:"Paraguay",emoji:"🇵🇾",code:"py"},
  { name:"Peru",emoji:"🇵🇪",code:"pe"},{name:"Philippines",emoji:"🇵🇭",code:"ph"},
  { name:"Poland",emoji:"🇵🇱",code:"pl"},{name:"Portugal",emoji:"🇵🇹",code:"pt"},
  { name:"Qatar",emoji:"🇶🇦",code:"qa"},{name:"Romania",emoji:"🇷🇴",code:"ro"},
  { name:"Saudi Arabia",emoji:"🇸🇦",code:"sa"},{name:"Serbia",emoji:"🇷🇸",code:"rs"},
  { name:"Singapore",emoji:"🇸🇬",code:"sg"},{name:"Slovakia",emoji:"🇸🇰",code:"sk"},
  { name:"Slovenia",emoji:"🇸🇮",code:"si"},{name:"South Africa",emoji:"🇿🇦",code:"za"},
  { name:"South Korea",emoji:"🇰🇷",code:"kr"},{name:"Spain",emoji:"🇪🇸",code:"es"},
  { name:"Sweden",emoji:"🇸🇪",code:"se"},{name:"Switzerland",emoji:"🇨🇭",code:"ch"},
  { name:"Thailand",emoji:"🇹🇭",code:"th"},{name:"Tunisia",emoji:"🇹🇳",code:"tn"},
  { name:"Turkey",emoji:"🇹🇷",code:"tr"},{name:"Ukraine",emoji:"🇺🇦",code:"ua"},
  { name:"United Arab Emirates",emoji:"🇦🇪",code:"ae"},{name:"United Kingdom",emoji:"🇬🇧",code:"gb"},
  { name:"United States",emoji:"🇺🇸",code:"us"},{name:"Uruguay",emoji:"🇺🇾",code:"uy"},
  { name:"Uzbekistan",emoji:"🇺🇿",code:"uz"},{name:"Venezuela",emoji:"🇻🇪",code:"ve"},
  { name:"Vietnam",emoji:"🇻🇳",code:"vn"},{name:"Zimbabwe",emoji:"🇿🇼",code:"zw"}
];

// OS detection - Windows doesn't render flag emojis natively
const isWindows = /Windows/i.test(navigator.userAgent);

// Image cache for preloaded flags
const imageCache = {};

// Preload all flag images on Windows
function preloadFlags() {
  if (!isWindows) return;
  flags.forEach(flag => {
    const img = new Image();
    img.src = `https://flagcdn.com/w160/${flag.code}.png`;
    img.onload = () => { imageCache[flag.code] = img; };
  });
}

// Render flag as emoji or image based on OS
function renderFlag(flag, size = 'normal') {
  if (!isWindows) {
    return flag.emoji;
  }
  const width = size === 'large' ? 160 : 80;
  const cached = imageCache[flag.code];
  const loadedClass = cached ? 'loaded' : '';
  return `<img src="https://flagcdn.com/w160/${flag.code}.png" 
          alt="${flag.name} flag" 
          class="${loadedClass}"
          onload="this.classList.add('loaded')" 
          width="${width}">`;
}

let currentRound = [...flags];
let nextRound = [];
let eliminated = [];
let matchIndex = 0;
let roundNumber = 1;
const totalRounds = Math.ceil(Math.log2(flags.length));
// Total matches in the entire tournament = n - 1 (single elimination)
const totalMatchesInTournament = flags.length - 1;
let completedMatches = 0;

// Calculate matches per round based on actual tournament structure
function getMatchesPerRound() {
  const rounds = [];
  let remaining = flags.length;
  while (remaining > 1) {
    const matches = Math.floor(remaining / 2);
    rounds.push(matches);
    remaining = Math.ceil(remaining / 2);
  }
  return rounds;
}

const matchesPerRound = getMatchesPerRound();
const totalRoundsCount = matchesPerRound.length;

// Update welcome modal with correct match count
(function updateWelcomeModalMatchCount() {
  const modal = document.getElementById('welcomeModal');
  const matchCountText = modal.querySelector('.modal-features li:last-child');
  if (matchCountText) {
    matchCountText.textContent = `Play ${totalMatchesInTournament} matches to crown your champion`;
  }
})();

// Start preloading on Windows
preloadFlags();

function renderBracket() {
  const container = document.getElementById('bracket');
  if (!container) return;

  let html = '';
  const roundLabels = ['R1', 'R2', 'R3', 'R4', 'QF', 'SF', 'F'];
  
  // Calculate which round we're in and how many completed in current round
  let matchesSoFar = 0;
  let currentRoundIndex = 0;
  let completedInCurrentRound = completedMatches;
  
  for (let r = 0; r < matchesPerRound.length; r++) {
    if (completedMatches >= matchesSoFar + matchesPerRound[r]) {
      matchesSoFar += matchesPerRound[r];
      currentRoundIndex = r + 1;
      completedInCurrentRound = completedMatches - matchesSoFar;
    } else {
      completedInCurrentRound = completedMatches - matchesSoFar;
      currentRoundIndex = r;
      break;
    }
  }
  
  matchesSoFar = 0;
  for (let r = 0; r < matchesPerRound.length; r++) {
    const matchCount = matchesPerRound[r];
    const label = roundLabels[r] || `R${r + 1}`;
    
    html += `<div class="bracket-round">`;
    html += `<div class="bracket-round-header">${label}</div>`;
    html += `<div class="bracket-matches">`;
    
    for (let m = 0; m < matchCount; m++) {
      const globalMatchIndex = matchesSoFar + m;
      const isCompleted = globalMatchIndex < completedMatches;
      const isCurrent = globalMatchIndex === completedMatches && currentRound.length > 1;

      let dotClass = 'bracket-dot';
      if (isCompleted) dotClass += ' completed';
      else if (isCurrent) dotClass += ' current';

      html += `<div class="${dotClass}"></div>`;
    }
    
    html += `</div></div>`;
    matchesSoFar += matchCount;
  }
  
  // Add winner indicator
  const isComplete = currentRound.length === 1;
  html += `<div class="bracket-winner">`;
  html += `<div class="bracket-winner-label">🏆</div>`;
  html += `<div class="bracket-winner-dot${isComplete ? ' champion' : ''}"></div>`;
  html += `</div>`;
  
  container.innerHTML = html;
}

function roundLabel(size) {
  return size === 128 ? "First round" :
         size === 64  ? "Round of 64" :
         size === 32  ? "Round of 32" :
         size === 16  ? "Round of 16" :
         size === 8   ? "Quarter-finals" :
         size === 4   ? "Semi-finals" :
         size === 2   ? "Final" : "";
}

function updateProgressBar() {
  // Progress bar removed - using bracket visualization instead
}

function updateProgressInfo() {
  const counter = document.getElementById('matchCounter');
  const label = document.getElementById('roundLabel');

  if (!counter) return;

  const currentMatch = completedMatches + 1;
  counter.textContent = `Match ${currentMatch} of ${totalMatchesInTournament}`;

  // Add round labels for key rounds
  const remaining = currentRound.length;
  if (remaining === 2) {
    label.textContent = '• Final Match!';
  } else if (remaining === 4) {
    label.textContent = '• Semi-finals';
  } else if (remaining === 8) {
    label.textContent = '• Quarter-finals';
  } else if (remaining === 16) {
    label.textContent = '• Round of 16';
  } else {
    label.textContent = '';
  }
}

function renderMatch() {
  const app = document.getElementById("app");
  const showNames = document.getElementById("toggleNames").checked;
  const controls = document.querySelector(".controls");

  // Render bracket
  renderBracket();

  // Update progress info
  updateProgressInfo();

  if (currentRound.length === 1) {
    controls.style.display = "none";
    // Hide streak and commentary for results
    const streakEl = document.getElementById('streakBar');
    if (streakEl) streakEl.classList.add('hidden');
    const commEl = document.getElementById('matchCommentary');
    if (commEl) commEl.textContent = '';

    const ranking = [currentRound[0], ...eliminated.reverse()];
    const top5 = ranking.slice(0, 5);
    app.innerHTML = `
      <div class="winner">
        <h2>🏆 Tournament Complete!</h2>
        <div class="flag">${renderFlag(ranking[0], 'large')}</div>
        <div class="winner-orbit">
          <span class="orbit-emoji">🏆</span>
          <span class="orbit-emoji">⭐</span>
          <span class="orbit-emoji">🎉</span>
          <span class="orbit-emoji">🌍</span>
          <span class="orbit-emoji">🏅</span>
          <span class="orbit-emoji">✨</span>
        </div>
        <p>${ranking[0].name}</p>
      </div>
      <div class="ranking">
        <h3>Your Top 5 Rankings</h3>
        <p class="ranking-context">Based on how far each flag advanced in the tournament</p>
        <ol>${top5.map((f, i) => {
          let suffix = '';
          if (i === 0) suffix = ' - Champion';
          else if (i === 1) suffix = ' - Finalist';
          return `<li>${renderFlag(f)} ${f.name}${suffix}</li>`;
        }).join("")}</ol>
        <button class="play-again-btn" onclick="playAgain()">Start New Tournament</button>
      </div>
      <div class="results-divider">
        <h3>See How the World Voted</h3>
      </div>
    `;

    // Submit tournament result to API and fetch leaderboard
    submitTournamentResult(ranking[0].code);

    // Launch confetti celebration!
    launchConfetti();

    return;
  }

  // Handle bye: if only one flag left unpaired, auto-advance it
  if (matchIndex >= currentRound.length - 1 && currentRound.length % 2 === 1) {
    nextRound.push(currentRound[matchIndex]);
    currentRound = nextRound;
    nextRound = [];
    matchIndex = 0;
    roundNumber++;
    renderMatch();
    return;
  }

  const a = currentRound[matchIndex];
  const b = currentRound[matchIndex + 1];

  app.innerHTML = `
    <div class="match">
      <div class="flag-card">
        <div class="flag">${renderFlag(a)}</div>
        <button onclick="pickWinner(${matchIndex}, ${matchIndex + 1})">
          ${showNames ? a.name : "Select"}
        </button>
      </div>
      <div class="vs-badge">VS</div>
      <div class="flag-card">
        <div class="flag">${renderFlag(b)}</div>
        <button onclick="pickWinner(${matchIndex + 1}, ${matchIndex})">
          ${showNames ? b.name : "Select"}
        </button>
      </div>
    </div>
    <p class="keyboard-hint">Press, or use ← → arrow keys to select</p>
  `;

  // Show FIGHT flash every few matches for drama (not on the first match)
  if (completedMatches > 0 && completedMatches % 3 === 0) {
    showFightFlash();
  }

  // Show fun match commentary
  showCommentary();
}

function pickWinner(winnerIndex, loserIndex, event) {
  const winner = currentRound[winnerIndex];
  const loser = currentRound[loserIndex];

  // Fun effects!
  screenShake();
  updateStreakBar();

  // Sparkles at the click location or center of the winning card
  const cards = document.querySelectorAll('.flag-card');
  const winCard = winnerIndex < loserIndex ? cards[0] : cards[1];
  if (winCard) {
    const rect = winCard.getBoundingClientRect();
    spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  nextRound.push(winner);
  eliminated.push(loser);
  matchIndex += 2;
  completedMatches++;

  if (matchIndex >= currentRound.length) {
    currentRound = nextRound;
    nextRound = [];
    matchIndex = 0;
    roundNumber++;
  }

  renderMatch();
}

document.getElementById("toggleNames").addEventListener("change", renderMatch);

// Arrow key navigation
document.addEventListener("keydown", function(e) {
  if (currentRound.length <= 1) return; // No active match
  if (e.key === "ArrowLeft") {
    pickWinner(matchIndex, matchIndex + 1);
  } else if (e.key === "ArrowRight") {
    pickWinner(matchIndex + 1, matchIndex);
  }
});

function playAgain() {
  // Reset state
  currentRound = [...flags];
  nextRound = [];
  eliminated = [];
  matchIndex = 0;
  roundNumber = 1;
  completedMatches = 0;

  // Reset fun elements
  resetStreak();

  // Clear submission flag to allow new vote
  localStorage.removeItem('tournament-submitted');

  // Optional: shuffle flags for variety
  for (let i = currentRound.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentRound[i], currentRound[j]] = [currentRound[j], currentRound[i]];
  }

  // Show controls again
  document.querySelector(".controls").style.display = "block";

  // Clear leaderboard
  document.getElementById('leaderboard').innerHTML = '';

  // Scroll to top
  window.scrollTo(0, 0);

  // Re-render
  renderMatch();
}

renderMatch();

// Bracket legend toggle (initialized after completedMatches is defined)
(function initBracketLegend() {
  const toggle = document.getElementById('bracketLegendToggle');
  const legend = document.getElementById('bracketLegend');
  const showedLegend = localStorage.getItem('showedBracketLegend');

  // Show legend by default for first 3 matches
  if (!showedLegend && completedMatches < 3) {
    legend.classList.add('expanded');
    toggle.classList.add('pulse');
  }

  toggle.addEventListener('click', () => {
    legend.classList.toggle('expanded');
    toggle.classList.remove('pulse');
    if (legend.classList.contains('expanded')) {
      localStorage.setItem('showedBracketLegend', 'true');
    }
  });
})();

// ===== FUN ELEMENTS =====

// --- Floating emoji background ---
(function initFloatingEmojis() {
  const container = document.getElementById('floatingEmojis');
  if (!container) return;
  const emojis = ['🌍', '🌎', '🌏', '🏳️', '🏴', '🚩', '🎌', '⭐', '✨', '🌟', '💫', '🎪', '🎭', '🏆', '⚔️', '🎯', '🎊', '🎉', '🌈', '🗺️'];

  function spawnEmoji() {
    const el = document.createElement('span');
    el.className = 'floating-emoji';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = (Math.random() * 100) + '%';
    el.style.bottom = '-2rem';
    el.style.animationDuration = (12 + Math.random() * 18) + 's';
    el.style.animationDelay = (Math.random() * 2) + 's';
    el.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
    container.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }

  // Spawn a few immediately
  for (let i = 0; i < 6; i++) setTimeout(() => spawnEmoji(), i * 400);
  // Then keep spawning
  setInterval(spawnEmoji, 3000);
})();

// --- FIGHT flash ---
const fightWords = ['FIGHT!', 'BATTLE!', 'CHOOSE!', 'PICK!', 'GO!', 'DUEL!'];

function showFightFlash() {
  const el = document.getElementById('fightFlash');
  if (!el) return;
  const word = fightWords[Math.floor(Math.random() * fightWords.length)];
  el.innerHTML = `<span class="fight-flash-text">${word}</span>`;
  el.classList.remove('active');
  // Force reflow
  void el.offsetWidth;
  el.classList.add('active');
  setTimeout(() => el.classList.remove('active'), 700);
}

// --- Streak counter ---
let currentStreak = 0;
const streakMessages = [
  { min: 3, emoji: '🔥', text: 'streak', cls: 'fire' },
  { min: 7, emoji: '🔥🔥', text: 'on fire!', cls: 'fire' },
  { min: 12, emoji: '💥🔥💥', text: 'UNSTOPPABLE!', cls: 'mega' },
  { min: 20, emoji: '🌋🔥🌋', text: 'LEGENDARY!!!', cls: 'mega' },
];

function updateStreakBar() {
  const bar = document.getElementById('streakBar');
  if (!bar) return;
  currentStreak++;

  // Find the highest matching streak tier
  let msg = null;
  for (let i = streakMessages.length - 1; i >= 0; i--) {
    if (currentStreak >= streakMessages[i].min) {
      msg = streakMessages[i];
      break;
    }
  }

  if (msg) {
    bar.classList.remove('hidden', 'fire', 'mega');
    bar.classList.add(msg.cls);
    bar.innerHTML = `${msg.emoji} ${currentStreak} ${msg.text}`;
  } else {
    bar.classList.add('hidden');
  }
}

function resetStreak() {
  currentStreak = 0;
  const bar = document.getElementById('streakBar');
  if (bar) bar.classList.add('hidden');
}

// --- Match commentary ---
const commentaryLines = [
  "Tough call! 🤔", "This is a classic matchup!", "The crowd goes wild! 📣",
  "A real nail-biter!", "Both flags looking sharp! ✂️", "The tension is palpable...",
  "Choose wisely! 🧙", "No wrong answers... or are there? 👀",
  "This could go either way!", "The flags are ready! 🏁",
  "Legendary showdown! ⚡", "Who will advance?",
  "Two flags enter, one flag leaves!", "The stakes are getting higher! 📈",
  "What a moment! 🎬", "Flag fans are on the edge of their seats!",
  "This match is ELECTRIC! ⚡", "Heart vs. head time! 🧠❤️",
];

function showCommentary() {
  const el = document.getElementById('matchCommentary');
  if (!el) return;
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = commentaryLines[Math.floor(Math.random() * commentaryLines.length)];
    el.style.opacity = '1';
  }, 150);
}

// --- Click sparkles ---
function spawnSparkles(x, y) {
  const sparkleEmojis = ['✨', '⭐', '💫', '🌟', '⚡', '🎉'];
  for (let i = 0; i < 6; i++) {
    const el = document.createElement('span');
    el.className = 'sparkle';
    el.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
    const angle = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5);
    const dist = 40 + Math.random() * 60;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
    el.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

// --- Screen shake ---
function screenShake() {
  document.body.classList.add('shake');
  setTimeout(() => document.body.classList.remove('shake'), 300);
}

// Confetti celebration for tournament completion
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#a855f7', '#ec4899', '#f59e0b', '#06b6d4', '#22c55e', '#fff', '#ff6b6b', '#ffd93d'];
  const particles = [];

  function burst(count, originX, originY, spread) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * Math.random());
      const speed = 2 + Math.random() * 5;
      particles.push({
        x: originX + (Math.random() - 0.5) * spread,
        y: originY + (Math.random() - 0.5) * spread * 0.5,
        w: Math.random() * 12 + 3,
        h: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: -speed * Math.sin(angle) * 0.6 + 1,
        vx: speed * Math.cos(angle),
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        gravity: 0.06 + Math.random() * 0.04,
        shape: Math.random() > 0.7 ? 'circle' : 'rect'
      });
    }
  }

  // Initial big burst from center
  burst(80, canvas.width / 2, canvas.height / 3, canvas.width * 0.6);
  // Side bursts
  setTimeout(() => burst(50, canvas.width * 0.2, canvas.height * 0.3, 200), 200);
  setTimeout(() => burst(50, canvas.width * 0.8, canvas.height * 0.3, 200), 400);
  // Top rain
  setTimeout(() => {
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        w: Math.random() * 10 + 3,
        h: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: 2 + Math.random() * 3,
        vx: (Math.random() - 0.5) * 1.5,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        opacity: 1,
        gravity: 0.02,
        shape: Math.random() > 0.5 ? 'circle' : 'rect'
      });
    }
  }, 600);

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;
    let alive = false;

    particles.forEach(p => {
      if (p.opacity <= 0) return;
      alive = true;
      p.vy += (p.gravity || 0.05);
      p.y += p.vy;
      p.x += p.vx;
      p.vx *= 0.99;
      p.rot += p.rotSpeed;
      if (frame > 120) p.opacity -= 0.012;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    });

    if (alive && frame < 300) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  requestAnimationFrame(animate);

  // Also spawn emoji sparkles from corners
  const celebEmoji = ['🎉', '🎊', '🏆', '⭐', '🌟', '✨', '🥇', '🎆', '🌍', '🏅'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.5;
      const el = document.createElement('span');
      el.className = 'sparkle';
      el.textContent = celebEmoji[Math.floor(Math.random() * celebEmoji.length)];
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 100;
      el.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
      el.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }, i * 100);
  }
}

// Always fetch and display the global leaderboard
fetchLeaderboard();
