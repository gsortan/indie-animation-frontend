import type { Tag } from "./tag";
import type { Creator } from "./creator";

export type Animation = {
  id: number;
  title: string;
  imageURL: string;
  format: string;
  runtime: number;
  episodeCount: number;
  description:  string;
  creatorName: string;
  creatorList: Creator[];
  releaseDate: string;
  platforms: string[];
  ratingAvg: number;
  ratingCount:number;
  tags:Tag[];

};