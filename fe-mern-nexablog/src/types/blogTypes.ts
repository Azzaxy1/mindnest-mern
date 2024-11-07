interface IAuthor {
  uid: string;
  name: string;
}

export interface IBLog {
  _id: string;
  title: string;
  image: string;
  body: string;
  author: IAuthor;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Blog {
  title: string;
  image: string;
  body: string;
}
