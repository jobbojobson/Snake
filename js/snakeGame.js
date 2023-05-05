import { CELL_SIZE, FRAMES_PER_MOVE } from './const.js';
import { Board } from './Board.js';
import { Snake } from './Snake.js';

var _canvas = document.getElementById('gameCanvas');
var _ctx = _canvas.getContext('2d');
var _game;
var _frameCount = 0;

(function startGame(){
    
    var b = new Board();
    var s = new Snake( b.centre );
    _game = {
        board:b,
        snake:s,
        foodEaten:0
    }
})();


_ctx.fillStyle = '#000000';
_canvas.width = _game.board.getDimensions()[0];
_canvas.height = _game.board.getDimensions()[1];
_canvas.style = 'display:inline;';

//setup event handlers...
document.addEventListener('keydown', function(e){
    switch(e.keyCode){
    case 37: //left
        e.preventDefault();
        _game.snake.actions.push('left');
        break;
    case 38: //up
        e.preventDefault();
        _game.snake.actions.push('up');
        break;
    case 39://right
        e.preventDefault();
        _game.snake.actions.push('right');
        break;
    case 40://down
        e.preventDefault();
        _game.snake.actions.push('down');
        break;
    }
});

// ------------ TOUCH CONTROLS ---------------
function touchStart(e){
    switch(e.target.id){
    case 'leftButton': //left
        _game.snake.actions.push('left');
        break;
    case 'upButton': //up
        _game.snake.actions.push('up');
        break;
    case 'rightButton'://right
        _game.snake.actions.push('right');
        break;
    case 'downButton'://down
        _game.snake.actions.push('down');
        break;            		
    }
}

if(document.getElementsByClassName('button-layer').length > 0){
    document.getElementById('leftButton').addEventListener('touchstart', touchStart);
    document.getElementById('rightButton').addEventListener('touchstart', touchStart);
    document.getElementById('upButton').addEventListener('touchstart', touchStart);
    document.getElementById('downButton').addEventListener('touchstart', touchStart);
}

function getFrames( foodCount ){
    return FRAMES_PER_MOVE[_game.foodEaten] === undefined ? FRAMES_PER_MOVE[FRAMES_PER_MOVE.length - 1] : FRAMES_PER_MOVE[_game.foodEaten];
}

function animate(){
    _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    
    //generate food
    for(var i = 0; i < _game.board.maxFood; i++){
        _game.board.generateFood(_game.snake.body);
    }
    
    //draw the snake
    for(var b in _game.snake.body){
        var point = _game.board.getCoords(_game.snake.body[b]);
        _ctx.fillRect(point[0], point[1], CELL_SIZE, CELL_SIZE);
    }
    
    //draw the food - check if the snake is eating at the same time
    var head = _game.snake.body[0];
    var foodBeingEaten = null;
    for(var f in _game.board.food){
        if(foodBeingEaten == null){
            if(head[0] == _game.board.food[f][0] && head[1] == _game.board.food[f][1]){
                foodBeingEaten = _game.board.food[f];
            }
        }
        var food = _game.board.getCoords(_game.board.food[f]);
        _ctx.fillRect(food[0], food[1], CELL_SIZE, CELL_SIZE);
    }
    
    
    if(_frameCount >= getFrames( _game.foodEaten )){
        _game.snake.move({
            maxCol:_game.board.colCount,
            maxRow:_game.board.rowCount,
            grow:(foodBeingEaten != null)
        });
        
        if(foodBeingEaten != null){
            _game.board.removeFood(foodBeingEaten);
            _game.foodEaten++;
        }
        
        _frameCount = 0;
    } else {
        _frameCount++;
    }

    //check if the game has ended
    if(_game.snake.crashed){
        var tx = 'Game Over - Snake size: ' + _game.snake.body.length;
        _ctx.font = '20px Arial';
        _ctx.fillStyle = '#FF0000';
        var tw = _ctx.measureText(tx).width;
        _ctx.fillText(tx, (_canvas.width / 2) - (tw / 2), 100);
    } else {
        setTimeout(animate, (1000 / 60) );
    }
}
animate();