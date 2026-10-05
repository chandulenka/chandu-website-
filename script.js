const chipDefinitions = [
  { label: "All", id: "all" },
  { label: "AI", id: "ai-tools" },
  { label: "Photo", id: "photo-editing" },
  { label: "Video", id: "video-editing" },
  { label: "OTT", id: "movies-ott" },
  { label: "Jobs", id: "jobs" },
  { label: "Food", id: "food" },
  { label: "Travel", id: "travel" },
  { label: "Music", id: "music" },
  { label: "Shopping", id: "shopping" }
];

const categoryById = new Map(CATEGORIES.map(category => [category.id, category]));
const categoryFilterAliases = {
  "ai-tools": ["ai"],
  "photo-editing": ["photo", "photography"],
  "video-editing": ["video"],
  "movies-ott": ["ott", "movies", "movie", "streaming"],
  jobs: ["job", "jobs", "career"],
  food: ["food", "restaurant", "grocery"],
  travel: ["travel", "trip", "flight", "train"],
  music: ["music", "song"],
  shopping: ["shopping", "shop", "fashion"]
};

const elements = {
  chips: document.getElementById("chips"),
  query: document.getElementById("q"),
  grid: document.getElementById("grid"),
  games: document.getElementById("ggames"),
  localGames: document.getElementById("localGames"),
  localGameView: document.getElementById("localGameView"),
  localGameContent: document.getElementById("localGameContent"),
  resultCount: document.getElementById("resultCount"),
  detail: document.getElementById("detail"),
  detailTitle: document.getElementById("dTitle"),
  detailEyebrow: document.getElementById("dEyebrow"),
  detailContent: document.getElementById("dContent"),
  modal: document.getElementById("modal"),
  frameView: document.getElementById("frameView"),
  frame: document.getElementById("frame")
};

let activeChip = "all";
let selectedApp = null;
let activeLink = "";
let focusBeforeModal = null;
let focusBeforeViewer = null;
let activeLocalGame = "";
let localGameAction = null;
let localGameCleanup = () => {};
let focusBeforeLocalGame = null;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function getSafeUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

function renderChips() {
  elements.chips.innerHTML = chipDefinitions.map(chip => `
    <button class="chip${chip.id === activeChip ? " active" : ""}" type="button" data-chip="${escapeHtml(chip.id)}" aria-pressed="${chip.id === activeChip}">${escapeHtml(chip.label)}</button>
  `).join("");

  elements.chips.querySelectorAll("[data-chip]").forEach(button => {
    button.addEventListener("click", () => {
      activeChip = button.dataset.chip;
      renderChips();
      refreshDirectory();
    });
  });
}

function renderCategories(list) {
  elements.grid.innerHTML = list.length
    ? list.map(category => `
      <button class="card category-card" type="button" data-category="${escapeHtml(category.id)}">
        <span class="card-topline"><span class="card-icon" aria-hidden="true">${escapeHtml(category.icon)}</span><span class="card-arrow" aria-hidden="true">↗</span></span>
        <span class="card-title"><h3>${escapeHtml(category.name)}</h3></span>
        <span class="card-description"><p>${escapeHtml(category.desc)}</p></span>
        <span class="card-meta">${category.subcategories.reduce((total, subcategory) => total + subcategory.apps.length, 0)} useful links</span>
      </button>
    `).join("")
    : '<div class="empty-state"><strong>No categories found</strong>Try another search or choose a different filter.</div>';

  elements.grid.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => openCat(button.dataset.category));
  });
}

