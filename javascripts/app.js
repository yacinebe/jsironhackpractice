var rover1 = {};
var rover2 = {};
var rover3 = {};

rover1.direction = "N";
rover1.x = 0;
rover1.y = 0;
rover1.travelLog = [[0, 0]];
rover1.color = "black";

rover2.direction = "W";
rover2.x = 4;
rover2.y = 5;
rover2.travelLog = [[4, 5]];
rover2.color = "red";

rover3.direction = "W";
rover3.x = 8;
rover3.y = 5;
rover3.travelLog = [[4, 5]];
rover3.color = "green";

var obstacles = [[4, 0], [5, 9], [2, 6]];

var x_boundary = 10;
var y_boundary = 10;

rover = rover1;

document.addEventListener('keydown', event => {

  switch (event.keyCode) {

    case 37:
      turnLeft(rover);
      break;
    case 39:
      turnRight(rover);
      break;
    case 70:
      moveForward(rover);
      break;
  }
});

document.getElementById("black_rover").addEventListener("click", event => { changeRover("black_rover") });
document.getElementById("red_rover").addEventListener("click", event => { changeRover("red_rover") });
document.getElementById("green_rover").addEventListener("click", event => { changeRover("green_rover") });

initializeGrid(10, 10);
update();

placeRover(rover1);
placeRover(rover2);
placeRover(rover3);
placeObstacles();
displayNewPosition();


function update(time = 0) {


  placeRover(rover);

  requestAnimationFrame(update);

}

function changeRover(roverColor) {

  console.log("rover changed");

  switch (roverColor) {

    case "black_rover":
      rover = rover1;
      break;

    case "red_rover":
      rover = rover2;
      break; u

    case "green_rover":
      rover = rover3;
      break;

  }
}


function initializeGrid(numberOfRows, numberOfColumns) {

  document.getElementById("main_grid").innerHTML = "";

  for (i = 0; i <= (numberOfRows - 1); i++) {
    for (j = 0; j <= (numberOfColumns - 1); j++) {
      var newCell = document.createElement("div");
      newCell.className = "grid_cell";
      newCell.id = "x:" + j + "y:" + i;



      document.getElementById("main_grid").appendChild(newCell);

    }

  }

}

function placeRover(rover) {

  cellToPlaceRover = document.getElementById("x:" + rover.x + "y:" + rover.y);
  cellToPlaceRover.style.backgroundImage = "url('./images/rover-icon-mars-" + rover.color + "-" + rover.direction + ".png");
  cellToPlaceRover.style.backgroundSize = "cover";

  if ((rover.travelLog.length >= 2) && (!((rover.travelLog[rover.travelLog.length - 1][0] == rover.x) && (rover.travelLog[rover.travelLog.length - 1][1] == rover.y)))) {

    oldCellToRemoveRover = document.getElementById("x:" + rover.travelLog[rover.travelLog.length - 1][0] + "y:" + rover.travelLog[rover.travelLog.length - 1][1]);
    oldCellToRemoveRover.style.backgroundImage = "";

  }

}

function placeObstacles() {

  obstacles.forEach((x, index) => {

    cellToPlaceRover = document.getElementById("x:" + obstacles[index][0] + "y:" + obstacles[index][1]);
    cellToPlaceRover.style.backgroundImage = "url('./images/obstacle.png')";
    cellToPlaceRover.style.backgroundSize = "cover";

  });

}

function isAnotherRoverOnTheWay(roverForwardCoordinateX, roverForwardCoordinateY) {
  let collision = 0;

  switch (rover) {

    case rover1:
      if (((rover2.x == roverForwardCoordinateX) && (rover2.y == roverForwardCoordinateY)) || ((rover3.x == roverForwardCoordinateX) && (rover3.y == roverForwardCoordinateY))) { collision++; }
    case rover2:
      if (((rover1.x == roverForwardCoordinateX) && (rover1.y == roverForwardCoordinateY)) || ((rover3.x == roverForwardCoordinateX) && (rover3.y == roverForwardCoordinateY))) { collision++; }
    case rover3:
      if (((rover1.x == roverForwardCoordinateX) && (rover1.y == roverForwardCoordinateY)) || ((rover2.x == roverForwardCoordinateX) && (rover2.y == roverForwardCoordinateY))) { collision++; }


  }

  if (collision > 0) { return true; } else { return false; }

}




