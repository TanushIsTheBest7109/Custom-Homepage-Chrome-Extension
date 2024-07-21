let form = document.getElementById('add-dialogue-box');
let add_btn = document.querySelector('.add-shortcut');
let overlay = document.querySelector('.overlay');
let shortcuts_bar = document.querySelector('.shortcuts-bar');
let Time = document.querySelector('.Time');
let close = document.querySelector('.close');


document.addEventListener('DOMContentLoaded', ()=>{
    video_source.setAttribute('src', JSON.parse(localStorage.getItem("video_data"))['url']);
    video_background.load();
})

const time_url = "https://worldtimeapi.org/api/timezone/Asia/Kolkata";

add_btn.addEventListener('click', () => {
    form.style.top = "50%";
    overlay.style.filter = "brightness(40%)";
});

close.addEventListener('click', () => {
    overlay.style.filter = "brightness(100%)";
    form.style.top = "-150%";
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = document.querySelector('input[name="Name"]').value;
    let url = document.querySelector('input[name="Url"]').value;

    let database = localStorage.getItem('shortcut-database') ? JSON.parse(localStorage.getItem('shortcut-database')) : {};

    let newId = Object.keys(database).length ? (parseInt(Object.keys(database)[Object.keys(database).length - 1]) + 1).toString() : "1";
    database[newId] = { "name": name, "url": url };

    localStorage.setItem('shortcut-database', JSON.stringify(database));

    window.location.reload();

    overlay.style.filter = "brightness(100%)";
    form.style.top = "-150%";
});

if (localStorage.getItem('shortcut-database')) {
    let storedData = JSON.parse(localStorage.getItem('shortcut-database'));
    for (let i in storedData) {
        let shortcut = document.createElement('div');
        shortcut.setAttribute('class', 'shortcut');
        shortcut.setAttribute('href', "https://" + storedData[i].url);

        let shortcut_text = document.createElement('a');
        shortcut_text.setAttribute('class', 'shortcut-name');
        shortcut_text.innerText = storedData[i].name;
        shortcut_text.setAttribute('href', "https://" + storedData[i].url);

        let shortcut_delete = document.createElement('button');
        shortcut_delete.classList.add("btn");
        shortcut_delete.id = i.toString();
        shortcut_delete.innerText = "-";

        shortcut_delete.addEventListener('click', () => {
            delete storedData[i];
            localStorage.setItem('shortcut-database', JSON.stringify(storedData));
            window.location.reload();
        });

        shortcut.appendChild(shortcut_text);
        shortcut.append(shortcut_delete);
        shortcuts_bar.appendChild(shortcut);
    }
}

function fetchTime() {
    fetch(time_url)
        .then(response => response.json())
        .then(data => {
            let datetime = data.datetime;
            let time = datetime.split('T')[1].split('.')[0];
            Time.innerText = time.slice(0, 5);
        })
        .catch(error => {
            console.error('Error fetching time:', error);
        });
}

fetchTime();

setInterval(fetchTime, 10000);

