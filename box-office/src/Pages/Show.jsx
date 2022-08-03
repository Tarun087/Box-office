import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApi } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  useEffect(() => {
    getApi(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(Results => {
      setShow(Results);
    });
  }, [id]);
  console.log('show', show);

  return <div>This is a Show Page</div>;
};

export default Show;
