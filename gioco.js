
var myObstacles = [];
let attesaostacolo = 20;
function startGame() {
    myGameArea.start();
    animatedobject.loadimage();
    for (let i = 0; i < 5; i++) {
        // 1. Definisci un'altezza minima e massima
        let minAltezza = 50;
        let maxAltezza = 250;

        // 2. Calcola l'altezza casuale per QUESTO specifico ostacolo
        let altezzaCasuale = Math.floor(Math.random() * (maxAltezza - minAltezza + 1) + minAltezza);

        // 3. Usa altezzaCasuale quando crei il 'new component'
        myObstacles.push(new component(20, altezzaCasuale, "green", 400 + (i * 200), 300));
    }
}

// ogni oggetto deve esser in un file diverso 
var animatedobject = {
    speedx: 0,
    speedy: 0,
    width: 60,
    height: 60,
    x: 100,
    y: 200,
    imagelist: [],
    contaframe: 0,
    actualframe: 0,


    update: function () {
        this.x += this.speedx;
        this.y += this.speedy;
        this.contaframe++;
        if (this.contaframe == 50) {
            this.contaframe = 0;
            console.log("Immagini caricate:", this.imagelist.length);
            this.actualframe = (1 + this.actualframe) % this.imagelist.length;
            //console.log(this.actualframe);
            this.image = this.imagelist[this.actualframe];
        }
    },


    loadimage: function () {
        for (imgPath of sprites) {
            var img = new Image(this.width, this.height);
            img.src = imgPath;
            this.imagelist.push(img);
        }
        this.image = this.imagelist[this.actualframe];
    }
};


// la funzione component deve essere un oggetto 
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    this.update = function () {
        let ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

var myGameArea = {
    canvas: document.getElementById("gameCanvas"),
    start: function () {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");

        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    drawGameObject: function (gameObject) {
        this.context.drawImage(
            gameObject.image,
            gameObject.x,
            gameObject.y,
            gameObject.width,
            gameObject.height
        );
    }
}
function updateGameArea() {
    myGameArea.clear();
    animatedobject.update();
    myGameArea.drawGameObject(animatedobject);

    attesaostacolo--;

    if (attesaostacolo <= 0) {
        let minH = 50;
        let maxH = 250;
        let hCasuale = Math.floor(Math.random() * (maxH - minH + 1) + minH);

        let YCasuale = Math.floor(Math.random() * (600 - hCasuale));

        myObstacles.push(new component(20, hCasuale, "green", 1000, YCasuale));
        attesaostacolo = Math.floor(Math.random() * (100 - 50 + 1) + 50);
    }



    for (let i = myObstacles.length - 1; i >= 0; i--) {
        myObstacles[i].x -= 2;

        myObstacles[i].update();

        if (myObstacles[i].x < -myObstacles[i].width) {
            myObstacles.splice(i, 1);
        }
    }
}
window.addEventListener('keydown', function (event) {
    if (event.key == "ArrowRight") {
        animatedobject.speedx = 5;
    }
});
window.addEventListener('keydown', function (event) {
    if (event.key == "ArrowLeft") {
        animatedobject.speedx = -5;
    }
});
window.addEventListener('keydown', function (event) {
    if (event.key == "ArrowUp") {
        animatedobject.speedy = -5;
    }
});
window.addEventListener('keydown', function (event) {
    if (event.key == "ArrowDown") {
        animatedobject.speedy = 5;
    }
});

window.addEventListener('keyup', function (event) {
    if (event.key == "ArrowUp") {
        animatedobject.speedy = 0;
    } else if (event.key == "ArrowDown") {
        animatedobject.speedy = 0;
    } else if (event.key == "ArrowRight") {
        animatedobject.speedx = 0;
    } else if (event.key == "ArrowLeft") {
        animatedobject.speedx = 0;
    }
});

startGame();