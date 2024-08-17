import fbConfig from "../Config/Firebase.js";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


initializeApp(fbConfig);
const storage = getStorage();

export async function uploadFile(file, path) {

    try {
        const timestamp = new Date().getTime()
        if (file) {
            const storageRef = ref(storage, `${path}/${file.originalname + "_" + timestamp}`);
            const metadata = {
                contentType: file.mimetype
            }
            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            const url = await getDownloadURL(snapshot.ref);
            return url;
        } else {
            return '';
        }
    } catch (err) {
        console.log('-- Error upload File -- ', err)
        return '';
    }

}