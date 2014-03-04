var StageHeight = 320;
var StageWidth = 450;
var PlayerSpeed = 2;
var PlayerBulletSpeed = 5;
enchant();

window.onload = function(){	
    var game = new Core(StageWidth, StageHeight);
	game.framedelay = 16;
	//invaders mover every 16th frame
    game.fps = 60;
	game.enemydirection = 1
	// 1 is move right, -1 is move left
	game.enemyonedge = 0
	game.godown = false;
	game.counter = 0;
	//dont ask, i use it to regulate downward movement for enemies
	game.age = 0;
	game.playerbulletactive = false;
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
		}
	});
	
	var bg = new Sprite(StageWidth, StageHeight);
	bg.backgroundColor = "rgb(0, 0 ,0)";
	game.rootScene.addChild(bg);
	
	var invaders = [];
	
    game.preload("invaders.png");
	
	function spawnEnemy(startx, starty, enemytype){
		var invader = new Sprite(31, 27);
			console.log(invader);
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
		invaders.push(invader);
		return invader;
		}
		
		game.preload("playerbullet.jpg");
		function spawnPlayerBullet(startx, starty){
			var bullet = new Sprite(2, 10);
			bullet.image = game.assets["playerbullet.jpg"];
			bullet.x = startx;
			bullet.y = starty;
			bullet.frame = 0;
			bullet.addEventListener("enterframe", function(){
					this.y -= PlayerBulletSpeed;
					if(this.y <= -10){
						game.playerbulletactive = false;
						game.rootScene.removeChild(bullet);
					}
					for(var i = 0; i <= invaders.length; i++){
						if(this.intersect(invaders[i])){
							invaders[i].y = -100
							// even after using removechild, the enmy is still there, just invisible.
							//this moves them offstage
							console.log("does it work");
							game.rootScene.removeChild(invaders[i]);
							game.playerbulletactive = false;
							game.rootScene.removeChild(this);
							}
						}
				});
			game.rootScene.addChild(bullet);
			return bullet;
		}
		
		game.preload("player.jpg");
		function spawnPlayer(startx, starty){
			var player = new Sprite(31, 21);
			player.image = game.assets["player.jpg"];
			player.x = startx;
			player.y = starty;
			player.frame = 0;
			player.addEventListener("enterframe", function(){
				if(game.input.left){
					this.x -= PlayerSpeed;
					}else if(game.input.right){
					this.x += PlayerSpeed;
					}else{
					this.x = this.x
					}
				if(game.input.up && !game.playerbulletactive){
					var bullet = spawnPlayerBullet(this.x + 15, this.y - 12);
					game.playerbulletactive = true;
					}
				});
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