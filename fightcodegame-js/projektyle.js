/** 
 * Projektyle JS Code
 * Rank: 810
 * Strategy: 
 *  Fire shots in a "v" shaped formation, encompassing the enemy robot and 
 *  preventing possibility of escape. Clone at the beginning of the match
 *  and disappear if health is less than 50. 
 *
 * Author: Manan
 * Version: 05102014
**/
function Robot(projektyle) {
    projektyle.rotateCannon(60);
  	projektyle.clone();
}

var t = 0;

Robot.prototype.onScannedRobot = function(ev) {
    var projektyle = ev.robot;
    var enemy = ev.scannedRobot;
    //an actual enemy, NOT an ally
    if (enemy.id !== projektyle.parentId && enemy.parentId !== projektyle.id) {
        projektyle.fire();
        projektyle.rotateCannon(35);
        projektyle.fire();
    }
};

Robot.prototype.onIdle = function(ev) {
    var projektyle = ev.robot;
    projektyle.ahead(10);
    projektyle.turn(-45);
    t += 1;
    if (t == 5) {
        projektyle.ahead(150);
        t = 0;
    }
    if(projektyle.life < 60) projektyle.disappear();
    //if (projektyle.life < 60) projektyle.clone();
};
