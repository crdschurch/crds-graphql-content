import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";
import Author, { getAuthors } from "../author/author";

export default class Perpective extends Content {
    public authors: Author[];
    public date: string;
    constructor(entry) {
        super(entry);

        var fields = entry.fields;
        this.authors = getAuthors(fields.author);

        this.description = fields.body.substring(0, fields.body.indexOf('\n\n') || fields.body.indexOf('\n'));
    }
}

