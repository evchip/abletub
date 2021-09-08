import React from 'react'
import {Howl, Howler} from 'howler';


interface Props {
    
}

export const AudioPlayer = (props: Props) => {

    // // var context = new window.webkitAudioContext();
    // var context = new window.AudioContext || window.webkitAudioContext;
    // var source = null;
    // var audioBuffer = null;

    // function stopSound() {
    // if (source) {
    //     source.noteOff(0);
    // }
    // }

    // function playSound() {
    // // source is global so we can call .noteOff() later.
    // source = context.createBufferSource();
    // console.log(source)
    // source.buffer = audioBuffer;
    // source.loop = false;
    // source.connect(context.destination);
    // source.noteOn(0); // Play immediately.
    // }

    // function initSound(arrayBuffer) {
    //     console.log('arraybuffer',arrayBuffer)
    // context.decodeAudioData(arrayBuffer, function(buffer) {
    //     // audioBuffer is global to reuse the decoded audio later.
    //     audioBuffer = buffer;
    //     var buttons = document.querySelectorAll('button');
    //     buttons[0].disabled = false;
    //     buttons[1].disabled = false;
    // }, function(e) {
    //     console.log('Error decoding file', e);
    // }); 
    // }

    // // User selects file, read it as an ArrayBuffer and pass to the API.

    // const inputFile  = (e) => {  
    // var reader = new FileReader();
    //     console.log(reader)
    // reader.onload = function(e) {
    //     initSound(this.result);
    //     console.log('this.result:::: ',this.result)
    // };
    // reader.readAsArrayBuffer(this.file[0]);
    // };

    // // Load file from a URL as an ArrayBuffer.
    // // Example: loading via xhr2: loadSoundFile('sounds/test.mp3');
    // function loadSoundFile(url) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('GET', url, true);
    //     xhr.responseType = 'arraybuffer';
    //     xhr.onload = function(e) {
    //         initSound(this.response); // this.response is an ArrayBuffer.
    //     };
    //     xhr.send();
    // }
    var sound = new Howl({
        src: ['http://goldfirestudios.com/proj/howlerjs/sound.ogg'],
        html5: true
      });

    return (
        <div>
            {/* <input type="file" onChange={(e) => inputFile(e)} accept="audio/*"></input> */}
            <button onClick={() => sound.play()} disabled>Start</button>
            {/* <button onClick={() => stopSound()} disabled>Stop</button> */}
        </div>
    )
}
