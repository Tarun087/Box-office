import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import { getApi } from '../misc/config';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isloading: false, error: null, show: action.show };
    }

    case 'FETCH_FAILED': {
      return { ...prevState, isloading: false, error: action.error };
    }

    default:
      return prevState;
  }
};

const initialstate = {
  show: null,
  isloading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isloading, error }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  useEffect(() => {
    let isMounted = true;

    getApi(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(Results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: Results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  console.log('show', show);

  if (isloading) {
    return <div>Data is being loaded</div>;
  }

  if (error) {
    return <div>Error Occured:{error} </div>;
  }

  return <div>This is a Show Page</div>;
};

export default Show;
