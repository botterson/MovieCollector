package com.personal.moviecollection.exceptions;

public class ExceededMaxUsageException extends RuntimeException {
  public ExceededMaxUsageException() {
    super();
  }
  public ExceededMaxUsageException(String message, Throwable cause) {
    super(message, cause);
  }
  public ExceededMaxUsageException(String message) {
    super(message);
  }
  public ExceededMaxUsageException(Throwable cause) {
    super(cause);
  }

}
