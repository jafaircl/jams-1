import Objectifier from "./Iterators/Objectifier";

const parameters = {
  get: AdWordsApp.adGroups(),
  conditions: ["Status = ENABLED", "Clicks > 0"],
  dateRange: "ALL_TIME"
};

function main() {
    
  let test = new Objectifier(parameters).build("ads", true);

  for (let item in test) {

    let thing = test[item];

    Logger.log(thing);
  }
}

//////////////////////
main();
