import { SNAKE_INIT_SIZE } from './const.js';

export class Snake {
    
    constructor( startPoint ){
        this.body = []; //array of 2 element arrays like [col, row]
        this.colDir = 1;
        this.rowDir = 0;
        this.crashed = false; //has the snake hit its own body?
        this.actions = []; //you can issue commands faster than the animation happens. this acts as a queue of direction changes to stop erroneous game overs caused by fast direction changes.
        
        var c = startPoint[0];
        this.body.push(startPoint);
        for(var i = 0; i < (SNAKE_INIT_SIZE - 1); i++){
            this.body.push([--c, startPoint[1]]);
        }
    }
    
    move( opt ){
        var action = this.actions.pop();
        var maxCol = (opt.maxCol);
        var maxRow = (opt.maxRow);
        
        if(action){
            var wallNum;
            //skirting check. throw the action away if you're skirting a wall and try to move into that wall
            //left edge?
            if( (this.body[0][0] == 0 && this.colDir == 0 && this.rowDir == -1) || (this.body[0][0] == 0 && this.colDir == 0 && this.rowDir == 1) ){
                wallNum = 1;
            //right edge?
            } else if((this.body[0][0] == (maxCol - 1) && this.colDir == 0 && this.rowDir == -1) || (this.body[0][0] == (maxCol - 1) && this.colDir == 0 && this.rowDir == 1) ) {
                wallNum = 2;
            //top?
            } else if( (this.body[0][1] == 0 && this.rowDir == 0 && this.colDir == -1) || (this.body[0][1] == 0 && this.rowDir == 0 && this.colDir == 1) ){
                wallNum = 3;
            //bottom
            } else if( (this.body[0][1] == (maxRow - 1) && this.rowDir == 0 && this.colDir == -1) || (this.body[0][1] == (maxRow - 1) && this.rowDir == 0 && this.colDir == 1) ){
                wallNum = 4;
            }
            
            switch(action){
            case 'left':
                if(this.colDir == 0 && wallNum != 1){
                    this.colDir = -1;
                    this.rowDir = 0;
                }
                break;
            case 'up':
                if(this.rowDir == 0 && wallNum != 3){
                    this.rowDir = -1;
                    this.colDir = 0;
                }
                break;
            case 'right':
                if(this.colDir == 0 && wallNum != 2){
                    this.colDir = 1;
                    this.rowDir = 0;
                }
                break;
            case 'down':
                if(this.rowDir == 0 && wallNum != 4){
                    this.rowDir = 1;
                    this.colDir = 0;
                }
                break;
            }
        }
        var newPos = [this.body[0][0] + this.colDir, this.body[0][1] + this.rowDir];
        
        //nose peg check. stop the snake if you peg its nose into a wall
        if((newPos[0] == maxCol && this.rowDir == 0) || (newPos[0] < 0 && this.rowDir == 0))
            return;
        
        if((newPos[1] == maxRow && this.colDir == 0) || (newPos[1] < 0 && this.colDir == 0))
            return;
        
        //crash check.
        for(var i in this.body){
            if(this.body[i][0] == newPos[0] && this.body[i][1] == newPos[1]){
                this.crashed = true;
                break;
            }
        }
        
        if(!this.crashed){
            if(!opt.grow)
                this.body.pop();
            
            this.body.unshift( newPos );
        }
    }
}