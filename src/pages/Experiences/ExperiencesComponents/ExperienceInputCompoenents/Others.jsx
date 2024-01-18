import React, { useState } from 'react'
import { handleUploadPhoto } from '../../../../data/photoUploading';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import ButtonLoader from '../../../../components/Loader';

export const OthersComponent = ({formData, setFormData}) => {
    const [loader, setLoader] = useState(false);
    const handleChangeOthersImage = async (e, index) => {
        try {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);



            const imageUrl = await handleUploadPhoto(e.target.files[0]);  // Pass formData to handleUploadPhoto

            const { name } = e.target;
            const newOthers = [...formData.others];
            newOthers[index] = { ...newOthers[index], [name]: imageUrl };
            setFormData((prevData) => ({
                ...prevData,
                others: newOthers,
            }));
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    }
    const handleAddOther = () => {
        setLoader(true);
        setTimeout(() => {
            setFormData((prevData) => ({
                ...prevData,
                others: [...prevData.others, { img_url: "", name: "" }],
            }));
            setLoader(false);
        }, 1000);
        
    };
    const handleChangeOthers = (e, index) => {
        const { name, value } = e.target;
        const newOthers = [...formData.others];
        newOthers[index] = { ...newOthers[index], [name]: value };
        setFormData((prevData) => ({
            ...prevData,
            others: newOthers,
        }));
    };
  return (
    <div>
    {formData.others.map((other, index) => (
        <Box key={index}>
            <FormControl id={`otherImgUrl${index}`}>
                <FormLabel>Other Image URL</FormLabel>
                <Input
                    type="file"
                    name={`img_url`}
                    value={other.img_url}
                    onChange={(e) => handleChangeOthersImage(e, index)}
                    accept="image/*"
                />
            </FormControl>

            <FormControl id={`otherName${index}`}>
                <FormLabel>Other Name</FormLabel>
                <Input
                    type="text"
                    name={`name`}
                    value={other.name}
                    onChange={(e) => handleChangeOthers(e, index)}

                />
            </FormControl>
        </Box>
    ))}

    <Button
        colorScheme="teal"
        onClick={handleAddOther}
    >
       {loader ? <ButtonLoader h={40} w={40}/> : " Add Other"}
    </Button>

    </div>
  )
}
