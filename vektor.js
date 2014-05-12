
/**
 * Vektor Robot Code
 * Version 5112014
 * Rank: 226
 * Author: Manan
**/

var t = 0;
var Robot = function(vektor) {
  vektor.rotateCannon(90); 
};
 
Robot.prototype.onIdle = function(ev) {
  var vektor = ev.robot;
  vektor.clone();   
  //find the clone
  if (vektor.parentId !== null) {
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
    }	
  }
  vektor.ahead(1000);  
};
 
Robot.prototype.onScannedRobot = function(ev) {
  var vektor = ev.robot;
  var enemy = ev.scannedRobot;
  if(enemy.id !== vektor.parentId && enemy.parentId !== vektor.id) {
    vektor.fire(1);
    if (ev.robot.parentId !== null) {
	vektor.fire();
      	vektor.fire();
        vektor.rotateCannon(35);
        vektor.fire();
      	vektor.fire();
    }
    else {
      vektor.rotateCannon(-20);
      vektor.fire(2);
      vektor.rotateCannon(20);
      vektor.fire(2);
    }
  }  
};
 
Robot.prototype.onWallCollision = function(ev) {
  var vektor = ev.robot;
	if (vektor.parentId == null) {
  	vektor.turn(ev.bearing + 90); 
  }
  else {
    vektor.back(100);
    vektor.rotateCannon(-180); 
    vektor.turn(ev.bearing - 110); 
  }
};
 
Robot.prototype.onRobotCollision = function(ev) {
  var vektor = ev.robot;
  vektor.back(100); 
  vektor.turn(90);
};
 
Robot.prototype.onHitByBullet = function(ev) {
  var vektor = ev.robot;
  vektor.disappear();
  if (vektor.parentId !== null) {   
    vektor.stop();
    vektor.rotateCannon(ev.bearing);
    vektor.fire(1);
    vektor.turn(90 - ev.bulletBearing);
  }
  else vektor.turn(90 - (ev.bulletBearing*2));
};
