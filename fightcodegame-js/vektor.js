
/**
 * Vektor Robot Code
 * Highest Rank: 226
 * Version 7042014
**/

var t = 0;
var Robot = function(vektor) {
  if(vektor.parentId === null) 
    vektor.rotateCannon(90); 
};
  
Robot.prototype.onIdle = function(ev) {
  var vektor = ev.robot;
  vektor.clone();   
  //find the clone
  if (vektor.parentId !== null) {
    /*
    vektor.ahead(10);
    vektor.turn(-45);
    t += 1;
    if (t == 5) {
        vektor.ahead(150);
        t = 0;
    }
    if(vektor.life < 60) {
			vektor.disappear();
			vektor.ahead(200);
    }	*/
    vektor.move(25);
    vektor.turn(-30);
    for(var t = 1; t < 30; t++) {
      vektor.turn(20);
      vektor.move(20);
    }
    for(var t = 1; t < 20; t++) {
      vektor.turn(-30);
      vektor.move(20);
    }
  } 
  else vektor.ahead(1000);
};
 
Robot.prototype.onScannedRobot = function(ev) {
  var vektor = ev.robot;
  var enemy = ev.scannedRobot;
  if(enemy.id !== vektor.parentId && enemy.parentId !== vektor.id) {
    vektor.fire(1);
    if (vektor.parentId !== null) {
				vektor.stop();
        vektor.fire(2);
        vektor.move(50);
        vektor.fire(2);
    }
    else {
        vektor.rotateCannon(-20);
        vektor.fire(3);
        vektor.rotateCannon(20);
        vektor.fire(3);
    }  
  }  
};
 
Robot.prototype.onWallCollision = function(ev) {
  var vektor = ev.robot;
	if (vektor.parentId == null) {
  	vektor.turn(ev.bearing + 90); 
  }
  else {
    vektor.back(20);
    vektor.rotateCannon(-180); 
    vektor.turn(ev.bearing - 110); 
  }
};
 
Robot.prototype.onRobotCollision = function(ev) {
  var vektor = ev.robot;
  var enemy = ev.collidedRobot;
  if(vektor.parentId !== null) {
    if(enemy.id !== vektor.parentId && enemy.id !== vektor.id) {
      vektor.stop();
      vektor.turn(ev.bearing * 1.3);
      vektor.turn(ev.bearing * -1.3);
    }
  }
  else {
    vektor.back(100); 
    vektor.turn(90);
  }
};
 
Robot.prototype.onHitByBullet = function(ev) {
  var vektor = ev.robot;
  //vektor.disappear();
  if (vektor.parentId !== null) {   
    vektor.stop();
    vektor.rotateCannon(ev.bearing);
    vektor.fire(1);
    vektor.turn(90 - ev.bulletBearing);
  }
  else vektor.turn(90 - (ev.bulletBearing*2));
};
