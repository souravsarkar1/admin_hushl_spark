import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import ButtonLoader from '../../../../components/Loader';

const ExperienceComponent = ({ formData, setFormData }) => {
  const [loader, setLoader] = useState(false);

  const handleChangeExperience = (e, index) => {
    const { name, value } = e.target;
    const newExperiences = [...formData.experiences];
    newExperiences[index] = { ...newExperiences[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      experiences: newExperiences,
    }));
  };

  const handleAddExperience = () => {
    setLoader(true);
    setTimeout(() => {
      setFormData((prevData) => ({
        ...prevData,
        experiences: [...prevData.experiences, { img_url: '', name: '', timing: '' }],
      }));
      setLoader(false);
    }, 1000);
  };

  return (
    <div>
      {formData.experiences.map((experience, index) => (
        <Box key={index}>
          <FormControl id={`experienceImgUrl${index}`}>
            <FormLabel>Experience Image URL</FormLabel>
            <Input
              type="file"
              name={`img_url`}
              accept="image/*"
              value={experience.img_url}
              onChange={(e) => handleChangeExperience(e, index)}
            />
          </FormControl>

          <FormControl id={`experienceName${index}`}>
            <FormLabel>Experience Name</FormLabel>
            <Input
              type="text"
              name={`name`}
              value={experience.name}
              onChange={(e) => handleChangeExperience(e, index)}
            />
          </FormControl>

          <FormControl id={`experienceTiming${index}`}>
            <FormLabel>Experience Timing</FormLabel>
            <Input
              type="time"
              name={`timing`}
              value={experience.timing}
              onChange={(e) => handleChangeExperience(e, index)}
            />
          </FormControl>
        </Box>
      ))}

      <Button colorScheme="teal" onClick={handleAddExperience}>
        {loader ? <ButtonLoader w={40} h={40} /> : 'Add Experience'}
      </Button>
    </div>
  );
};

export default ExperienceComponent;
