const characters = ['Invincible', 'Iguwa', 'Miku', 'Rin :3']

for (var x = 0; x < characters.length; x++) {
    document.getElementById('characters').innerHTML += `
        <div class="character">Character: ${characters[x]}</div>
    `
}