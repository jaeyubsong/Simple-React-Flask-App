import React, { useState, useEffect } from 'react';
import SearchCondition from './SearchCondition'
import SearchResult from './SearchResult';
import { fetchData, sendQuery } from 'api/api'

const SearchPage = () => {

  const [searchComplete, setSearchComplete] = useState(false);

  const onClickSearch = (...options) => {
    console.log("Clicked search");
    // console.log(classOption);
    // console.log(ocrOption);
    // console.log(colorOption);
    const flattened = [].concat(...options);
    console.log(flattened)
    // console.log(...options)
    sendQuery(flattened);
    fetchData();
    setSearchComplete(true);
  }
  return (
    <div>
      <SearchCondition onClickSearch={onClickSearch}/>
      <SearchResult searchComplete={searchComplete}/>
    </div>
  );
};

export default SearchPage;