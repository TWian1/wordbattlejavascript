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
let currentcolor = 1;
let lastx = -2;
let lasty = -2;
let longestword = "";
let lastwords = ["", "", "", "", ""];
let averagewrd = 0;
let allsum = 0;
let allcount = 0;
let allwords = true;
let thingy = ["ab", "aa", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az"]
let alreadyplayed = [];
let timecounter = 10001;
let reason = "";






function update(){
   if (timecounter < 10000){ 
    timecounter += 1
   }
   drawboard();
   requestAnimationFrame(update);
}


canvas.addEventListener("mousedown", function(e)
  {
  onclick(currentcolor, e)
  });

function checkword(){
  for (let a1 = 0; a1 < alreadyplayed.length; a1++){
    if (alreadyplayed[a1] == currentword){
      reason = "Already Played";
      timecounter = 0;
      return false;
    }
  }
  if (allwords){
    return true;
  }
  for (let a1 = 0; a1 < thingy.length; a1++){
    if (thingy[a1] == currentword){
      return true;
    }
  }
  reason = "Not Valid Word";
  timecounter = 0
  return false;
}


function checkbox(){
  if (checkword() == false){
    return;
  }
  alreadyplayed.push(currentword);
  selectedcolors = [];
  selectedcoords = [];
  lastx = -2;
  lasty = -2;
  played = 0;
  if (currentword.length > longestword.length){
    longestword = currentword;
  }
  lastwords[4] = lastwords[3];
  lastwords[3] = lastwords[2];
  lastwords[2] = lastwords[1];
  lastwords[1] = lastwords[0];
  lastwords[0] = currentword;
  allsum += currentword.length;
  allcount += 1;
  averagewrd = Math.round((allsum / allcount)*10) / 10
  currentword = "";
  for (let a1 = 0; a1 < height; a1++){
    for (let a2 = 0; a2 < width; a2++){
      if (grid[a1][a2] == 3){
        if (currentcolor == 1){
          if (a1 == height - 1){
            currentplay = false
          }
          grid[a1][a2] = 1;
        }
        else{
          if (a1 == 0){
            currentplay = false
          }
          grid[a1][a2] = 2;
        }
      }
    }
  }
  if (currentcolor == 1){
    currentcolor = 2;
  }
  else{
    currentcolor = 1;
  }
}


function onclick(color, e){
  if (currentplay){
    let rect = canvas.getBoundingClientRect();
    let x = Math.floor(e.clientX - rect.left);
    let y = Math.floor(e.clientY - rect.top);
    if (x > 10 && x < 85 && y > 13 && y < 88){
      if (currentword.length > 1){
        checkbox();
        return;
      }
    }
    if (x > 100 && x < 175 && y > 13 && y < 88){
      lastx = -2;
      lasty = -2;
      played = 0;
      currentword = "";
      let tempcoords = [];
      for (let a1 = 0; a1 < selectedcoords.length; a1++){
        tempcoords = []
        tempcoords = selectedcoords[a1].split(" ")
        tempsetbox(tempcoords[0], tempcoords[1], selectedcolors[a1]);
      }
      selectedcolors = [];
      selectedcoords = [];




    }
    x = Math.floor((x-1)/50);
    y = Math.floor((y-100)/50);
    if (played == 0){
      if (color == 2){
        if (grid[y][x] == 2){
          lastx = x
          lasty = y
          played += 1;
          currentword += lettergrid[y][x];
          tempsetbox(x, y, 3);
        }
      }
      else if (grid[y][x] == 1){
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
        if (lastx == x && lasty == y && played > 0){

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
  ctx.drawImage(base_image, 8, 13);
  base_image = new Image();
  base_image.src = 'x.png';
  ctx.drawImage(base_image, 100, 13);
  ctx.fillStyle = "red"
  for (let a3 = 0; a3 < height; a3++){
    for (let a4 = 0; a4 < width; a4++){
      if(grid[a3][a4] == 1){
        ctx.fillRect(a4 * 50, a3 * 50 + 100, 50, 50);
      }
    }
  }
  ctx.fillStyle = "green"
  for (let a3 = 0; a3 < height; a3++){
    for (let a4 = 0; a4 < width; a4++){
      if(grid[a3][a4] == 3){
        ctx.fillRect(a4 * 50, a3 * 50 + 100, 50, 50);
      }
    }
  }
  ctx.fillStyle = "red"
  ctx.globalAlpha = 0.2;
  if (currentcolor == 2){
    ctx.fillStyle = "blue"
  }
  ctx.fillRect(180, 0, 318, 100)
  ctx.fillRect(500, 0, 400, 748)
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = "blue"
  for (let a3 = 0; a3 < height; a3++){
    for (let a4 = 0; a4 < width; a4++){
      if(grid[a3][a4] == 2){
        ctx.fillRect(a4 * 50, a3 * 50 + 100, 50, 50);
      }
    }
  }
  ctx.globalAlpha = 1;
  ctx.font = "bolder 35px Arial";
  ctx.fillStyle = "black"
  ctx.fillRect(498, 0, 2, 748)
  ctx.fillRect(90, 0, 2, 100)
  ctx.fillRect(0, 98, 182, 2)
  ctx.fillRect(180, 0, 2, 100)
  for (let a3 = 0; a3 < height; a3++){
    for (let a4 = 0; a4 < width; a4++){
      ctx.fillText(lettergrid[a3][a4], a4 * 50 + 15, a3 * 50 + 135)
    }
  }
  if (timecounter < 120){
    ctx.fillText(reason, 200, 50)
  }
  else{
    ctx.fillText(currentword, 200, 50);
  }
  ctx.fillText("Longest Word:", 510, 50);
  ctx.fillText(longestword, 510, 100);
  ctx.fillText("Last 5 Words:", 510, 200)
  ctx.fillText(lastwords[0], 510, 250)
  ctx.fillText(lastwords[1], 510, 300)
  ctx.fillText(lastwords[2], 510, 350)
  ctx.fillText(lastwords[3], 510, 400)
  ctx.fillText(lastwords[4], 510, 450)
  ctx.fillText("Average Word Length:", 510, 550)
  ctx.fillText(averagewrd, 510, 600)

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
