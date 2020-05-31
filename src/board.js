import React from 'react';
import { Square } from './square.js';

export class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  checkIsBold(i){
    return this.props.selectedBox.find(x => x == i) 
  }

  renderSquare(i) {
    return (
      <Square
      key={i}
      value={this.props.squares[i]}
      isBold={this.checkIsBold(i)}
      onClick={() => this.props.onClick(i)} />
    );
  }



  render() {

    // const loopArray = Array(3).fill(null)
    let x = -1;

    return (
     <div>
        {
          Array(3).fill(null).map(() => {
           return (
                    <div className="board-row" key={x}>
                        {
                           Array(3).fill(null).map(() => {
                            x += 1
                            return this.renderSquare(x)
                           })
                        }
                    </div>
               )
          })
        }
     </div>
    );
   }
}
