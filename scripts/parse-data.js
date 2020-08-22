const fs = require('fs');
const path = require('path');
const StreamArray = require('stream-json/streamers/StreamArray');
const progress = require('progress-stream');

const dataSourcePath = path.join(__dirname, '../data/WaterQualityFIPS.json');
const dataOutputPath = path.join(__dirname, '../data/processed');

// clear output folder if it exists
if (fs.existsSync(dataOutputPath)) {
  console.log('Deleting previous output.');
  fs.rmdirSync(dataOutputPath, { recursive: true });
}

// create output folder
fs.mkdirSync(dataOutputPath);

// get total size of data file
const dataSize = fs.statSync(dataSourcePath).size;

// create streams
const dataFileStream = fs.createReadStream(dataSourcePath, {
  encoding: 'utf8',
});
const jsonStream = StreamArray.withParser();
const progressStream = progress({
  length: dataSize,
  time: 10 * 1000, // output every X ms
});

// stream handlers
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
  if (!fs.existsSync(fipsDir)) {
    // create it if it doesn't exist
    fs.mkdirSync(fipsDir);
  }

  // get Year directory
  const year = new Date(SampleDate).getFullYear();
  const yearDir = path.join(fipsDir, year.toString());
  if (!fs.existsSync(yearDir)) {
    // create it if it doesn't exist
    fs.mkdirSync(yearDir);
  }

  // get Parameter directory
  const parameterDir = path.join(yearDir, Parameter);
  if (!fs.existsSync(parameterDir)) {
    // create it if it doesn't exist
    fs.mkdirSync(parameterDir);
  }

  // write data
  const dataFile = path.join(parameterDir, 'data.json');

  const data = fs.existsSync(dataFile)
    ? JSON.parse(
        fs.readFileSync(dataFile, {
          encoding: 'utf8',
        })
      )
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
});

jsonStream.on('end', () => {
  console.log('Done. :^)');
});

// start reading and processing the data
console.log('Starting data processing.');
dataFileStream.pipe(progressStream).pipe(jsonStream.input);
