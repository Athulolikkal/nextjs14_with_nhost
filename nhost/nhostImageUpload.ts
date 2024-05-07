import nhost from "./nhostConfig";

export const handleImageUpload: any = async (imgBlob: any) => {
  let url = "";
  try {
    const imageDetails = imgBlob.target.files[0];
    const fileName = imageDetails.name;
    if (imageDetails) {
      const file = new File([imageDetails], fileName);
      const { fileMetadata } = await nhost.storage.upload({ file: file });
      const fileId = fileMetadata?.id ?? "";
      url = await nhost.storage.getPublicUrl({ fileId });
      if (url != "") return url;
      else return { error: true };
    }
  } catch (err) {
    console.log(err, "error found");
    return { error: true };
  }
};
