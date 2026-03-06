import { useEffect, useState } from "react";
import AnimationCard from "./AnimationCard";
import axios from "axios";
import type { Animation } from "../../../types/animation";
import { Rating } from "@mui/material";

export default function FeaturedList() {
  const [animations, setAnimations] = useState<Animation[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimations() {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/animations/all-animations`);
        setAnimations(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimations();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 justify-center mx-4 my-4">
      <h1 className="text-4xl">Featured Animation</h1>
      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center w-full">
           <div className="w-[30rem] md2:w-[20rem] lg2:w-[12rem] aspect-[2/3] rounded-xl bg-zinc-800 animate-pulse" />
              <div className="h-4 w-40 mt-3 rounded bg-zinc-800/70 animate-pulse" />
              <div className="h-4 w-28 mt-2 rounded bg-zinc-800/70 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm2:grid-cols-2 md2:grid-cols-3 lg2:grid-cols-4">
          {animations.slice(0, 4).map((animation) => (
            <div key={animation.id} className="flex flex-col">
              <AnimationCard
                id={animation.id}
                imageURL={animation.imageURL}
                title={animation.title}
              />

              <p className="text-center text-white">{animation.title}</p>

              <div className="flex justify-center gap-2">
                <Rating
                  name="half-rating"
                  value={animation.ratingAvg}
                  precision={0.5}
                  readOnly
                  sx={{
                    "& .MuiRating-iconEmpty": {
                      color: "#666",
                    },
                  }}
                />

                <p className="text-sm text-gray-300">{animation.ratingAvg}</p>
                <p className="text-sm text-gray-300">
                  ({animation.ratingCount})
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
