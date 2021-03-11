import Content from "../../content.base";

export default class EngagementBlock extends Content {
  public targetUrl: string;
  public tooltipEarnedContent: string;
  public tooltipUnearnedContent: string;
  public disabled: boolean;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.title = fields.title;
    this.targetUrl = fields.target_url;
    this.tooltipEarnedContent = fields.tooltip_earned_content;
    this.tooltipUnearnedContent = fields.tooltip_unearned_content;
    this.disabled = fields.disabled;
  }
}
