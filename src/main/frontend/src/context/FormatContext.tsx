import React, { FC, useCallback, useEffect, useState } from "react";
import { FormatModel } from "../models/CommonModels";
import * as personalServices from "../services/personalServices/PersonalService";

interface IFormatContext {
  formats: FormatModel[];
  // findById: (id: React.Key) => FormatModel[];
}

const FormatContext = React.createContext<IFormatContext>({
  formats: [],
  // findById: (id: React.Key) => {},
});

export const FormatProvider: FC<{ children: any }> = (props) => {
  const [data, setData] = useState<FormatModel[]>([]);
  useEffect(() => {
    loadFormatTypes().then((data) => setData(() => data));
  }, []);

  return (
    <FormatContext.Provider
      value={{
        formats: data,
        // findById: (id: React.Key) => data.find((item) => item.id === id),
      }}
    >
      {props.children}
    </FormatContext.Provider>
  );
};

const loadFormatTypes = async () => {
  return await personalServices.getAllVideoFormats();
};

export default FormatContext;
