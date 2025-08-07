import { useState } from "react";
import Header from "../../components/header";
import SearchBar from "../../components/searchBar";

const Goods = () => {
  const [searchedText, setSearchedText] = useState("");

  const handleSearch = async () => {};

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold text-default-text pt-10 pl-10">
        Продукты
      </h1>
      <SearchBar
        searchedText={searchedText}
        setSearchedText={setSearchedText}
        handleSearch={handleSearch}
        placeholder="Ищите Товар"
      />
    </div>
  );
};

export default Goods;
