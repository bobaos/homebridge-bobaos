#!/usr/bin/env node

const yaml = require('js-yaml');
const fs = require('fs');

if (process.argv.length < 3) {
  throw new Error('Please provide yaml file as a commandline argument.');
}

if (process.argv.length < 4) {
  throw new Error('Please provide config.json file as a commandline argument.')
}

// now platform name
let platformName = "Bobaos";
if (process.argv[4]) {
  platformName = process.argv[4];
}

let yamlFilePath = process.argv[2];
let configFilePath = process.argv[3];


try {
  let ymlDoc = yaml.safeLoad(fs.readFileSync(yamlFilePath, 'utf8'));
  let jsonDoc = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
  if (jsonDoc.platforms !== undefined && Array.isArray(jsonDoc.platforms)) {
    const findByPlatform = t => {
      return t.platform === platformName
    };
    let platformIndex = jsonDoc.platforms.findIndex(findByPlatform);
    if (platformIndex > -1) {
      jsonDoc.platforms[platformIndex].accessories = ymlDoc.accessories;
      console.log(JSON.stringify(jsonDoc,' ', 2));
      process.exit();
    } else {
      let newPlatform = {
        platform: platformName,
        name: platformName.toLowerCase(),
        accessories: ymlDoc.accessories
      };
      jsonDoc.platforms.push(newPlatform);
      console.log(JSON.stringify(jsonDoc, ' ', 2));
      process.exit();
    }
  }
} catch (e) {
  console.log(e);
}
