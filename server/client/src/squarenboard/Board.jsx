import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

const Board = ({ board, onClick, size }) => {
  return (
    // <div className="grid grid-cols-8 grid-rows-8 gap-x-0 gap-y-0">
    //   {board.map((row, rowIndex) =>
    //     row.map((state, colIndex) => (
    //       <Square
    //         key={colIndex}
    //         state={state}
    //         onClick={(state) => onClick(rowIndex, colIndex, state)}
    //       />
    //     ))
    //   )}
    // </div>

    <table className = "border-collapse">
      <tbody>
        {board.map((row) =>
        <tr key = {row}> {row.map((state,col) => 
        <td className = "p-0" key ={col}> 
          <Square
            state={state}
            size={size}
            onClick={() => {
              if (CheckShipPlacement(row,col)) {onClick}}}
        />
        </td>)}</tr>)}
      </tbody>
    </table>
  );
};

Board.propTypes = {
  board: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Board;

