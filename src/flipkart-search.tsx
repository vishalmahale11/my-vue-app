import { useState } from "react";
import { products } from "./data.json";

let id: ReturnType<typeof setTimeout> | undefined = undefined;
const FlipkartSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterData, setFilterData] = useState<typeof products>();
  const [isThrottle, setIsThrottle] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    // debounce(value);
  };

  const debounce = (value: string) => {
    clearTimeout(id);
    id = setTimeout(() => {
      const filterResult = products?.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilterData(filterResult);
    }, 1000);
  };

  const handleSearch = () => {
    if (!isThrottle) {
      throttle(searchValue);
      setIsThrottle(true);
      setTimeout(() => {
        setIsThrottle(false);
      }, 2000);
    }
  };

  const throttle = (searchValue: string) => {
    const filterResult = products?.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterData(filterResult);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      setFilterData([]);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="searh"
          onChange={handleChange}
          value={searchValue}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} disabled={isThrottle}>
          Search
        </button>
      </div>
      <div>
        {filterData?.map((item) => {
          return (
            <div>
              <p>{item?.name || ""}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlipkartSearch;
