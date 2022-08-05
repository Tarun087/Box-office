/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { getApi } from '../misc/config';
import { useLastQuery } from '../misc/customhooks';

function Home() {
  const [input, setInput] = useLastQuery();
  const [Results, setResults] = useState(null);
  const [searchOptions, setSearchOptions] = useState('shows');

  const isShowsSearch = searchOptions === 'shows';

  const onSearch = () => {
    getApi(`/search/${searchOptions}?q=${input}`).then(result => {
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
      return Results[0].show ? (
        <ShowGrid data={Results} />
      ) : (
        <ActorGrid data={Results} />
      );
    }
    return null;
  };
  const onRadioChange = ev => {
    setSearchOptions(ev.target.value);
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />

      <div>
        <label htmlFor="search-shows">
          Shows
          <input
            id="search-shows"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>

        <label htmlFor="search-actors">
          Actors
          <input
            id="search-actors"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
}

export default Home;
