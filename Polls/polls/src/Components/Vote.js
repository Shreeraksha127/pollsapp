import React from 'react';
import { useParams } from 'react-router-dom';
import Heading from './Heading';
import VoteComp from './VoteComp';

export default function Vote() {
  const { id } = useParams();

  return (
    <>
      <Heading />
      <VoteComp questionNumber={id} />
    </>
  );
}
