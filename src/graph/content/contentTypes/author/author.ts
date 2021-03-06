import Content from "../../content.base";

export default class Author extends Content {
  public fullName: string;
  public summary: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    if (!fields) return;
    this.title = fields.full_name;
    this.summary = fields.summary;
    this.fullName = fields.full_name;
  }
}

export function getAuthors(authors: any): Author[] {
  if (!!!authors) return null;
  if (!authors.length) return [new Author(authors)];
  return authors.map((author) => new Author(author));
}
