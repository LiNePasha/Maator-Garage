"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import ImageCard from "./ImageCard";
// import notFound from "@/app/not-found";

interface Video {
  id: number;
  videoId: string;
}

const VideosSection = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const url = `https://store.maator.com/wp-json/wp/v2/videos?acf_format=standard&_fields=id,acf.id&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 404) {
          // Handle not found case if needed
          setVideos([]);
          setMaxPages(0);
          setIsLoading(false);
          return;
        }

        const totalPages = Number(response.headers.get("X-WP-TotalPages"));

        const videosData = data.map((post: any) => ({
          id: post.id,
          videoId: post.acf?.id || "",
        }));

        setVideos(videosData);
        setMaxPages(totalPages); // Don't forget to define setMaxPages in state
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [page]);

  const changePage = (newPage: number) => {
    if (newPage === 1 || newPage === 2) {
      setPage(newPage);
    }
  };

  const backgroundColor = theme === "dark" ? "#0E0B0B" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
  const imageSource = theme === "dark" ? "/Videos.png" : "/videosLight.png";

  return (
    <div
      className="min-h-screen overflow-hidden px-4 md:px-10"
      style={{ backgroundColor, color: textColor }}
    >
      <div>
        {/* <ImageCard imgSrc={imageSource} /> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-5 mt-10">
        {isLoading ? (
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 animate-pulse h-48 w-full rounded-md"
              ></div>
            ))
        ) : videos.length === 0 ? (
          <div className="text-center text-xl">No videos available.</div>
        ) : (
          videos.map((video) => (
            <div key={video.id} className="relative">
              <LiteYouTubeEmbed
                id={video.videoId}
                title={`Video ${video.id}`}
              />
            </div>
          ))
        )}
      </div>
      <div
        className="flex items-center justify-center mt-8 mb-4 space-x-4"
        dir="ltr"
      >
        <button
          onClick={() => changePage(page - 1)}
          disabled={page === 1}
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            page === 1
              ? "opacity-50 cursor-not-allowed bg-gray-500"
              : "bg-primary text-white hover:opacity-80"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {Array.from({ length: maxPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => changePage(i + 1)}
            disabled={page === i + 1}
            className={`text-xl relative ${
              page === i + 1
                ? "font-bold after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary"
                : "hover:text-gray-400"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => changePage(page + 1)}
          disabled={page === maxPages}
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            page === 2
              ? "opacity-50 cursor-not-allowed bg-gray-500"
              : "bg-primary text-white hover:opacity-80"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 001.414 0l4-4a1 1 0 000-1.414l-4-4a1 1 0 10-1.414 1.414L10.586 10l-3.293 3.293a1 1 0 000 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VideosSection;