function renderAppSearchResults(results) {
  elements.grid.innerHTML = results.length
    ? results.map(({ app, category }) => `
      <button class="card app-card" type="button" data-app="${escapeHtml(category.id)}:${escapeHtml(app.name)}">
        <span class="card-topline"><span class="app-mini">${escapeHtml(category.icon)} ${escapeHtml(category.name)}</span><span class="card-arrow" aria-hidden="true">↗</span></span>
        <span class="card-title"><h3>${escapeHtml(app.name)}</h3></span>
        <span class="card-description"><p>${escapeHtml(app.usage)}</p></span>
        <span class="card-meta">★ ${escapeHtml(app.rating)} &nbsp;·&nbsp; ${escapeHtml(app.domain)}</span>
      </button>
    `).join("")
    : '<div class="empty-state"><strong>No matches found</strong>Try a different app name or clear your search.</div>';

  elements.grid.querySelectorAll("[data-app]").forEach(button => {
    button.addEventListener("click", () => {
      const [categoryId, ...nameParts] = button.dataset.app.split(":");
      const appName = nameParts.join(":");
      const category = categoryById.get(categoryId);
      const app = category?.subcategories.flatMap(subcategory => subcategory.apps).find(item => item.name === appName);
      if (app) openAppModal(app);
    });
  });
}

function renderGames(games) {
  elements.games.innerHTML = games.map((game, index) => `
    <button class="card game-card" type="button" data-game="${index}">
      <span class="card-topline"><span class="card-icon" aria-hidden="true">${["◉", "▦", "♟", "▤", "●", "▧"][index % 6]}</span><span class="card-arrow" aria-hidden="true">↗</span></span>
      <span class="card-title"><h3>${escapeHtml(game.name)}</h3></span>
      <span class="card-description"><p>${escapeHtml(game.desc)}</p></span>
      <span class="game-tag">★ ${escapeHtml(game.rating)} &nbsp;·&nbsp; ${escapeHtml(game.platform ?? "PLAY")}</span>
    </button>
  `).join("");

  elements.games.querySelectorAll("[data-game]").forEach(button => {
    button.addEventListener("click", () => {
      const game = games[Number(button.dataset.game)];
      const safeLink = getSafeUrl(game.link);
      if (safeLink) window.open(safeLink, "_blank", "noopener,noreferrer");
    });
  });
}

function renderLocalGames() {
  elements.localGames.innerHTML = LOCAL_GAMES.map(game => `
    <button class="card game-card local-game-card" type="button" data-local-game="${escapeHtml(game.id)}">
      <span class="card-topline"><span class="card-icon" aria-hidden="true">${escapeHtml(game.icon)}</span><span class="card-arrow" aria-hidden="true">↘</span></span>
      <span class="card-title"><h3>${escapeHtml(game.name)}</h3></span>
      <span class="card-description"><p>${escapeHtml(game.desc)}</p></span>
      <span class="game-tag">${escapeHtml(game.tag)} &nbsp;·&nbsp; PLAY HERE</span>
    </button>
  `).join("");

  elements.localGames.querySelectorAll("[data-local-game]").forEach(button => {
    button.addEventListener("click", () => openLocalGame(button.dataset.localGame));
  });
}

function openLocalGame(id) {
  const game = LOCAL_GAMES.find(item => item.id === id);
  if (!game) return;
  localGameCleanup();
  localGameCleanup = () => {};
  localGameAction = null;
  activeLocalGame = id;
  focusBeforeLocalGame = document.activeElement;
  document.getElementById("localGameTitle").textContent = game.name;
  elements.localGameView.style.display = "flex";
  elements.localGameView.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const setupGame = {
    "2048": setup2048Game,
    snake: setupSnakeGame,
    memory: setupMemoryGame,
    tictactoe: setupTicTacToeGame
  }[id];
  setupGame();
  document.getElementById("localGameClose").focus();
}

function closeLocalGame() {
  localGameCleanup();
  localGameCleanup = () => {};
  localGameAction = null;
  activeLocalGame = "";
  elements.localGameView.style.display = "none";
  elements.localGameView.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (focusBeforeLocalGame instanceof HTMLElement) focusBeforeLocalGame.focus({ preventScroll: true });
}

