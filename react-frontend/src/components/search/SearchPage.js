import React, { useState, useEffect } from 'react';
import SearchCondition from './SearchCondition'
import SearchResult from './SearchResult';

const SearchPage = () => {

  const onClickSearch = (searchOption) => {
    console.log("Clicked search")
    console.log(searchOption)
  }
  return (
    <div>
      <SearchCondition onClickSearch={onClickSearch}/>
      <SearchResult />
    </div>
  );
};

export default SearchPage;