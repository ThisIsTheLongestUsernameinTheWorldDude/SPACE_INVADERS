var StageHeight = 320;
var StageWidth = 450;
enchant();

window.onload = function(){	
    var game = new Core(StageWidth, StageHeight);
	game.framedelay = 4;
    game.fps = 15;
	game.enemydirection = 1
	// 1 is move right, -1 is move left
	game.enemyonedge = 0
	game.godown = false;
	game.counter = 0;
	game.age = 0;
	game.addEventListener("enterframe", function(){	
		game.age += 1;
		if(game.godown){
			game.counter += 1;
		}else{
			console.log("");
		}
		if(this.counter == 4){
			game.counter = 0;
			game.godown = false;
		}
		if(this.enemyonedge == 1){
			game.enemydirection = game.enemydirection * -1;
			game.godown = true;
			game.enemyonedge = 0;
		}else{
			console.log("Nothing on The Edge");
		}
	});
	
	var bg = new Sprite(StageWidth, StageHeight);
	bg.backgroundColor = "rgb(0, 0 ,0)";
	game.rootScene.addChild(bg);
	
	var invaders = [];
	
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
				if(game.godown){
					this.y += 10;
				}else{
					this.x += (3 * game.enemydirection);
					}
			}
			game.rootScene.addChild(invader);

			invader.addEventListener("enterframe", function(){
					if((this.x >= (StageWidth - 31)) && (game.enemydirection == 1)){
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
		game.preload("player.jpg");
		function spawnPlayer(startx, starty){
			var player = new Sprite(31, 21);
			player.image = game.assets["player.jpg"];
			player.x = startx;
			player.y = starty;
			player.frame = 0;
			game.rootScene.addChild(player);
			return player;
		}
    game.onload = function(){
		var player1 = spawnPlayer(200, 320 - 21); 
		var enemy1 = spawnEnemy(280, 0, 0);
		var enemy2 = spawnEnemy(50, 50, 1);
		var enemy3 = spawnEnemy(100, 100, 2);
    };
    game.start();
};