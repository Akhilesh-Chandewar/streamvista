"use client"
import { useState } from 'react';
import { uploadVideoWithSubtitleToFirebase } from '@/lib/uploadingFeatures';

const Upload = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [subtitleFile, setSubtitleFile] = useState(null);

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        setVideoFile(file);
    };

    const handleSubtitleChange = (event) => {
        const file = event.target.files[0];
        setSubtitleFile(file);
    };

    const handleUpload = async () => {
        if (!videoFile || !subtitleFile) {
            // Handle the case where either video or subtitle file is missing
            console.error('Please select both video and subtitle files.');
            return;
        }

        try {
            const { video_key, video_name, subtitle_key, subtitle_name } = await uploadVideoWithSubtitleToFirebase(videoFile, subtitleFile);
            console.log('Video Key:', video_key);
            console.log('Video Name:', video_name);
            console.log('Subtitle Key:', subtitle_key);
            console.log('Subtitle Name:', subtitle_name);
            await fetch("/api/video", {
                method: "POST",
                body: JSON.stringify({
                    video_key: video_key,
                    subtitle_key: subtitle_key,
                }),
            });
            setVideoFile(null);
            setSubtitleFile(null);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-gray-100 p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Upload Page</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Video File</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Subtitle File</label>
                    <input
                        type="file"
                        accept=".srt,.vtt"
                        onChange={handleSubtitleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded">
                    Upload
                </button>
            </div>
        </div>
    );
};

export default Upload;
