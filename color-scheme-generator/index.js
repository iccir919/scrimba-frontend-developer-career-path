
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
        const colorDisplay = document.getElementById(`display-color-${idx + 1}`)
        const colorValueBtn = document.getElementById(`text-value-btn-color-${idx + 1}`)
        colorValueBtn.dataset.hexColorValue = color.hex.value

        colorDisplay.style.backgroundColor = color.hex.value
        colorValueBtn.textContent = color.hex.value
    })
}

function handleColorTextBtnClick(el) {
    const hexColorValue = el.dataset.hexColorValue
    navigator.clipboard.writeText(hexColorValue)

    const clipboardAlertText = document.getElementById("clipboard-alert-text")
    clipboardAlertText.classList.add("show")

    setTimeout(() => {
        clipboardAlertText.classList.remove("show");
    }, 1000);
}


function buildColorSchemeContainer() {
    let html = ''
    for (let idx = 1; idx < 6; idx++) {
        html += `
            <div class="color-container">
                <div class="color-display" id="display-color-${idx}"></div>
                <button
                    onClick="handleColorTextBtnClick(this)"
                    class="text-value-color-btn" 
                    id="text-value-btn-color-${idx}"
                >
                    #0000
                </button>
            </div>
        `
    }
    document.getElementById("color-scheme-container").innerHTML = html
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
    buildColorSchemeContainer()
    const randomHexColor = getRandomHexColor()
    document.getElementById("seed-color").value = `#${randomHexColor}`
    getColorScheme(randomHexColor, 'monochrome')
}

intialize()