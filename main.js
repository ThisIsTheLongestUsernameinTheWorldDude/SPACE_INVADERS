enchant();

window.onload = function(){
    var game = new Core(320, 320);
    game.fps = 15;
    game.preload("invaders.png");
	function spawnEnemy(startx, starty, enemytype){
		var invader = new Sprite(32, 27);
			invader.image = game.assets["invaders.png"];
			invader.x = startx;
			invader.y = starty;
			invader.frame = enemytype;
			invader.newFrame = function(){
				if(this.frame % 2 = 0){
				this.frame = (this.enemytype * 2) + 1;
				}else{
				this.frame = this.enemytype * 2;
				}
			}
			game.rootScene.addChild(invader);

			invader.addEventListener("enterframe", function(){
				this.x += 1;
				if((this.age % 3) = 0){
					this.newFrame();
				}else{
					this.frame = this.frame;
				}
			});

			invader.addEventListener("touchstart", function(){
				game.rootScene.removeChild(invader);
			});
		return invader;
		}
    game.onload = function(){
		var enemy1 = spawnEnemy(0, 0, 0);
		var enemy2 = spawnEnemy(50, 50, 0);
    };
    game.start();
};