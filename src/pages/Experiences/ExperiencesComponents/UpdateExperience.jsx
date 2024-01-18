import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { singleExperience, updateExperienceData } from '../../../redux/experiences/action';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import HandleVideoUpload from './ExperienceInputCompoenents/HandleVidoeUpload';
import HandleImageUpload from './ExperienceInputCompoenents/HandleImageUpload';
import TimeSelectorCalander from './ExperienceInputCompoenents/ScheduleCalander';
import ButtonLoader from '../../../components/Loader';

const UpdateExperience = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.experienceReducer.singleExperienceData);
  const updateIsError = useSelector((state) => state.experienceReducer.updateExperienceDataIsError);
  const updateIsLoading = useSelector((state) => state.experienceReducer.updateExperienceDataIsLoading);

  const toast = useToast();
  const navigaion = useNavigate();
  const [updatedData, setUpdatedData] = useState({
    _id : "",
    title: '',
    price: '',
    description: '',
    created_by: '',
    name: "",
    media: {
      videos: [
        {
          title: '',
          url: '',
        },
      ],
      images: [
        {
          url: '',
          title: '',
        },
      ],
    },
    schedulesAvailable: [
      { day: 'Monday', startTime: '', endTime: '', slots: 0 },
      { day: 'Tuesday', startTime: '', endTime: '', slots: 0 },
      { day: 'Wednesday', startTime: '', endTime: '', slots: 0 },
      { day: 'Thursday', startTime: '', endTime: '', slots: 0 },
      { day: 'Friday', startTime: '', endTime: '', slots: 0 },
      { day: 'Saturday', startTime: '', endTime: '', slots: 0 },
      { day: 'Sunday', startTime: '', endTime: '', slots: 0 },
    ],
    location: {
      longitude: 0,
      latitude: 0,
    },
  });
  const authData = useSelector(st => st.authReducer);
  useEffect(() => {
    dispatch(singleExperience(id, authData.accessToken.data.accessToken.accessTokenJWT));
  }, [id, dispatch, authData]);

  useEffect(() => {
    setUpdatedData({
      _id : data._id || "",
      title: data.title || '',
      price: data.price || 0,
      created_by: data.created_by || '',
      name: data.name || '',
      description: data.description || '',
      location: { longitude: data.location?.longitude, latitude: data.location?.latitude, name : data.location?.name } || { longitude: 0, latitude: 0, name : "" },
      media: {
        videos: data.media?.videos.map((video) => {
          if (video.url === undefined && video.title === undefined) {
            return { url: '', title: '' };
          } else {
            return video;
          }
        }) || [{ url: '', title: '' }], // Set default if videos array is not present or empty

        images: data.media?.images.map((image) => {
          if (image.url === undefined && image.title === undefined) {
            return { url: '', title: '' };
          } else {
            return image;
          }
        }) || [{ url: '', title: '' }], // Set default if images array is not present or empty
      },
      schedulesAvailable: data?.schedulesAvailable?.map((item) => ({
        day: item.day,
        startTime: item.startTime,
        endTime: item.endTime,
        slots: item.slots,
      })) || getDefaultSchedule(),

    });
  }, [data]);
  const getDefaultSchedule = () => [
    { day: 'Monday', startTime: '', endTime: '', slots: 0 },
    { day: 'Tuesday', startTime: '', endTime: '', slots: 0 },
    { day: 'Wednesday', startTime: '', endTime: '', slots: 0 },
    { day: 'Thursday', startTime: '', endTime: '', slots: 0 },
    { day: 'Friday', startTime: '', endTime: '', slots: 0 },
    { day: 'Saturday', startTime: '', endTime: '', slots: 0 },
    { day: 'Sunday', startTime: '', endTime: '', slots: 0 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMediaChange = (mediaType, index, fieldName, value) => {
    const updatedMedia = [...updatedData.media[mediaType]];
    updatedMedia[index] = { ...updatedMedia[index], [fieldName]: value };

    setUpdatedData((prevData) => ({
      ...prevData,
      media: { ...prevData.media, [mediaType]: updatedMedia },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setUpdatedData((prevFormData) => ({
      ...prevFormData,
      schedulesAvailable: prevFormData.schedulesAvailable?.map((data) =>
        data.day === day ? { ...data, [field]: field === 'slots' ? parseInt(value, 10) : value } : data
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  console.log(updatedData.description, "des line 125");
    dispatch(updateExperienceData(id, updatedData, toast, authData.accessToken.data.accessToken.accessTokenJWT));
    if (!updateIsError) {
      navigaion("/experience")
    }
  };
  console.log(updatedData);
  return (
    <Center>
      <VStack spacing={4} align="stretch">
        <Box>
          <h2>Update Experience</h2>
        </Box>
        <Box>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel htmlFor="title">Title:</FormLabel>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={updatedData.title}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="title">Name:</FormLabel>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedData.name}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="description">Description:</FormLabel>
                <Textarea
                  type="text"
                  id="title"
                  name="description"
                  value={updatedData.description}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="price">Price:</FormLabel>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={updatedData.price}
                  onChange={handleInputChange}
                />
              </FormControl>
            </VStack>

            {/* Handle video and image uploads */}
            <HandleVideoUpload
              formData={updatedData}
              setFormData={setUpdatedData}
              id={updatedData._id}
              onVideoChange={(index, fieldName, value) =>
                handleMediaChange('videos', index, fieldName, value)
              }
            />
            <HandleImageUpload
              formData={updatedData}
              setFormData={setUpdatedData}
              id={updatedData._id}
              onImageChange={(index, fieldName, value) =>
                handleMediaChange('images', index, fieldName, value)
              }
            />
            <TimeSelectorCalander
              formData={updatedData}
              setFormData={setUpdatedData}
              onTimeChange={handleTimeChange}
            />
            <Center>
              <Button colorScheme="teal" type="submit">
                {updateIsLoading ? <ButtonLoader h={40} w={40} /> : "Update Experience"}
              </Button>
            </Center>
          </form>
        </Box>
      </VStack>
    </Center>
  );
};

export default React.memo(UpdateExperience);
