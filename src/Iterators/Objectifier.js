import Iterator from "./Iterator";

export default class Objectify extends Iterator {
  
  constructor(o) {
    super(o);
  }
  
  build(child, inherit) {
    
    let output = [];
    
    this.run( () => {
      
      let arr = [], i = 0, children = this.item[child]();
      
      if (inherit === true) {
        children = this._add(children, "withIds", this.props.ids);
        children = this._add(children, "withCondition", this.props.conditions)
          .forDateRange(this.props.dateRange)
          .withLimit(this.props.limit)
          .orderBy(this.props.order);
      }
      
      children = children.get();
      
      while (children.hasNext()) {
        
        let thing = children.next();
        let stats = thing.getStatsFor(this.props.dateRange);
        let obj = {
          dateRange: this.props.dateRange,
          campaignName: thing.getCampaign().getName(),
          clicks: stats.getClicks(),
          conversions: stats.getConversions(),
          conversionRate: stats.getConversionRate(),
          ctr: stats.getCtr(),
          id: thing.getId(),
          impressions: stats.getImpressions(),
          type: thing.getEntityType()
        };
        
        if (obj.type === "AdGroup" || obj.type === "Campaign") {
          obj.name = thing.getName();
        } else if (obj.type === "Keyword") {
          obj.text = thing.getText();
          obj.adGroupName = thing.getAdGroup().getName();
        } else if (obj.type === "Ad") {
          obj.adType = thing.getType();
          obj.adGroupName = thing.getAdGroup().getName();
          obj.adGroupId = thing.getAdGroup().getId();

          if (obj.adType === "EXPANDED_TEXT_AD") {
            obj.headline1 = thing.getHeadlinePart1();
            obj.headline2 = thing.getHeadlinePart2();
            obj.description = thing.getDescription();
            obj.path1 = thing.getPath1();
            obj.path2 = thing.getPath2();
          }
        }

        arr.push(obj);
      }
      
      output.push(arr);
    });
    
    return output;
  }
}