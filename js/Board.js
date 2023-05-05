import { ROW_COUNT, COL_COUNT, CELL_SIZE, MAX_FOOD, FOOD_PROBABILITY } from './const.js';


export class Board {
    
    constructor(){
        this.rowCount = ROW_COUNT;
        this.colCount = COL_COUNT;
        this.centre = [ COL_COUNT / 2, ROW_COUNT / 2 ];
        this.cellSize = CELL_SIZE;
        this.maxFood = MAX_FOOD; //max active food
        this.foodProb = FOOD_PROBABILITY;
        this.food = []; //array of the active food
    }
    
    getDimensions(){
        return [ this.colCount * this.cellSize, this.rowCount * this.cellSize ];
    }
    
    generateFood( snakeBody ){
        var foodIsInBody = function(f, b){
            for(var i = 0; i < b.length; i++){
                if(f[0] == b[i][0] && f[1] == b[i][1])
                    return true;
            }
            return false;
        }
        
        if(this.food.length < this.maxFood && Math.random() > FOOD_PROBABILITY){
            do {
                var f = [ Math.floor(Math.random() * this.colCount), Math.floor(Math.random() * this.rowCount) ];
            }while(foodIsInBody(f, snakeBody));
            this.food.push( f );
        }
    }
    
    removeFood( f ){
        for(var i in this.food){
            if(f[0] == this.food[i][0] && f[1] == this.food[i][1]){
                this.food.splice(i, 1);
                break;
            }
        }
    }
    
    getCoords( bodyPart ){
        return [ bodyPart[0] * CELL_SIZE, bodyPart[1] * CELL_SIZE ];
    }
}