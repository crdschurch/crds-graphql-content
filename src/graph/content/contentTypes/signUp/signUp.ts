import { ContentUtils } from "../../content_utils";
import Content from "../../content.base";

export default class SignUpForm extends Content {
  public body: string;
  public type: string;
  public opportunityId: number;
  public groupId: number;
  public existingMemberContent: string;
  public successContent: string;
  public waitListContent: string;
  public waitListSuccessContent: string;
  public fullContent: string;
  public qualifiedUrl: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.body = fields.content;
    this.type = fields.pageType;
    this.opportunityId = fields.opportunity;
    this.groupId = fields.group;
    this.existingMemberContent = fields.existingMember;
    this.successContent = fields.sucess;
    this.waitListContent = fields.waitList;
    this.fullContent = fields.full;
    this.waitListSuccessContent = fields.waitSuccess;
    this.qualifiedUrl = `${process.env.CRDS_APP_CLIENT_ENDPOINT}${fields.url}`;
  }
}
