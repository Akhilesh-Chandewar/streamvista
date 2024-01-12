import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

export async function uploadVideoWithSubtitleToFirebase(videoFile, subtitleFile){
    return new Promise(async (resolve, reject) => {
        try {
            const video_key = "video_data" + Date.now().toString() + videoFile.name.replace(/\s/g, "-");
            const subtitle_key = "subtitle_data" + Date.now().toString() + subtitleFile.name.replace(/\s/g, "-");

            const videoRef = ref(storage, `/videos/${video_key}`);
            const subtitleRef = ref(storage, `/subtitles/${subtitle_key}`);

            // Upload video
            const videoUploadTask = uploadBytesResumable(videoRef, videoFile);

            videoUploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Video Upload Progress: ${progress}%`);
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    try {
                        const subtitleUploadTask = uploadBytesResumable(subtitleRef, subtitleFile);

                        subtitleUploadTask.on(
                            'state_changed',
                            (subtitleSnapshot) => {
                                const subtitleProgress = (subtitleSnapshot.bytesTransferred / subtitleSnapshot.totalBytes) * 100;
                                console.log(`Subtitle Upload Progress: ${subtitleProgress}%`);
                            },
                            (subtitleError) => {
                                reject(subtitleError);
                            },
                            async () => {
                                try {
                                    resolve({
                                        video_key,
                                        video_name: videoFile.name,
                                        subtitle_key,
                                        subtitle_name: subtitleFile.name
                                    });
                                } catch (error) {
                                    reject(error);
                                }
                            }
                        );
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        } catch (error) {
            reject(error);
        }
    });
}

export async function getFirebaseVideoUrl(video_key) {
    const videoRef = ref(storage, `/videos/${video_key}`);
    const downloadURL = await getDownloadURL(videoRef);
    return downloadURL;
}

export async function getFirebaseSubtitleUrl(subtitle_key) {
    const subtitleRef = ref(storage, `/subtitles/${subtitle_key}`);
    const downloadURL = await getDownloadURL(subtitleRef);
    return downloadURL;
}
