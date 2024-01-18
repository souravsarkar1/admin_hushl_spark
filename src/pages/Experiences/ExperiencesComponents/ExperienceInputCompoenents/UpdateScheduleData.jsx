import React, { } from 'react';
import {
    Flex,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
} from '@chakra-ui/react';

const UpdateTimeSelectorCalander = ({ formData, setFormData }) => {

    // console.log(formData);

    const handleTimeChange = (day, field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            schedulesAvailable: prevFormData.schedulesAvailable?.map((data) =>
                data.day === day ? { ...data, [field]: field === 'slots' ? parseInt(value, 10) : value } : data
            ),
        }));
    };


    return (
        <Flex direction="column" align="center">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Day</Th>
                        <Th>Start Time</Th>
                        <Th>End Time</Th>
                        <Th>Slots</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {formData.schedulesAvailable?.map((data, index) => (
                        <Tr key={index}>
                            <Td>{data.day}</Td>
                            <Td>
                                <Input
                                    type="time"
                                    placeholder="Enter Start Time"
                                    value={data.startTime}
                                    onChange={(e) =>
                                        handleTimeChange(data.day, 'startTime', e.target.value)
                                    }
                                />
                            </Td>
                            <Td>
                                <Input
                                    type="time"
                                    placeholder="Enter End Time"
                                    value={data.endTime}
                                    onChange={(e) =>
                                        handleTimeChange(data.day, 'endTime', e.target.value)
                                    }
                                />
                            </Td>
                            <Td>
                                <NumberInput
                                    defaultValue={data.slots}
                                    min={0}
                                    max={100}
                                    onChange={(value) => {
                                        // console.log(value);
                                        return handleTimeChange(data.day, 'slots', value)
                                    }
                                    }
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>


        </Flex>
    );
};

export default UpdateTimeSelectorCalander;
