//alert();
var helper=
	{
		data:{touches:[]},
		calibrateTouches:function(element,touches)
		{
			element=element||helper.elements.canvas;
			touches=touches||helper.data.touches;
			
			var bound= element.getBoundingClientRect();
			var wr= element.width/bound.width;
			var hr= element.height/bound.height;
			var touchArray=[];
			
			//touches=Object.valuse(touches);
			//document.getElementById("p").innerHTML= bound.top;
			if(touches.length>0){Object.keys(touches).forEach(function(touch){
				touchArray[touch]={
					clientX:wr*(touches[touch].clientX-bound.left),
					clientY:hr*(touches[touch].clientY-bound.top),
				};
			});}
			
			touchArray.forEach(function(elem){
				/*elem.clientX-=bound.left;
				elem.clientX*=wr;
				elem.clientY-=bound.top;
				elem.clientY*=hr;*/
			});
			
			return touchArray;
		},
		elements:{},
		windowLoad:[function(){helper.elements.body=document.getElementsByTagName("body")[0];}],
		setUp:
		{
			canvas: function(wid,hig,style)
			{
				wid=wid||500;
				hig=hig||500;
				style=style||"border:8px solid grey;background:#999;width:98%";
				helper.windowLoad.push(function (){
												var canvas=document.createElement('canvas');
													canvas.width=wid;
													canvas.height=hig;
													canvas.style=style;
													helper.elements.body.appendChild(canvas);
													helper.elements.canvas=canvas;
											})	;
				
				return helper.elements.canvas;
			},
			animation:function(loop)
			{
				var temploop=function()
					{
						if(document.readyState=="complete") loop();//alert();
						window.requestAnimationFrame(temploop);
					};
				helper.windowLoad.push(window.requestAnimationFrame(temploop));
				return window.requestAnimationFrame(temploop);
			},
			touch:function(element,touchstart,touchmove,touchend)
			{//alert();
				helper.windowLoad.push(function(){
											element=element||helper.elements.canvas||helper.setUp.canvas();
											touchstart=touchstart||function(event)
												{
													event.preventDefault();
													helper.data.touches=event.targetTouches;
												};
											touchmove=touchmove||touchstart;
											touchend=touchend||touchstart;
											//alert();
											element.addEventListener("touchstart",touchstart,false);
											element.addEventListener("touchmove",touchmove,false);
											element.addEventListener("touchend",touchend,false);//alert();
										});
			}
		}	
	};
	
window.onload=function()
	{
		helper.windowLoad.forEach(function(elm){elm();});
	};
	
	
