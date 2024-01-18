import React from 'react';
import {
  Button,
  Center,
  Flex,
  HStack
} from '@chakra-ui/react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pagesToShow = 3; // Number of pages to show at a time
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={currentPage === i ? 'solid' : 'outline'}
          colorScheme="teal"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <Center>
      <Flex direction="column" align="center" mt={6}>
        <HStack spacing={2}>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button isDisabled={true}>{currentPage}</Button>
          {renderPageNumbers()}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </Center>
  );
};

export default Pagination;