function setup2048Game() {
  elements.localGameContent.innerHTML = `
    <section class="local-game-panel" aria-label="2048 game">
      <div class="local-game-toolbar"><p class="local-game-instructions">Join matching tiles. Use arrow keys, swipe, or the direction buttons.</p><button class="local-action" id="twentyReset" type="button">New game</button></div>
      <div class="local-score-line"><span>Score <strong id="twentyScore">0</strong></span><span id="twentyStatus" class="local-game-status" aria-live="polite"></span></div>
      <div id="twentyBoard" class="tile-board" role="grid" aria-label="2048 tile board"></div>
      <div class="direction-pad" aria-label="Move tiles"><button type="button" data-move="up" aria-label="Move up">↑</button><div><button type="button" data-move="left" aria-label="Move left">←</button><button type="button" data-move="down" aria-label="Move down">↓</button><button type="button" data-move="right" aria-label="Move right">→</button></div></div>
    </section>
  `;

  const boardElement = document.getElementById("twentyBoard");
  const scoreElement = document.getElementById("twentyScore");
  const statusElement = document.getElementById("twentyStatus");
  let board;
  let score;

  function drawBoard() {
    boardElement.innerHTML = board.flat().map(value => `<div class="tile-cell" role="gridcell" aria-label="${value || "Empty"}" data-value="${value || 0}">${value || ""}</div>`).join("");
    scoreElement.textContent = String(score);
  }

  function addTile() {
    const empty = [];
    board.forEach((row, rowIndex) => row.forEach((value, columnIndex) => {
      if (!value) empty.push([rowIndex, columnIndex]);
    }));
    if (!empty.length) return;
    const [rowIndex, columnIndex] = empty[Math.floor(Math.random() * empty.length)];
    board[rowIndex][columnIndex] = Math.random() < 0.9 ? 2 : 4;
  }

  function reset() {
    board = Array.from({ length: 4 }, () => Array(4).fill(0));
    score = 0;
    addTile();
    addTile();
    statusElement.textContent = "Reach 2048 to win.";
    statusElement.classList.remove("is-win", "is-over");
    drawBoard();
  }

  function hasMoves() {
    return board.some((row, rowIndex) => row.some((value, columnIndex) =>
      !value || (columnIndex < 3 && value === row[columnIndex + 1]) || (rowIndex < 3 && value === board[rowIndex + 1][columnIndex])
    ));
  }

  function move(direction) {
    let changed = false;
    let reachedTarget = false;
    for (let lineIndex = 0; lineIndex < 4; lineIndex += 1) {
      const coordinates = Array.from({ length: 4 }, (_, offset) => {
        if (direction === "left") return [lineIndex, offset];
        if (direction === "right") return [lineIndex, 3 - offset];
        if (direction === "up") return [offset, lineIndex];
        return [3 - offset, lineIndex];
      });
      const original = coordinates.map(([row, column]) => board[row][column]);
      const compact = original.filter(Boolean);
      const merged = [];
      for (let index = 0; index < compact.length; index += 1) {
        if (compact[index] === compact[index + 1]) {
          const value = compact[index] * 2;
          merged.push(value);
          score += value;
          reachedTarget ||= value === 2048;
          index += 1;
        } else {
          merged.push(compact[index]);
        }
      }
      while (merged.length < 4) merged.push(0);
      if (merged.some((value, index) => value !== original[index])) changed = true;
      coordinates.forEach(([row, column], index) => { board[row][column] = merged[index]; });
    }
    if (!changed) return;
    addTile();
    drawBoard();
    statusElement.textContent = reachedTarget ? "2048! Keep going or start a new game." : hasMoves() ? "Keep merging matching tiles." : "No moves left. Start a new game.";
    if (reachedTarget) statusElement.classList.add("is-win");
    if (!hasMoves()) statusElement.classList.add("is-over");
  }

  localGameAction = move;
  document.getElementById("twentyReset").addEventListener("click", reset);
  elements.localGameContent.querySelectorAll("[data-move]").forEach(button => {
    button.addEventListener("click", () => move(button.dataset.move));
  });
  let touchStart = null;
  boardElement.addEventListener("touchstart", event => {
    const touch = event.changedTouches[0];
    touchStart = [touch.clientX, touch.clientY];
  }, { passive: true });
  boardElement.addEventListener("touchend", event => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const horizontal = touch.clientX - touchStart[0];
    const vertical = touch.clientY - touchStart[1];
    touchStart = null;
    if (Math.max(Math.abs(horizontal), Math.abs(vertical)) < 24) return;
    move(Math.abs(horizontal) > Math.abs(vertical) ? (horizontal > 0 ? "right" : "left") : (vertical > 0 ? "down" : "up"));
  }, { passive: true });
  reset();
}

