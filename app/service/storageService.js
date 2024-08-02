import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase';

const deleteImage = async (url) => {
    try {
        const storageRef = ref(storage, url);
        await deleteObject(storageRef);
        console.log("Previous image deleted");
    } catch (error) {
        console.error("Error deleting image: ", error);
    }
};

export const uploadImage = async (userId, uri, currentImageUrl) => {
    try {
        if (currentImageUrl) {
            await deleteImage(currentImageUrl);
        }
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `profiles/${userId}/${Date.now()}`);
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image: ", error);
        return null;
    }
};
