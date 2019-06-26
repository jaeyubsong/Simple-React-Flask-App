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
import { classOptions, colorOptions } from "./dropdownOptions";




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

  const initialClassInfo = [{ class: "lion", number: 0 },
  { class: "car", number: 5 },
  { class: "ball", number: 2 }];

  const initialOcrInfo = [{ text: "flex" }, { text: "nike" }];

  const initialColorInfo = [{ color: "aqua"}];

  const [count, setCount] = useState(0)
  const [classInfo, setClassInfo] = useState(initialClassInfo)
  const [ocrInfo, setOcrInfo] = useState(initialOcrInfo)
  const [colorInfo, setColorInfo] = useState(initialColorInfo);

  useEffect(() => {
    console.log("Use effect called");
    console.log(initialClassInfo);
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

  const addClass = addSearchOption(classInfo, setClassInfo, { class: "", number: 0 });
  const removeClass = removeSearchOption(classInfo, setClassInfo);
  const changeClass = changeSearchOption(classInfo, setClassInfo);

  const addOcr = addSearchOption(ocrInfo, setOcrInfo, { text: "" });
  const removeOcr = removeSearchOption(ocrInfo, setOcrInfo);
  const changeOcr = changeSearchOption(ocrInfo, setOcrInfo);

  const addColor = addSearchOption(colorInfo, setColorInfo, { color: "" });
  const removeColor = removeSearchOption(colorInfo, setColorInfo);
  const changeColor = changeSearchOption(colorInfo, setColorInfo);



  return (
    <div>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <div>
            Object
            <Fab size="small" color="secondary" aria-label="Add" className={classes.margin} onClick={addClass}>
              <AddIcon />
            </Fab>
            <div>
              {console.log("Rendering")}
              {console.log(classInfo)}
              {classInfo.map((mapData, mapIndex) => (
                <Box display="flex" flexDirection="row" justifyContent="center" key={mapIndex} p={1}>
                  <Box pl={5} width={150}>
                    {console.log(mapData)}
                    <Select
                      options={classOptions}
                      // searchable="true"
                      // labelField="class"
                      // clearable="true"
                      value={[{ label: mapData.class }]}
                      onChange={(option) => {
                        changeClass(mapIndex, { class: option.value, number: mapData.number });
                      }} />
                  </Box>
                  <Box>
                    <input style={{width: "50px"}} type="number" value={mapData.number} onChange={(event) => {
                      changeClass(mapIndex, { class: mapData.class, number: parseInt(event.target.value) });
                    }} />
                  </Box>
                  <Box>
                    <IconButton aria-label="Delete" onClick={() => removeClass(mapIndex)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>

                </Box>
              ))}
              <button onClick={() => console.log(initialClassInfo)}>
                GetinitialClassInfo
              </button>
              <button onClick={() => console.log(classInfo)}>
                GetClassInfo
              </button>

              <div>sadas</div>
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
            <Box width={150}>
              <Select
                options={colorOptions}
                onChange={(option) => {
                  changeColor(0, { color: option.value });
                }}
              />
            </Box>

          </div>

        </Grid>
      </Grid>
      <button onClick={() => props.onClickSearch(classInfo, ocrInfo, colorInfo)}>Search</button>


    </div>

  );
};

export default SearchCondition;

