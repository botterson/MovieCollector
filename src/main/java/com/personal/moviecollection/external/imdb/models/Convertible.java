package com.personal.moviecollection.external.imdb.models;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public interface Convertible<M> {

  M convert();

  default <E extends Convertible<M>, M> List<M> convert(List<E> list) {
    if(list == null || list.isEmpty()) {
      return Collections.emptyList();
    }

    return list.stream()
            .map(item -> item.convert())
            .collect(Collectors.toList());
  }
}
