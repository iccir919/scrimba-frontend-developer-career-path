
document.getElementById("color-scheme-form").addEventListener("submit", function(e) {
    e.preventDefault()

    let hexColor = document.getElementById("seed-color").value.substring(1)
    let mode = document.getElementById("color-scheme-mode").value

    getColorScheme(hexColor, mode)
})

function getColorScheme(hexColor, mode) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${mode}`)
        .then(response => response.json())
        .then(data => renderColorScheme(data.colors))
}

function renderColorScheme(colorsArr) {
    colorsArr.forEach((color, idx) => {
        const display = document.getElementById(`display-color-${idx + 1}`)
        const text = document.getElementById(`text-value-color-${idx + 1}`)

        display.style.backgroundColor = color.hex.value
        text.textContent = color.hex.value
    })
}


function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  
function intialize() {
    const randomHexColor = getRandomHexColor()
    document.getElementById("seed-color").value = `#${randomHexColor}`
    getColorScheme(randomHexColor, 'monochrome')
}

intialize()