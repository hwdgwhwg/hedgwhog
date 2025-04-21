document.addEventListener("DOMContentLoaded", () => {
    const characters = document.querySelectorAll(".charbox[data-img]");
    const player1Box = document.getElementById("player1");
  
    characters.forEach(char => {
      char.addEventListener("click", () => {
        const charImgSrc = char.getAttribute("data-img");
        const charName = char.getAttribute("data-character");
  
        // Verwijder huidige inhoud
        player1Box.innerHTML = "";
  
        // Voeg nieuwe image toe
        const img = document.createElement("img");
        img.src = charImgSrc;
        img.alt = charName;
        img.classList.add("char-img");
  
        player1Box.appendChild(img);
        player1Box.dataset.character = charName;
      });
    });
  });
  