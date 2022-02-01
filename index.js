let numbers = document.getElementsByClassName("number")
let guessesDiv = document.getElementById("guesses")

let guess_count = 0;

let time = new Date()

let year = time.getFullYear()
let month = time.getMonth()
let day = time.getDay()

let todays_number = wichmann_hill(year, month, day)

for (let i = 0; i < numbers.length; i++) {
    const num = numbers.item(i)
    num.addEventListener("click", () => input(num))
}

function input(number) {
    guess_count++;
    number.classList.remove('number')
    if(number.innerHTML == todays_number) {
        addGuessDiv(number.innerHTML, true)
        number.classList.add('number-right')
        endGame()
    } else {
        addGuessDiv(number.innerHTML, false)
        number.classList.add('number-wrong')
    }

    if(guess_count > 9) {
        endGame()
    }
}

function endGame() {
    let input_type = document.getElementById("guess")
    input_type.parentNode.removeChild(input_type)
    let nums = document.getElementsByClassName("keyboardRow").item(0).childNodes;
    for (let i = 0; i < nums.length; i++) {
        const num = nums.item(i);
        let clone = num.cloneNode(true);
        num.parentNode.replaceChild(clone, num);
    }
}


function fmod(a,b) { return Number((a - (Math.floor(a / b) * b)).toPrecision(8)); };

function wichmann_hill(seed1, seed2, seed3) {
    seed1 = fmod((171 * seed1), 30269)
    seed2 = fmod((172 * seed2), 30307)
    seed3 = fmod((171 * seed3), 30323)

    return parseInt(fmod((seed1 / 30269. + seed2 / 30307. + seed3 / 30323.), 1.0) * 10)
}

function addGuessDiv(number, right) {
    let child = document.createElement("div")
    child.innerHTML = number
    child.classList.add(right ? 'guess-right' : 'guess-wrong')
    guessesDiv.appendChild(child)
    $(document).scrollTop($(document).height())
}