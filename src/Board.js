import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows =5, ncols = 5, chanceLightStartsOn  = 0.25}) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    const initialBoard = Array.from({length: nrows}).map(
      //r to represent rows
      r => Array.from({length: ncols}).map(
        c => Math.random() < chanceLightStartsOn
      )
    );
    //we can probably create a board using map here

    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(r => r.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const deepCopyOldBoard = oldBoard.map(r => [...r]);
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x, deepCopyOldBoard);
      flipCell(y,x - 1, deepCopyOldBoard);
      flipCell(y,x + 1, deepCopyOldBoard);
      flipCell(y - 1,x, deepCopyOldBoard);
      flipCell(y + 1,x, deepCopyOldBoard);

      // TODO: return the copy
      return deepCopyOldBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()){
    return(
      <div> You won !</div>
    )
  }

  // TODO

  // make table board
  let tableBoard = [];
  for(let i = 0; i < nrows; i++ ){
    let row = [];
    for(let k = 0; k <ncols; k ++){
      //we probably need a coordinate to locate
      const coordinate = `${i} - ${k}`;
      row.push(
        <Cell 
          key = {coordinate}
          isLit = {board[i][k]}
          flipCellsAroundMe = {e => flipCellsAround(coordinate)}
        />
      );
    }
      //then we push into the board
    tableBoard.push(<tr key = {i}> {row} </tr>)
  }
  //finally we just return the whole thing
  return(
    <table className = "Board">
      <tbody> {tableBoard} </tbody>
    </table>
  )
  // TODO
}

export default Board;
