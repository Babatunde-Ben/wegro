import CardImage from "../assets/images/image-1.jpeg";
type MusicCardProps = {
  image?: string;
};

const MusicCard = ({ image }: MusicCardProps) => {
  return (
    <div>
      <div className="overflow-hidden rounded-lg">
        <img src={CardImage} alt="" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default MusicCard;
