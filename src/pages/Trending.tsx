import MusicList from "../components/MusicList";
import TrendingIcon from "../assets/SVGs/hash-tag.svg?react";

const Trending = () => {
  return (
    <section className=" px-5 min-h-screen md:px-10">
      <div className="flex justify-between items-center mb-5">
        <p className="flex items-center gap-2">
          <span className="text-blue-500">
            <TrendingIcon />
          </span>
          <span className="text-xl font-semibold text-primary-500">
            Trending
          </span>
        </p>
      </div>

      <div className="">
        <MusicList isActive={false} />
        <MusicList isActive={true} />
        <MusicList isActive={false} />
        <MusicList isActive={false} />
        <MusicList isActive={false} />
        <MusicList isActive={false} />
        <MusicList isActive={false} />
      </div>
    </section>
  );
};

export default Trending;
