import React from 'react'

interface Props {
    
}

const AudioFooter = (props: Props) => {

    return (
        <Box display="flex" className="meter-container">
            <meter id="timer-gauge" value="10" min="0" max="100"></meter>
            <p className='counter' id='timer-seconds-elapsed'></p>
        </Box>
    )
}

export default AudioFooter;
