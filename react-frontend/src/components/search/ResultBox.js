import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Popup from 'reactjs-popup'
import ReactPlayer from 'react-player'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  }
}))

function ResultBox({ imageSrc, width, height, onClick, frameInfo }) {
  const classes = useStyles()
  return (
    <div>
      {/* <div> */}
        <Popup trigger={<img src={imageSrc} style={{ width: width }} onClick={onClick} />} position="left center">
          <div>
          <ReactPlayer url={process.env.PUBLIC_URL + '/dataset/video_data/00001.mp4'} controls={true} />
          {frameInfo}
          </div>
        </Popup>
      {/* </div> */}
      {/* {frameInfo}       */}
    </div>

  )
}

export default ResultBox
