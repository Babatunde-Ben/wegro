interface StringCarouselProps {
  text: string | undefined;
  maxLength: number;
}

const StringCarousel = ({ text, maxLength }: StringCarouselProps) => {
  const isOverflowing = (text?.length ?? 0) > maxLength;

  return (
    <p className=" w-full">
      <span
        className={` whitespace-nowrap inline-block ${
          isOverflowing && "animate-infinite-scroll"
        }`}
      >
        {text}
      </span>
    </p>
  );
};

export default StringCarousel;
