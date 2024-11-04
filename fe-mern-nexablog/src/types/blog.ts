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

// export interface BlogItemProps {
//   blog: {
//     image: string;
//     title: string;
//     author: string;
//     date: string;
//     body: string;
//   };
// }
