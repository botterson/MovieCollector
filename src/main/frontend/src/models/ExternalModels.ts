import { BaseModel } from "./CommonModels";

export enum SearchType {
  TOP_MOVIES,
  TOP_SERIES,
  POPULAR_MOVIES,
  POPULAR_SERIES,
}

export interface RankingModel extends BaseModel {
  rank: string;
  rankUpDown: string;
  fullTitle: string;
  imDbRating: string;
  imDbRatingCount: string;
}
