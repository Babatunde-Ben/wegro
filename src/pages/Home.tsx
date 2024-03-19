import MusicCard from "../components/MusicCard";
import MusicList from "../components/MusicList";
import BannerImage from "../assets/images/image-1.jpeg";
import TrendingIcon from "../assets/SVGs/search.svg?react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className=" px-5 md:px-10">
      <div className="overflow-hidden rounded-2xl w-full mb-10">
        <img
          src={BannerImage}
          alt=""
          className="object-cover w-full h-44 sm:h-56 md:h-64"
        />
      </div>
      <div className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <p className="flex items-center gap-2">
            <span className="text-blue-500">
              <TrendingIcon />
            </span>
            <span className="text-xl font-semibold text-primary-500">
              Trending
            </span>
          </p>
          <p
            onClick={() => navigate("/trending")}
            className="flex items-center gap-2 cursor-pointer text-blue-500 text-sm "
          >
            <span className=" font-semibold capitalize">show more</span>{" "}
            <span>
              <TrendingIcon className="w-4" />
            </span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 ">
          <MusicCard />
          <MusicCard />
          <MusicCard />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-5">
          <p className="flex items-center gap-2">
            <span className="text-blue-500">
              <TrendingIcon />
            </span>
            <span className="text-xl font-semibold text-primary-500">
              Recommended For You
            </span>
          </p>
          <p
            onClick={() => navigate("/recommended")}
            className="flex items-center gap-2 cursor-pointer text-blue-500 text-sm "
          >
            <span className=" font-semibold capitalize">show more</span>{" "}
            <span>
              <TrendingIcon className="w-4" />
            </span>
          </p>
        </div>

        <div className="">
          <MusicList isActive={false} />
          <MusicList isActive={true} />
          <MusicList isActive={false} />
        </div>
      </div>
    </section>
  );
};

export default Home;
