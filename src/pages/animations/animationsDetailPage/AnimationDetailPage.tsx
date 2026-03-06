import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Animation } from "../../../types/animation";
import axios from "axios";
import AnimationCard from "../../home/components/AnimationCard";
import Rating from "@mui/material/Rating";

export default function AnimationDetailPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [animation, setAnim] = useState<Animation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimation() {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/animations/${id}`);
        setAnim(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimation();
  }, [id, API_URL]);

  function convertDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function handleTagClick(tagId: number) {
    navigate(`/animations?tags=${tagId}&page=1`);
  }

if (loading) {
  return (
    <div className="text-white">
      <div className="grid my-8 ml-4 grid-cols-1 md:grid-cols-[24.6rem_0.95fr] gap-4">
        <div className="justify-self-center self-start">
          <div className="cursor-default h-[32rem] w-[20rem] rounded-xl bg-zinc-800 animate-pulse" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="h-10 w-3/4 rounded bg-zinc-800 animate-pulse" /> 
          <div className="h-4 w-1/2 rounded bg-zinc-800/80 animate-pulse" /> 
          <div className="space-y-2 mt-2">
            <div className="h-4 w-full rounded bg-zinc-800/70 animate-pulse" />
            <div className="h-4 w-11/12 rounded bg-zinc-800/70 animate-pulse" />
            <div className="h-4 w-10/12 rounded bg-zinc-800/70 animate-pulse" />
            <div className="h-4 w-9/12 rounded bg-zinc-800/70 animate-pulse" />
          </div>

          <div className="h-4 w-2/3 rounded bg-zinc-800/80 animate-pulse mt-2" /> 
          <div className="h-4 w-1/3 rounded bg-zinc-800/80 animate-pulse" /> 

         
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-7 w-20 rounded-full bg-zinc-800/70 animate-pulse" />
            ))}
          </div>

          <div className="h-4 w-1/3 rounded bg-zinc-800/80 animate-pulse mt-2" /> 
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-7 w-24 rounded-full bg-zinc-800/70 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <>
      {animation && (
        <div className="text-white">
          <div className="grid my-8 ml-4 grid-cols-1 md:grid-cols-[24.6rem_0.95fr] gap-4">
            <div className="justify-self-center self-start">
              <AnimationCard
                id={animation.id}
                imageURL={animation.imageURL}
                title={animation.title}
                clickable={false}
              />
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="font-semibold text-4xl">{animation.title}</h1>

              <div className="flex gap-3 text-sm items-center">
                <p>{convertDate(animation.releaseDate)}</p>
                <span>•</span>
                <p>{animation.format}</p>
                {animation.episodeCount && (
                  <>
                    <span>•</span>
                    <p>{animation.episodeCount} episode(s)</p>
                  </>
                )}
              </div>

              <p>{animation.description}</p>

              <p>
                Created by:{" "}
                {animation.creatorList.map((c) => c.name).join(", ")}
              </p>

              <p>Available platforms:</p>
              <div className="flex flex-wrap gap-2">
                {animation.platforms.map((platform, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-600 rounded-full"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <p>Rating:</p>

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

              <p>Tags:</p>

              <div className="flex flex-wrap gap-3">
                {animation.tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => handleTagClick(tag.id)}
                    className="px-3 py-1 bg-gray-600 rounded-full 
                               hover:bg-blue-500 hover:scale-105 
                               transition-all duration-200 
                               cursor-pointer"
                  >
                    {tag.tagName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
