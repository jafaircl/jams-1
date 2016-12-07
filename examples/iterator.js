// Import the Iterator class
import Iterator from "../src/Iterators/Iterator";

// Define an array of parameter objects
const parameters = [
  {
    get: AdWordsApp.adGroups(),
    conditions: ["Status = ENABLED", "Clicks > 0"],
    dateRange: "LAST_14_DAYS"
  },{
    get: AdWordsApp.keywords(),
    conditions: ["Status = ENABLED", "Clicks > 0"],
    dateRange: "LAST_7_DAYS"
  }
];

// Define some function
const someFunction = (item) => {
  
  return item.getCampaign().getName();
};

// Run main function
function main() {
  
  for (let i in parameters) {
    
    new Iterator(parameters[i]).run( function() {
      
      // this.props = the parameters used to build the Iterator
      // this.item = the next item in the loop
      
      Logger.log(someFunction(this.item));
    });
  }
}

// Main function must be called for rollup. AdWords ignores it.
main();
