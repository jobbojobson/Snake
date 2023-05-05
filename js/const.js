//the board size
export const ROW_COUNT = 40;
export const COL_COUNT = 40;
//the size of a 'cell'
export const CELL_SIZE = (window.innerHeight - 25) / ROW_COUNT;
//the initial size of the snake in cells
export const SNAKE_INIT_SIZE = 5;
//max pieces of food that can be present on the board
export const MAX_FOOD = 2;
//only generate food on an animation step if a random value between 0 and 1 is greater than...
export const FOOD_PROBABILITY = 0.9;

export const FRAMES_PER_MOVE = [15, 15, 15, 12, 12, 12, 10, 10, 10, 10, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5 ];
