"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import ImageCard from "./ImageCard";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";

interface Video {
  id: number;
  videoId: string;
}

interface ApiResponse {
  id: number;
  acf: {
    id?: string;
  };
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const t = useTranslations("Hero");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://store.maator.com/wp-json/wp/v2/videos?acf_format=standard&_fields=id,acf.id"
        );
        const data: ApiResponse[] = await response.json();

        const videosData = data.slice(0, 3).map((post) => ({
          id: post.id,
          videoId: post.acf?.id || "",
        }));

        setVideos(videosData);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const backgroundColor = theme === "dark" ? "#0E0B0B" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
  const buttonBackground = theme === "dark" ? "#FFFFFF" : "#000000";
  const buttonTextColor = theme === "dark" ? "#000000" : "#FFFFFF";
  const buttonBorderColor = theme === "dark" ? "#FFFFFF" : "#000000";

  const locale = useLocale();

  return (
    <div
      className="overflow-hidden px-4 md:px-10"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="text-center mb-2">
        <h2 className="text-3xl lg:text-4xl !mb-4 font-extrabold text-gray-800 dark:text-white tracking-wide relative inline-block">
          <span className="relative z-10">{t("videoTitle")}</span>
          <span className="absolute left-1/2 -bottom-[0.5rem] transform -translate-x-1/2 w-3/4 h-1 bg-[#B91C1C] rounded-full opacity-70"></span>
        </h2>
        <p className="text-gray-500 dark:text-white text-sm sm:text-base">
          {t("videoSubtitle")}
        </p>
      </div>

      {/* Videos Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-5 mt-10">
        {videos.length === 0 ? (
          <div className="text-center text-xl">No videos available.</div>
        ) : (
          videos.map((video) => (
            <div key={video.id} className="relative">
              <LiteYouTubeEmbed id={video.videoId} title="Video Preview" />
            </div>
          ))
        )}
      </div>

      {/* Button Section */}
      <div className="flex justify-center items-center pb-10">
        <Link href={`/${locale}/videos`} passHref>
          <button
            className="inline-block px-6 py-2 mt-6 uppercase tracking-wide rounded-lg transition duration-200 text-xl"
            style={{
              backgroundColor: buttonBackground,
              color: buttonTextColor,
              border: `1px solid ${buttonBorderColor}`,
            }}
          >
            {t("showMore")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Videos;