function isObstacleOnTheWay(roverForwardCoordinateX, roverForwardCoordinateY) {

  let collision = 0;

  obstacles.forEach((obstacle, index) => {


    if ((obstacle[0] == roverForwardCoordinateX) && (obstacle[1] == roverForwardCoordinateY)) {

      collision++
      console.log("collision at (" + obstacle[0] + "," + roverForwardCoordinateX + " and " + "collision at (" + obstacle[1] + "," + roverForwardCoordinateY);

    }


  });

  console.log("collision is " + collision);
  if (collision > 0) { return true; } else { return false; }

}




function turnLeft(rover) {

  console.log("turnLeft was called!");

  switch (rover.direction) {

    case "N":
      rover.direction = "E";
      break;

    case "E":
      rover.direction = "S";
      break;

    case "S":
      rover.direction = "W";
      break;

    case "W":
      rover.direction = "N";
      break;

  }

}

function turnRight(rover) {
  console.log("turnRight was called!");

  switch (rover.direction) {

    case "N":
      rover.direction = "W";
      break;

    case "E":
      rover.direction = "N";
      break;

    case "S":
      rover.direction = "E";
      break;

    case "W":
      rover.direction = "S";
      break;

  }


}

function moveForward(rover) {
  console.log("moveForward was called");
  rover.travelLog.push([rover.x, rover.y]);


  switch (rover.direction) {

    case "N":

      if (((rover.y) - 1 >= 0) && (!isObstacleOnTheWay(rover.x, rover.y - 1)) && !(isAnotherRoverOnTheWay(rover.x, rover.y - 1))) {
        rover.y = (rover.y) - 1;
      }
      break;

    case "E":

      if (((rover.x) - 1 >= 0) && !(isObstacleOnTheWay(rover.x - 1, rover.y)) && !(isAnotherRoverOnTheWay(rover.x - 1, rover.y))) {
        rover.x = (rover.x) - 1;
      }
      break;

    case "S":

      if (((rover.y) + 1 < y_boundary) && !(isObstacleOnTheWay(rover.x, rover.y + 1)) & !(isAnotherRoverOnTheWay(rover.x, rover.y + 1))) {
        rover.y = (rover.y) + 1;
      }
      break;

    case "W":


      if (((rover.x) + 1 < x_boundary) && !(isObstacleOnTheWay(rover.x + 1, rover.y)) && !(isAnotherRoverOnTheWay(rover.x + 1, rover.y))) { rover.x = (rover.x) + 1; }

      break;

  }

  console.log("The rover position x is now " + rover.x + " and position y is " + rover.y);
  displayNewPosition();

}

function command(commandString) {

  let stringCounter = 0;

  while (stringCounter < commandString.length) {

    switch (commandString[stringCounter]) {
      case "f":
        moveForward(rover);
        break;
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
    }

    stringCounter++;
  }

  rover.travelLog.forEach((item, index) => { console.log("Position " + index + " was x: " + item[0] + " and y: " + item[1]) });

}

function displayNewPosition ()

{

     

      document.getElementById("position_x_1").textContent=("x: "+rover1.x);
      
      document.getElementById("position_y_1").textContent= ("y: "+rover1.y);
        
      document.getElementById("position_x_2").textContent= ("x: "+rover2.x);
      
      document.getElementById("position_y_2").textContent= ("y: "+rover2.y);
        
      document.getElementById("position_x_3").textContent= ("x: "+rover3.x);
      
      document.getElementById("position_y_3").textContent= ("y: "+rover3.y);
  

  }
