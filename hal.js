/**
 * Hal 9000 Robot Code
 * Version 7042014
 * Rank: 769
 * Author: Manan
**/

var Robot = function(robot) {
  robot.rotateCannon(90); 
};
 
Robot.prototype.onIdle = function(ev) {
  var robot = ev.robot;
  robot.clone(); 
  if (ev.robot.parentId !== null) {
    robot.turn(-90);
    robot.rotateCannon(35);
  }
  robot.ahead(900);  
};
 
Robot.prototype.onScannedRobot = function(ev) {
  var hal = ev.robot;
  var enemy = ev.scannedRobot;
  if(enemy.id !== hal.parentId && enemy.parentId !== hal.id) {
    hal.fire(3);
    if (hal.parentId !== null) {
      hal.stop();
    	hal.fire(4);
      hal.rotateCannon(-20);
    }
    else {
      hal.rotateCannon(-20);
      hal.fire(2);
      hal.rotateCannon(20);
    }
  }  
};
 
Robot.prototype.onWallCollision = function(ev) {
  var robot = ev.robot;
	if (robot.parentId == null) {
  	robot.turn(ev.bearing + 90); 
  }
  else {
    robot.back(100);
    robot.rotateCannon(-180); 
    robot.turn(ev.bearing - 90); 
  }
};
 
Robot.prototype.onRobotCollision = function(ev) {
  var robot = ev.robot;
  robot.back(100); 
  robot.turn(90);
};
 
Robot.prototype.onHitByBullet = function(ev) {
  var robot = ev.robot;
  if (robot.parentId !== null) {   
    robot.stop();
    robot.rotateCannon(ev.bearing);
    robot.fire(1);
    robot.turn(90 - ev.bulletBearing);
  }
  else robot.turn(90 - (ev.bulletBearing*2));
};
