const express = require('express');
const cors = require('cors');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const { createWriteStream } = require('fs');
const { resolve } = require('path');

const app = express();
let sitemap;
const port = 5000;
app.use(cors());
app.get('/sitemap.xml', function (req, res) {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');
  // if we have a cached entry send it
  if (sitemap) {
    res.send(sitemap);
    return;
  }
  try {
    const smStream = new SitemapStream({
      hostname: 'http://localhost:3000/',
      xmlns: {
        // trim the xml namespace
        news: false, // flip to false to omit the xml namespace for news
        xhtml: true,
        image: true,
        video: true,
        custom: [
          'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"',
          'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
        ],
      },
    });

    const path = `./sitemap.xml`;
    const pipeline = smStream.pipe(createGzip());

    // pipe your entries or directly write them.
    smStream.write({
      url: '/rockets/',
      changefreq: 'daily',
      priority: 0.3,

      video: {
        title: 'video sakjdjshgsjdfgsjgdfjhg',
        description: 'sjhdgshgfjhsdf',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        thumbnail_loc:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
      },
    });

    // cache the response
    streamToPromise(pipeline).then((sm) => (sitemap = sm));
    // make sure to attach a write stream such as streamToPromise before ending
    smStream.end();
    // stream write the response
    pipeline.pipe(createWriteStream(resolve(path)));
    pipeline.pipe(res).on('error', (e) => {
      throw e;
    });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`sitemap app listening on port ${port}!`));
