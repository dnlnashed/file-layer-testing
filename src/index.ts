// // without this import, this file doesn't end up in the build
// import './css/style.css';

// import { GoodTimes } from '@/internal';

// // everything after is what executes at startup

// const givver = new GoodTimes();
// givver.doWork();

import shp from 'shpjs/dist/shp.min.js';
import fgbgeojson from 'flatgeobuf/dist/flatgeobuf-geojson.min.js';

async function processFiles() {
    // Shapefile
    console.time('Shapefile');
    const shpResponse = await fetch('/file-layers/AirEmissions_PM25_2020.zip');
    const shpData = await shpResponse.arrayBuffer();
    const parsedShp = await shp(shpData);
    console.log(parsedShp);
    console.timeEnd('Shapefile');

    // Flatgeobuf
    console.time('FlatGeobuf');
    const fgbResponse = await fetch('/file-layers/AirEmissions_PM25_2020.fgb');
    const fgbBuffer = await fgbResponse.arrayBuffer();
    const view = new Uint8Array(fgbBuffer);
    const features = fgbgeojson.deserialize(view);
    console.log(features);
    console.timeEnd('FlatGeobuf');
}

processFiles();
