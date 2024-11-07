interface CreateBlogState {
  form: {
    title: string;
    body: string;
    image: string | null;
  };
}

export type { CreateBlogState };
