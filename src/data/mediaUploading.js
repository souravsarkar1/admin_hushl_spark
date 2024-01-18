import axios from "axios";

export const handleUploadMedia = async (currentPhoto,toast,id,contentType) => {
  // console.log(id);
  // console.log(contentType);
  // setMediaLoader(true);
    if (currentPhoto) {
      try {
        // 1. Generate S3 upload link
        const uploadLinkResponse = await axios.post(
          'https://api-dev.spark.hushl.in/document/generate-upload-s3-link',
          {
            fileName: currentPhoto.name,
            contentType: contentType || currentPhoto.type,
            fileType: 'experienceFile',
            fileTypeId: id, 
          }
        );

        const uploadUrl = uploadLinkResponse.data.preSignedUrl;

        // 2. Convert the photo to base64
        // const base64Data = await getBase64(currentPhoto);


        // 3. Upload the photo to S3 using the generated link
        const uploaded = await uploadImage(uploadUrl, currentPhoto,contentType);
        console.log(uploaded);
        // 4. Update the state with the new photo URL
        const uploadLinkResponseFinal = await axios.post(
          'https://api-dev.spark.hushl.in/document/get-view-media-link',
          {
            fileName: currentPhoto.name,
            contentType: contentType || currentPhoto.type,
            fileType: 'experienceFile', // Replace with the correct fileType
            fileTypeId: id, // Replace with the correct fileTypeId
          }
        );
        // console.log(uploadLinkResponseFinal.data.url);
        // setPhotos([...photos, uploadLinkResponseFinal.data.url]);
        // setCurrentPhoto(null);
        // setMediaLoader(false);
        toast({
          title:  'Media upload',
          description: `media upload successfully`,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: "top"
      })
      // 
        return uploadLinkResponseFinal.data.url;
      } catch (error) {
        console.error('Error uploading photo:', error);
        toast({
          title: error.message || 'Media upload',
          description: `Some things went wrong`,
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: "top"
      })
      }
    }
  };

  const uploadImage = async (uploadUrl, base64Data,contentType) => {
    // Use fetch with the correct headers and method
    return fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType || 'image/*',
      },
      body: base64Data,
    });
  };