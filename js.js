const square = document.getElementById("square");
const enemy = document.getElementById("enemy");
const score = document.getElementById("score");
const W = document.getElementById("t1");
const ASD = document.getElementById("t2");
const btn = document.getElementById("start");
const img = document.getElementById("img");

    let gamestate = 0;
    let points = 0;

    btn.addEventListener('click',()=>{
        btn.style.display='none'
        img.style.display='none'
    })


    // gir poeng hvert sekund mens spillet er i gang
    setInterval(function () {
        if(gamestate === 2){
            points++
            score.innerHTML = "poeng: " + points;
        }
    }, 1000);


    // teller ned fra 3 når spilleren har utløst startsekvensen
    function countdown() {
let count = 3;
const interval = setInterval(() => {
ASD.innerHTML = count;
count--;
if (count < 0) {
  clearInterval(interval);
  ASD.style.display = 'none';
  gamestate = 2
}
}, 1000);
}

    // startsekvens som utløses når spilleren først beveger seg
    function start(){
        if(gamestate === 0){
            W.style.display='none';
            ASD.innerHTML='er du klar?';
            let count = 5;
            setTimeout(countdown, 1000)
            gamestate = 1
        }
    }


// funksjon ansvarlig for å flytte firkanten på skjermen når spilleren trykker en tast
function moveSquare(e) {
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const squareWidth = square.offsetWidth;
const squareHeight = square.offsetHeight;
const currentLeft = square.offsetLeft;
const currentTop = square.offsetTop;

start()

switch (e.keyCode) {
case 87: // W key
  if (currentTop > squareHeight/2) {
    square.style.top = currentTop - 10 + "px";
  }
  break;
case 83: // S key
  if (currentTop + squareHeight/2 < windowHeight) {
    square.style.top = currentTop + 10 + "px";
  }
  break;
case 65: // A key
  if (currentLeft > squareWidth/2) {
    square.style.left = currentLeft - 10 + "px";
  }
  break;
case 68: // D key
  if (currentLeft + squareWidth/2 < windowWidth) {
    square.style.left = currentLeft + 10 + "px";
  }
  break;
}
}

// min fiende kode 

/*function moveEnemy() {
    const txt = document.getElementById("txt");
    txt.style.display = 'none';
    enemy.style.backgroundImage = 'url(img/gremlin22.png)';
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const squareWidth = enemy.offsetWidth;
    const squareHeight = enemy.offsetHeight;
    const currentLeft = enemy.offsetLeft;
    const currentTop = enemy.offsetTop;
    
    const min = 1;
  const max = 4;
  const randomNum = Math.floor(Math.random() * (max - min + 1) + min);

  switch (randomNum) {
    case 1:
        if (currentTop > squareHeight) {
            enemy.style.top = currentTop - 10 + "px";
          }
      break;
    case 2:
        if (currentTop + squareHeight < windowHeight) {
            enemy.style.top = currentTop + 10 + "px";
          }
      break;
    case 3:
        if (currentLeft > squareWidth) {
            enemy.style.left = currentLeft - 10 + "px";
          }
      break;
    case 4:
        if (currentLeft + squareWidth < windowWidth) {
            enemy.style.left = currentLeft + 10 + "px";
          }
      break;
  }
}*/

// min fiende kode chatgpt improved
// ansvarlig for å flytte fiende firkanten på skjermen

function moveEnemy() {
    const txt = document.getElementById("txt");
    txt.style.display = 'none';
    enemy.style.backgroundImage = 'url(img/gremlin22.png)';
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const squareWidth = enemy.offsetWidth;
    const squareHeight = enemy.offsetHeight;
    const currentLeft = enemy.offsetLeft;
    const currentTop = enemy.offsetTop;
    const squareLeft = square.offsetLeft;
    const squareTop = square.offsetTop;
  
    const dx = squareLeft - currentLeft;
    const dy = squareTop - currentTop;
    const distance = Math.sqrt(dx*dx + dy*dy);
  
    const baseProbability = 0.25;
    let probabilityUp = baseProbability;
    let probabilityDown = baseProbability;
    let probabilityLeft = baseProbability;
    let probabilityRight = baseProbability;
  
    if (dy < 0 && currentTop > squareHeight) {
      probabilityUp += 0.1/distance;
    }
    if (dy > 0 && currentTop + squareHeight < windowHeight) {
      probabilityDown += 0.1/distance;
    }
    if (dx < 0 && currentLeft > squareWidth) {
      probabilityLeft += 0.1/distance;
    }
    if (dx > 0 && currentLeft + squareWidth < windowWidth) {
      probabilityRight += 0.1/distance;
    }
  
    const probabilities = [probabilityUp, probabilityDown, probabilityLeft, probabilityRight];
    const maxProbability = Math.max(...probabilities);
    const directionIndex = probabilities.indexOf(maxProbability) + 1;
    let direction;
  
    switch (directionIndex) {
      case 1:
        if (currentTop > squareHeight) {
          enemy.style.top = currentTop - 10 + "px";
        }
        direction = "up";
        break;
      case 2:
        if (currentTop + squareHeight < windowHeight) {
          enemy.style.top = currentTop + 10 + "px";
        }
        direction = "down";
        break;
      case 3:
        if (currentLeft > squareWidth) {
          enemy.style.left = currentLeft - 10 + "px";
        }
        direction = "left";
        break;
      case 4:
        if (currentLeft + squareWidth < windowWidth) {
          enemy.style.left = currentLeft + 10 + "px";
        }
        direction = "right";
        break;
    }
  
    console.log(`Moved enemy ${direction} (distance=${distance.toFixed(2)})`);
  }
  
    // utløser fiende beveger funksjonen i takt med angitt tidsmellomrom når spillet har startet
    setInterval(()=> {
        if(gamestate === 2){
        moveEnemy()}
    },75);

document.addEventListener("keydown", moveSquare);
