import { useEffect, useReducer, useState } from 'react';
import { getApi } from './config';

function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }
    case 'REMOVE': {
      return prevState.filter(showId => showId !== action.showId);
    }

    default: {
      return prevState;
    }
  }
}

function usePersistedReducer(reducer, initialstate, key) {
  const [state, dispatch] = useReducer(reducer, initialstate, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = 'lastQuery') {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);
    return persisted ? JSON.parse : '';
  });

  const setPersistedInput = newState => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };
  return [input, setPersistedInput];
}

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

export function useShow(showId) {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isloading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    getApi(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
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
  }, [showId]);

  return state;
}
