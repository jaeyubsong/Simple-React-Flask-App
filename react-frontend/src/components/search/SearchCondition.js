import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox'
import { objectOptions, colorOptions } from "./dropdownOptions";




const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


const SearchCondition = (props) => {

  const classes = useStyles();

  const initialObjectInfo = [];

  const initialOcrInfo = [];

  const initialColorInfo = [];

  const initialSentenceInfo = [];

  const [count, setCount] = useState(0)
  const [objectInfo, setObjectInfo] = useState(initialObjectInfo)
  const [ocrInfo, setOcrInfo] = useState(initialOcrInfo)
  const [colorInfo, setColorInfo] = useState(initialColorInfo)
  const [sentenceInfo, setSentenceInfo] = useState(initialSentenceInfo)

  useEffect(() => {
    console.log("Use effect called");
    console.log(initialObjectInfo);
    // setClassInfo(initialClassInfo);
  }, [])

  const addSearchOption = (infoArray, setInfoArray, initialObject) => () => {
    const tempArray = [...infoArray, initialObject];
    setInfoArray(tempArray);
  }

  const removeSearchOption = (infoArray, setInfoArray) => (myIndex) => {
    const tempArray = [...infoArray];
    tempArray.splice(myIndex, 1);
    setInfoArray(tempArray);
  }

  const changeSearchOption = (infoArray, setInfoArray) => (myIndex, newObject) => {
    const tempArray = [...infoArray];
    tempArray[myIndex] = Object.assign(tempArray[myIndex], newObject);
    setInfoArray(tempArray);
  }

  const addObject = addSearchOption(objectInfo, setObjectInfo, { type: "object", object: "", number: 0, checked: false });
  const removeObject = removeSearchOption(objectInfo, setObjectInfo);
  const changeObject = changeSearchOption(objectInfo, setObjectInfo);

  const addOcr = addSearchOption(ocrInfo, setOcrInfo, { type: "text", text: "" , checked: false});
  const removeOcr = removeSearchOption(ocrInfo, setOcrInfo);
  const changeOcr = changeSearchOption(ocrInfo, setOcrInfo);

  const addColor = addSearchOption(colorInfo, setColorInfo, { type: "color", color: "", checked: false });
  const removeColor = removeSearchOption(colorInfo, setColorInfo);
  const changeColor = changeSearchOption(colorInfo, setColorInfo);

  const addSentence = addSearchOption(sentenceInfo, setSentenceInfo, { type: "sentence", sentence: "", checked: false });
  const removeSentence = removeSearchOption(sentenceInfo, setSentenceInfo);
  const changeSentence = changeSearchOption(sentenceInfo, setSentenceInfo);

  return (
    <div>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <div>
            Object
            <Fab size="small" color="secondary" aria-label="Add" className={classes.margin} onClick={addObject}>
              <AddIcon />
            </Fab>
            <div>
              {console.log("Rendering")}
              {console.log(objectInfo)}
              {objectInfo.map((mapData, mapIndex) => (
                <Box display="flex" flexDirection="row" justifyContent="center" key={mapIndex} p={1}>
                  <Box pl={5} width={150}>
                    {console.log(mapData)}
                    <Select
                      options={objectOptions}
                      // searchable="true"
                      // labelField="class"
                      // clearable="true"
                      value={[{ label: mapData.object }]}
                      onChange={(option) => {
                        changeObject(mapIndex, { object: option.value, number: mapData.number });
                      }} />
                  </Box>
                  <Box>
                    <input style={{width: "50px"}} type="number" value={mapData.number} onChange={(event) => {
                      changeObject(mapIndex, { class: mapData.object, number: parseInt(event.target.value) });
                    }} />
                  </Box>
                  <Box>
                    <Checkbox
                      checked={mapData.checked}
                      onChange={(event) => {
                        changeObject(mapIndex, {checked: (event.target.checked) });
                      }}
                      value="checkedA"
                      inputProps={{
                        'aria-label': 'primary checkbox',
                      }}
                    />
                  </Box>
                  <Box>
                    <IconButton aria-label="Delete" onClick={() => removeObject(mapIndex)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>

                </Box>
              ))}
              <button onClick={() => console.log(initialObjectInfo)}>
                GetinitialObjectInfo
              </button>
              <button onClick={() => console.log(objectInfo)}>
                GetObjectInfo
              </button>
            </div>
          </div>
        </Grid>
        <Grid item>
          Text
          <Fab size="small" color="secondary" aria-label="Add" className={classes.margin} onClick={addOcr}>
            <AddIcon />
          </Fab>
          {ocrInfo.map((mapData, mapIndex) => (
            <Box display="flex" flexDirection="row" justifyContent="center" key={mapIndex} p={1}>
              <Box>
                <input style={{width: "150px"}} type="text" value={mapData.text} onChange={(event) => {
                  changeOcr(mapIndex, { text: event.target.value });
                }} />
              </Box>
              <Box>
                <Checkbox
                  checked={mapData.checked}
                  onChange={(event) => {
                    changeOcr(mapIndex, {checked: (event.target.checked) });
                  }}
                  value="checkedA"
                  inputProps={{
                    'aria-label': 'primary checkbox',
                  }}
                />
              </Box>
              <Box>
                <IconButton aria-label="Delete" onClick={() => removeOcr(mapIndex)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid item>
          <div>
            Color
            <Fab size="small" color="secondary" aria-label="Add" className={classes.margin} onClick={addColor}>
              <AddIcon />
            </Fab>
            <div>
              {colorInfo.map((mapData, mapIndex) => (
                <Box display="flex" flexDirection="row" justifyContent="center" key={mapIndex} p={1}>
                  <Box width={150}>
                    <Select
                      options={colorOptions}
                      value={[ {label: mapData.color }]}
                      onChange={(option) => {
                        changeColor(0, { color: option.value });
                      }}
                    />
                  </Box>
                  <Box>
                    <Checkbox
                      checked={mapData.checked}
                      onChange={(event) => {
                        changeColor(mapIndex, {checked: (event.target.checked) });
                      }}
                      value="checkedA"
                      inputProps={{
                        'aria-label': 'primary checkbox',
                      }}
                    />
                  </Box>
                  <Box>
                    <IconButton aria-label="Delete" onClick={() => removeColor(mapIndex)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </div>


          </div>

        </Grid>

        <Grid item>
          Sentence
          <Fab size="small" color="secondary" aria-label="Add" className={classes.margin} onClick={addSentence}>
            <AddIcon />
          </Fab>
          {sentenceInfo.map((mapData, mapIndex) => (
            <Box display="flex" flexDirection="row" justifyContent="center" key={mapIndex} p={1}>
              <Box>
                <input style={{width: "150px"}} type="text" value={mapData.sentence} onChange={(event) => {
                  changeSentence(mapIndex, { sentence: event.target.value });
                }} />
              </Box>
              <Box>
                <IconButton aria-label="Delete" onClick={() => removeSentence(mapIndex)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Grid>

      </Grid>
      <button onClick={() => props.onClickSearch(objectInfo, ocrInfo, colorInfo, sentenceInfo)}>Search</button>


    </div>

  );
};

export default SearchCondition;

