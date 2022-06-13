package com.personal.moviecollection.exceptions;

public class ItemAlreadyExistsException extends RuntimeException {
  public ItemAlreadyExistsException() {
    super();
  }
  public ItemAlreadyExistsException(String message, Throwable cause) {
    super(message, cause);
  }
  public ItemAlreadyExistsException(String message) {
    super(message);
  }
  public ItemAlreadyExistsException(Throwable cause) {
    super(cause);
  }
}
