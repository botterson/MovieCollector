import React from "react";
import { FormatModel } from "../../models/CommonModels";
import {
  DetailMovie,
  PersonalModel,
  QuickSearchModel,
} from "../../models/PersonalModels";

export const getAllMovies = async (): Promise<PersonalModel[]> => {
  const url = "http://localhost:8080/api/v1/personal/all";
  console.log("getAllMovies: url=", url);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await response.json();
  console.log("getAllMovies: data=", data);

  return data.map((item: any) => ({
    id: item.id,
    key: item.imdbId,
    type: item.type,
    title: item.title,
    format: item.formatList, //item.formatList.map((f: any) => f.format).join(", "),
    crew: item.actorList
      .splice(0, 4)
      .map((a: any) => a.name)
      .join(", "),
    imDbRating: item.imDbRating,
    imDbRatingCount: item.imDbRatingVotes,
  }));
};

export const getMovieById = async (id: React.Key): Promise<DetailMovie> => {
  const url = `http://localhost:8080/api/v1/personal/movie/${id}`;
  console.log("getMovieById: url=", url);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await response.json();
  console.log("getMovieById: data=", data);

  return {
    key: data.id,
    image: data.image,
    title: data.title,
    year: data.year,
    crew: data.crew,
    formatList: data.formatList,
    type: data.type,
    releaseDate: data.releaseDate,
    runtimeMins: data.runtimeMins,
    runtimeStr: data.runtimeStr,
    plot: data.plot,
    awards: data.awards,
    directorList: data.directorList,
    writerList: data.writerList,
    actorList: data.actorList.map((actor: any) => ({
      id: actor.id,
      name: actor.name,
      asCharacter: getCharacterName(actor.asCharacter),
    })),
    genreList: data.genreList,
    companyList: data.companyList,
    languages: data.languages,
    contentRating: data.contentRating,
    imDbRating: data.imDbRating,
    imDbRatingCount: data.imDbRatingCount,
    boxOffice: data.boxOffice,
    keywords: data.keywords,
    tvSeriesInfo: data.tvSeriesInfo,
  };
};

export const getAllVideoFormats = async (): Promise<FormatModel[]> => {
  const url = `http://localhost:8080/api/v1/personal/all/formats`;
  console.log("getAllVideoFormats: url=", url);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await response.json();
  console.log("getAllVideoFormats: data=", data);

  return data;
};

const getCharacterName = (asCharacter: string) => {
  const asCharArray = asCharacter.split(" ");
  const asCharEnglish = asCharArray.length / 2;

  const englishChar = asCharArray.splice(
    asCharArray.length - asCharEnglish,
    asCharArray.length
  );
  return englishChar.join(" ");
};

export const search = async (query: string): Promise<QuickSearchModel[]> => {
  const url = `http://localhost:8080/api/v1/personal/search/${query}`;
  console.log("search: url=", url);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await response.json();
  console.log("search: data=", data);

  return data;
};

export const addToCollection = async (values: any): Promise<DetailMovie> => {
  const url = `http://localhost:8080/api/v1/personal/movie/addToCollection`;
  console.log("addToCollection: url=", url);

  const item = {
    imdbId: values.key,
    formats: values.format,
  };

  const body = JSON.stringify(item);
  console.log("addToCollection: body=", body);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  });

  const data = await response.json();
  console.log("addToCollection: data=", data);

  if (!response.ok) {
    return Promise.reject(data.message);
    // throw Error(data.message);
  }

  return data;
};

export const updateFormat = async (
  id: React.Key,
  formatIds: number[]
): Promise<PersonalModel> => {
  if (!id || !formatIds) {
    console.error("updateFormat: id=", id, "; Formats=", formatIds);
    return Promise.reject("Id and Format are required!");
  }

  const url = "http://localhost:8080/api/v1/personal/movie/updateFormat";
  console.log("updateFormat: url=", url);

  const bodyJSON = { id: id, formats: formatIds };
  console.log("bodyJSON=", bodyJSON);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyJSON),
  });

  const data = await response.json();
  console.log("saveItem: data=", data);

  return {
    id: data.id,
    key: data.imdbId,
    type: data.type,
    title: data.title,
    format: data.formatList, //item.formatList.map((f: any) => f.format).join(", "),
    crew: data.actorList
      .splice(0, 4)
      .map((a: any) => a.name)
      .join(", "),
    imDbRating: data.imDbRating,
    imDbRatingCount: data.imDbRatingVotes,
  };
};

export const saveItem = async (movie: DetailMovie): Promise<DetailMovie[]> => {
  const url = "http://localhost:8080/api/v1/personal/movie";
  console.log("saveItem: url=", url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(movie),
  });

  const data = await response.json();
  console.log("saveItem: data=", data);

  return data;
};

export const deleteItem = async (id: React.Key): Promise<PersonalModel[]> => {
  const url = `http://localhost:8080/api/v1/personal/movie/${id}`;
  console.log("deleteItem: url=", url);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.error("DELETE FAILED!!!");
    return Promise.reject("Delete failed for " + id);
  }

  return getAllMovies();
};
