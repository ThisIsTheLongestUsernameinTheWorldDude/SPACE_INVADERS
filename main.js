enchant();

window.onload = function(){
    var game = new Core(320, 320);
	game.framedelay = 4;
    game.fps = 15;
	game.enemydirection = 1
	game.enemyonedge = 0
	game.age = 0;
	// 1 is move right, -1 is move left
	game.addEventListener("enterframe", function(){	
		game.age += 1;
		if(this.enemyonedge == 1){
			game.enemydirection = game.enemydirection * -1;
			game.enemyonedge = 0;
		}else{
			console.log("Nothing on The Edge");
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
				this.x += (3 * game.enemydirection);
			}
			game.rootScene.addChild(invader);

			invader.addEventListener("enterframe", function(){
			if((this.x >= (320 - 31)) && (game.enemydirection == 1)){
					game.enemyonedge = 1;
					console.log("Right Side Collide");
				}else if((this.x <= 0) && (game.enemydirection == -1)){
					game.enemyonedge = 1;
					console.log("Left Side Collide");
				}else{
					console.log(game.enemyonedge);
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
		var enemy3 = spawnEnemy(100, 100, 2);
    };
    game.start();
};