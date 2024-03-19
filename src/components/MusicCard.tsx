import CardImage from "../assets/images/image-1.jpeg";
type MusicCardProps = {
  image?: string;
};

const MusicCard = ({ image }: MusicCardProps) => {
  return (
    <div>
      <div className="overflow-hidden rounded-xl mb-3 shadow-md">
        <img src={CardImage} alt="" className="object-cover w-full h-28" />
      </div>
      <p className="text-primary-500 font-semibold text-sm sm:text-base ">
        David Drake
      </p>
      <p className="text-primary-400 text-xs sm:text-sm">Jazz</p>
    </div>
  );
};

export default MusicCard;