function setupMemoryGame() {
  elements.localGameContent.innerHTML = `
    <section class="local-game-panel" aria-label="Memory Match game">
      <div class="local-game-toolbar"><p class="local-game-instructions">Turn over two cards at a time and find all six matching pairs.</p><button class="local-action" id="memoryReset" type="button">Shuffle cards</button></div>
      <div class="local-score-line"><span>Moves <strong id="memoryMoves">0</strong></span><span id="memoryStatus" class="local-game-status" aria-live="polite">Find the matching pairs.</span></div>
      <div id="memoryBoard" class="memory-board" aria-label="Memory cards"></div>
    </section>
  `;

  const boardElement = document.getElementById("memoryBoard");
  const movesElement = document.getElementById("memoryMoves");
  const statusElement = document.getElementById("memoryStatus");
  const symbols = ["🍊", "🪁", "🐙", "🌻", "🎈", "🍉"];
  let cards = [];
  let openCards = [];
  let matched = new Set();
  let moves = 0;
  let locked = false;
  let mismatchTimer = 0;

  function drawCards() {
    boardElement.innerHTML = cards.map((symbol, index) => {
      const visible = openCards.includes(index) || matched.has(index);
      return `<button class="memory-card${visible ? " is-revealed" : ""}${matched.has(index) ? " is-matched" : ""}" type="button" data-card="${index}" aria-label="${visible ? `Card ${symbol}` : "Hidden card"}" ${matched.has(index) ? "disabled" : ""}><span>${visible ? symbol : "?"}</span></button>`;
    }).join("");
    movesElement.textContent = String(moves);
    boardElement.querySelectorAll("[data-card]").forEach(button => {
      button.addEventListener("click", () => revealCard(Number(button.dataset.card)));
    });
  }

  function reset() {
    window.clearTimeout(mismatchTimer);
    cards = [...symbols, ...symbols];
    for (let index = cards.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [cards[index], cards[swapIndex]] = [cards[swapIndex], cards[index]];
    }
    openCards = [];
    matched = new Set();
    moves = 0;
    locked = false;
    statusElement.textContent = "Find the matching pairs.";
    statusElement.classList.remove("is-win");
    drawCards();
  }

  function revealCard(index) {
    if (locked || openCards.includes(index) || matched.has(index)) return;
    openCards.push(index);
    if (openCards.length === 2) {
      moves += 1;
      const [first, second] = openCards;
      if (cards[first] === cards[second]) {
        matched.add(first);
        matched.add(second);
        openCards = [];
        if (matched.size === cards.length) {
          statusElement.textContent = `All pairs found in ${moves} moves!`;
          statusElement.classList.add("is-win");
        }
      } else {
        locked = true;
        mismatchTimer = window.setTimeout(() => {
          openCards = [];
          locked = false;
          drawCards();
        }, 750);
      }
    }
    drawCards();
  }

  document.getElementById("memoryReset").addEventListener("click", reset);
  localGameCleanup = () => window.clearTimeout(mismatchTimer);
  reset();
}

