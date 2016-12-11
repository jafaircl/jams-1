export function addMethods(method,criteria, selector = this.selector){
  
  for (let i in criteria) {
      
    selector = selector[method](criteria[i]);
  }

  return selector;
}

export function buildSelector(selector){
  
  selector = addMethods("withIds", this.ids, selector);
  selector = addMethods("withCondition", this.conditions, selector);

  return selector.forDateRange(this.dateRange)
    .withLimit(this.limits)
    .orderBy(this.orderBy);
}