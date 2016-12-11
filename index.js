import Iterator from "./src/Iterators/Iterator";
import Objectifier from "./src/Iterators/Objectifier";

// Define an array of parameter objects
const parameters = [
  {
    get: AdWordsApp.adGroups(),
    conditions: ["Status = ENABLED", "Clicks > 10"],
    dateRange: "LAST_7_DAYS"
  },{
    get: AdWordsApp.adGroups(),
    conditions: ["Status = ENABLED", "Clicks > 50"],
    dateRange: "LAST_14_DAYS"
  }
];

// Define some function
const someTest = (row) => {
  
  for (let k in row) {
    Logger.log(`${k} of ${row.length}`);
    Logger.log(`Performing a test on ${row[k].getItem().getAdGroup().getName()} -
${row[k].getItem().getId()} - ${row[0].getStats().getCtr()} - ${row[k].getStats().getClicks()}`);
  }
};

// Run main function
function main() {
  
  for (let i in parameters) {
    
    // Returns an object with every ad in the ad group
    // Second parameter is whether to use same conditions as parent
    let obj = new Objectifier(parameters[i]).build("ads");
    
    for (let j in obj) {
      
      someTest(obj[j]);
    }
  }
} 

// Main function must be called for rollup. AdWords ignores it.
main();
