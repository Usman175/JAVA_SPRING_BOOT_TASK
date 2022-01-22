import {postMultipartFile,postOptions} from "../utils/httpConfig";
import request from "../utils/request";
import {ENDPOINT} from "../utils/endpoint"; 

export const uploadVideo = async (file,folderName) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        let result = await request(`${ENDPOINT["UpdateVideo"]}?folderName=${folderName}`, postMultipartFile(formData));
        if (result && result.success) {
            return result;
        } else {
            return "Server Error"
        }
    } catch (ex) {
        return ex + "Server Error"
    }
}