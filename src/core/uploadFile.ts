import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

const uploadFile = async (image: File, uid: string): Promise<string> => {
  const storageRef = ref(storage, uid + "_" + image.name);
  var res = await uploadBytes(storageRef, image);
  return res.ref.fullPath;
};
export default uploadFile;
