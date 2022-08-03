import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApi } from '../misc/config';

const Show = () => {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getApi(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(Results => {
        if (isMounted) {
          setShow(Results);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
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
