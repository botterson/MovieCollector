import { RankingModel, SearchType } from "../../models/ExternalModels";
import { DetailMovie, QuickSearchModel } from "../../models/PersonalModels";

export const getMovieById = async (id: React.Key): Promise<DetailMovie> => {
  const url = `http://localhost:8080/api/v1/external/all/detail/${id}`;
  console.log("getMovieById: url=", url);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await response.json();
  console.log("getMovieById: data=", data);

  return data;
};

export const searchByTitle = async (
  title: string
): Promise<QuickSearchModel[]> => {
  const url = `http://localhost:8080/api/v1/external/search/title/${title}`;
  console.log("search: url=", url);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await response.json();
  console.log("search: data=", data);

  // return data;
  return data.map((item: any) => ({
    key: item.id,
    image: item.image,
    title: item.title,
    description: item.description,
  }));
};

export const performTopSearch = async (
  type: SearchType
): Promise<RankingModel[]> => {
  let url = "";

  switch (type) {
    case SearchType.POPULAR_MOVIES: {
      url = "http://localhost:8080/api/v1/external/movies/popularMovies";
      break;
    }
    case SearchType.POPULAR_SERIES: {
      url = "http://localhost:8080/api/v1/external/series/popularSeries";
      break;
    }
    case SearchType.TOP_MOVIES: {
      url = "http://localhost:8080/api/v1/external/movies/topMovies";
      break;
    }
    case SearchType.TOP_SERIES: {
      url = "http://localhost:8080/api/v1/external/series/topSeries";
      break;
    }
    default: {
      throw Error("Unknown Search Type: " + type);
    }
  }

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await response.json();
  console.log("topMovieSearch: data=", data);

  if (data.message) {
    throw new Error(data.message);
  }

  return data.map((item: any) => ({
    key: item.id,
    image: item.image,
    title: item.title,
    rank: item.rank,
    rankUpDown: item.rankUpDown,
    fullTitle: item.fullTitle,
    year: item.year,
    crew: item.crew,
    imDbRating: item.imDbRating,
    imDbRatingCount: item.imDbRatingCount,
  }));
};
