#!/usr/bin/env node

const yaml = require('js-yaml');
const fs = require('fs');

console.log("genBobaosAccessories <yaml> <input_config> <output_config> <platformName[Bobaos]>");

if (process.argv.length < 3) {
  throw new Error('Please provide yaml file as a commandline argument.');
}

if (process.argv.length < 4) {
  throw new Error('Please provide input config.json file as a commandline argument.')
}

if (process.argv.length < 5) {
  throw new Error('Please provide output config.json file as a commandline argument.')
}

// now platform name
let platformName = "Bobaos";
if (process.argv[5]) {
  platformName = process.argv[5];
}

let yamlFilePath = process.argv[2];
let inputConfigFilePath = process.argv[3];
let outputConfigFilePath = process.argv[4];


try {
  let ymlDoc = yaml.safeLoad(fs.readFileSync(yamlFilePath, 'utf8'));
  let jsonDoc = JSON.parse(fs.readFileSync(inputConfigFilePath, 'utf8'));
  if (jsonDoc.platforms !== undefined && Array.isArray(jsonDoc.platforms)) {
    const findByPlatform = t => {
      return t.platform === platformName
    };
    let platformIndex = jsonDoc.platforms.findIndex(findByPlatform);
    if (platformIndex > -1) {
      jsonDoc.platforms[platformIndex].accessories = ymlDoc.accessories;
      let data = JSON.stringify(jsonDoc, ' ', 2);
      console.log(`writing output to ${outputConfigFilePath}`);
      fs.writeFileSync(outputConfigFilePath, data);
      console.log('success');
      process.exit();
    } else {
      let newPlatform = {
        platform: platformName,
        name: platformName.toLowerCase(),
        accessories: ymlDoc.accessories
      };
      jsonDoc.platforms.push(newPlatform);
      let data = JSON.stringify(jsonDoc, ' ', 2);
      console.log(`writing output to ${outputConfigFilePath}`);
      fs.writeFileSync(outputConfigFilePath, data);
      console.log('success');
      process.exit();
    }
  }
} catch (e) {
  console.log(e);
}
