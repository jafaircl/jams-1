export default class Iterator {
  
  constructor (o) {
    
    this.props = o;
    this.selector = o.get;
  }
  
  _add(selector, method, criteria) {
    
    for (let i in criteria) {
      
      selector = selector[method](criteria[i]);
    }
    
    return selector;
  }
  
  get() {
    
    this.selector = this._add(this.selector, "withIds", this.props.ids);
    this.selector = this._add(this.selector, "withCondition", this.props.conditions);
    
    return this.selector
      .forDateRange(this.props.dateRange)
      .withLimit(this.props.limit)
      .orderBy(this.props.order)
      .get();
  }
  
  run(logic) {
    
    this._iterator = this.get();
    
    while (this._iterator.hasNext()) {
      
      this.item = this._iterator.next();
      logic.apply(this);
    }
  }
}