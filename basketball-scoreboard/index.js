let homeTeamScore = 0
let guestTeamScore = 0

let homeScoreEl = document.getElementById("home-score")
let guestScoreEl = document.getElementById("guest-score")

homeScoreEl.textContent = homeTeamScore
guestScoreEl.textContent = guestTeamScore

function incrementScore(opponent, incrementAmt) {
    if (opponent === "guest") {
        guestTeamScore += incrementAmt
        guestScoreEl.textContent = guestTeamScore
    } else if (opponent === "home") {
        homeTeamScore  += incrementAmt
        homeScoreEl.textContent = homeTeamScore
    }
}

function newGame() {
    homeTeamScore = 0
    homeScoreEl.textContent = homeTeamScore

    guestTeamScore = 0
    guestScoreEl.textContent = guestTeamScore

}
