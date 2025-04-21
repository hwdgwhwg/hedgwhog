document.addEventListener("DOMContentLoaded", () => {
    const grid = Array.from(document.querySelectorAll(".charbox"));
    const cols = 4; // number of columns for characters
    const players = {
      player1: { x: 0, y: 0, keymap: { up: 'w', down: 's', left: 'a', right: 'd', select: 'x' } },
      player2: { x: 0, y: 1, keymap: { up: 'u', down: 'j', left: 'h', right: 'k', select: 'm' } },
      player3: { x: 0, y: 2, keymap: { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', select: 'Enter' } },
    };
  
    let selectedBy = {
      player1: null,
      player2: null,
      player3: null
    };
  
    function getCharIndex(x, y) {
      return y * cols + x;
    }
  
    function updateHighlight(playerKey) {
      const player = players[playerKey];
      // Remove old highlight
      document.querySelectorAll(`.charbox[data-selectedby='${playerKey}']`).forEach(el => {
        el.removeAttribute('data-selectedby');
      });
  
      const index = getCharIndex(player.x, player.y);
      const target = grid[index];
      if (target) {
        target.dataset.selectedby = playerKey;
      }
    }
  
    function move(playerKey, direction) {
      const player = players[playerKey];
      if (!player) return;
  
      switch (direction) {
        case 'up':    if (player.y > 0) player.y--; break;
        case 'down':  if (player.y < Math.floor(grid.length / cols) - 1) player.y++; break;
        case 'left':  if (player.x > 0) player.x--; break;
        case 'right': if (player.x < cols - 1) player.x++; break;
      }
  
      updateHighlight(playerKey);
    }
  
    function handleSelect(playerKey) {
      const player = players[playerKey];
      const index = getCharIndex(player.x, player.y);
      const selectedChar = grid[index];
  
      if (!selectedChar || selectedChar.classList.contains("taken")) {
        // Check if the player has already selected this character
        if (selectedChar.dataset.character === selectedBy[playerKey]) {
          console.log("Already selected by this player.");
          return;
        }
        console.log("Character already chosen.");
        return;
      }
  
      // Remove previous selection if any
      const prevCharName = selectedBy[playerKey];
      if (prevCharName) {
        const prevChar = Array.from(grid).find(c => c.dataset.character === prevCharName);
        if (prevChar) {
          prevChar.classList.remove("taken");
          prevChar.style.opacity = "1";
        }
      }
  
      // New selection
      const charImgSrc = selectedChar.getAttribute("data-img");
      const charName = selectedChar.getAttribute("data-character");
  
      const playerBox = document.getElementById(playerKey);
      playerBox.innerHTML = "";
      const img = document.createElement("img");
      img.src = charImgSrc;
      img.alt = charName;
      img.classList.add("char-img");
      playerBox.appendChild(img);
      playerBox.dataset.character = charName;
  
      selectedChar.classList.add("taken");
      selectedChar.style.opacity = "0.5";
  
      selectedBy[playerKey] = charName;
    }
  
    document.addEventListener("keydown", (e) => {
      const key = e.key;
  
      for (const playerKey in players) {
        const keys = players[playerKey].keymap;
  
        if (key === keys.up || key === keys.down || key === keys.left || key === keys.right) {
          e.preventDefault(); // Only prevent default behavior for movement keys
        }
  
        if (key === keys.up) move(playerKey, 'up');
        else if (key === keys.down) move(playerKey, 'down');
        else if (key === keys.left) move(playerKey, 'left');
        else if (key === keys.right) move(playerKey, 'right');
        else if (key === keys.select) handleSelect(playerKey);
      }
    });
  
    // Initial highlight
    Object.keys(players).forEach(playerKey => updateHighlight(playerKey));
  });
  