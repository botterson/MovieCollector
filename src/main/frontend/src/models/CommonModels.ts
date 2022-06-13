import React from "react";

export interface BaseModel {
  id?: React.Key;
  key?: React.Key;
  image?: string;
  title?: string;
  year?: string;
  crew?: string;
}

export interface FormatModel {
  id: React.Key;
  value?: string;
  // format: string;
}
