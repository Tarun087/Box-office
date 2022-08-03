/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { getApi } from '../misc/config';

function Home() {
  const [input, setInput] = useState('');
  const [Results, setResults] = useState(null);

  const onSearch = () => {
    getApi(`/search/shows?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const renderResults = () => {
    if (Results && Results.length === 0) {
      return <div>No Results ....</div>;
    }
    if (Results && Results.length > 0) {
      return (
        <div>
          {Results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
}

export default Home;
