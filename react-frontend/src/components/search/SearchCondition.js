import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { options } from "./dropdownOptions";




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

// const initialClassInfo = [{class: "lion", number: 0}, 
//                           {class: "car", number: 5}, 
//                           {class: "ball", number: 2}];


function SearchCondition() {

  const classes = useStyles();

  const initialClassInfo = [{class: "lion", number: 0}, 
                            {class: "car", number: 5}, 
                            {class: "ball", number: 2}];

  const [count, setCount] = useState(0)
  const [classInfo, setClassInfo] = useState(initialClassInfo)

  useEffect(() => {
    console.log("Use effect called");
    console.log(initialClassInfo);
    // setClassInfo(initialClassInfo);
  }, [])

  const addClass = () => {
    console.log("Add class called\n");
    const tempArray = [...classInfo, {class: "", number: 0}];
    setClassInfo(tempArray);
  }

  const removeClass = (myIndex) => {
    console.log("Remove class called with index %d", myIndex);
    const tempArray = [...classInfo];
    tempArray.splice(myIndex, 1);
    console.log(tempArray)
    setClassInfo(tempArray);
  }

  const changeClass = (myIndex, myClass, myNumber) => {
    console.log("Change class called");
    const tempArray = [...classInfo];
    tempArray[myIndex] = {class: myClass, number: myNumber};
    setClassInfo(tempArray);
  };


  return(
    <div>
      SearchPage
        <Fab size="small" color="secondary" aria-label="Add" className={classes.margin} onClick={addClass}>
          <AddIcon />
        </Fab>
      <div>
        {console.log("Rendering")}
        {console.log(classInfo)}
        {classInfo.map((mapData, mapIndex) => (
          <Box display="flex" flexDirection="row" justifyContent="center" key={mapIndex} p={1}>
            <Box pl={5} width={200}>
              {console.log(mapData)}
              <Select
                options={options}
                // searchable="true"
                // labelField="class"
                // clearable="true"
                value={[{label: mapData.class}]}
                onChange={(option) => {
                  // console.log(`%c > onClassChange `, 'background: #555; color: tomato', value[0].class);
                  changeClass(mapIndex, option.value, mapData.number);
                  // initialClassInfo[mapIndex] = {class: value[0].class, number: mapData.number}
                  // setClassInfo(initialClassInfo);
                }
              }
              />
            </Box>
            <Box pl={5}>
              <input type="number" value={mapData.number} onChange={(event) => {
                // console.log(event.target.value)
                // initialClassInfo[mapIndex] = event.target.value;
                // console.log(`%c > onNumberChange `, 'background: #555; color: tomato', event.target.value); 
                const tempArray = {...initialClassInfo}
                tempArray[mapIndex] = {class: mapData.class, number: parseInt(event.target.value)}
                changeClass(mapIndex, mapData.class, parseInt(event.target.value));
                // console.log("Map index is %d", mapIndex)
                // console.log("initialClassInfo is")
                // console.log(tempArray);
                // console.log("Called setClassInfo")
                // setClassInfo(tempArray);
              }} />
            </Box>
            <Box pl={5}>
              <IconButton aria-label="Delete" onClick={()=>removeClass(mapIndex)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>

          </Box>
        ))}
        <button onClick={()=>console.log(initialClassInfo)}>
          GetinitialClassInfo
        </button>
        <button onClick={()=>console.log(classInfo)}>
          GetClassInfo
        </button>

        <div>sadas</div>
      </div>
    </div>

  );
};

export default SearchCondition;

