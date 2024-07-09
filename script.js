document.addEventListener('DOMContentLoaded', () => {
    const strips = [...document.querySelectorAll('.strip')];
    const numberSize = 8;
    let totalSeconds = 0;
    let timerInterval = null;
    const lapsList = document.getElementById('lapsList');

    function highlight(strip, d) {
        const numberElements = strips[strip].querySelectorAll('.number');
        numberElements.forEach(el => el.classList.remove('pop'));
        const numberElement = strips[strip].querySelector(`.number:nth-of-type(${d + 1})`);
        if (numberElement) {
            numberElement.classList.add('pop');
        }
    }

    function stripSlider(strip, number) {
        let d1 = Math.floor(number / 10);
        let d2 = number % 10;
        strips[strip].style.transform = `translateY(${d1 * -numberSize}vmin)`;
        highlight(strip, d1);
        strips[strip + 1].style.transform = `translateY(${d2 * -numberSize}vmin)`;
        highlight(strip + 1, d2);
    }

    function updateTimer() {
        const hours = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        stripSlider(0, hours);
        stripSlider(2, mins);
        stripSlider(4, secs);

        totalSeconds++;
    }

    document.getElementById('start').addEventListener('click', () => {
        if (timerInterval === null) {
            updateTimer(); // Call the function immediately
            timerInterval = setInterval(updateTimer, 1000); // Set the interval
        }
    });
    

    document.getElementById('pause').addEventListener('click', () => {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    });

    document.getElementById('reset').addEventListener('click', () => {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        totalSeconds = 0;
        stripSlider(0, 0);
        stripSlider(2, 0);
        stripSlider(4, 0);
        lapsList.innerHTML = '';
    });

    document.getElementsByClassName('lap')[0].addEventListener('click', () => {
        const hours = [...document.querySelectorAll('#hour1 .pop, #hour2 .pop')].map(el => el.textContent).join('');
        const mins = [...document.querySelectorAll('#minute1 .pop, #minute2 .pop')].map(el => el.textContent).join('');
        const secs = [...document.querySelectorAll('#second1 .pop, #second2 .pop')].map(el => el.textContent).join('');
        
        const lapTime = `${hours}:${mins}:${secs}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    });
    
    
});
