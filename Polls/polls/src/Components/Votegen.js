import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Votegen({buttonName,onClick,style}) {
    let btnStyle = {
        width: '130px',
        height:'35px',
        marginTop: '20px',
        backgroundColor:'#3a7ca5',
        fontWeight:'bold',
        color:'white'
      };
    return(
        <Button  variant="contained" color="secondary" size="small" onClick={onClick} style={style}>
        {buttonName}
      </Button>

    )
}

