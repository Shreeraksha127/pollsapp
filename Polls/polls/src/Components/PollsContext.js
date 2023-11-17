import React, { createContext, useContext, useState, useEffect } from 'react';

export const PollsContext = createContext();

export const PollsProvider = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  

  const handleTagSelection = (tags) => {
    setSelectedTags(tags);
  };

  const contextValue = {
    selectedTags,
    handleTagSelection,
    
  };

  return (
    <PollsContext.Provider value={contextValue}>
      {children}
    </PollsContext.Provider>
  );
};

// Custom hook to access PollsContext
export const usePollsContext = () => useContext(PollsContext);
