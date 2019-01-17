helper.setUp.canvas();
helper.setUp.touch();


function ok()
	{
		document.getElementById("alert").style.display="none";
		window.localStorage.game=1;
		window.localStorage.max=0;
		game.flags.cache=window.localStorage.game;
		speed= parseInt( window.localStorage.game);
	}
	
function exit(){document.getElementById("alert").style.display="none";}

helper.windowLoad.push(function(){
	var canvas = helper.elements.canvas;
	var ctx = canvas.getContext("2d");
	var p= document.getElementById("p");
	var i=0;
	var gaming=false;
	
	var gradi=ctx.createLinearGradient(0,0,200,60);
		gradi.addColorStop("0",'rgb(236,191,143)');
		gradi.addColorStop("0.5",'rgb(167,161,236)');
		gradi.addColorStop("1",'rgb(243,7,253)');
		
	game.setcache();
	
	function paths(speed,ctx,i)
		{
			game.logics.gap(speed);
			game.logics.drawPath(speed,ctx);
			game.logics.jump(speed,ctx);
			
		}
	
	function gameStart()
		{
			paths(speed,ctx,i);
			if(game.flags.playerY>450)
				{gaming = false;}
			if(i>speed*speed){speed++;i=0;if(game.flags.cache) window.localStorage.game=speed;}else i+=0.01;
			score+=speed;
		}
	function start()
		{
			ctx.fillStyle=gradi;
			ctx.font=("30px Verdana");
			ctx.fillText("Continue :"+ speed,190,200);
				//ctx.strokeRect(190,173,160,30);
			ctx.fillText("New Game",180,250);
				//ctx.strokeRect(175,223,180,30);
			ctx.fillText("Max Score is "+maxScore,100,290);
			var tcord=helper.calibrateTouches();
			game.flags.paths=[{x1:0,x2:(game.flags.canvas.width-100),y1:(game.flags.canvas.height-60),y2:(game.flags.canvas.height-60),ang:0,color:"red"}];
			game.flags.playerY=300;
			game.flags.lenx=00;
			i=0;
			if(score>maxScore)maxScore=score;
			if(game.flags.cache)window.localStorage.max=maxScore;
			//score=0;
			tcord.forEach(function(tp){
				if(tp.clientX>190&&tp.clientX<350&&tp.clientY>173&&tp.clientY<203){gaming=true;score=0;}
				if(tp.clientX>175&&tp.clientX<355&&tp.clientY>223&&tp.clientY<253){gaming=true;speed=1;score=0;}
			});
		}
		
	function loop()
		{
			ctx.clearRect(0,0,500,500);
			ctx.fillStyle='rgb(129,243,170)';
			ctx.fillRect(0,0,500,500);
			ctx.closePath();
			
			if(!gaming) start();else gameStart();
			//gameStart();
			//ctx.begianPath();
			ctx.fillStyle=gradi;
			ctx.font=("30px Verdana");
			ctx.fillText("LEVEL :"+ speed,10,50);
			ctx.strokeText("LEVEL :"+ speed,10,50);
			ctx.closePath();
			
			ctx.fillStyle="black";
			ctx.fillText("Score : "+score,160,50);
			
			//p.innerHTML=score;
			
		}
	helper.setUp.animation(loop);
});
