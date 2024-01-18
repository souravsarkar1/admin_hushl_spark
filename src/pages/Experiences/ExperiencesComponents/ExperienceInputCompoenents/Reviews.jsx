import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { handleUploadMedia } from '../../../../data/mediaUploading';
import Rating from './Rating';
import { addExperienceReview } from '../../../../redux/experiences/action';
import { useDispatch } from 'react-redux';

const Reviews = ({ id,token }) => {
  const [reviewData, setReviewData] = useState({
    name: '',
    image: '',
    description: '',
    rating: 0,
  });

  const toast = useToast();
const dispath = useDispatch();

  const handleChangeReview = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const HandleImageUpload = async (e) => {
    const imageUrl = await handleUploadMedia(e.target.files[0], toast, id);
    // console.log(imageUrl);
    setReviewData((prevData) => ({
      ...prevData,
      image: imageUrl,
    }));
  };

  const handleRatingChange = (newRating) => {
    setReviewData((prevData) => ({
      ...prevData,
      rating: newRating,
    }));
  };

  const handleSaveReviews = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Logic to save reviews (e.g., send to server)
    
    // console.log(reviewData);
    // Reset the form after saving if needed
   if (reviewData.description === "" || reviewData.image === "" || reviewData.name === "" || reviewData.rating === 0) {
    toast({
      title: 'Please select all the field',
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top'
    });
    return;
   } 
   dispath( addExperienceReview(token, id, reviewData));
    setReviewData({
      name: '',
      image: '',
      description: '',
      rating: 0,
    });
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSaveReviews}>
        <Flex align="center" flexWrap="wrap">
          <FormControl mb={4} mr={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={reviewData.name}
              onChange={handleChangeReview}
            />
          </FormControl>

          <FormControl mb={4} mr={4}>
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              name="image"
              onChange={HandleImageUpload}
              accept="image/*"
            />
          </FormControl>

          <FormControl mb={4} mr={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={reviewData.description}
              onChange={handleChangeReview}
            />
          </FormControl>

          <FormControl mb={4} mr={4}>
            <Rating value={reviewData.rating} onChange={handleRatingChange} />
          </FormControl>
        </Flex>

        <Button colorScheme="blue" mt={4} type="submit">
          Save Reviews
        </Button>
      </form>
    </Box>
  );
};

export default Reviews;
