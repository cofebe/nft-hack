import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  ImageList,
  Button,
} from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import './Home.css';

function Home({ setMode, streamData, setWatchUrl, }) {
  console.log('streamData: ', streamData);
  return (

    <div className="contianer">
      <Grid container
        direction='row'
        spacing={2}
      >
        {/* LEFT */}
        <Grid item
          sm={2}
        >
          {/* <Typography>LEFT</Typography> */}
        </Grid>

        {/* CENTER */}
        <Grid container item
          sm={8}
          className='centerContent'
          padding={2}

        >
          <Grid container item
            sm={12}
            alignContent='center'
            alignItems='center'
            justifyContent='center'
            padding={2}
            className={'topBar'}
          >
            <Button
                variant='contained'
                // className='createStreamButton'
                onClick={() => {
                  setMode('stream');
                }}
              >Create Stream</Button>
            {/* <Typography>TITLE</Typography> */}
          </Grid>
          <Grid item
            sm={12}
          >

          <div style={{ backgroundColor: '#d13da5' }}>
            <div>
              <img style={{ paddingTop: '10px', paddingLeft: '10px' }} width="50px;" src='https://lh3.googleusercontent.com/QHq_GOx-FBJ1HkAUuZ-RxaYDpbr4udl67kjRYvOKo3BkHn74SOi3goDuMR3199XwAmT3cdGciyH_WT5KmW57hCeBaw75T9KaChnuTBE=s120' />;
              <img style={{ padding: 'auto' }} width="50px;" src='https://lh3.googleusercontent.com/QHq_GOx-FBJ1HkAUuZ-RxaYDpbr4udl67kjRYvOKo3BkHn74SOi3goDuMR3199XwAmT3cdGciyH_WT5KmW57hCeBaw75T9KaChnuTBE=s120' />;
              <img style={{ padding: 'auto' }} width="50px;" src='https://lh3.googleusercontent.com/QHq_GOx-FBJ1HkAUuZ-RxaYDpbr4udl67kjRYvOKo3BkHn74SOi3goDuMR3199XwAmT3cdGciyH_WT5KmW57hCeBaw75T9KaChnuTBE=s120' />;
              <img style={{ padding: 'auto' }} width="50px;" src='https://lh3.googleusercontent.com/QHq_GOx-FBJ1HkAUuZ-RxaYDpbr4udl67kjRYvOKo3BkHn74SOi3goDuMR3199XwAmT3cdGciyH_WT5KmW57hCeBaw75T9KaChnuTBE=s120' />;

              <button
                style={{ backgroundColor: '#2666c7', float: 'right', textAlign: 'right' }}
                onClick={() => {
                   window.open('https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/74661804639461098708131462223609063755981185112722833040679211593380806000641', '_blank');
                }}>
                <p>Buy Now On</p>
                <img
                  style={{ marginTop: '10px', marginLeft: '10px' }}
                  width="75px"
                  src='https://storage.googleapis.com/opensea-static/Logomark/OpenSea-Full-Logo%20(dark).svg' />
              </button>
            </div>

          </div>

            <Grid container>
              {streamData.map((item, i) => (
                <Grid item key={i} xs={12}>
                  <div>
                  {item.url}
                  </div>
                  <Button variant='contained' 
                    disabled={item.isLocked}
                // className='createStreamButton'
                onClick={() => {
                  setWatchUrl(item.url);
                  setMode('watch');  
                }}
              >Watch Stream</Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        
        {/* RIGHT */}
        <Grid item
          sm={2}
        >
          {/* <Typography>RIGHT</Typography> */}
        </Grid>

      </Grid>
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];

 
export default Home;