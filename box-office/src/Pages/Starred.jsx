import React, { useEffect, useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { getApi } from '../misc/config';
import ShowGrid from '../components/show/ShowGrid';
import { useShows } from '../misc/customhooks';

function Starred() {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => getApi(`/shows/${showId}`));
      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(Results => {
          setShows(Results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <MainPageLayout>
      {isLoading && <div>Shows are Loading</div>}
      {error && <div>Error occured : {error}</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
}

export default Starred;
