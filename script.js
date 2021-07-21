console.log("hi im running")
let height = 13;
let width = 10;
let grid = [];
let lettergrid;
let currentplay = true;
let played = 0;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let currentword = "";
let selectedcoords = [];
let selectedcolors = [];
let lastx = -2;
let lasty = -2;


function update(){
   drawboard();
   requestAnimationFrame(update);
}


canvas.addEventListener("mousedown", function(e)
  {
  if (currentplay){
    let rect = canvas.getBoundingClientRect();
    let x = Math.floor(e.clientX - rect.left);
    let y = Math.floor(e.clientY - rect.top);
    if (x > 10 && x < 85 && y > 10 && y < 85){
      checkbox();
      return;
    }
    x = Math.floor((x-1)/50);
    y = Math.floor((y-100)/50);
    if (played == 0){
      if (y == 0 || grid[y][x] == 1){
        lastx = x
        lasty = y
        played += 1;
        currentword += lettergrid[y][x];
        tempsetbox(x, y, 3);
      }
    }
    else{
      if (grid[y][x] == 3){
        let coords = x + " " + y
        let selectedindex = selectedcoords.indexOf(coords)
        tempsetbox(x, y, selectedcolors[selectedindex]);
        played -= 1
        selectedcolors.splice(selectedindex, 1)
        selectedcoords.splice(selectedindex, 1)
        currentword = currentword.slice(0, selectedindex) + currentword.slice(selectedindex + 1);
        if (lastx == x && lasty == y){
          lastx = selectedcoords[selectedcoords.length - 1][0]
          lastcoords = selectedcoords[selectedcoords.length - 1].split(" ")
          lasty = lastcoords[1]
        }
        return;
      }
      let of1;
      let of2;
      let neighbored = false;
      for (let a1 = 0; a1 < 3; a1++){
        for (let a2 = 0; a2 < 3; a2++){
          of1 = a1-1;
          of2 = a2-1;
          if (y+of1 > grid.length - 1 || x + of2 > grid[0].length - 1){
            continue;
          }
          if (y + of1 < 0|| x + of2 < 0){
            continue;
          }
          if (x+of2 == lastx && y+of1 == lasty){
            neighbored = true;
          }
        }
      }
      if (neighbored){
        played += 1;
        lasty = y
        lastx = x
        tempsetbox(x, y, 3);
        currentword += lettergrid[y][x];
      }
    }
    
  }
  });

function checkbox(){
  selectedcolors = [];
  selectedcoords = [];
  lastx = -2;
  lasty = -2;
  played = 0;
  console.log(currentword);
  currentword = "";
  for (let a1 = 0; a1 < height; a1++){
    for (let a2 = 0; a2 < width; a2++){
      if (grid[a1][a2] == 3){
        grid[a1][a2] = 1
      }
    }
  }
}

function Main(){
  let counter = 0;

  for (let a1 = 0; a1 < height; a1++){
    grid[a1] = [];
    counter += 1;
    for (let a2 = 0; a2 < width; a2++){
      grid[counter - 1][a2] = 0;
    }
  }
  grid, lettergrid = startingconditions(grid);
}


function tempsetbox(x, y, color){
  if (x < width){
    if (x > -1){
      if (y < height){
        if (y > -1){
          if (color == 3){
            selectedcoords.push(x + " " + y)
            selectedcolors.push(grid[y][x])
          }
          grid[y][x] = color
        }
      }
    }
  }
}


function drawboard(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  base_image = new Image();
  base_image.src = 'check.png';
  ctx.drawImage(base_image, 10, 10);
  ctx.fillStyle = "red"
  for (let a3 = 0; a3 < height; a3++){
    for (let a4 = 0; a4 < width; a4++){
      if(grid[a3][a4] == 1){
        ctx.fillRect(a4 * 50 + 1, a3 * 50 + 100, 48, 48);
      }
    }
  }
  ctx.fillStyle = "green"
  for (let a3 = 0; a3 < height; a3++){
    for (let a4 = 0; a4 < width; a4++){
      if(grid[a3][a4] == 3){
        ctx.fillRect(a4 * 50 + 1, a3 * 50 + 100, 48, 48);
      }
    }
  }
  ctx.fillStyle = "black"
  ctx.globalAlpha = 0.3;
  ctx.fillRect(0, 0, 500, 100)
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = "blue"
  for (let a3 = 0; a3 < height; a3++){
    for (let a4 = 0; a4 < width; a4++){
      if(grid[a3][a4] == 2){
        ctx.fillRect(a4 * 50 + 1, a3 * 50 + 100, 48, 48);
      }
    }
  }
  ctx.globalAlpha = 1;
  ctx.font = "35px Arial";
  ctx.fillStyle = "black"
  for (let a3 = 0; a3 < height; a3++){
    for (let a4 = 0; a4 < width; a4++){
      ctx.fillText(lettergrid[a3][a4], a4 * 50 + 13, a3 * 50 + 135)
    }
  }
}


function startingconditions(){
  let newgrid = grid;
  for (let a1 = 0; a1 < grid[0].length; a1++){
    newgrid[0][a1] = 1;
  }
  for (let a2 = 0; a2 < grid[0].length; a2++){
    newgrid[grid.length - 1][a2] = 2;
  }

  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  let lettergrid = [];

  let counter = 0;
  for (let a3 = 0; a3 < grid.length; a3++){
    lettergrid[a3] = [];
    counter += 1;
    for (let a4 = 0; a4 < grid[0].length; a4++){
      lettergrid[counter - 1][a4] = alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  }


  return newgrid, lettergrid;
}


Main()
update()