var geomentry=
	{
		distance:function(p1x,p1y,p2x,p2y)
			{
				p1x-=p2x;p1y-=p2y;
				return Math.sqrt((p1x*p1x)+(p1y*p1y));
			},
		slope:function(x1,y1,x2,y2)
			{
				return Math.atan((y1-y2)/(x1-x2));
			},
		inclinedPoint:function(len,ang)
			{
				return {x:(len*Math.cos(ang)),y:(len*Math.sin(ang))}
			},
		
		logics:
			{
				point2line:function(px,py,lx1,ly1,lx2,ly2,er)
					{
						er=er||1;
						var dl=geomentry.distance(lx1,ly1,lx2,ly2);
						var dpl=geomentry.distance(lx1,ly1,px,py);
						  	dpl+=geomentry.distance(px,py,lx2,ly2);
						if(dl>=dpl-er&&dl<=dpl+er)
							{
								return true;
							}
					},
					
				circle2line : function(cx,cy,cr,l1x,l1y,l2x,l2y,er)
					{
						var m = geomentry.slope(l1x,l1y,l2x,l2y)+(Math.PI/2);
							cx+= geomentry.inclinedPoint(cr,m).x;
							cy+= geomentry.inclinedPoint(cr,m).y;
							return geomentry.logics.point2line(cx,cy,l1x,l1y,l2x+(cr/3),l2y,er);
					}
			},
			
	};//alert();
	
