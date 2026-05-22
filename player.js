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
    image: null,

    update: function () {
        this.x += this.speedx;
        this.y += this.speedy;
        
        // gestione immagini
        if (this.imagelist.length > 0) {
            this.contaframe++;
            if (this.contaframe >= 10) { 
                this.contaframe = 0;
                this.actualframe = (this.actualframe + 1) % this.imagelist.length;
                this.image = this.imagelist[this.actualframe];
            }
        }
    },

    loadimage: function (spritesArray) {
        for (let imgPath of spritesArray) {
            var img = new Image();
            img.src = imgPath;
            this.imagelist.push(img);
        }
        this.image = this.imagelist[0];
    }
};