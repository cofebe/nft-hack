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

function Home({ setMode, streamData, setWatchUrl, }) {
  console.log('streamData: ', streamData);
  const [collectionData, setCollectionData] = useState();

  // const getCollectionInfo = async contractAddress => {
  //   // https://api.covalenthq.com/v1/80001/tokens/0x700433206Dc6979784c4bdeb8c4C91FFB745E8b7/nft_metadata/1/?quote-currency=USD&format=JSON&key=ckey_200682d8e34b495f9557869dacd
  //   console.log('getCollectionInfo', contractAddress);
  //   const apiAddressBase = 'https://api.covalenthq.com/v1/80001/tokens/';
  //   const key = 'ckey_200682d8e34b495f9557869dacd';
  //   const tokenId = 1; // @todo randomize?
  //   const apiAddress = apiAddressBase + contractAddress + '/nft_metadata/' + tokenId + '/?quote-currency=USD&format=JSON&key=' + key;
  //   const fetchResponse = await fetch(apiAddress);
  //   const resJson = await fetchResponse.json();
  //   return resJson;
  // };

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

  const getCollectionInfo = collectionAddress => {
    const result = itemData.find(item => item.contractAddress === collectionAddress);
    if (result) {
      return result;
    } else {
      return 
    }
  };

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
              {streamData.map((item, i) => {
                var collectionInfo = {};//getCollectionInfo(item);
                return (
                <Grid item key={i} xs={12}>
                  <ImageListItem key={item.img}>
                    <img
                      src={`${collectionInfo.img}?w=248&fit=crop&auto=format`}
                      srcSet={`${collectionInfo.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
                  <div>
                    {item.url}
                  </div>
                  <Button variant='contained'
                // className='createStreamButton'
                onClick={() => {
                  setWatchUrl(item.url);
                  setMode('watch');  
                }}
              >Watch Stream</Button>
                </Grid>
              )})}
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
    img: 'https://lh3.googleusercontent.com/LyQ92IXACaGmF8g-m7VFesYl1mUncyu7jFuOzyo4fOPRvzrjnRRxhchwP3NRdTTWDJ-W0VUYvS1A76rJze3Sgb3uDUH5VHGrIM-O=w600',
    title: 'PoganVerse Lands',
    // author: '@bkristastucchio',
  },
  {
    img: 'https://lh3.googleusercontent.com/Sj83HwS1zo_71ONyRVCrvU3D0yDko-4HrledptYGaopcVU1hxS-NjP7IIv0ohZU5RAVhwS-VnUFdzFryhn1GiK_m8Q=w600',
    title: 'CryptoPunks',
  },
  {
    img: 'https://lh3.googleusercontent.com/r2d5j8W2u2pdaAyeu8ckQPst3xtu--_coUrXNmNXhphTZwanEPvNXkKzRZnYIlw5R6boSG2o3fhLr5-Tpz_dMtR-9-PUaHM-zPGW-g=s0',
    title: 'Pudgey Doodles',
  },
  {
    img: 'https://lh3.googleusercontent.com/kXoCpz6fZg8b49rHT1_g8v7Xw3_TiFMpMaP1_MW9Tt3-gKizL4MwhOQQGr4_jCHPnHHz9oLOHFNy08488ln4AjiyRjdQlhjhVHWG=w600',
    title: 'Cup Cats',
  },
  {
    img: 'https://lh3.googleusercontent.com/4tswDipn3C2N1IUR7JZlSTtIljiHrikXzQb3Dsidik7IbB0Rgh7SQ3Wkar_DkbCgn2I9lqjA4eq3magGY4PJ-m5_KbRIjPVj4rre5g=w600',
    title: 'CloneX',
  },
  {
    img: 'https://lh3.googleusercontent.com/_SiWih9joS0lIN6_FFmDakcI5CkJB6j5epq1F00lBlwimxElZ29iFDPl8dKVFnVMp9TZC0ZPCV2JfecMe5FG34q-uT-LNNIz57peg84=w600',
    title: 'MAYC',
  },
  {
    img: 'https://lh3.googleusercontent.com/Q4uXff5hD6T91FlaDiqZTpMu-kEgwx6IcUHXsWF_Moq5u6VOvfqKuIXN2_StL78LNiA1YW3e16vnrLq_zqvfOMtK7PLy9AcKGxWr=w600',
    title: 'BAYC',
    contractAddress: '0x700433206Dc6979784c4bdeb8c4C91FFB745E8b7',
  },
  // {
  //   img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  //   title: 'Fern',
  //   author: '@katie_wasserman',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  //   title: 'Mushrooms',
  //   author: '@silverdalex',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  //   title: 'Tomato basil',
  //   author: '@shelleypauls',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  //   title: 'Sea star',
  //   author: '@peterlaster',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
  //   title: 'Bike',
  //   author: '@southside_customs',
  // },
];

 
export default Home;