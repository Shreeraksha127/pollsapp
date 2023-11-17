import React, { useContext } from 'react';
import Heading from "./Heading";
import SideBar from "./SideBar";
import MainContent from "./MainContent";
import { PollsProvider, PollsContext } from './PollsContext';

export default function Home() {



  return (
   
    <PollsProvider>
      <Heading />
      <SideBar/>
      <MainContent  />
      </PollsProvider>
   
  );
}
