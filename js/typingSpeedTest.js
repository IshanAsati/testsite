document.addEventListener('DOMContentLoaded', () => {
    const testWrapper = document.querySelector('.test-wrapper');
    const testArea = document.querySelector('#test-area');
    const originText = document.querySelector('#origin-text p').innerHTML;
    const resetButton = document.querySelector('#reset');
    const timer = document.querySelector('.timer');

    let timerRunning = false;
    let time = [0, 0, 0, 0];
    let interval;

    function leadingZero(time) {
        if (time <= 9) {
            time = "0" + time;
        }
        return time;
    }

    function runTimer() {
        let currentTime = leadingZero(time[0]) + ":" + leadingZero(time[1]) + ":" + leadingZero(time[2]);
        timer.innerHTML = currentTime;
        time[3]++;

        time[0] = Math.floor((time[3] / 100) / 60);
        time[1] = Math.floor((time[3] / 100) - (time[0] * 60));
        time[2] = Math.floor((time[3] - (time[1] * 100) - (time[0] * 6000)));
    }

    function spellCheck() {
        let textEntered = testArea.value;
        let originTextMatch = originText.substring(0, textEntered.length);

        if (textEntered == originText) {
            clearInterval(interval);
            testWrapper.style.borderColor = "#429890";
        } else {
            if (textEntered == originTextMatch) {
                testWrapper.style.borderColor = "#65CCf3";
            } else {
                testWrapper.style.borderColor = "#E95D0F";
            }
        }
    }

    function start() {
        let textEnteredLength = testArea.value.length;
        if (textEnteredLength === 0 && !timerRunning) {
            timerRunning = true;
            interval = setInterval(runTimer, 10);
        }
    }

    function reset() {
        clearInterval(interval);
        interval = null;
        timerRunning = false;
        time = [0, 0, 0, 0];
        timer.innerHTML = "00:00:00";
        testArea.value = "";
        testWrapper.style.borderColor = "grey";
    }

    testArea.addEventListener('keypress', start, false);
    testArea.addEventListener('keyup', spellCheck, false);
    resetButton.addEventListener('click', reset, false);
});