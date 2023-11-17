import React from 'react';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';


export default function CreatePollBtn({onClick}) {

  
  return (
    <div style={{paddingTop:'11px'}}>
    <Button variant="contained" color="primary" size="large" onClick={onClick}>
      Create Poll
    </Button>
    </div>
  );
}
