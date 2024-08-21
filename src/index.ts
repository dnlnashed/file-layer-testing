import shp from 'shpjs/dist/shp.min.js';
import fgbgeojson from 'flatgeobuf/dist/flatgeobuf-geojson.min.js';

async function processFiles() {
    // Shapefile
    console.log('Shapefile');
    const shpStart = performance.now();
    console.log(shpStart);
    const shpResponse = await fetch('/file-layers/AirEmissions_PM25_2020.zip');
    const shpData = await shpResponse.arrayBuffer();
    const parsedShp = await shp(shpData);
    const shpEnd = performance.now();
    console.log(parsedShp);
    console.log(shpEnd);

    // Flatgeobuf
    console.log('FlatGeobuf');
    const fgbStart = performance.now();
    console.log(fgbStart);
    const fgbResponse = await fetch('/file-layers/AirEmissions_PM25_2020.fgb');
    const fgbBuffer = await fgbResponse.arrayBuffer();
    const fgbData = new Uint8Array(fgbBuffer);
    const parsedFgb = await fgbgeojson.deserialize(fgbData);
    const fgbEnd = performance.now();
    console.log(parsedFgb);
    console.log(fgbEnd);

    // Calculate the time taken for each operation
    const flatGeobufTime = fgbEnd - fgbStart;
    const shapefileTime = shpEnd - shpStart;

    // Calculate the percentage improvement
    const percentageFaster = ((shapefileTime - flatGeobufTime) / shapefileTime) * 100;
    console.log(`FlatGeobuf was ${percentageFaster.toFixed(2)}% faster than Shapefile.`);
}

processFiles();
