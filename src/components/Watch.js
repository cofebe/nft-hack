import axios from 'axios';
import config from '../config';
import { useEffect, useState } from 'react';
import videojs from 'video.js';
import {
  Button,
  Typography,
} from '@mui/material';
import './Watch.css';


function Watch({ setMode, watchUrl }) {

  useEffect(() => {
    // var player = videojs('stream-viewer');
    var options = {};

    var player = videojs('stream-viewer', options, function onPlayerReady() {
      videojs.log('Your player is ready!');

      // In this context, `this` is the player that was created by Video.js.
      this.play();

      // How about an event listener?
      this.on('ended', function() {
        videojs.log('Awww...over so soon?!');
      });
    });
  }, []);


  return (
    <div className='root'>

      <Button
        variant='contained'
        className='closeButton'
        onClick={() => {
          setMode('home');
        }}
      >Close Stream</Button>

      
      <video
        id='stream-viewer'
        className='streamPreview'
        autoplay='true'
        class="streamPreview"
        // controls
        controlBar={false}
        preload="auto"
        poster="//vjs.zencdn.net/v/oceans.png"
        data-setup='{}'
      >
        <source src={watchUrl} type="application/x-mpegURL" />
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
          </a>
        </p>
      </video>


    </div>
  );
}

export default Watch;
