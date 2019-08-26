import React, { useState, useEffect } from 'react';
import SearchCondition from './SearchCondition'
import SearchResult from './SearchResult';
import Grid from '@material-ui/core/Grid'
import { fetchData, sendQuery } from 'api/api'

const SearchPage = () => {

  const [searchResult, setSearchResult] = useState({searchComplete: false, data: []})

  const onClickSearch = async (...options) => {
    console.log("Clicked search");
    // console.log(classOption);
    // console.log(ocrOption);
    // console.log(colorOption);
    const flattened = [].concat(...options);
    console.log(flattened)
    // console.log(...options)
    const result = await sendQuery(flattened);
    console.log("Finished sendQuery");
    console.log(result.data);
    const newSearchResult = {...searchResult}
    Object.assign(newSearchResult, {searchComplete: true, data: result.data});
    console.log(newSearchResult);
    setSearchResult(newSearchResult);
  }

  return (
    <div>
      {console.log("Reload this")}
      <Grid container spacing={2} justify="center">
        <Grid item xs={2}>
          Left grid
        </Grid>
        <Grid item xs={8}>
          <SearchCondition onClickSearch={onClickSearch}/>
          <SearchResult searchResult={searchResult}/>
        </Grid>  
        <Grid item xs={2}>
          Right grid
        </Grid> 
      </Grid>
    </div>
  );
};

export default SearchPage;