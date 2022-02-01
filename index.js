let numbers = document.getElementsByClassName("number")
let guessesDiv = document.getElementById("guesses")
let endDiv = document.getElementById("end")
let shareButton = document.getElementById("shareButton")
let container = document.getElementById("container")

let guess_count = 0;

let time = new Date()

let year = time.getFullYear() * 10000
let month = time.getMonth() * 10000
let day = time.getDate() * 10000

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
        return;
    } else {
        addGuessDiv(number.innerHTML, false)
        number.classList.add('number-wrong')
    }

    if(guess_count > 9) {
        guess_count++;
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

    container.style.filter = "blur(2px)"

    endDiv.style.display = "flex";
    let text = document.createElement("p");
    text.innerHTML = (guess_count > 10) ? "You are too dumb for Digitle." : `You got the correct digit in ${guess_count} guess${"es".repeat(Math.min(guess_count-1,1))}.`;
    text.id = "end-text";
    endDiv.prepend(text)


    shareButton.addEventListener("click", () => {
        $("#copyConfirm").css("display", "flex").hide().fadeIn(100);
        navigator.clipboard.writeText(getShare());
        setTimeout(() => {
            $("#copyConfirm").css("display", "flex").fadeOut(200);
        },1500)
    });
}

function getShare() {
    if(guess_count > 10) {
        return "I'm too dumb for Digitle!"
    }

    let result = `Digitle ${guess_count}/10\n`;

    for (let i = 1; i < guess_count; i++) {
        result += "⬜\n";
    }

    result += "🟩";
    return result;
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