import Iterator from "./Iterator";
import * as u from "../utils";

export default class Objectify extends Iterator {
  
  constructor(o) {
    super(o);
  }
  
  build(child, inherit = true) {
    
    let output = [];
    
    this.run( () => {
      
      let arr = [], children = this.item[child]();
      
      if (inherit === true) {
        children = this._buildSelector(children);
      }
      
      children = children.get();
      
      while (children.hasNext()) {
        
        let dateRange = this.props.dateRange,
          child = children.next();
        
        arr.push({
          getItem: () => child,
          getStats: () => child.getStatsFor(dateRange)
        });
      }
      
      output.push(arr);
    });
    
    return output;
  }
}