function setupTicTacToeGame() {
  elements.localGameContent.innerHTML = `
    <section class="local-game-panel" aria-label="Tic-Tac-Toe game">
      <div class="local-game-toolbar"><p class="local-game-instructions">Pass the screen back and forth. X goes first.</p><button class="local-action" id="ticReset" type="button">New round</button></div>
      <p id="ticStatus" class="local-game-status tic-status" aria-live="polite">X's turn</p>
      <div id="ticBoard" class="tic-board" role="grid" aria-label="Tic-Tac-Toe board"></div>
    </section>
  `;

  const boardElement = document.getElementById("ticBoard");
  const statusElement = document.getElementById("ticStatus");
  const winningLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  let board = Array(9).fill("");
  let turn = "X";
  let finished = false;

  function drawBoard() {
    boardElement.innerHTML = board.map((mark, index) => `<button class="tic-cell${mark ? ` is-${mark.toLowerCase()}` : ""}" type="button" role="gridcell" data-cell="${index}" aria-label="${mark ? `${mark}` : `Empty square ${index + 1}`}" ${mark || finished ? "disabled" : ""}>${mark}</button>`).join("");
    boardElement.querySelectorAll("[data-cell]").forEach(button => {
      button.addEventListener("click", () => playCell(Number(button.dataset.cell)));
    });
  }

  function reset() {
    board = Array(9).fill("");
    turn = "X";
    finished = false;
    statusElement.textContent = "X's turn";
    statusElement.classList.remove("is-win");
    drawBoard();
  }

  function playCell(index) {
    if (finished || board[index]) return;
    board[index] = turn;
    const winner = winningLines.find(line => line.every(cell => board[cell] === turn));
    if (winner) {
      finished = true;
      statusElement.textContent = `${turn} wins this round!`;
      statusElement.classList.add("is-win");
    } else if (board.every(Boolean)) {
      finished = true;
      statusElement.textContent = "It's a draw. Play another round?";
    } else {
      turn = turn === "X" ? "O" : "X";
      statusElement.textContent = `${turn}'s turn`;
    }
    drawBoard();
  }

  document.getElementById("ticReset").addEventListener("click", reset);
  reset();
}

