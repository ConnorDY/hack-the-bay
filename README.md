# Hack the Bay
This is a solution for [prompt #4](https://hack-the-bay.devpost.com/details/resources#challenge4). The prompt is to provide a report card for the water quality of a given region in the Chesapeak Bay that is:

(A) Scalable: in that it can be applied to any region
(B) Accessible: in that it takes scientific criteria used to judge water quality and shows the meaning of that data in the case of the given region in plain language
(C) Targeted to an Audience: in that it appeals to a specific population within the region (fishermen, scientists, swimmers, hikers, etc...) 

## Source Data
To get the source data, go [here](http://data.chesapeakebay.net/WaterQuality). Select data by counties and focus on water quality data. The output should be a .json file ~700MB.

This file is gitignored and goes in ~/data/WaterQualitySrcData.json

## Install Deps
`npm ci`
`npm src-data`
`npm run start`
