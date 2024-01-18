import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import ButtonLoader from '../../../../components/Loader';

export const ScheduleComponent = ({ formData, setFormData }) => {
    const [loader, setLoader] = useState(false);
    const handleChangeSchedule = (e, index) => {
        const { name, value } = e.target;

        if (index === undefined) {
            // If index is not provided, update total_number_of_schedules directly
            setFormData((prevData) => ({
                ...prevData,
                available_schedule: {
                    ...prevData.available_schedule,
                    [name]: value,
                },
            }));
        } else {
            // If index is provided, update the specific schedule field
            const newSchedules = [...formData.available_schedule.schedules];
            newSchedules[index] = { ...newSchedules[index], [name]: value };
            setFormData((prevData) => ({
                ...prevData,
                available_schedule: {
                    ...prevData.available_schedule,
                    schedules: newSchedules,
                },
            }));
        }
    };



    const handleAddSchedule = () => {
        setLoader(true);
       setTimeout(() => {
        setFormData((prevData) => ({
            ...prevData,
            available_schedule: {
                ...prevData.available_schedule,
                schedules: [...prevData.available_schedule.schedules, { day: "", month: "", date: "", timing: "" }],
            },
        }));
        setLoader(false);
       }, 1000);
    };
    return (
        <div>
            <FormControl id="totalNumberOfSchedules">
                <FormLabel>Total Number of Schedules</FormLabel>
                <Input
                    type="number"
                    name="total_number_of_schedules"
                    value={formData.available_schedule.total_number_of_schedules}
                    onChange={(e) => handleChangeSchedule(e)}
                />
            </FormControl>
            {formData.available_schedule.schedules.map((schedule, index) => (
                <Box key={index}>
                    <FormControl id={`scheduleDate${index}`}>
                        <FormLabel>Schedule Date</FormLabel>
                        <Input
                            type="date"
                            name={`date`}
                            value={schedule.date}
                            onChange={(e) => handleChangeSchedule(e, index)}
                        />
                    </FormControl>

                    <FormControl id={`scheduleStartingTiming${index}`}>
                        <FormLabel>Schedule Starting Timing</FormLabel>
                        <Input
                            type="time"
                            name={`starting_timing`}
                            value={schedule.starting_timing}
                            onChange={(e) => handleChangeSchedule(e, index)}
                        />
                    </FormControl>

                    <FormControl id={`scheduleEndingTiming${index}`}>
                        <FormLabel>Schedule Ending Timing</FormLabel>
                        <Input
                            type="time"
                            name={`ending_timing`}
                            value={schedule.ending_timing}
                            onChange={(e) => handleChangeSchedule(e, index)}
                        />
                    </FormControl>
                </Box>
            ))}

            <Button
                colorScheme="teal"
                onClick={handleAddSchedule}
            >
               {loader ? <ButtonLoader h={40} w={40}/> : " Add Schedule"}
            </Button>

        </div>
    )
}
