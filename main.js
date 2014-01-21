enchant();
window.onload = function(){
	var game = new Core(400, 400);
	game.fps = 15;
	game.preload("invaders.png");
	game.onload = function(){
		var invader = new Sprite(141, 217);
		invader.image = game.assets["invaders.png"];
		invader.x = 0;
		invader.y = 0;
		invader.frame = 1;
		game.rootScene.addChild(invader);
		
		invader.addEventListener("enterframe", function(){
			this.frame = this.age % 2;
		})
	}
}