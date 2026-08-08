declare module '@/data/blog.json' {
  interface Post {
    id: string;
    slug: string;
    title: string;
    description: string;
    author: string;
    authorImage: string;
    bannerImage: string;
    publishedDate: string;
    readTime: number;
    tags: string[];
    content: string;
  }

  interface Tag {
    id: string;
    name: string;
    enabled: boolean;
  }

  interface Blog {
    heroImage: string;
    heading: string;
    subheading: string;
    posts: Post[];
    tags: Tag[];
  }

  interface BlogData {
    blog: Blog;
  }

  const data: BlogData;
  export default data;
}