import React from 'react';
import { useParams } from 'react-router-dom';
import Heading from './Heading';
import LeftComp from './LeftComp';
import RightComp from './RightComp';

function PollDetail() {
  const { id } = useParams();

  return (
    <>
      <Heading />
      <LeftComp id={id} />
      <RightComp questionNumber={id} />
    </>
  );
}

export default PollDetail;
