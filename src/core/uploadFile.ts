import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { FileUploadError } from "./errors";

const uploadFile = async (image: File, uid: string): Promise<string> => {
  try {
    const storageRef = ref(storage, uid + "_" + image.name);
    var res = await uploadBytes(storageRef, image);
    return res.ref.fullPath;
  } catch (err: any) {
    throw new FileUploadError();
  }
};
export default uploadFile;
