import {buildSelector} from "../utils";

export default class Iterator {
  
  constructor (o) {
    
    this.props = o;
    this.selector = o.get;
  }
  
  _addMethods(method,criteria, selector){
  
    for (let i in criteria) {

      selector = selector[method](criteria[i]);
    }

    return selector;
  }
  
  _buildSelector(selector){
  
    selector = this._addMethods("withIds", this.props.ids, selector);
    selector = this._addMethods("withCondition", this.props.conditions, selector);

    return selector.forDateRange(this.props.dateRange)
      .withLimit(this.props.limits)
      .orderBy(this.props.orderBy);
  }
  
  run(logic) {
    
    this._iterator = this._buildSelector(this.selector).get();
    
    while (this._iterator.hasNext()) {
      
      this.item = this._iterator.next();
      logic.apply(this);
    }
  }
}