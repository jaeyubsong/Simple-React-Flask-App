import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
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

function ResultBox({ imageSrc, width, height, onClick }) {
  const classes = useStyles()
  return (
    <div>
      <img src={imageSrc} style={{ width: width }} onClick={onClick} />
    </div>
  )
}

export default ResultBox
