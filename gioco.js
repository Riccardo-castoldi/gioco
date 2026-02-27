var mygamepiece;


function startGame() {
     myGameArea.start();
    mygamepiece = new component(30, 30, "green", 10, 120);
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    this.update = function() {
        let ctx = myGameArea.context; 
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
}
}

var myGameArea = {
    canvas : document.getElementById("gameCanvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
       
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    } 
}
function updateGameArea() {
    myGameArea.clear(); 
    mygamepiece.update();
}
window.addEventListener('keydown', function(event) {
    if (event.key == "ArrowRight") {
        mygamepiece.x += 10;
    }
});
window.addEventListener('keydown', function(event) {
    if (event.key == "ArrowLeft") {
        mygamepiece.x -= 10;
    }
});
window.addEventListener('keydown', function(event) {
    if (event.key == "ArrowUp") {
        mygamepiece.y -= 10;
    }
});
window.addEventListener('keydown', function(event) {
    if (event.key == "ArrowDown") {
        mygamepiece.y += 10;
    }
});

startGame();