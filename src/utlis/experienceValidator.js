export const validationExperienceFormData = (formData,toast) => {
    // Check if all required fields are filled
    if (!formData.title || !formData.name || !formData.price || !formData.description) {
        toast({
            title: 'All fields are required',
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top',
        });
        return false;
    }

    // Check if price is a positive number
    if (formData.price <= 0 || isNaN(formData.price)) {
        toast({
            title: 'Price should be a positive number',
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top',
        });
        return false;
    }

    // Check if location information is present
    if (!formData.location.name) {
        toast({
            title: 'Please enter a location',
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top',
        });
        return false;
    }

    // Add more validation checks as needed

    return true;
};
