import React from 'react';
import { Board } from './board.js';

export class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [
          {
            squares: Array(9).fill(null),
            positions: Array(9).fill(null)
          }
        ],
      stepNumber: 0,
      xNestItem: true,
      selectedBox: [-1],
      isSortAsc: false
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // console.log(history,"----")
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const positions = current.positions.slice();
    if (calculateWinner(squares) || squares[i]){
      return ;
    }

    positions[i]  = (this.state.stepNumber + 1)

    squares[i] = this.state.xNestItem ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        positions: positions
      }]),
      stepNumber: history.length,
      xNestItem: !this.state.xNestItem,
      selectedBox: [i],
    });

    const mYWin = calculateWinner(squares)
    if (mYWin)
     this.setState({selectedBox: mYWin})
    // console.log(this.state)
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xNestItem: (step % 2) === 0,
    });
  }

  doSort() {
    let history = this.state.history.map((x) => {
      let squares = x.squares.slice();
      let positions = x.positions.slice();

      positions.forEach((element, index) => {
          if (!element)
            return;

          let splice_array = positions.slice(index).filter(x=>x!==null)
          let findElement = this.state.isSortAsc ? Math.max(...splice_array) : Math.min(...splice_array)

          if (findElement)
            {
               let _a = positions.indexOf(element)
               let _b = positions.indexOf(findElement)
               positions = this.swapPosition(positions,_a,_b)
               squares = this.swapPosition(squares,_a,_b)
            }
      });

      return {
        squares: squares,
        positions: positions
      }

    })

    this.setState({
      history: history,
      isSortAsc: !this.state.isSortAsc
    });
  }

  swapPosition(_arr,to_pos,from_pos){
    _arr[to_pos] = _arr.splice(from_pos, 1, _arr[to_pos])[0];
    return _arr;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
       status = 'Winner: ' + (winner ? 'true' : 'false');
    } else {
       if (this.state.stepNumber != 9)
        status = 'Next player: ' + (this.state.xNestItem ? 'X' : 'O');
       else
        status = 'Game draw';
    }

    const moves = history.slice(0,this.state.stepNumber).map((step, move) => {
    const desc = move ?
       'Go to move #' + move :
       'Go to game start';

     return (
       <li key={move}>
         <button onClick={() => this.jumpTo(move)}>{desc}</button>
       </li>
     );
    });
    
    var move_positions = [];
    for (var i = 0; i < current.positions.length; i++) {
      move_positions.push(<span key={i}>{current.positions[i] ? current.positions[i] : '-'}</span>);
      if ((i+1) % 3 === 0)
       move_positions.push(<br key={i+10} />);
    }

    return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              selectedBox={this.state.selectedBox}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>
              <button onClick={() => this.doSort() }> { !this.state.isSortAsc ? 'Ascend' : 'Descend' } </button>
            </div>
            <ol>{moves}</ol>
            <div>{ move_positions } </div>
          </div>
        </div>
      );
   }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}
