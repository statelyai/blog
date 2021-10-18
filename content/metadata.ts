interface Author {
  name: string;
  twitterHandle: string;
}

const authors: Author[] = [
  {
    name: "Farzad Yousefzadeh",
    twitterHandle: "farzad_yz",
  },
  {
    name: "Laura Kalbag",
    twitterHandle: "laurakalbag",
  },
  { name: "Andarist", twitterHandle: "andarist" },
  { name: "David K.🎹", twitterHandle: "DavidKPiano" },
];

const blogInfo = {
  url: "https://stately.ai/blog",
  title: "Stately.ai engineering blog",
  description: "The official Stately.ai engineering blog",
};

export { authors, blogInfo };
