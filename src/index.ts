import shp from 'shpjs/dist/shp.min.js';
import fgbgeojson from 'flatgeobuf/dist/flatgeobuf-geojson.min.js';
import JSZip from 'jszip';

async function processFiles() {
    // Shapefile
    console.log('Shapefile');
    const shpStart = performance.now();
    console.log(shpStart);
    const shpResponse = await fetch('/file-layers/AirEmissions_PM25_2020.zip');
    const shpData = await shpResponse.arrayBuffer();
    const parsedShp = await shp(shpData);
    const shpEnd = performance.now();
    console.log(shpEnd);
    console.log(parsedShp);

    // Flatgeobuf
    console.log('FlatGeobuf');
    const zip = new JSZip();
    const fgbStart = performance.now();
    console.log(fgbStart);
    const fgbResponse = await fetch('/file-layers/AirEmissions_PM25_2020_fgb.zip');
    const fgbBuffer = await fgbResponse.arrayBuffer();
    const unzipped = await zip.loadAsync(fgbBuffer);
    const fileName = Object.keys(unzipped.files)[0];
    const fgbData = await unzipped.file(fileName)?.async('uint8array');
    const parsedFgb = await fgbgeojson.deserialize(fgbData);
    const fgbEnd = performance.now();
    console.log(fgbEnd);
    console.log(parsedFgb);

    // Calculate the time taken for each operation
    const flatGeobufTime = fgbEnd - fgbStart;
    const shapefileTime = shpEnd - shpStart;

    // Calculate the percentage improvement
    const percentageFaster = ((shapefileTime - flatGeobufTime) / shapefileTime) * 100;
    console.log(`FlatGeobuf was ${percentageFaster.toFixed(2)}% faster than Shapefile.`);
}

processFiles();
