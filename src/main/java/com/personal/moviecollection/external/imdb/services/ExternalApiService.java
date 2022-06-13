package com.personal.moviecollection.external.imdb.services;

import com.personal.moviecollection.constants.OtherSearchTypeEnum;
import com.personal.moviecollection.constants.SearchTypeEnum;
import com.personal.moviecollection.external.imdb.models.ExtMovie;
import com.personal.moviecollection.external.imdb.models.ExtPopularResult;
import com.personal.moviecollection.external.imdb.models.ExtSearchResult;

import java.util.List;

public interface ExternalApiService {

  ExtMovie findDetailById(String id);

  List<ExtSearchResult> search(String title, SearchTypeEnum searchType);

  List<ExtPopularResult> rankingSearch(OtherSearchTypeEnum searchType);
}
