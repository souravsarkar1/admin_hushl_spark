export const toastMessage = (title, description, status, duration, isClosable, position) => {
    return {
        title,
        description,
        status,
        duration,
        isClosable,
        position
    }
}