import React from 'react';
//
// // export class Square extends React.Component {
// //
// //   constructor(props){
// //     super(props)
// //     this.state = {
// //       value: null
// //     }
// //   }

export function Square(props) {
    return (
      <button
        className="square"
        style={{fontWeight: props.isBold ? 'bold' : 'normal'}}
        onClick={props.onClick} >
          {props.value}
      </button>
    )
}
// }
