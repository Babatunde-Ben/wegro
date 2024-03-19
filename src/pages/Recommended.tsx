import MusicList from "../components/MusicList";
import RecommendedIcon from "../assets/SVGs/recommended.svg?react";

const Recommended = () => {
  return (
    <section className=" px-5 min-h-screen md:px-10">
      <div className="flex justify-between items-center mb-5">
        <p className="flex items-center gap-2">
          <span className="text-blue-500">
            <RecommendedIcon />
          </span>
          <span className="text-xl font-semibold text-primary-500">
            Recommended For You
          </span>
        </p>
      </div>

      <div className="">
        <MusicList isActive={false} />
        <MusicList isActive={true} />
        <MusicList isActive={false} />
      </div>
    </section>
  );
};

export default Recommended;
