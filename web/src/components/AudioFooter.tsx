import { useGetAudioFileQuery } from 'generated/graphql';
import { withUrqlClient } from 'next-urql';
import React from 'react'
import { createUrqlClient } from 'utils/createUrqlClient';
import WaveForm from './WaveForm'
import axios from 'axios';
import WaveFormFC from './WaveFormFC';

interface Props {
    
}

const AudioFooter = (props: Props) => {
    const [{ data, error, fetching }] = useGetAudioFileQuery()


    if (!data) {
        return null
    } else {
        console.log(data.getAudioFile)
    }
    
    return (
        <div>
            <WaveForm audioURL={data.getAudioFile}/>
        </div>
    )
}

export default AudioFooter;
