const GAMES = [
  { name: "Snake.io", desc: "Steer your snake, collect glowing orbs, and outlast other players.", rating: "4.7", link: "https://www.crazygames.com/game/snake-io" },
  { name: "2048", desc: "Combine numbered tiles to reach the 2048 tile.", rating: "4.9", link: "https://play2048.co/" },
  { name: "Chess", desc: "Play a game of chess against a computer opponent.", rating: "4.8", link: "https://www.chess.com/play/computer" },
  { name: "Tetris", desc: "Fit falling blocks together and clear lines.", rating: "4.7", link: "https://tetris.com/play-tetris" },
  { name: "Pac-Man", desc: "Navigate the maze, collect dots, and dodge ghosts.", rating: "4.8", link: "https://www.google.com/logos/2010/pacman10-i.html" },
  { name: "Minesweeper", desc: "Use the number clues to uncover every safe square.", rating: "4.6", link: "https://minesweeperonline.com/" },
  { name: "Sudoku", desc: "Fill the grid so every row, column, and box is complete.", rating: "4.7", link: "https://sudokugame.org/" },
  { name: "Flappy Bird", desc: "Tap to fly through the gaps without hitting a pipe.", rating: "4.5", link: "https://flappybird.io/" },
  { name: "Tic Tac Toe", desc: "Take turns marking a line of three before your opponent.", rating: "4.6", link: "https://playtictactoe.org/" },
  { name: "Ludo King", desc: "Play the classic dice-and-token board game with friends and family.", rating: "4.7", link: "https://play.google.com/store/apps/details?id=com.ludo.king", platform: "GOOGLE PLAY" },
  { name: "Carrom Pool", desc: "Play multiplayer carrom on a digital board.", rating: "4.6", link: "https://play.google.com/store/apps/details?id=com.miniclip.carrom", platform: "GOOGLE PLAY" },
  { name: "Solitaire", desc: "Sort the cards into foundation piles by suit.", rating: "4.8", link: "https://solitaired.com/" },
  { name: "Mahjong Solitaire", desc: "Match open tile pairs to clear the board.", rating: "4.6", link: "https://www.247mahjong.com/" },
  { name: "Checkers", desc: "Jump opposing pieces and crown your checkers.", rating: "4.6", link: "https://www.playok.com/en/checkers/" },
  { name: "Wordle", desc: "Guess the five-letter word in six tries.", rating: "4.8", link: "https://www.nytimes.com/games/wordle/index.html" },
  { name: "Daily Crossword", desc: "Solve a daily crossword with clues across and down.", rating: "4.7", link: "https://www.nytimes.com/crosswords" },
  { name: "Doodle Jump", desc: "Bounce upward across platforms and see how high you can go.", rating: "4.5", link: "https://doodlejump.io/" },
  { name: "Basketball Stars", desc: "Play quick basketball matchups and take your shots.", rating: "4.6", link: "https://www.crazygames.com/game/basketball-stars" },
  { name: "Subway Surfers", desc: "Dash along the tracks, dodge trains, and collect coins.", rating: "4.8", link: "https://poki.com/en/g/subway-surfers" },
  { name: "Moto X3M", desc: "Race a dirt bike through stunt-filled obstacle courses.", rating: "4.7", link: "https://www.coolmathgames.com/0-moto-x3m" },
  { name: "Fireboy and Watergirl", desc: "Work together to guide two characters through temple puzzles.", rating: "4.7", link: "https://www.coolmathgames.com/0-fireboy-and-water-girl-in-the-forest-temple" },
  { name: "Run 3", desc: "Run and jump through a shifting outer-space tunnel.", rating: "4.7", link: "https://www.coolmathgames.com/0-run-3" },
  { name: "Little Alchemy 2", desc: "Combine elements and discover new items and recipes.", rating: "4.8", link: "https://littlealchemy2.com/" },
  { name: "Cookie Clicker", desc: "Bake cookies, buy upgrades, and grow your cookie empire.", rating: "4.7", link: "https://orteil.dashnet.org/cookieclicker/" },
  { name: "GeoGuessr", desc: "Explore a street-level location and guess where you are.", rating: "4.8", link: "https://www.geoguessr.com/" },
  { name: "Slither.io", desc: "Grow your snake and outmaneuver other players.", rating: "4.6", link: "https://slither.io/" },
  { name: "Agar.io", desc: "Grow your cell by collecting mass and avoiding larger cells.", rating: "4.6", link: "https://agar.io/" },
  { name: "Krunker", desc: "Jump into a fast-paced browser-based arena shooter.", rating: "4.5", link: "https://krunker.io/" },
  { name: "Word Search", desc: "Find hidden words running across, down, and diagonally.", rating: "4.5", link: "https://thewordsearch.com/" },
  { name: "Jigsaw Explorer", desc: "Put together an online jigsaw puzzle at your own pace.", rating: "4.6", link: "https://www.jigsawexplorer.com/" }
];

const LOCAL_GAMES = [
  { id: "2048", name: "2048", icon: "🔢", desc: "Slide and merge tiles to reach 2048.", tag: "ARROWS OR SWIPE" },
  { id: "snake", name: "Snake", icon: "🐍", desc: "Guide your snake, eat the fruit, and beat your best score.", tag: "KEYBOARD OR TOUCH" },
  { id: "memory", name: "Memory Match", icon: "🧠", desc: "Flip cards and match every pair in as few moves as you can.", tag: "12 CARDS · 6 PAIRS" },
  { id: "tictactoe", name: "Tic-Tac-Toe", icon: "⭕", desc: "Challenge a friend to a quick game of Xs and Os.", tag: "TWO PLAYERS" }
];
