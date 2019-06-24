import React, { useState, useEffect } from 'react';
import SearchCondition from './SearchCondition'
import SearchResult from './SearchResult';

function SearchPage() {
  return (
    <div>
      <SearchCondition />
      <SearchResult />
    </div>
  );
};

export default SearchPage;