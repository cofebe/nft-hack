import { useState, useEffect } from 'react';
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

function Home({ setMode, streamData, }) {
  console.log('streamData: ', streamData);
  const [collectionData, setCollectionData] = useState();

  const getCollectionInfo = async contractAddress => {
    // https://api.covalenthq.com/v1/80001/tokens/0x700433206Dc6979784c4bdeb8c4C91FFB745E8b7/nft_metadata/1/?quote-currency=USD&format=JSON&key=ckey_200682d8e34b495f9557869dacd
    console.log('getCollectionInfo', contractAddress);
    const apiAddressBase = 'https://api.covalenthq.com/v1/80001/tokens/';
    const key = 'ckey_200682d8e34b495f9557869dacd';
    const tokenId = 1; // @todo randomize?
    const apiAddress = apiAddressBase + contractAddress + '/nft_metadata/' + tokenId + '/?quote-currency=USD&format=JSON&key=' + key;
    const fetchResponse = await fetch(apiAddress);
    const resJson = await fetchResponse.json();
    return resJson;
  };

  // useEffect(() => {
  //   if (!streamData || !streamData.length) return;
  //   getCollectionInfo(streamData[0].stream.requiredCollection);
  //   return;
  //   console.log('getting collection data from covalent');
  //   const getData = async () => {
  //     var collectionData = await Promise.all(streamData.map(async data => {
  //       return await getCollectionInfo(data.stream.requiredCollection);
  //     }));
  //     console.log('collectionData', collectionData);
  //     setCollectionData(collectionData);
  //   };
  //   getData();
  // }, [streamData]);


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
            <ImageList>
              {itemData.map((item, i) => (
                <Grid item key={i} xs={12}>
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      className='collectionImg'
                      alt={item.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={item.title}
                      subtitle={<span>by: {item.author}</span>}
                      position="below"
                    />
                  </ImageListItem>
                </Grid>
              ))}
            </ImageList>
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
    img: 'https://lh3.googleusercontent.com/LyQ92IXACaGmF8g-m7VFesYl1mUncyu7jFuOzyo4fOPRvzrjnRRxhchwP3NRdTTWDJ-W0VUYvS1A76rJze3Sgb3uDUH5VHGrIM-O=w600',
    title: 'PoganVerse Lands',
    // author: '@bkristastucchio',
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