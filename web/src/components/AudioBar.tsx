import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const padTime = time => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };
  
  const format = time => {
    // Convert seconds into minutes and take the whole part
    const minutes = Math.floor(time / 60);
  
    // Get the seconds left after converting minutes
    const seconds = time % 60;
  
    //Return combined values as string in format mm:ss
    return `${minutes}:${padTime(seconds)}`;
  };

interface Props {}

const AudioBar = (props: Props) => {

  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    let timer;
    if (counter < 120) {
      timer = setTimeout(() => setCounter(c => c + 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);

  return (
    <Box display="flex" className="meter-container" width="80%" justifyContent="space-between">
        <Box width="20%">{counter === 0 ? "Time over" : <div>{format(counter)}</div>}</Box>
        <Box width="50%">
            <meter id="timer-gauge" value={counter} min="0" max="100" style={{ transform: "rotate(-90deg)", height:"300px", width:"200px"}}></meter>
            </Box>
      
    </Box>
  );
};

export default AudioBar;
