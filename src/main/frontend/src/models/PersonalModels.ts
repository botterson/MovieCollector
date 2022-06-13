import React from "react";
import { BaseModel, FormatModel } from "./CommonModels";

export enum FORMAT_TYPE {
  DVD,
  BLURAY,
  BLURAY_4K,
  DIGITAL,
}

export interface PersonalModel extends BaseModel {
  type: string;
  format: FormatModel[];
  imDbRating: string;
  imDbRatingCount: string;
  metacriticRating?: string;
}

export interface QuickSearchModel extends BaseModel {
  resultType: string;
  description: string;
}

export interface ListItem {
  id: React.Key;
  name: string;
}

export interface ActorListItem extends ListItem {
  asCharacter: string;
}

export interface DirectorListItem extends ListItem {
  title: string;
}

export interface WriterListItem extends ListItem {
  title: string;
}

export interface CompanyListItem extends ListItem {}

export interface GenreListItem extends ListItem {
  key: string;
  value: string;
}

export interface BoxOffice {
  budget: string;
  cumulativeWorldwideGross: string;
  grossUSA: string;
  id: React.Key;
  imdbId: string;
  openingWeekendUSA: string;
}

export interface DetailMovie extends BaseModel {
  originalTitle?: string;
  fullTitle?: string;
  formatList: { id: string; value: string }[];
  type: string;
  releaseDate: string;
  runtimeMins: string;
  runtimeStr: string;
  plot: string;
  awards: string;
  directorList: DirectorListItem[];
  writerList: WriterListItem[];
  actorList: ActorListItem[];
  genreList: GenreListItem[];
  companyList: CompanyListItem[];
  languages: string;
  contentRating: string;
  imDbRating: string;
  imDbRatingCount: string;
  ratings?: string;
  posters?: string;
  images?: string;
  boxOffice: BoxOffice;
  keywords?: string;
  tvSeriesInfo?: string;
  errorMessage?: string;
}
