import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, IconButton, Textarea } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import ButtonLoader from '../../../../components/Loader';
// import { handleUploadMedia } from '../../../../data/mediaUploading';

const HandleIncludedPakages = ({ formData, setFormData }) => {
  const [loader, setLoader] = useState(false);
  const [loaderRemove, setLoaderRemove] = useState(Array(formData.includedPackages.length).fill(false));
//   const toast = useToast();

  const handleChangeIncludedPackages = (e, index) => {
    const { name, value } = e.target;
    const newIncludedPackages = [...formData.includedPackages];
    newIncludedPackages[index] = { ...newIncludedPackages[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      includedPackages: newIncludedPackages,
    }));
  };

  const handleRemoveIncludedPackage = async (index) => {
    setLoaderRemove((prevLoaderRemove) => {
      const updatedLoaderRemove = [...prevLoaderRemove];
      updatedLoaderRemove[index] = true;
      return updatedLoaderRemove;
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating asynchronous removal process

      setFormData((prevData) => ({
        ...prevData,
        includedPackages: prevData.includedPackages.filter((_, i) => i !== index),
      }));
    } catch (error) {
      console.error('Error removing included package:', error);
    } finally {
      setLoaderRemove((prevLoaderRemove) => {
        const updatedLoaderRemove = [...prevLoaderRemove];
        updatedLoaderRemove[index] = false;
        return updatedLoaderRemove;
      });
    }
  };

  const handleAddIncludedPackage = () => {
    setLoader(true);
    setTimeout(() => {
      setFormData((prevData) => ({
        ...prevData,
        includedPackages: [...prevData.includedPackages, { includedPackagesName: "", packagesDescription: "" }],
      }));
      setLoader(false);
    }, 1000);
  };

  const isAddButtonDisabled = formData.includedPackages.some((pkg) => pkg.includedPackagesName === '' || pkg.packagesDescription === '');

  const isRemoveButtonDisabled = formData.includedPackages.length === 1;

  return (
    <div>
      {formData.includedPackages?.map((includedPackage, index) => (
        <Box p={5} key={index} display="flex" flexDir={"column"} alignItems="center" gap={2}>
          <FormControl id={`includedPackagesName${index}`}>
            <FormLabel>Included Packages Name</FormLabel>
            <Input
              type="text"
              name="includedPackagesName"
              value={includedPackage.includedPackagesName}
              onChange={(e) => handleChangeIncludedPackages(e, index)}
            />
          </FormControl>

          <FormControl id={`packagesDescription${index}`}>
            <FormLabel>Packages Description</FormLabel>
            <Textarea
              type="text"
              name="packagesDescription"
              value={includedPackage.packagesDescription}
              onChange={(e) => handleChangeIncludedPackages(e, index)}
            />
          </FormControl>
<Button isDisabled={isRemoveButtonDisabled} colorScheme='red'>
Remove 
<IconButton
  icon={<CloseIcon />}
  colorScheme="red"
  onClick={() => handleRemoveIncludedPackage(index)}
  isDisabled={isRemoveButtonDisabled}
>  {loaderRemove[index] ? <ButtonLoader w={6} h={6} /> : null}
</IconButton>
</Button>
        </Box>
      ))}

      <Button colorScheme="teal" onClick={handleAddIncludedPackage} isDisabled={isAddButtonDisabled}>
        {loader ? <ButtonLoader h={40} w={40} /> : 'Add Included Package'}
      </Button>
    </div>
  );
};

export default HandleIncludedPakages;
