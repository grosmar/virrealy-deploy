var x = 0, y = 0,
	vx = 0, vy = 0,
	ax = 0, ay = 0; az = 0;
var gx = 0, gy = 0, gz = 0;

var oldx = 0, oldy = 0, oldz = 0;

var speedx = 0; var speedy = 0;

var posX = 200;
var posY = 400;

var interval;

var pointArr = [{x:300, y:200}, {x:600, y:250}];
var currPoint = 0;

function setPoint( )
{
	document.getElementById("marker").style.left = pointArr[currPoint].x + "px";
	document.getElementById("marker").style.top = pointArr[currPoint].y + "px";
}

function hidePoint( )
{
	document.getElementById("marker").style.display = "none";
}


function deviceMotionListener(e)
{
	
	ax = e.accelerationIncludingGravity.x;
	ay = e.accelerationIncludingGravity.y;
	az = e.accelerationIncludingGravity.z;
	
	if ( e.rotationRate ) {
		document.getElementById("rotationAlpha").innerHTML = e.rotationRate.alpha;
		document.getElementById("rotationBeta").innerHTML = e.rotationRate.beta;
		document.getElementById("rotationGamma").innerHTML = e.rotationRate.gamma;
	}
}

function tick()
{
	gx = 0.9 * gx + 0.1 * ax;
	gy = 0.9 * gy + 0.1 * ay;
	gz = 0.9 * gz + 0.1 * az;

	ax -= gx;
	ay -= gy;
	az -= gz;

	document.getElementById("accelerationX").innerHTML = Math.round(ax * 100);
	document.getElementById("accelerationY").innerHTML = Math.round(ay * 100);
	document.getElementById("accelerationZ").innerHTML = Math.round(az * 100);


	//var force = Math.sqrt( ax * ax + az * az );

	speedx += ax;
	speedy += ay;

	oldx = ax;
	oldy = ay;

	var c=document.getElementById("c");
	var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(posX,posY);

	posX -= speedx / 10;
	posY += speedy / 10;

	if ( pointArr[currPoint] )
	{
		var xVal = Math.pow(Math.abs(posX-pointArr[currPoint].x-25),2);
		var yVal = Math.pow(Math.abs(posY-pointArr[currPoint].y-50),2);
		var distance = Math.round(Math.sqrt(xVal + yVal));

		document.getElementById("distance").innerHTML = "Distance: " + distance;

		if ( distance < 25 )
		{
			currPoint++;

			if ( pointArr[currPoint] )
			{
				setPoint();
			}
			else
			{
				clearInterval( interval );
				document.getElementById("distance").style.display = "none";

				setTimeout( function ()
				{
					document.getElementById("canvasContainer").style.display = "none";
					document.getElementById("ending").style.display = "block";
				}, 1000 );
			}

		}
	}
	
	posX = Math.max(0, Math.min(posX, 1240));
	posY = Math.max(0, Math.min(posY, 500));

	ctx.lineTo(posX,posY);
	ctx.lineWidth=5;
	ctx.strokeStyle = "#c2c1c1";
	ctx.stroke();

}


function start( )
{
	setPoint();

	document.getElementById("upper_text").style.display = "none";
	document.getElementById("ghost_button_containter").style.display = "none";
	document.getElementById("canvasContainer").style.display = "block";

	if (window.DeviceMotionEvent != undefined) {
		window.addEventListener( "devicemotion", deviceMotionListener);

		interval = setInterval( tick, 50);
	};

	return false;
}


function boundingBoxCheck(){
	if (x<0) { x = 0; vx = -vx; }
	if (y<0) { y = 0; vy = -vy; }
	if (x>document.documentElement.clientWidth-20) { x = document.documentElement.clientWidth-20; vx = -vx; }
	if (y>document.documentElement.clientHeight-20) { y = document.documentElement.clientHeight-20; vy = -vy; }

}