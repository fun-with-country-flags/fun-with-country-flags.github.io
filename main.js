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

function renderMatch() {
  const app = document.getElementById("app");
  const showNames = document.getElementById("toggleNames").checked;
  const controls = document.querySelector(".controls");

  // Render bracket
  renderBracket();

  if (currentRound.length === 1) {
    controls.style.display = "none";
    const ranking = [currentRound[0], ...eliminated.reverse()];
    const top5 = ranking.slice(0, 5);
    app.innerHTML = `
      <div class="winner">
        <h2>Winner</h2>
        <div class="flag">${renderFlag(ranking[0], 'large')}</div>
        <p>${ranking[0].name}</p>
      </div>
      <div class="ranking">
        <h3>Your Top 5</h3>
        <ol>${top5.map(f => `<li>${renderFlag(f)} ${f.name}</li>`).join("")}</ol>
      </div>
    `;
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
      <div class="flag-card">
        <div class="flag">${renderFlag(b)}</div>
        <button onclick="pickWinner(${matchIndex + 1}, ${matchIndex})">
          ${showNames ? b.name : "Select"}
        </button>
      </div>
    </div>
    <p class="keyboard-hint">Press, or use ← → arrow keys to select</p>
  `;
}

function pickWinner(winnerIndex, loserIndex) {
  const winner = currentRound[winnerIndex];
  const loser = currentRound[loserIndex];

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

renderMatch();
