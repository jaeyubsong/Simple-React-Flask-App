import React, { useState } from 'react';

import Select from "react-dropdown-select";
import Box from '@material-ui/core/Box'
import { options } from "./dropdownOptions";


const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}
function SearchPage() {
  const initialClassInfo = [{class: "person", number: 6}, 
                            {class: "bicycle", number: 7}];
  const currentClassInfo = [{class: "lion", number: 0}, 
                            {class: "car", number: 5}, 
                            {class: "ball", number: 2}];
  const [count, setCount] = useState(0)
  const [classInfo, setClassInfo] = useState(initialClassInfo)

  return(
    <div>
      SearchPage
      <div>
        {classInfo.map(value => {
          console.log(value.class)
        })}
        {classInfo.map((mapData, mapIndex) => (
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box pl={5} width={200}>
              <Select
              options={options}
              searchable="true"
              labelField="class"
              clearable="true"
              values={[{class: mapData.class}]}
              onChange={(value) =>
                console.log(`%c > onChange `, 'background: #555; color: tomato', value)
                
              }
              />
            </Box>
            <Box pl={5}>
              <input type="number" value={mapData.number} onChange={(event) => setCount(event.target.value)} />
            </Box>
          </Box>
        ))}

        <div>sadas</div>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Box pl={5} width={200}>
            <Select
            options={options}
            searchable="true"
            labelField="name"
            clearable="true"
            values={[{name:""}]}
            onChange={(value) =>
              console.log(`%c > onChange `, 'background: #555; color: tomato', value[0].name)
            }
            />
          </Box>
          <Box pl={5}>
            <input type="number" value={count} onChange={(event) => setCount(event.target.value)} />
          </Box>
        </Box>
      </div>
    </div>

  );
};

export default SearchPage;

