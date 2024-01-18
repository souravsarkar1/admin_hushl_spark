import React from 'react';
import { Flex, Link, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Usernavbar = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      align={{ base: 'center', md: 'center' }}
      justify={{ base: 'center', md: 'flex-end' }}
      p={{ base: 2, md: 4 }}
      fontSize={15}
      bg="gray.200"
    >
      <Link as={RouterLink} to="/female">
        Female
      </Link>
      <Spacer />
      <Link as={RouterLink} to="/male">
        Male
      </Link>
      <Spacer />
      <Link as={RouterLink} to="/binary">
        Non-Binary
      </Link>
    </Flex>
  );
};

export default Usernavbar;