function setupSnakeGame() {
  elements.localGameContent.innerHTML = `
    <section class="local-game-panel" aria-label="Snake game">
      <div class="local-game-toolbar"><p class="local-game-instructions">Use the arrow keys or on-screen pad. Eat fruit; avoid walls and your tail.</p><span class="snake-score">Score <strong id="snakeScore">0</strong></span></div>
      <canvas id="snakeCanvas" class="snake-canvas" width="360" height="360" aria-label="Snake playfield"></canvas>
      <p id="snakeStatus" class="local-game-status snake-status" aria-live="polite">Press Start to play.</p>
      <div class="snake-actions"><button class="local-action" id="snakeStart" type="button">Start</button><button class="local-action" id="snakePause" type="button" disabled>Pause</button><button class="local-action" id="snakeReset" type="button">Restart</button></div>
      <div class="direction-pad snake-pad" aria-label="Snake direction controls"><button type="button" data-snake-direction="up" aria-label="Move up">↑</button><div><button type="button" data-snake-direction="left" aria-label="Move left">←</button><button type="button" data-snake-direction="down" aria-label="Move down">↓</button><button type="button" data-snake-direction="right" aria-label="Move right">→</button></div></div>
    </section>
  `;

  const canvas = document.getElementById("snakeCanvas");
  const context = canvas.getContext("2d");
  const scoreElement = document.getElementById("snakeScore");
  const statusElement = document.getElementById("snakeStatus");
  const startButton = document.getElementById("snakeStart");
  const pauseButton = document.getElementById("snakePause");
  const gridSize = 18;
  const cellSize = canvas.width / gridSize;
  let snake;
  let direction;
  let nextDirection;
  let fruit;
  let score;
  let timer = 0;
  let running = false;
  let ended = false;

  function placeFruit() {
    let position;
    do {
      position = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
    } while (snake.some(part => part.x === position.x && part.y === position.y));
    fruit = position;
  }

  function draw() {
    context.fillStyle = "#eaf5ef";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "rgba(35, 91, 79, .07)";
    for (let line = 1; line < gridSize; line += 1) {
      context.beginPath();
      context.moveTo(line * cellSize, 0);
      context.lineTo(line * cellSize, canvas.height);
      context.moveTo(0, line * cellSize);
      context.lineTo(canvas.width, line * cellSize);
      context.stroke();
    }
    context.fillStyle = "#f2755c";
    context.beginPath();
    context.arc((fruit.x + .5) * cellSize, (fruit.y + .5) * cellSize, cellSize * .34, 0, Math.PI * 2);
    context.fill();
    snake.forEach((part, index) => {
      context.fillStyle = index === 0 ? "#135b70" : "#38a17a";
      context.beginPath();
      context.roundRect(part.x * cellSize + 1, part.y * cellSize + 1, cellSize - 2, cellSize - 2, 5);
      context.fill();
    });
  }

  function reset() {
    window.clearInterval(timer);
    running = false;
    ended = false;
    snake = [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }];
    direction = { x: 1, y: 0 };
    nextDirection = direction;
    score = 0;
    placeFruit();
    scoreElement.textContent = "0";
    statusElement.textContent = "Press Start to play.";
    statusElement.classList.remove("is-over", "is-win");
    startButton.textContent = "Start";
    startButton.disabled = false;
    pauseButton.textContent = "Pause";
    pauseButton.disabled = true;
    draw();
  }

  function endGame() {
    running = false;
    ended = true;
    window.clearInterval(timer);
    startButton.disabled = true;
    pauseButton.disabled = true;
    statusElement.textContent = `Game over. You scored ${score}. Press Restart to play again.`;
    statusElement.classList.add("is-over");
  }

  function tick() {
    direction = nextDirection;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    const eating = head.x === fruit.x && head.y === fruit.y;
    const body = eating ? snake : snake.slice(0, -1);
    if (head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize || body.some(part => part.x === head.x && part.y === head.y)) {
      endGame();
      return;
    }
    snake.unshift(head);
    if (eating) {
      score += 1;
      scoreElement.textContent = String(score);
      placeFruit();
    } else {
      snake.pop();
    }
    draw();
  }

  function setDirection(name) {
    const directions = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
    const candidate = directions[name];
    if (candidate && candidate.x !== -nextDirection.x || candidate && candidate.y !== -nextDirection.y) nextDirection = candidate;
  }

  function start() {
    if (running || ended) return;
    running = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    statusElement.textContent = "Eat fruit and stay clear of the edges.";
    statusElement.classList.remove("is-over");
    timer = window.setInterval(tick, 125);
  }

  function pause() {
    if (!running) return;
    running = false;
    window.clearInterval(timer);
    startButton.disabled = false;
    startButton.textContent = "Resume";
    pauseButton.disabled = true;
    statusElement.textContent = "Paused. Resume when you're ready.";
  }

  localGameAction = setDirection;
  startButton.addEventListener("click", start);
  pauseButton.addEventListener("click", pause);
  document.getElementById("snakeReset").addEventListener("click", reset);
  elements.localGameContent.querySelectorAll("[data-snake-direction]").forEach(button => {
    button.addEventListener("click", () => setDirection(button.dataset.snakeDirection));
  });
  let touchStart = null;
  canvas.addEventListener("touchstart", event => {
    const touch = event.changedTouches[0];
    touchStart = [touch.clientX, touch.clientY];
  }, { passive: true });
  canvas.addEventListener("touchend", event => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const horizontal = touch.clientX - touchStart[0];
    const vertical = touch.clientY - touchStart[1];
    touchStart = null;
    if (Math.max(Math.abs(horizontal), Math.abs(vertical)) < 20) return;
    setDirection(Math.abs(horizontal) > Math.abs(vertical) ? (horizontal > 0 ? "right" : "left") : (vertical > 0 ? "down" : "up"));
  }, { passive: true });
  localGameCleanup = () => window.clearInterval(timer);
  reset();
}

