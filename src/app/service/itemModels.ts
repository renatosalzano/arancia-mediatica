export interface BookItemModel {
  user_id: string;
  book_id: string;
  collection_id: string;
  timestamp?: number;
  year: string;
  file: any;
  image_url: string;
  description: string;
  author: string;
  title: string;
}

export interface MovieItemModel {
  user_id: string;
  movies_id: string;
  collection_id: string;
  timestamp?: number;
  year: string;
  file: any;
  image_url: string;
  description: string;
  author: string;
  title: string;
}
