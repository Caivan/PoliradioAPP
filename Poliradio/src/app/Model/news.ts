export class news{
    title : string;
    content : string;
    excerpt : string;
    featured_media : string;
    loaded: boolean;
    
    constructor (title, content, excrept,featured_media){
        this.content = content;
        this.title = title;
        this.excerpt = excrept;
        this.featured_media = featured_media;
        this.loaded=false;
    }
}