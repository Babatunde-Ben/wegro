import { useState } from "react";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  return <div>Home</div>;
};

export default Home;
