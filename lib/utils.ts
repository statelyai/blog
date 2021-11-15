import matter from "gray-matter";
import { Post } from "../src/types";

export const formatDate = (date: Intl.DateTimeFormatPart[]): string => {
  return [
    date.find((item) => item.type === "year")!.value,
    date.find((item) => item.type === "month")!.value,
    date.find((item) => item.type === "day")!.value,
  ].join("-");
};

export const makeFrontmatterFromPost = (post: Post): string => {
  return matter.stringify("Here goes the content of your post", post);
};

export const makeSetFromArray = <T>(array: T[]) => Array.from(new Set(array));
