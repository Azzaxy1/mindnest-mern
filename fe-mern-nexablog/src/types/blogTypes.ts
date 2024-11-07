interface IAuthor {
  uid: string;
  name: string;
}

export interface IBLog {
  title: string;
  image: string;
  body: string;
  author: IAuthor;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  title: string;
  image: string;
  body: string;
}
