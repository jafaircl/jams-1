// Import the Iterator class
import Objectifier from "./Iterators/Objectifier";

// Define an array of parameter objects
const parameters = [
  {
    get: AdWordsApp.adGroups(),
    conditions: ["Status = ENABLED", "Clicks > 0"],
    dateRange: "LAST_7_DAYS"
  },{
    get: AdWordsApp.adGroups(),
    conditions: ["Status = ENABLED", "Clicks > 10"],
    dateRange: "LAST_14_DAYS"
  }
];

// Define some function
const someTest = (row) => {
  
  for (let k in row) {
        
    Logger.log(`Performing a test on ${row[k].campaignName} - ${row[k].adGroupName}`);
  }
};

// Run main function
function main() {
  
  for (let i in parameters) {
    
    // Returns an object with every ad in the ad group
    // Second parameter is whether to use same conditions as parent
    let obj = new Objectifier(parameters[i]).build("ads", true);
    
    for (let j in obj) {
      
      someTest(obj[j]);
    }
  }
} 

// Main function must be called for rollup. AdWords ignores it.
main();
