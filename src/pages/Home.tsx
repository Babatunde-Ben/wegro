import MusicCard from "../components/MusicCard";
import MusicList from "../components/MusicList";
import BannerImage from "../assets/images/image-1.jpeg";
import TrendingIcon from "../assets/SVGs/search.svg?react";

const Home = () => {
  return (
    <div className=" px-5 md:px-10">
      <section className="overflow-hidden rounded-2xl w-full mb-10">
        <img
          src={BannerImage}
          alt=""
          className="object-cover w-full h-44 sm:h-56 md:h-64"
        />
      </section>
      <section className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <p className="flex items-center gap-2">
            <span className="text-blue-500">
              <TrendingIcon />
            </span>
            <span className="text-xl font-semibold text-primary-500">
              Trending
            </span>
          </p>
          <p className="flex items-center gap-2 text-blue-500 text-sm ">
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
      </section>
      <section>
        <div className="flex justify-between items-center mb-5">
          <p className="flex items-center gap-2">
            <span className="text-blue-500">
              <TrendingIcon />
            </span>
            <span className="text-xl font-semibold text-primary-500">
              Recommended
            </span>
          </p>
          <p className="flex items-center gap-2 text-blue-500 text-sm ">
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
      </section>
    </div>
  );
};

export default Home;
