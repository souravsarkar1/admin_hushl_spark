import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import ButtonLoader from '../../../../components/Loader';

const ActivitiesComponent = ({ setFormData, formData }) => {
  const [loader, setLoader] = useState(false);

  const handleChangeActivities = (e, index) => {
    const { name, value } = e.target;
    const newActivities = [...formData.activities];
    newActivities[index] = { ...newActivities[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      activities: newActivities,
    }));
  };

  const handleAddActivity = () => {
    setLoader(true);
    setTimeout(() => {
      setFormData((prevData) => ({
        ...prevData,
        activities: [...prevData.activities, { title: '', description: '' }],
      }));
      setLoader(false); // Move it inside setTimeout to make sure it runs after the delay
    }, 1000);
  };

  return (
    <div>
      {formData.activities.map((activity, index) => (
        <Box key={index}>
          <FormControl id={`activityTitle${index}`}>
            <FormLabel>Activity Title</FormLabel>
            <Input
              type="text"
              name={`title`}
              value={activity.title}
              onChange={(e) => handleChangeActivities(e, index)}
            />
          </FormControl>

          <FormControl id={`activityDescription${index}`}>
            <FormLabel>Activity Description</FormLabel>
            <Input
              type="text"
              name={`description`}
              value={activity.description}
              onChange={(e) => handleChangeActivities(e, index)}
            />
          </FormControl>
        </Box>
      ))}

      <Button colorScheme="teal" onClick={handleAddActivity}>
        {loader ? <ButtonLoader w={40} h={40} /> : 'Add Activity'}
      </Button>
    </div>
  );
};

export default ActivitiesComponent;
