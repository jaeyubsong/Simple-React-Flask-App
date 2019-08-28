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

function getVideoUrl (video) {
  let myVideo = video.toString()
  while (myVideo.length < 5) {
    myVideo = '0' + myVideo
  }
  let url = process.env.PUBLIC_URL + '/dataset/video_data/' + myVideo + '.mp4'
  // console.log(url)
  return url
}

function getSameVideo (videoNumber, videoList) {
  let myVideos = []
  for (const video of videoList) {
    if (video['video'] == videoNumber)
    myVideos.push(video['startSecond'])
  }

  return myVideos
}

function ResultBox({ imageSrc, width, height, onClick, frameInfo, videoNumber, videoList }) {
  const classes = useStyles()
  return (
    <div>
      {/* <div> */}
        <Popup trigger={<img src={imageSrc} style={{ width: width }} onClick={onClick} />} position="left center">
          <div>
            <ReactPlayer url={getVideoUrl(videoNumber)} controls={true} />
          {frameInfo}
          {/* {getSameVideo(videoNumber, videoList)} */}
          </div>
        </Popup>
      {/* </div> */}
      {/* {frameInfo}       */}
    </div>

  )
}

export default ResultBox
