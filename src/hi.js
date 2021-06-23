import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
const Hi = () => {
  const [state, setstate] = useState();

  useEffect(() => {
    fetchRockets();
  }, []);

  const fetchRockets = async () => {
    const { data } = await axios.get('https://api.spacexdata.com/v3/rockets');
    setstate(data);
    console.log(`data`, data);
  };

  return (
    <>
      <Helmet>
        <title>Rockets</title>
      </Helmet>

      {state &&
        state.map(({ rocket_name, rocket_id }) => (
          <h5 key={rocket_id}>{rocket_name}</h5>
        ))}
    </>
  );
};

export default Hi;
