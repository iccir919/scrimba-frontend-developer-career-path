/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const inputEl = document.getElementById("input-el")
const submitBtn = document.getElementById("submit-btn")

const lengthTextEl = document.getElementById("length-text")
const volumeTextEl = document.getElementById("volume-text")
const masstextEl = document.getElementById("mass-text")

submitBtn.addEventListener("click", function() {
    const inputVal = Number(inputEl.value);

    if (inputVal === NaN) return

    lengthTextEl.textContent = handleConversion("meters", "feet", 3.281, inputVal)
    volumeTextEl.textContent = handleConversion("liters", "gallons", 0.264, inputVal)
    masstextEl.textContent = handleConversion("kilograms", "pounds", 2.204, inputVal)
})


function handleConversion(metricName, imperialName, conversionVal, inputVal) {
    const imperialConversion = (inputVal * conversionVal).toFixed(3)
    const metricConversion = (inputVal / conversionVal).toFixed(3)
    const resultStr = `${inputVal} ${metricName} = ${imperialConversion} ${imperialName} | ${inputVal} ${imperialName} = ${metricConversion} ${metricName}`
    return resultStr
}