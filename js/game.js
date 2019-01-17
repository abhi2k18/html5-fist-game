var dcol=false;
var speed= 1;
var score=0,maxScore=0;


var game=
	{
		flags:
			{
				cache:false,
				jump:{jumping:false,falling:true},
				playerY:300,
				canvas:{height:500,width:500},
				paths:[],
				lenx:0,
				maxPath:5,
				welcome:function(cache)
					{
						
					}
			},
		setcache:function()
			{
				if(window.localStorage)
					{
						if(!window.localStorage.game) document.getElementById("alert").style.display="block";
						else {speed=parseInt( window.localStorage.game);maxScore=parseInt(window.localStorage.max);game.flags.cache=window.localStorage.game;}
						
					}else alert("Cached Data Is Not Supports Or Enabled");
			},
			
		
		logics:
			{
				addPath:function()
					{
						var ang=Math.random()*Math.PI/4;
						var len=Math.random()*200+100;
						var py=game.flags.canvas.height-50-( Math.random()*60);
						var px=game.flags.canvas.width;
							game.flags.lenx=len*Math.cos(ang)+100;
						var color="white";
							switch(parseInt(7*Math.random()))
								{
									case 0:
										color = 'rgb(182,118,39)';
									break;
									case 1:
										color = 'rgb(158,69,228)';
									break;
									case 2:
										color = 'rgb(255,230,149)';
									break;
									case 3:
										color = 'rgb(209,179,234)';
									break;
									case 4:
										color = 'rgb(71,252,234)';
									break;
									case 5:
										color = 'rgb(73,68,123)';
									break;
									case 6:
										color = 'rgb(221,141,123)';
									break;
									case 7:
										color = 'rgb(228,137,190)';
									break;
									
								}
						
						game.flags.paths.push
						({
							ang:ang,
							x1:px,
							x2:len*Math.cos(ang)+px+100,
							y1:py,
							y2:-len*Math.sin(ang)+py,
							color:color
						});
					},
					
				drawPath:function(speed,ctx)
					{
						game.flags.paths.forEach
							(function(pt){
								pt.x1-=speed;pt.x2-=speed;
								ctx.beginPath();
								ctx.moveTo(pt.x1,pt.y1);
								ctx.lineTo(pt.x2,pt.y2);
								ctx.lineTo(pt.x2,game.flags.canvas.height);
								ctx.lineTo(pt.x1,game.flags.canvas.height);
								ctx.closePath();
								ctx.fillStyle=pt.color;
								ctx.fill();
							});
					},
			
				gap:function(speedx)
					{
						gap+=speedx;
						if (gap >=100+game.flags.lenx)
							{gap=0;game.logics.addPath(speedx);}
						
						if (game.flags.paths.length>6)
							{game.flags.paths.shift();}
					},
				
				
					
				player:function(gravity,ctx)
					{
						game.flags.playerY+=gravity;
						ctx.beginPath();
						ctx.arc(150,game.flags.playerY,37,0,2*Math.PI);
						var grid=ctx.createRadialGradient(150,game.flags.playerY,0,150,game.flags.playerY,40);
							grid.addColorStop(0,'rgb(239,239,239)');
							grid.addColorStop(1,"black");
						ctx.fillStyle=grid;
						ctx.fill();
					},
				jump:function(speed,ctx)
					{   //dcol =false;
						var j=game.flags.jump;
						//var gravity=0;
						var py=game.flags.playerY;
						
						var dt;
						game.flags.paths.forEach(function(tm)
							{
								if(geomentry.logics.circle2line(150,py,30,tm.x1,tm.y1,tm.x2,tm.y2,speed/2)) dt=tm;
							});
						if(dt)
							{
								gravity=-speed*Math.sin(dt.ang);
								j.falling=false;
								j.jumping=false;
							}else j.falling=true;
						if(helper.data.touches[0]&&(!j.jumping)&&!j.falling)
							{j.falling=false;j.jumping=true;jump=8*speed;}
						
						if(j.jumping)
							{if(jump>0){jump--;gravity=-4;}else {jump=0;j.jumping=false;}}
						
						if(j.falling&&!j.jumping) gravity+=(0.04*speed);
						game.logics.player(gravity,ctx);
					}
			},
		
		
			
		
	};
	
	
	//game.flags.paths[1]={x1:0,x2:(game.flags.canvas.width-100),y1:(game.flags.canvas.height-60),y2:(game.flags.canvas.height-60),ang:0,color:"red"};
	var gap=0;
	var jump=0,gravity=0;
