// const hre = require("hardhat");
// const ethers = hre.ethers;

const fs = require("fs");
import { task } from "hardhat/config";

task("updateDeploy", "A sample task with params")
  .addPositionalParam("chain")
  .setAction(async (taskArgs, hre) => {
    const ethers = hre.ethers;
    console.log(taskArgs);

  const path = require('path');
  const deployments = path.resolve(__dirname, `../../deployments/${taskArgs.chain}`);

//   let newMeta = await fs.readF(path.resolve(__dirname, '../metadata/tavern-components/template.json'), `${metadataFolder}/${component.split('.')[0]}.json`)
//   /tavern-deployments.json


  let object = await JSON.parse(await fs.readFileSync(deployments + '/tavern-deployment.json', 'utf8'));

  
  console.log(JSON.stringify(object))

//   const metadataFolder = path.resolve(__dirname, '../metadata/tavern-components');

//   const abiFolder = path.resolve(__dirname, "../artifacts/src/components");



  });



// async function main() {

//   const path = require('path');

//   const metadataFolder = path.resolve(__dirname, '../metadata/tavern-components');

//   const abiFolder = path.resolve(__dirname, "../artifacts/src/components");


//   // load up metadata folder
//   // load up component folder
//   let metadata: string[] = await fs.readdirSync(metadataFolder);
//   let components: string[] = await fs.readdirSync(abiFolder);


//   // console.log(metadata);
//   // console.log(components);

//   components.forEach(async (component) => {
//     if (component.includes('.sol')) {
//       let compName = component.split('.')[0];
//       if (!metadata.includes(`${compName}.json`)) {
//         let componentAbi = require(`${abiFolder}/${component}/${compName}.json`).abi;
//         let newMeta = await fs.copyFileSync(path.resolve(__dirname, '../metadata/tavern-components/template.json'), `${metadataFolder}/${component.split('.')[0]}.json`);
//         let newJson = require(`${metadataFolder}/${component.split('.')[0]}.json`);
//         newJson.name = compName;
//         componentAbi.forEach((abi: any) => {



//           let iface = new ethers.Interface([abi]);
//           let simpleABI = iface.format(true)


//           if (abi.type === 'function') {
//             if (abi.stateMutability === 'view') {
//               if (abi.name.includes('getSummary') || abi.name.includes('metadata')) {
//                 //ignore
//               } else {
//                 newJson.readFunctions.push({
//                   name: abi.name,
//                   description: `description of ${abi.name}`,
//                   abi: simpleABI,
//                   requires: [],
//                   creates: [],
//                   emits: []
//                 });
//               }
//             }

//             if (abi.stateMutability === 'nonpayable') {
//               if (abi.inputs.length === 2 && abi.inputs[0].type === 'address' && abi.inputs[1].type === 'address') {
//                 newJson.gameFunctions.push({
//                   name: abi.name,
//                   description: `description of ${abi.name}`,
//                   abi: simpleABI,
//                   requires: [],
//                   creates: [],
//                   emits: []
//                 });
//               } else {
//                 if (abi.name.includes('updateMetadata') || abi.name.includes('initialize')) {
//                   //ignore
//                 } else {
//                   newJson.configFunctions.push({
//                     name: abi.name,
//                     description: `description of ${abi.name}`,
//                     abi: simpleABI,
//                     requires: [],
//                     creates: [],
//                     emits: []
//                   });
//                 }
//               }


//             }
//           }
//         });
//         console.log("created  " + newJson.name)
//         await fs.writeFileSync(`${metadataFolder}/${component.split('.')[0]}.json`, JSON.stringify(newJson, null, 2));


//       } else {
//         console.log("metadata exists for " + compName);

//       }
//     }
//   });

//   // for each component, if the metadata doesn't exist in the metadata folder
//   // copy the template
//   // generate the ABI
//   // fill in the template as much as possible.


// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });