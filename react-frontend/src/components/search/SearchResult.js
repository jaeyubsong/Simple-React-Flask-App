import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import ResultBox from './ResultBox'
import sampleImage from 'assets/images/SonHeungMin.jpg'

// const BASE_URI = 'http://localhost:5000'

function imageClick () {
  console.log('click')
}

function getImage () {
  const sampleData = {
    number: 10,
    data: [
      { path: '/data/part1.jpg', text: ['apple, ant'] },
      { path: '/data/part2.jpg', text: ['banana, carrot'] },
      { path: '/data/part3.jpg', text: ['base, bear'] },
      { path: '/data/part4.jpg', text: ['computer, elephant'] }
    ]
  }
  // console.log(sampleData.data);
  sampleData.data.map(value => {
    console.log(value)
  })
  return sampleData
}

function SearchResult (props) {
  const [spacing] = useState(2)

  const sampleData = getImage()
  return (
    <div className='searchResult'>
      {props.searchResult.searchComplete == true && 
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            {props.searchResult.data.map((value, index) => (
              <Grid key={index} item>
                <ResultBox
                  imageSrc={sampleImage}
                  width={100}
                  onClick={() => console.log(value)}
                  frameInfo={value}
                />
                {/* {value} */}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      }

    </div>
  )
}

export default SearchResult
