import Image from "next/image";

interface ImageCardProps {
  imgSrc: string;
}

const ImageCard = ({ imgSrc }: ImageCardProps) => {
  return (
    <div className="mt-[2vh] flex justify-center relative">
      <Image src={imgSrc} alt="gallery" width={600} height={30} />
    </div>
  );
};

export default ImageCard;
