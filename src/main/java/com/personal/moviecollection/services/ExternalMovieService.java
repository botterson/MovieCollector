package com.personal.moviecollection.services;

import com.personal.moviecollection.constants.OtherSearchTypeEnum;
import com.personal.moviecollection.constants.SearchTypeEnum;
import com.personal.moviecollection.models.Movie;
import com.personal.moviecollection.models.RankingSearchResult;
import com.personal.moviecollection.models.SearchResult;

import java.util.List;

public interface ExternalMovieService {

  Movie findDetailById(String id);

  List<SearchResult> search(String name, SearchTypeEnum searchType);

  List<RankingSearchResult> rankingSearch(OtherSearchTypeEnum searchType);

}
