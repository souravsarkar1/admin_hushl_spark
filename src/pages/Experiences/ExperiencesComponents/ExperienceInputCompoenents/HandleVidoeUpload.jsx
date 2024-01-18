import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
// import axios from 'axios';
import ButtonLoader from '../../../../components/Loader';
import { handleUploadMedia } from '../../../../data/mediaUploading';

const HandleVideoUpload = ({ formData, setFormData,id }) => {
  const [loader, setLoader] = useState(false);
  const [loaderRemove, setLoaderRemove] = useState(Array(formData.media.videos?.length).fill(false));
const toast = useToast();
  const handleVideoChange = async (e, index) => {
    try {
      const formData = new FormData();
      formData.append('video', e.target.files[0]);

      const videoUrl = await handleUploadMedia(e.target.files[0], toast, id , 'video/mp4');

      setFormData((prevData) => ({
        ...prevData,
        media: {
          ...prevData.media,
          videos: [
            ...prevData.media.videos.slice(0, index),
            { title: ``, url: videoUrl },
            ...prevData.media.videos.slice(index + 1),
          ],
        },
      }));
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const handleRemoveVideo = async (index) => {
    setLoaderRemove((prevLoaderRemove) => {
      const updatedLoaderRemove = [...prevLoaderRemove];
      updatedLoaderRemove[index] = true;
      return updatedLoaderRemove;
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating asynchronous removal process

      setFormData((prevData) => ({
        ...prevData,
        media: {
          ...prevData.media,
          videos: prevData.media.videos.filter((_, i) => i !== index),
        },
      }));
    } catch (error) {
      console.error('Error removing video:', error);
    } finally {
      setLoaderRemove((prevLoaderRemove) => {
        const updatedLoaderRemove = [...prevLoaderRemove];
        updatedLoaderRemove[index] = false;
        return updatedLoaderRemove;
      });
    }
  };

  const handleAddVideo = () => {
    setLoader(true);
    setTimeout(() => {
      setFormData((prevData) => ({
        ...prevData,
        media: {
          ...prevData.media,
          videos: [...prevData.media.videos, { title: '', url: '' }],
        },
      }));
      setLoader(false);
    }, 1000);
  };

  const handleChangeMediaTitle = (e, mediaType, index) => {
    const { value } = e.target;

    setFormData((prevData) => {
      const updatedMedia = [...prevData.media[mediaType]];
      updatedMedia[index] = { ...updatedMedia[index], title: value };

      return {
        ...prevData,
        media: {
          ...prevData.media,
          [mediaType]: updatedMedia,
        },
      };
    });
  };

  const isAddButtonDisabled =
    formData.media.videos?.some((video) => video.url === '' || video.title === '') 
    // ||
    // formData.media.videos?.length === 0; // Disable if any video URL or title is empty, or if there are no videos

  const isRemoveButtonDisabled = formData.media.videos?.length === 1;

  return (
    <div>
      <FormControl id="videos">
        <FormLabel>Videos</FormLabel>
        {formData.media.videos?.map((video, index) => (
          <Box p={2} key={index} gap={3} display="flex" alignItems="center">
          {formData?.media?.videos[index]?.url ?
            
            <iframe
            width="70px"
            height="70px"
            src={formData?.media?.videos[index]?.url}
            title="YouTube Video Player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen

          ></iframe>
            : null}
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => handleVideoChange(e, index)}
              style={{ marginRight: '8px' }}
            />
            <Input
              type="text"
              placeholder={`Video ${index + 1} Title`}
              value={video.title}
              onChange={(e) => handleChangeMediaTitle(e, 'videos', index)}
            />
            <Button
              w={300}
              colorScheme="red"
              isDisabled={isRemoveButtonDisabled}
              onClick={() => handleRemoveVideo(index)}
            >
              {loaderRemove[index] ? <ButtonLoader w={40} h={40} /> : ' Remove'}
            </Button>
          </Box>
        ))}
        <Button colorScheme="teal" onClick={handleAddVideo} isDisabled={isAddButtonDisabled} >
          {loader ? <ButtonLoader h={40} w={40} /> : ' Add More'}
        </Button>
      </FormControl>
    </div>
  );
};

export default HandleVideoUpload;
