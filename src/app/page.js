"use client"
import { useEffect, useState } from 'react';
import { getFirebaseVideoUrl, getFirebaseSubtitleUrl } from '@/lib/uploadingFeatures';

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/video');
        if (!response.ok) {
          throw new Error('Failed to fetch video data');
        }

        const data = await response.json();

        // Assuming the response is an array of objects with 'video_key' and 'subtitle_key' properties
        const videoList = await Promise.all(
          data.map(async (item) => {
            const videoUrl = await getFirebaseVideoUrl(item.video_key);
            const subtitleUrl = await getFirebaseSubtitleUrl(item.subtitle_key);

            return {
              videoKey: item.video_key,
              videoUrl,
              subtitleKey: item.subtitle_key,
              subtitleUrl,
            };
          })
        );

        setVideos(videoList);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  return (
    <div className="min-h-screen container mx-auto p-4">
      {videos.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <li key={video.videoKey} className="mb-4">
              <video className="w-full" controls>
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="mt-2">
                Subtitle: <a className="text-blue-500" href={video.subtitleUrl} download>Download Subtitle</a>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No videos found</p>
      )}
    </div>
  );
}
