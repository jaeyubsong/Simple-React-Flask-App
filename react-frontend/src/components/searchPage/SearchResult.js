import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'

import ResultBox from './ResultBox'
import sampleImage from '../../assets/images/SonHeungMin.jpg'

//const BASE_URI = 'http://localhost:5000'


function SearchResult() {
  const [spacing] = useState(2);

  const imageClick = () => {
    console.log('click')
  }

  return (
    <div className="searchResult">
      {console.log("ASDASDASDASD")}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing='2'>
            {[...Array(100).keys()].map(value => (
              <Grid key={value} item>
                <ResultBox imageSrc={sampleImage} 
                            width={100}
                            onClick={() => imageClick()}
                            />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchResult;