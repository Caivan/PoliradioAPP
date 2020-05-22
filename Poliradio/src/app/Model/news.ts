export class news{
    title : string;
    content : string;
    excerpt : string;
    _links : string;

    constructor (title, content, excrept, _links){
        this.content = content;
        this.title = title;
        this.excerpt = excrept;
        this._links = _links;
    }
}