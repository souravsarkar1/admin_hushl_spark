import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react';
import Popup from '../../components/PopUp';
import { eidtBookingStatus, getAllBookedExperiences } from '../../redux/bookingExperience/action';
import Pagination from '../Pagination';
import { PageLoader } from '../../components/PageLoader';

const Booking = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.authReducer);
  const bookingData = useSelector((state) => state.bookingReducer);

  const [selectedStatus, setSelectedStatus] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [cansalationReason, setCansalationReason] = useState('');
  const [bookedForSort, setBookedForSort] = useState("");
  const [bookedOnSort, setBookedOn] = useState("");
  // const []
  const [page, setPage] = useState(1);
  const toast = useToast();
  const itemsPerPage = 10;
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };
  console.log(bookingData.bookingData.data);
  // console.log(bookingData);
  const bookingStatusOptions = ['pending', 'confirmed', 'cancelled',];
  const paymentStatusOptions = ['pending', 'success', 'cancelled',];

  useEffect(() => {
    dispatch(getAllBookedExperiences(accessToken.data.accessToken.accessTokenJWT, page, bookingStatus, paymentStatus, verificationStatus, bookedForSort, bookedOnSort));
  }, [dispatch, accessToken, page, bookingStatus, paymentStatus, verificationStatus, bookedForSort, bookedOnSort]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  const handleBookingStatusChange = (id) => {
    console.log(selectedStatus);
    const status = {
      bookingStatus: selectedStatus,
      bookingId: id,
      adminCancellationReason: cansalationReason !== "" && selectedStatus === "cancelled" ? cansalationReason : ""
    }
    dispatch(eidtBookingStatus(status, accessToken.data.accessToken.accessTokenJWT, toast))
  }

  if (bookingData.getBookingDataIsLoading) {
    return <PageLoader />
  }

  return (
    <Flex flexDir="column">
      <Center>
        <Heading color="green">Booking Experience Table</Heading>
      </Center>
      <Center>
        <Flex gap={4}>
          <Box gap={5}>
            <label htmlFor="">Filter By Booking Status</label>
            <Select value={bookingStatus} onChange={(e) => setBookingStatus(e.target.value)}>
              {bookingStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </Select>
          </Box>
          <Box>
            <label htmlFor="">Filter By Payment Status</label>
            <Select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
              {paymentStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </Select>

          </Box>
          <Box>
            <label htmlFor="">Sort by Datingign Date</label>
            <Select value={bookedForSort} onChange={(e) => setBookedForSort(e.target.value)}>

              <option value={"asc"}>Accending Sort</option>
              <option value={"desc"}>Decending Sort</option>

            </Select>

          </Box>
          <Box>
            <label htmlFor="">Sort by Datingign Date</label>
            <Select value={bookedOnSort} onChange={(e) => setBookedOn(e.target.value)}>

              <option value={"asc"}>Accending Sort</option>
              <option value={"desc"}>Decending Sort</option>

            </Select>

          </Box>
          <Box>
            <label htmlFor="">Filter By Admin Verification</label>
            <Select value={verificationStatus} onChange={(e) => setVerificationStatus(e.target.value)}>

              <option value={true}>Verified</option>
              <option value={false}>Not-Verified</option>
            </Select>
          </Box>
        </Flex>
      </Center>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Sl No.</Th>
              <Th>Name</Th>
              <Th>Experience Title</Th>
              <Th>Booked On</Th>
              <Th>Booked For</Th>
              <Th>Payment Status</Th>
              <Th>Phone Number</Th>
              <Th>Email Id</Th>
              <Th>Booking Status</Th>
              <Th>User Cancellation Reason</Th>
              <Th>Admin Cancellation Reason</Th>
              <Th>Price</Th>
              <Th>Location Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(bookingData?.bookingData?.data) && bookingData?.bookingData?.data?.map((item, index) => (
              <Tr key={item._id}>
                <Td>{index + 1}</Td>
                <Td>{item.experience.name}</Td>
                <Td>{item.experience.title}</Td>
                <Td>{item.createdAt}</Td>
                <Td>{item.bookedFor}</Td>
                <Td>
                  <Center>
                    <Text p={3}>
                      {item.paymentStatus}
                    </Text>
                  </Center>
                  {/*  <Popup
                    children={
                      <Box p={4} borderWidth="1px" borderRadius="md">
                        <Heading mb={4} fontSize="xl">
                          Select The Value
                        </Heading>
                        <Select
                          placeholder="---Select the Value---"
                          value={selectedStatus}
                          onChange={(e) => handleStatusChange(e.target.value)}
                        >
                          <option value="next">Process For next step</option>
                          <option value="cancel">Cancel the Booking</option>
                        </Select>
                      </Box>
                    }
                    modalTitle="Verify Booking Status"
                    colorofModal="green"
                  />*/}
                </Td>
                <Td>{`${item.booker.countryCode}${item.booker.phoneNumber}`}</Td>
                <Td>{item.booker.email}</Td>
                <Td>
                  {item.paymentStatus === "success" && <Box>
                    <Center>
                      <Text p={3}>
                        {item.bookingStatus}
                      </Text>
                    </Center>
                    <Popup
                      children={
                        <Box p={4} borderWidth="1px" borderRadius="md">
                          <Heading mb={4} fontSize="xl">
                            Select The Value
                          </Heading>
                          <Flex direction="column">
                            <RadioGroup value={selectedStatus} p={4} onChange={(value) => handleStatusChange(value)}>
                              <Stack direction="column">
                                <Radio color={"green"} value="confirmed">Process For Next Step</Radio>
                                <Radio color={"red"} value="cancelled">Cancel the Booking</Radio>
                              </Stack>
                            </RadioGroup>
                            {selectedStatus === "cancelled" ? <Textarea value={cansalationReason} onChange={(e) => setCansalationReason(e.target.value)} placeholder='Enter the Cansalation Reason' /> : null}
                            <Button m={3} colorScheme='teal' w={"50%"} onClick={() => handleBookingStatusChange(item._id)} >Submit</Button>
                          </Flex>
                        </Box>

                      }
                      modalTitle="Verify Booking Status"
                      colorofModal="green"
                    />
                  </Box>}
                </Td>
                <Td>{item.userCancellationReason}</Td>
                <Td>{item.adminCancellationReason}</Td>
                <Td>{ }</Td>
                <Td>

                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        totalPages={Math.ceil(bookingData.length / itemsPerPage)}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </Flex>
  );
};

export default Booking;
