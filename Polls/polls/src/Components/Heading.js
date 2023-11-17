import React from 'react'

export default function Heading() {
    let boxStyle={
        backgroundColor:"#D3D3D3",
        width:"1100px",
        height:"120px",
        marginLeft:"40px"
    }
    let headStyle={
    paddingTop:"10px",
    paddingLeft:"40px",
    
    }
    return (
        <div style={boxStyle}>
      <div className="heading" style={headStyle}>
        <h1>FlyWeight Polls</h1>
        </div>
        </div>
    
    );
  }
  