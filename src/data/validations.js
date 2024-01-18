export const  validateForm = (formData) => {
    const errors = [];

    // Checking if the title is not empty
    if (!formData.title) {
        errors.push('Title is required');
    }

    // Checking if the price is a positive number
    if (formData.price <= 0 || isNaN(formData.price)) {
        errors.push('Price should be a positive number');
    }


    return errors;
};