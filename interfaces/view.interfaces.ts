export interface Search {
  query: string;
  page: number;
}

export interface GifObject {
  originalUrl: string;
  previewUrl: string;
  id: string;
  title: string;
  originalHeight:number
  originalWidth:number
  mp4Url:string
}
