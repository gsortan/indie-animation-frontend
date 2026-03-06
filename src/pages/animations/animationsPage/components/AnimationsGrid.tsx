import type { Animation } from "../../../../types/animation";
import AnimationCard from "../../../home/components/AnimationCard";
import { Rating } from "@mui/material";

export default function AnimationsGrid({ anims }: { anims: Animation[] }) {
  return (
    <div className="max-w-7xl grid gap-4 grid-cols-1 xs:grid-cols-1 sm2:grid-cols-2 md2:grid-cols-3 lg2:grid-cols-4 mr-8">
      {anims.map((anim) => (
        <div key={anim.id} className="flex items-center flex-col">
          <AnimationCard
            id={anim.id}
            imageURL={anim.imageURL}
            title={anim.title}
            clickable={true}
            width="25rem"
          />
          <p className="text-white text-center">{anim.title}</p>
          <div className="flex items-center gap-2">
            <Rating
              name="half-rating"
              value={anim.ratingAvg}
              precision={0.5}
              readOnly
              sx={{ "& .MuiRating-iconEmpty": { color: "#666" } }}
            />
            <p className="text-sm text-gray-300">{anim.ratingAvg}</p>
            <p className="text-sm text-gray-300">({anim.ratingCount})</p>
          </div>
        </div>
      ))}
    </div>
  );
}