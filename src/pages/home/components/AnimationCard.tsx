import { Link } from "react-router-dom";
import type { AnimationCardProps } from "../../../types/animationCardProps";
export default function AnimationCard({
  id,
  imageURL,
  title,
  clickable = true,
}: AnimationCardProps) {
  const imgContent = (
  
      <img src={imageURL} alt={title} className="h-full w-full object-cover" />
   
  );
  console.log(clickable);
  return clickable ? (
    <Link to={`/animations/${id}`} className="cursor-pointer block w-full max-w-[30rem] md2:w-[20rem] lg2:w-[12rem] aspect-[2/3]">
      {imgContent}
      
    </Link>
  ) : (
    <div className="cursor-default h-[32rem] w-[20rem]">{imgContent}</div>
  );
}
