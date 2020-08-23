const fs = require('fs');
const path = require('path');
const StreamArray = require('stream-json/streamers/StreamArray');
const progress = require('progress-stream');

const dataSourcePath = path.join(
  __dirname,
  '../data/WaterQualityFIPS2015-2020.json'
);
const dataOutputPath = path.join(__dirname, '../public/data');

// command line arguments
const shouldRestart = process.argv.includes('--restart');
const verbose = process.argv.includes('--verbose');

// get total size of data file
const dataSize = fs.statSync(dataSourcePath).size;

// check if output directory exists
let outputDirExists = fs.existsSync(dataOutputPath);

// check if a data map already exists
const dataMapFile = path.join(dataOutputPath, 'map.json');
const dataMap =
  !shouldRestart && outputDirExists && fs.existsSync(dataMapFile)
    ? JSON.parse(fs.readFileSync(dataMapFile))
    : {};

// create streams
const dataFileStream = fs.createReadStream(dataSourcePath);
const jsonStream = StreamArray.withParser();
const progressStream = progress({
  length: dataSize,
  time: 10 * 1000, // output every X ms
});

/**
 * BEGIN: Stream Handlers
 */
progressStream.on('progress', ({ percentage }) => {
  console.log(`Progress: ${percentage}%`);
});

jsonStream.on('data', ({ value }) => {
  // grab properties we care about
  const {
    FIPS,
    Latitude,
    Longitude,
    MeasureValue,
    Parameter,
    SampleDate,
    SampleTime,
    Unit,
  } = value;

  // get FIPS directory
  const fipsDir = path.join(dataOutputPath, FIPS);
  if (!fs.existsSync(fipsDir)) fs.mkdirSync(fipsDir);

  // get Year directory
  const year = new Date(SampleDate).getFullYear();
  const yearDir = path.join(fipsDir, year.toString());
  if (!fs.existsSync(yearDir)) fs.mkdirSync(yearDir);

  // get Parameter directory
  const parameterDir = path.join(yearDir, Parameter);
  if (!fs.existsSync(parameterDir)) fs.mkdirSync(parameterDir);

  // write data
  const dataFile = path.join(parameterDir, 'data.json');

  const data = fs.existsSync(dataFile)
    ? JSON.parse(fs.readFileSync(dataFile))
    : [];

  data.push({
    Latitude,
    Longitude,
    MeasureValue,
    SampleDate,
    SampleTime,
    Unit,
  });

  fs.writeFileSync(dataFile, JSON.stringify(data));

  // add it to data map
  if (!dataMap[FIPS]) dataMap[FIPS] = {};
  if (!dataMap[FIPS][year]) dataMap[FIPS][year] = [];
  if (!dataMap[FIPS][year].includes(Parameter)) {
    dataMap[FIPS][year].push(Parameter);
    if (verbose) console.log(dataMap);
  }
});

jsonStream.on('end', () => {
  console.log('Writing data map file.');
  fs.writeFileSync(dataMapFile, JSON.stringify(dataMap));
  console.log('Done. :^)');
});
/**
 * END: Stream Handlers
 */

// clear output directory if it exists and we are told to
if (shouldRestart && outputDirExists) {
  console.log('Deleting previous output.');
  fs.rmdirSync(dataOutputPath, { recursive: true });
  outputDirExists = false;
}

// create output directory
if (!outputDirExists) {
  console.log('Creating output directory.');
  fs.mkdirSync(dataOutputPath);
} else {
  console.log('Using existing output directory.');
}

// start reading and processing the data
console.log('Starting data processing.');
dataFileStream.pipe(progressStream).pipe(jsonStream.input);
