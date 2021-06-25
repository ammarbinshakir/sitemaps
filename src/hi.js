import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Helmet } from 'react-helmet';
const Hi = () => {
  const [state, setstate] = useState();

  useEffect(() => {
    fetchRockets();
    fetchSitemap();
  }, []);

  const fetchRockets = async () => {
    const { data } = await axios.get('https://api.spacexdata.com/v3/rockets');
    setstate(data);
    // console.log(`data`, data);
  };

  const fetchSitemap = async () => {
    const data = await axios.get('http://localhost:5000/sitemap.xml', {
      headers: {
        'Content-Type': 'application/xml',
        accept: 'application/xml',
      },
    });
    console.log(`data`, data);

    
  };
  return (
    <div>
      <Helmet>
        <title>Rockets</title>
      </Helmet>

      {state &&
        state.map(({ rocket_name, rocket_id }) => (
          <div>
            <h5 key={rocket_id}>{rocket_name}</h5>
            <video width="320" height="240" controls loop muted>
              <source
                type="video/mp4"
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
              />
            </video>
          </div>
        ))}
    </div>
  );
};

export default Hi;
