import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Search from "antd/lib/input/Search";
import { FC, useState } from "react";
import SearchTable from "../../../components/search/regular/SearchTable";
import { QuickSearchModel } from "../../../models/PersonalModels";
import * as service from "../../../services/externalServices/ExternalService";

const SearchPage: FC<{}> = (props) => {
  const [searchText, setSearchText] = useState<string>();
  const [data, setData] = useState<QuickSearchModel[]>();

  const onSearch = (value: any) => {
    console.log("value=", value);

    service.searchByTitle(value).then((results) => setData(() => results));
  };

  return (
    <section>
      <h1 style={{ textAlign: "center", margin: "20px" }}>IMDB Search</h1>

      <Search
        key="search"
        placeholder="input search text"
        enterButton="Search"
        size="middle"
        onSearch={onSearch}
        allowClear
        style={{ margin: "15px 0" }}
      />
      <SearchTable data={data} />
    </section>
  );
};

export default SearchPage;
