const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]

const buttonEl = document.getElementById("submit-btn")
const result1Button = document.getElementById("result-1")
const result2Button = document.getElementById("result-2")
const numbersCheckbox = document.getElementById("numbers-checkbox")
const symbolsCheckbox = document.getElementById("symbols-checkbox")
const passwordLengthInput = document.getElementById("password-length")

buttonEl.addEventListener("click", generatePasswords)

function generatePasswords() {
    password1 = createPassword()
    password2 = createPassword()

    result1Button.textContent = password1
    result2Button.textContent = password2

    if (result1Button.disabled) {
        disableResultButton(result1Button)
    }

    if (result2Button.disabled) {
        disableResultButton(result2Button)
    }

    addCliboardFunctionality(result1Button, password1)
    addCliboardFunctionality(result2Button, password2)

}

function disableResultButton(resultButton) {
    resultButton.disabled = false
    resultButton.classList.add("enabled-result-button")
}

function addCliboardFunctionality(button, password) {
    button.addEventListener("click", function() {
        navigator.clipboard.writeText(password);
    })
}


function createPassword() {

    let password = ""
    let passwordLength = passwordLengthInput.value || 15

    let characters = [...letters]

    if (numbersCheckbox.checked) {
        characters = [...numbers, ...characters]
    } 
    
    if (symbolsCheckbox.checked) {
        characters = [...symbols, ...characters]
    }

    for (let i = 0; i < passwordLength; i++) {
        let randomIndex = Math.floor( Math.random() * characters.length )
        password += characters[randomIndex]
    }
    return password
}