function handleLocalGameKeydown(event) {
  const directions = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" };
  const direction = directions[event.key];
  if (!direction) return;
  if (activeLocalGame === "2048" || activeLocalGame === "snake") {
    event.preventDefault();
    localGameAction?.(direction);
  }
}

function categoriesForActiveChip() {
  if (activeChip === "all") return CATEGORIES;
  return CATEGORIES.filter(category => category.id === activeChip);
}

function refreshDirectory() {
  const query = elements.query.value.trim().toLocaleLowerCase();
  const categories = categoriesForActiveChip();

  if (!query) {
    renderCategories(categories);
    const categoryWord = categories.length === 1 ? "category" : "categories";
    elements.resultCount.textContent = activeChip === "all" ? `${categories.length} ${categoryWord}` : `${categories.length} ${categoryWord} · ${categoryById.get(activeChip)?.name ?? ""}`;
    return;
  }

  const categoryMatches = categories.filter(category =>
    category.name.toLocaleLowerCase().includes(query) ||
    category.desc.toLocaleLowerCase().includes(query)
  );
  const appMatches = categories.flatMap(category => category.subcategories.flatMap(subcategory =>
    subcategory.apps
      .filter(app => `${app.name} ${app.domain}`.toLocaleLowerCase().includes(query))
      .map(app => ({ app, category }))
  ));

  if (appMatches.length) {
    renderAppSearchResults(appMatches);
    elements.resultCount.textContent = `${appMatches.length} app${appMatches.length === 1 ? "" : "s"} found`;
  } else {
    renderCategories(categoryMatches);
    elements.resultCount.textContent = categoryMatches.length
      ? `${categoryMatches.length} categor${categoryMatches.length === 1 ? "y" : "ies"} found`
      : "No matches";
  }
}

function openCat(id) {
  const category = categoryById.get(id);
  if (!category) return;

  elements.detailTitle.textContent = `${category.icon} ${category.name}`;
  elements.detailEyebrow.textContent = `${category.subcategories.reduce((total, item) => total + item.apps.length, 0)} SERVICES TO EXPLORE`;
  elements.detailContent.innerHTML = category.subcategories.map(subcategory => `
    <section class="subcategory">
      <h3>${escapeHtml(subcategory.name)}</h3>
      <div class="app-list">
        ${subcategory.apps.map((app, index) => `
          <button class="app-row" type="button" data-app-index="${index}">
            <span class="app-row-main"><span class="app-row-name">${escapeHtml(app.name)}</span><span class="app-row-domain">${escapeHtml(app.domain)}</span></span>
            <span class="app-row-usage">${escapeHtml(app.usage)}</span>
            <span class="app-row-rating">★ ${escapeHtml(app.rating)}</span>
            <span class="app-row-arrow" aria-hidden="true">›</span>
          </button>
        `).join("")}
      </div>
    </section>
  `).join("");

  elements.detailContent.querySelectorAll("[data-app-index]").forEach(button => {
    button.addEventListener("click", () => openAppModal(category.subcategories[0].apps[Number(button.dataset.appIndex)]));
  });

  elements.detail.style.transform = "translateX(0)";
  elements.detail.setAttribute("aria-hidden", "false");
  elements.detail.scrollTop = 0;
  document.body.style.overflow = "hidden";
  elements.detailTitle.focus({ preventScroll: true });
}

function closeDetail() {
  elements.detail.style.transform = "translateX(100%)";
  elements.detail.setAttribute("aria-hidden", "true");
  if (elements.modal.style.display !== "flex" && elements.frameView.style.display === "none") document.body.style.overflow = "";
}

function openAppModal(app) {
  if (!getSafeUrl(app.link)) return;
  selectedApp = app;
  focusBeforeModal = document.activeElement;
  document.getElementById("mName").textContent = app.name;
  document.getElementById("mCategory").textContent = app.categoryName;
  document.getElementById("mIcon").textContent = categoryById.get(app.categoryId)?.icon ?? "↗";
  document.getElementById("mRating").textContent = `★ ${app.rating} / 5`;
  document.getElementById("mUsage").textContent = app.usage;
  document.getElementById("mDomain").textContent = app.domain;
  document.getElementById("mInfo").textContent = app.info;
  elements.modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  document.getElementById("mClose").focus();
}

