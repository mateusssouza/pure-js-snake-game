//setings
var height = 26;
var width = 26;
var snakeX = height/2-1;
var snakeY = width/2-1;
var interval = 100;
var increment = 1;

//game variables
var tailX = [snakeX];
var tailY = [snakeY];
var fruitX;
var fruitY;
var length = 1;
var running = false;
var gameOver = false;
var direction = -1;//up = 0, down = -1, left = 1, right = 2
 var init;

 /**
  * entry point of the game
  */

  function run(){
      init();
      int = setInterval(gameLoop,interval);
  }

  function init(){
      createMap();
      createSnake();
      createFruit();  
  }

  /**
   * generates the map for the snake
   */
  function createMap(){
      document.write('<table>');
      for(var y = 0; y < height;y++){
        document.write('<tr>');
        for(var x = 0;x < width; x++){
            if(x == 0 || x == width -1 || y == 0 || y == height -1){
                document.write("<td class='wall' id='" + x + "-" + y + "'></td>");
            }else{
                document.write("<td class='blank' id='" + x + "-" + y + "'></td>");
            }
          }
        document.write('</tr>');
      }
      document.write('</table>');
  }

  function get(x,y){
    if((x != null) && (y != null))
      return document.getElementById(x + "-" + y);
  }
  function set(x,y,value){
      get(x,y).setAttribute("class",value);
  }

  function createSnake(){
      set(snakeX,snakeY,"snake");
  }

  function rand(max,min){
    return Math.floor(Math.random()*(max - min )+ min);
  }
  function getType(x,y){
      return get(x,y).getAttribute("class");
  }
  function createFruit(){
      var found = false;
      while(!found && (length < (width-2)*(height-2)+1)){
          var fruitX = rand(1,width-1);
          var fruitY = rand(1,height-1);
          if(getType(fruitX,fruitY) == "blank"){
              found = true;
          }
          set(fruitX,fruitY,"fruit");
          this.fruitX = fruitX;
          this.fruitY = fruitY;
      }
  }

  window.addEventListener("keypress", function key(event){
     var key = event.code;
     console.log(key);
        // if W sets up 
    if(direction != -1 && key == 'KeyW') direction = 0;
        // if S sets down 
    else if(direction != 0 && key == 'KeyS') direction = -1;
        // if A sets left 
    else if(direction != 2 && key == 'KeyA') direction = 1;
        // if D sets right 
    else if(direction != 1 && key == 'KeyD') direction = 2;

    if(!running) running = true;
    else if(key == 'Space') running = false;
  });

  function gameLoop(){
      if(running && !gameOver){
          update();
      }else if(gameOver){
          clearInterval(int);
      }
  }

  function update(){
      set(this.fruitX,this.fruitY,"fruit");
      updateTail();
      set(tailX[length],tailY[length],"blank");
      if(direction == 0) snakeY--;
      else if(direction == -1) snakeY++;
      else if(direction == 1) snakeX--;
      else if(direction == 2) snakeX++;
      set(snakeX,snakeY,"snake");
      for(var i = tailX.length;i>=0;i--){
          if(snakeX == tailX[i] && snakeY == tailY[i]){
              gameOver = true;
              break;
          }
      }
      if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1 ){
          gameOver = true;
      }
      if(snakeX == this.fruitX && snakeY == this.fruitY){
          createFruit();
          length+=increment;
      }
  }

  function updateTail(){
      for(var i = length; i > 0; i--){
          tailX[i] = tailX[i-1];
          tailY[i] = tailY[i-1];
      }
      tailX[0] = snakeX;
      tailY[0] = snakeY;
  }

  run();
