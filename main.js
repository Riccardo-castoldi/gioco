var myObstacles = [];
let attesaostacolo = 20;

function startGame() {
    myGameArea.start(updateGameArea);
    animatedobject.loadimage(sprites); // Assicurati che sprites sia definito
    
    // Generazione iniziale (opzionale, puoi anche partire da zero)
    for (let i = 0; i < 5; i++) {
        let hCasuale = Math.floor(Math.random() * (250 - 50 + 1) + 50);
        myObstacles.push(new component(20, hCasuale, "green", 400 + (i * 200), 300));
    }
}

function updateGameArea() {
    myGameArea.clear();
    // Disegna la death zone
let ctx = myGameArea.context;
ctx.fillStyle = "red"; // Quale colore?
ctx.fillRect(0, 0, 40, 600); // x, y, larghezza, altezza
    animatedobject.update();
    myGameArea.drawGameObject(animatedobject);

    attesaostacolo--;

    // Generazione nuovi ostacoli
    if (attesaostacolo <= 0) {
        let hCasuale = Math.floor(Math.random() * (250 - 50 + 1) + 50);
        let YCasuale = Math.floor(Math.random() * (600 - hCasuale));

        myObstacles.push(new component(20, hCasuale, "green", 1000, YCasuale));
        attesaostacolo = Math.floor(Math.random() * (100 - 50 + 1) + 50);
    }

    // Movimento e Collisioni
    for (let i = myObstacles.length - 1; i >= 0; i--) {
        myObstacles[i].x -= 2;
        myObstacles[i].update();

        // Controllo se l'ostacolo tocca il personaggio (Trascinamento)
        if (myObstacles[i].crashWith(animatedobject)) {
            animatedobject.x -= 2; 
        }

        // Pulizia: rimuovi ostacoli usciti a sinistra
        if (myObstacles[i].x < -myObstacles[i].width) {
            myObstacles.splice(i, 1);
        }
    }

    // Death Zone
if (animatedobject.x < 0) {
    clearInterval(myGameArea.interval); 
    
    let ctx = myGameArea.context;
     // 1. Sfondo semi-trasparente nero su tutto il canvas
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"; // Nero con trasparenza
    ctx.fillRect(0, 0, 1000, 600);
    
    // 4. Testo "GAME OVER" con bordo
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    
    // Bordo bianco del testo
    ctx.strokeStyle = "black";
    ctx.lineWidth = 8;
    ctx.strokeText("GAME OVER", 500, 280);
    
    // Riempimento rosso del testo
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER", 500, 280);
    
    // 5. Messaggio "Premi F5"
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Premi CTRL+R per ricomimnciare", 500, 450); 
 }
}

// Listener tastiera
window.addEventListener('keydown', function (event) {
    if (event.key == "ArrowRight") animatedobject.speedx = 5;
    if (event.key == "ArrowLeft")  animatedobject.speedx = -5;
    if (event.key == "ArrowUp")    animatedobject.speedy = -5;
    if (event.key == "ArrowDown")  animatedobject.speedy = 5;
});

window.addEventListener('keyup', function (event) {
    if (["ArrowRight", "ArrowLeft"].includes(event.key)) animatedobject.speedx = 0;
    if (["ArrowUp", "ArrowDown"].includes(event.key))    animatedobject.speedy = 0;
});

window.onload = function() {
    console.log("DOM e risorse pronte. Avvio gioco...");
    startGame();
};