


function startGame() {
     myGameArea.start();
    animatedobject.loadimage(); 
}
   

var animatedobject = {
    speedx:0,
    speedy:0,
    width: 60,
    height: 60,
    x: 10,
    y: 120,
    imagelist: [],
    contaframe:0,
    actualframe:0,

    
  update: function() {
    this.x += this.speedx;
    this.y += this.speedy;
    this.contaframe++;
    if (this.contaframe == 50) {
      this.contaframe = 0;
      this.actualframe = (1 + this.actualframe) % this.imagelist.length;
      //console.log(this.actualframe);
      this.image = this.imagelist[this.actualframe];
    }
  },

   
    loadimage: function() {
        for (imgPath of sprites) {
      var img = new Image(this.width, this.height);
      img.src = imgPath;
      this.imagelist.push(img);
    }
    this.image = this.imagelist[this.actualframe];
  }
};
 


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
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
       
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    drawGameObject: function(gameObject) {
    this.context.drawImage(
      gameObject.image,
      gameObject.x,
      gameObject.y,
      gameObject.width,
      gameObject.height
    ); } 
}
function updateGameArea() {
    myGameArea.clear(); 
    animatedobject.update();
    myGameArea.drawGameObject(animatedobject);
    myGameArea.drawGameObject(animatedobject);

}
window.addEventListener('keydown', function(event) {
    if (event.key == "ArrowRight") {
        animatedobject.speedx = 5;
    }
});
window.addEventListener('keydown', function(event) {
    if (event.key == "ArrowLeft") {
        animatedobject.speedx = -5;
    }
});
window.addEventListener('keydown', function(event) {
    if (event.key == "ArrowUp") {
        animatedobject.speedy = -5;
    }
});
window.addEventListener('keydown', function(event) {
    if (event.key == "ArrowDown") {
        animatedobject.speedy = 5;
    }
});

startGame();