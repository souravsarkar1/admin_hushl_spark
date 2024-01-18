import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Text,
  Image,
  Button,
  Center,
  Flex,
  HStack,
  useToast,
  Stack,
  Avatar,
} from '@chakra-ui/react';



import { useDispatch, useSelector } from 'react-redux';
import { archiveExperience, deleteExperience, getAllExperienceData } from '../../../redux/experiences/action';
import ButtonLoader from '../../../components/Loader';
import { globalData } from '../../../data/global';
import { Link } from 'react-router-dom';
import Popup from '../../../components/PopUp';
import { PageLoader } from '../../../components/PageLoader';
import ReviwesComponent from './ExperienceInputCompoenents/Reviews';
const PAGE_SIZE = 5;

const AllExperiencesTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.experienceReducer.allExperienceData);
  const getAllExperienceDataIsLoading = useSelector((state) => state.experienceReducer.getAllExperienceDataIsLoading);
  const deleteLoader = useSelector((state) => state.experienceReducer.deleteExperienceDataIsLoading);
  const archiveExperienceDataIsLoading = useSelector((state) => state.experienceReducer.archiveExperienceDataIsLoading);
  const authData = useSelector(st => st.authReducer);
  const [currentPage, setCurrentPage] = useState(1);

  const toast = useToast();
  const [experiences, setExperiences] = useState(data.experiences);
  // console.log(authData);
  useEffect(() => {
    dispatch(getAllExperienceData(authData.accessToken.data.accessToken.accessTokenJWT));
  }, [authData, dispatch, archiveExperienceDataIsLoading, deleteLoader]);
  const deleteExperienceCb = (id) => {
    dispatch(deleteExperience(id, toast,authData.accessToken.data.accessToken.accessTokenJWT));
  };
  useEffect(() => {
    if (data.experiences) {
      setExperiences(data.experiences.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE));
    }
  }, [data, currentPage]);
  const archiveExperienceData = (data) => {
    dispatch(archiveExperience(data, toast,authData.accessToken.data.accessToken.accessTokenJWT));
  }

  const accendingSortExperienceByPrice = () => {
    const newExperienceData = data.experiences.sort((a, b) => a.price - b.price).slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    // console.log(newExperienceData);
    setExperiences([...newExperienceData])

  }

  const decendingSortExperienceByPrice = () => {
    const newExperienceData = data.experiences.sort((a, b) => b.price - a.price).slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    setExperiences([...newExperienceData])

  }

  const accendingSortExperienceByAverageRating = () => {
    const newExperienceData = data.experiences.sort((a, b) => a.averageRating - b.averageRating).slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    setExperiences([...newExperienceData])

  }

  const decendingSortExperienceByAverageRating = () => {
    const newExperienceData = data.experiences.sort((a, b) => b.averageRating - a.averageRating).slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    setExperiences([...newExperienceData])


  }
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
// console.log(Math.ceil(data.experiences / PAGE_SIZE));
  return (
    <Box m={5} p={5}>
      {getAllExperienceDataIsLoading ? <PageLoader /> :
        <Box>
          <Center>
            <HStack spacing={4} align="center">
              <div>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={accendingSortExperienceByPrice}
                  m={5}
                >
                  Ascending Sort By Price
                </Button>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={decendingSortExperienceByPrice} m={5}
                >
                  Descending Sort By Price
                </Button>
              </div>
              <div>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={accendingSortExperienceByAverageRating} m={5}
                >
                  Ascending Sort By Rating
                </Button>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={decendingSortExperienceByAverageRating} m={5}
                >
                  Descending Sort By Rating
                </Button>
              </div>
            </HStack>
          </Center>

          <TableContainer>
            <Table variant="simple">
              <TableCaption>All Experiences Data</TableCaption>
              <Thead>
                <Tr>
                  <Th>Sl No.</Th>
                  <Th>Name</Th>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th>Price</Th>
                  <Th>Images</Th>
                  <Th>Videos</Th>
                  <Th>Location Name</Th>
                  <Th>Location</Th>
                  <Th>Available Schedule</Th>
                  <Th>Archived</Th>
                  <Th>All Reviwes</Th>
                  <Th>Add Review</Th>
                  <Td>Delete</Td>
                  <Td>Update</Td>
                  {/* Add additional headers for other properties as needed */}
                </Tr>
              </Thead>
              <Tbody>
                {Array.isArray(experiences) && experiences?.map((experience, index) => (
                  <Tr key={experience._id}>
                    <Td>{index + 1}</Td>
                    <Td>{experience.name || "Name"}</Td>
                    <Td>{experience.title}</Td>
                    <Td>
                      <Box h={100} w={300} overflowX="auto" maxHeight={100}>
                        <Text fontSize="md" lineHeight="tall">
                          {experience.description}
                        </Text>
                      </Box>
                    </Td>
                    <Td>{experience.price}</Td>
                    <Td>
                      <Popup children={
                        <>{experience.media.images?.map((item) => (
                          <Box key={item._id} p={3} m={3}>
                            <Image h={"100px"} w={"150px"} src={item.url} alt={item.title} />
                          </Box>
                        ))}</>

                      }
                        modalTitle={"See All Images"}
                        colorofModal={globalData.buttonColorNormal}
                      />
                    </Td>
                    <Td>
                      <Popup
                        children={<>{experience.media.videos?.map((item) => (
                          <Box key={item._id} p={3} m={3}>
                            <iframe
                              width="full"
                              height="full"
                              src={item.url}
                              title="YouTube Video Player"
                              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen

                            ></iframe>
                          </Box>
                        ))}</>}
                        modalTitle={"See All Videos"}
                        colorofModal={globalData.buttonColorNormal}
                      />
                    </Td>
                    <Td>
                            {experience.location ? experience.location.name : null}
                    </Td>


                    <Td>{experience.location ? ` Longitude :  ${experience.location.longitude},latitude :  ${experience.location.latitude}` : 0}</Td>
                    <Td>


                      <Popup
                        children={experience.schedulesAvailable?.map((item) => (
                          <Box key={item._id} border={"1px solid blue"} p={3} m={3}>
                            <Text>Day : {item.day}</Text>
                            <Text>Time : {item.startTime} to {item.endTime}</Text>
                            <Text>Total Slots Now : {item.slots}</Text>
                          </Box>
                        ))}

                        modalTitle={"See all the Schedule"}
                        colorofModal={globalData.buttonColorNormal}
                      />
                    </Td>
                    <Td>{experience.archived ? "User Can't See" : "User Can See"}</Td>
                    <Td>


                      <Popup
                        children={experience.rating?.map((item) => (
                          <Stack key={item._id} spacing={4} m={4}>
                            <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
                              <Stack direction="row" spacing={4} align="center">
                                <Avatar size="sm" src={item.image} alt={item.name} />
                                <Box>
                                  <Text fontWeight="bold">{item.name}</Text>
                                  <Text fontSize="sm" color="gray.600">
                                    {new Date(item.time).toLocaleString()}
                                  </Text>
                                </Box>
                              </Stack>
                              <Text mt={2}>{item.description}</Text>
                            </Box>
                          </Stack>
                        ))}

                        modalTitle={"See all the Reviews"}
                        colorofModal={globalData.buttonColorNormal}
                      />
                    </Td>
                    <Td>
                      <Popup
                        children={<ReviwesComponent id={experience._id} token={authData.accessToken.data.accessToken.accessTokenJWT} />}
                        modalTitle={"Add New Review"}
                        colorofModal={globalData.buttonColorNormal}
                      />
                    </Td>
                    <Td>
                      <Popup
                        children={
                          <Flex gap={4} direction={"column"}>
                            <Text>Are You Confrom To Delete?</Text>
                            <Button w={"50%"} colorScheme="red" onClick={() => deleteExperienceCb(experience._id)}>{deleteLoader ? <ButtonLoader h={40} w={40} /> : "Delete"}</Button>
                          </Flex>
                        }
                        modalTitle={"Delete"}
                        addtionMessage={"Make it Archive"}
                        colorofModal={globalData.buttonColorCancel}
                        addtionalButtonColor={globalData.buttonColorNormal}
                        additionalTask={() => archiveExperienceData(experience._id, toast)}
                      />
                    </Td>
                    <Td>
                      <Popup
                        children={<>
                          <Text>Are You Confrom To Update Experience?</Text>
                          <Link to={`/update/experience/${experience._id}`}><Button colorScheme='blue'>Update</Button></Link></>}
                        modalTitle={"Update"}
                        colorofModal={globalData.buttonColorNormal}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Center>
          <Flex gap={3}>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              colorScheme={globalData.buttonColorNormal}
            >
              Previous
            </Button>
            <Button disabled colorScheme={globalData.buttonColorNormal}>
              {currentPage}
            </Button>
            <Button
            onClick={() => handlePageChange(currentPage + 1)}
            colorScheme={globalData.buttonColorNormal}
            // isDisabled={currentPage === Math.ceil(experiences.length / PAGE_SIZE)}
            >
            Next
          </Button>
          
          </Flex>
        </Center>
        </Box>
      }
    </Box>
  );
};

export default AllExperiencesTable;
