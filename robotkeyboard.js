ThunderConnector = require('thunder-connector');

var keypress = require('keypress')
  , tty = require('tty');

var irobot = require('irobot');

var speed = 50;

var robot = new irobot.Robot('/dev/ttyUSB0',{baudrate: 115200});
robot.on('ready', function () {
  console.log('READY');
});
// make `process.stdin` begin emitting "keypress" events

ThunderConnector.connect();

function up(degrees){
	stopTime = Math.floor(degrees * 22.3);
	setTimeout(function(){ThunderConnector.command('up');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function down(degrees){
	stopTime = Math.floor(degrees * 22.3);
	setTimeout(function(){ThunderConnector.command('down');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function turnRightDegrees(degrees){
	stopTime = Math.floor(degrees * 22.3)
	setTimeout(function(){ThunderConnector.command('right');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function turnLeftDegrees(degrees){
	stopTime = Math.floor(degrees * 22.3)
	setTimeout(function(){ThunderConnector.command('left');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function fire(){
	setTimeout(function(){ThunderConnector.command('fire');},0);
}

keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);

 //keyboard commands
    if (key.name == 'w'){
    console.log("moved forward");
    speed = speed * 1 + 50    
    data = {left: speed, right: speed};
    console.log (speed);
    robot.drive(data);


    } else if (key.name == 's'){
    console.log("moved backward");
    speed = speed * 1 - 50
    data = {left: speed, right: speed};
    console.log (speed);
    robot.drive(data);


  } else if (key.name == 'd'){
    console.log("spin right");
    speed = 150
    data = {left: -speed, right: speed};
    console.log(speed);
    robot.drive(data);


  } else if (key.name == 'a'){
    console.log("spin left");
    speed = 150    
    data = {left: speed, right: -speed};
    console.log(speed);
    robot.drive(data);


  } else if (key.name == 'space'){
    console.log("stop");
    speed = speed * 0
    data = {left: speed, right: speed};
    console.log(speed);
    robot.drive(data);
    
  }


if (key && key.ctrl && key.name == 'c') {
  console.log('control c');
  process.exit(0);
   // process.stdin.pause();
  }
});

if (typeof process.stdin.setRawMode == 'function') {
  process.stdin.setRawMode(true);
} else {
  tty.setRawMode(true);
}
  process.stdin.resume();