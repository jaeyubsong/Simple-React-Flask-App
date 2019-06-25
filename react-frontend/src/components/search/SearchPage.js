import React, { useState, useEffect } from 'react';
import SearchCondition from './SearchCondition'
import SearchResult from './SearchResult';
import {fetchData} from 'api/api'

const SearchPage = () => {

  const [searchComplete, setSearchComplete] = useState(false);

  const onClickSearch = (classOption, ocrOption) => {
    console.log("Clicked search");
    console.log(classOption);
    console.log(ocrOption);
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