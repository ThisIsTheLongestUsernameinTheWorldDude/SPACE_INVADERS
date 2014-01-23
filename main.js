enchant();

window.onload = function(){
    var game = new Core(320, 320);
    game.fps = 15;
    game.preload("invaders.png");
	function spawnEnemy(startx, starty, enemytype){
		var invader = new Sprite(32, 32);
			invader.image = game.assets["invaders.png"];
			invader.x = startx;
			invader.y = starty;
			invader.frame = 5;
			game.rootScene.addChild(invader);

			invader.addEventListener("enterframe", function(){
				this.x += 1;
				this.frame = this.age % 2 + 6;
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