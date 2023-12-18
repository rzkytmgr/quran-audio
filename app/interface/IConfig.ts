interface IConfigAuthor {
  fullname?: string;
  username?: string;
  link?: string;
}

export interface IConfig {
  host?: string;
  port?: string | number;
  title?: string;
  documentation?: string;
  repository?: string;
  author?: IConfigAuthor;
}
