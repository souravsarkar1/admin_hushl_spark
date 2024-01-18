import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Image, Input, useToast } from '@chakra-ui/react';
import ButtonLoader from '../../../../components/Loader';
import { handleUploadMedia } from '../../../../data/mediaUploading';

const HandleImageUpload = ({ setFormData, formData, id }) => {
  const [loader, setLoader] = useState(false);
  const [loaderRemove, setLoaderRemove] = useState(Array(formData.media.images?.length).fill(false));

  const toast = useToast();
   console.log(id);
  const handleImgUrlChange = async (e, index) => {
    try {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      const imageUrl = await handleUploadMedia(e.target.files[0], toast, id);

      setFormData((prevData) => ({
        ...prevData,
        media: {
          ...prevData.media,
          images: [
            ...prevData.media.images.slice(0, index),
            { title: ``, url: imageUrl },
            ...prevData.media.images.slice(index + 1),
          ],
        },
      }));
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const handleRemoveImgUrl = async (index) => {
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
          images: prevData.media.images.filter((_, i) => i !== index),
        },
      }));
    } catch (error) {
      console.error('Error removing photo:', error);
    } finally {
      setLoaderRemove((prevLoaderRemove) => {
        const updatedLoaderRemove = [...prevLoaderRemove];
        updatedLoaderRemove[index] = false;
        return updatedLoaderRemove;
      });
    }
  };

  const handleAddImgUrl = () => {
    setLoader(true);
    setTimeout(() => {
      setFormData((prevData) => ({
        ...prevData,
        media: {
          ...prevData.media,
          images: [...prevData.media.images, { title: '', url: '' }],
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
    formData.media.images?.some((img) => img.url === '' || img.title === '') 
    // ||
    // formData.media.images?.length === 0; // Disable if any image URL or title is empty, or if there are no images

  const isRemoveButtonDisabled = formData.media.images?.length === 1;
console.log(formData)
  return (
    <div>
      <FormControl id="images">
        <FormLabel>Image URLs</FormLabel>
        {formData.media.images?.map((imgUrl, index) => (
          <Box p={2} key={index} gap={3} display="flex" alignItems="center">
            {formData?.media?.images[index]?.url ? <Image h={10} w={10} src={formData?.media?.images[index]?.url} /> : null}
            <Input
              type="file"
              accept="image/*"
              name="imgUrl"
              onChange={(e) => handleImgUrlChange(e, index)}
              style={{ marginRight: '8px' }}
              placeholder='Select Image'
            />
            <Input
              type="text"
              placeholder={`Image ${index + 1} Title`}
              value={imgUrl.title}
              onChange={(e) => handleChangeMediaTitle(e, 'images', index)}
            />
            <Button
              w={300}
              colorScheme="red"
              isDisabled={isRemoveButtonDisabled}
              onClick={() => handleRemoveImgUrl(index)}
            >
              {loaderRemove[index] ? <ButtonLoader w={40} h={40} /> : ' Remove'}
            </Button>
          </Box>
        ))}
        <Button colorScheme="teal" onClick={handleAddImgUrl} isDisabled={isAddButtonDisabled}>
          {loader ? <ButtonLoader h={40} w={40} /> : ' Add More'}
        </Button>
      </FormControl>
    </div>
  );
};

export default HandleImageUpload;
