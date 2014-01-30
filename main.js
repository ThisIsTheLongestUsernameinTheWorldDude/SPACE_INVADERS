enchant();

window.onload = function(){
    var game = new Core(320, 320);
	game.framedelay = 4;
    game.fps = 15;
	game.enemydirection = 1;
	// 1 means move right, -1 means move left
	game.enemyonedge = false;
	game.addEventListener("enterframe", function(){
		if(this.enemyonedge){
			this.enemydirection = this.enemydirection * -1;
			this.enemyonedge = false;
		}else{
			this.enemydirection = this.enemydirecton;
		}
	});
    game.preload("invaders.png");
	function spawnEnemy(startx, starty, enemytype){
		var invader = new Sprite(31, 27);
			invader.image = game.assets["invaders.png"];
			invader.x = startx;
			invader.y = starty;
			invader.frame = enemytype * 2;
			invader.newFrame = function(){
				if((this.frame % 2) == 0){
				this.frame = this.frame + 1;
				}else{
				this.frame = this.frame - 1;
				}
				this.x += 3 * game.enemydirection;
			}
			game.rootScene.addChild(invader);

			invader.addEventListener("enterframe", function(){
				if((this.x == 320 - (31-5)) && (game.enemydirection == 1)){
					game.enemyonedge = true;
				}else if((this.x == (31-4)) && (game.enemydirection == -1)){
					game.enemyonedge = true;
				}else{
					game.enemyonedge = false;
				}
				if((this.age % game.framedelay) == 0){
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
		var enemy2 = spawnEnemy(50, 50, 1);
		var enemy3 = spawnEnemy(50, 100, 2);
    };
    game.start();
};