function closeAppModal() {
  elements.modal.style.display = "none";
  selectedApp = null;
  if (elements.detail.getAttribute("aria-hidden") === "true" && elements.frameView.style.display === "none") document.body.style.overflow = "";
  if (focusBeforeModal instanceof HTMLElement) focusBeforeModal.focus({ preventScroll: true });
}

function openIframe(link, name) {
  const safeLink = getSafeUrl(link);
  if (!safeLink) return;
  focusBeforeViewer = document.activeElement;
  activeLink = safeLink;
  document.getElementById("fTitle").textContent = name;
  elements.frame.title = `${name} embedded website`;
  elements.frame.src = safeLink;
  elements.frameView.style.display = "flex";
  document.body.style.overflow = "hidden";
  document.getElementById("fClose").focus();
}

function closeIframe() {
  elements.frameView.style.display = "none";
  elements.frame.src = "";
  activeLink = "";
  if (elements.detail.getAttribute("aria-hidden") === "true" && elements.modal.style.display !== "flex") document.body.style.overflow = "";
  if (focusBeforeViewer instanceof HTMLElement) focusBeforeViewer.focus({ preventScroll: true });
}

function renderChipsAndCatalog() {
  renderChips();
  renderCategories(CATEGORIES);
  renderGames(GAMES);
  renderLocalGames();
  elements.resultCount.textContent = `${CATEGORIES.length} categories`;
}

renderChipsAndCatalog();

elements.query.addEventListener("input", refreshDirectory);
const helpButton = document.getElementById("helpBtn");
const helpWidget = document.getElementById("helpWidget");
const contactPanel = document.getElementById("contactPanel");
const helpIcon = document.getElementById("helpIcon");

function setContactPanelOpen(isOpen) {
  contactPanel.hidden = !isOpen;
  helpButton.setAttribute("aria-expanded", String(isOpen));
  helpButton.setAttribute("aria-label", isOpen ? "Close Chandu's contact card" : "Open Chandu's contact card");
  helpButton.title = isOpen ? "Close contact card" : "Open contact card";
  helpIcon.textContent = isOpen ? "×" : "🤖";
}

helpButton.addEventListener("click", () => {
  setContactPanelOpen(contactPanel.hidden);
});
document.addEventListener("click", event => {
  if (!contactPanel.hidden && !helpWidget.contains(event.target)) setContactPanelOpen(false);
});
document.getElementById("backBtn").addEventListener("click", closeDetail);
document.getElementById("mClose").addEventListener("click", closeAppModal);
document.getElementById("mOpen").addEventListener("click", () => {
  if (!selectedApp) return;
  const app = selectedApp;
  closeAppModal();
  openIframe(app.link, app.name);
});
document.getElementById("fClose").addEventListener("click", closeIframe);
document.getElementById("localGameClose").addEventListener("click", closeLocalGame);
document.getElementById("fNewTab").addEventListener("click", () => {
  if (activeLink) window.open(activeLink, "_blank", "noopener,noreferrer");
});
elements.modal.addEventListener("click", event => {
  if (event.target === elements.modal) closeAppModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !contactPanel.hidden) {
    setContactPanelOpen(false);
    helpButton.focus();
    return;
  }
  if (elements.localGameView.style.display !== "none") handleLocalGameKeydown(event);
  if (event.key === "/" && elements.localGameView.style.display === "none" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
    event.preventDefault();
    elements.query.focus();
  }
  if (event.key === "Escape") {
    if (elements.localGameView.style.display !== "none") closeLocalGame();
    else if (elements.frameView.style.display !== "none") closeIframe();
    else if (elements.modal.style.display === "flex") closeAppModal();
    else if (elements.detail.getAttribute("aria-hidden") === "false") closeDetail();
  }
});
