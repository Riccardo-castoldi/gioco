var component = function(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;


    this.update = function () {
        let ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    // collisioni
    this.crashWith = function (otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
       
        let crash = true;
        if ((myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    };
    this.topcrashwith = function (otherobj) {
       
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let topcrash = true;
        if ((mybottom < othertop) || (mytop > otherbottom)) {
            topcrash = false;
        }
        return topcrash;
    }
}