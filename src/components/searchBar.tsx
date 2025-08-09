import Input from "../components/input";
import { IoClose } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import type { SearchBarCompProps } from "./types";

export default function SearchBar({
  searchedText,
  setSearchedText,
  handleSearch,
  placeholder,
  onKeyDown,
}: SearchBarCompProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(event.target.value);
  };

  return (
    <div className="searchBar relative flex-1">
      <IoIosSearch
        onClick={handleSearch}
        className={`text-primary size-8 absolute top-0 left-0 translate-y-[35%] translate-x-2 cursor-pointer hover:text-primary transition duration-200 active:scale-[1.05]`}
      />
      <Input
        name="searchBar"
        onChange={handleInputChange}
        placeholder={placeholder || "Search"}
        type="text"
        value={searchedText}
        inputTailwindUtilities="bg-brand_white focus:ring-transparent focus:shadow-lg !text-brand_text_primary pl-[3rem] pr-[2.2rem] peer/searchBar"
        onKeyDown={onKeyDown}
      />
      <IoClose
        onClick={() => setSearchedText("")}
        className={`text-primary size-7 absolute top-0 right-0 translate-y-[45%] -translate-x-2 cursor-pointer hover:text-primary transition duration-200 peer-focus/searchBar:block ${
          searchedText !== "" ? "block" : "hidden"
        }`}
      />
    </div>
  );
}
