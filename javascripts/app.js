var rover = {};
rover.direction="N";
rover.x=0;
rover.y=0;
rover.travelLog=[[0,0]];

var x_boundary=10;
var y_boundary=10;


function turnLeft(rover){

  console.log("turnLeft was called!");

  switch (rover.direction) {

    case "N":
      rover.direction="E";
      break;

    case "E":
      rover.direction="S";
      break;

    case "S":
      rover.direction="W";
      break;

    case "W":
      rover.direction="N";
      break;
 
  }

}

function turnRight(rover){
  console.log("turnRight was called!");

  switch (rover.direction) {

    case "N":
      rover.direction="W";
      break;

    case "E":
      rover.direction="S";
      break;

    case "S":
      rover.direction="E";
      break;

    case "W":
      rover.direction="N";
      break;
 
  }


}

function moveForward(rover){
  console.log("moveForward was called");
  rover.travelLog.push ([rover.x,rover.y]);

  switch (rover.direction) {
  
    case "N":
      if ((rover.y)-1 >= 0) { rover.y=(rover.y)-1;}
      break;

    case "E":
      if ((rover.x)-1>=0) { rover.x=(rover.x)-1 };
      break;

    case "S":
      if ((rover.y)+1 <= y_boundary) { rover.y=(rover.y)+1 } ;
      break;

    case "W":
      if ((rover.x)+1 <= x_boundary) { rover.x=(rover.x)+1 };
      break;
 
  }

  console.log ("The rover position x is now " + rover.x + " and position y is " + rover.y);

}

function command (commandString) {

  let stringCounter=0;
 
  while (stringCounter<commandString.length) {

     switch (commandString [stringCounter])

     {
        case "f":
          moveForward (rover);
          break;
        case "r":
          turnRight (rover);
          break;
        case "l":
          turnLeft (rover);
          break;
     }

     stringCounter++;
 }

rover.travelLog.forEach ((item, index) => { console.log ("Position "+index+ " was x: " + item [0] + " and y: " + item [1])});

}
