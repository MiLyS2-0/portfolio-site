const clouds = document.querySelectorAll('.cloud');
let isStorm = false;
let birdsActive = false;

// Функция запуска птиц
function launchBirds() {

  for (let i = 0; i < 5; i++) {

    const bird = document.createElement('div');
    bird.classList.add('bird');

    bird.style.top = (10 + Math.random() * 40) + '%';

    const scale = 0.7 + Math.random() * 0.6;
    bird.style.transform = `scale(${scale})`;

    const duration = 12 + Math.random() * 6;
    bird.style.animationDuration = duration + 's';
    bird.style.animationName = i % 2 === 0 ? 'flyRight' : 'flyLeft';

    document.body.appendChild(bird);

    setTimeout(() => {
      bird.remove();
    }, duration * 1000);
  }
}


window.addEventListener('scroll', () => {

  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  const atBottom = scrollTop + windowHeight >= fullHeight - 50;
  const atTop = scrollTop < 50;

  // === ВКЛЮЧИТЬ ШТОРМ ===
  if (atBottom && !isStorm) {
    isStorm = true;
    document.body.style.background = "linear-gradient(to bottom, #0a264a, #06182f)";

    clouds.forEach(cloud => {
      cloud.style.backgroundColor = "#5f5f5f";
    });

    for (let i = 0; i < 300; i++) {

      const drop = document.createElement('div');
      drop.classList.add('rain-drop');

      drop.style.left = Math.random() * 100 + 'vw';

      const duration = 0.4 + Math.random() * 0.8;
      drop.style.animationDuration = duration + 's';

      const height = 10 + Math.random() * 20;
      drop.style.height = height + 'px';

      drop.style.opacity = 0.4 + Math.random() * 0.6;

      document.body.appendChild(drop);
    }

    console.log("Шторм начался 🌧");
  }

  // === ВЫКЛЮЧИТЬ ШТОРМ ===
  if (!atBottom && isStorm) {
    isStorm = false;
    document.body.style.background = "#8ccfff";

    clouds.forEach(cloud => {
      cloud.style.backgroundColor = "#fff";
    });

    document.querySelectorAll('.rain-drop').forEach(drop => {
      drop.remove();
    });

    console.log("Шторм закончился ☀");
    launchFlowers();

  }

  // === ПТИЦЫ ВВЕРХУ ===
  if (atTop && !birdsActive) {
    birdsActive = true;
    launchBirds();
  }

  if (!atTop && birdsActive) {
    birdsActive = false;
  }

});

function launchFlowers() {

  for (let i = 0; i < 10; i++) {

    const flower = document.createElement('div');
    flower.classList.add('flower');

    flower.innerHTML = `
      <svg viewBox="0 0 200 200">
        <g>
          ${Array.from({length:16}).map((_,i)=>{
            const angle = i*22.5;
            return `<ellipse cx="100" cy="60"
                     rx="15" ry="40"
                     fill="white"
                     transform="rotate(${angle} 100 100)" />`;
          }).join('')}
          <circle cx="100" cy="100" r="30" fill="#fbc02d"/>
        </g>
      </svg>
    `;

    flower.style.left = Math.random() * 90 + 'vw';
    flower.style.top = Math.random() * 80 + 'vh';

    const scale = 0.5 + Math.random() * 0.8;
    flower.style.transform = `scale(${scale})`;

    flower.style.animationDelay = (Math.random() * 3) + 's';

    document.body.appendChild(flower);

    setTimeout(() => {
      flower.remove();
    }, 20000);
  }
}


// лианы
function createVines() {

  for (let i = 0; i < 8; i++) {

    const vine = document.createElement('div');
    vine.classList.add('vine');

    vine.style.left = (5 + i * 12) + 'vw';

    const height = 150 + Math.random() * 200;
    vine.style.height = height + 'px';

    const delay = Math.random() * 2;
    vine.style.animationDelay = delay + 's';

    document.body.appendChild(vine);
  }
}
