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
    image: null, // Inizialmente nullo

    update: function () {
        this.x += this.speedx;
        this.y += this.speedy;
        
        // Se abbiamo immagini, gestiamo l'animazione
        if (this.imagelist.length > 0) {
            this.contaframe++;
            if (this.contaframe >= 10) { // 10 è più veloce e reattivo di 50
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
        // Fondamentale: assegna la prima immagine subito!
        this.image = this.imagelist[0];
    }
};