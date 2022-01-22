
export const getProfileImage =(url) => {
    try {
        if (url.slice(0,5)==="https") {
            return url;
        } else if(url) {
            return "https://dhihitu47nqhv.cloudfront.net/"+url
        }else{
            return "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
        }
    } catch (ex) {
        return "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
    }
}