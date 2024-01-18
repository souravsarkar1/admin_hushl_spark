import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { deleteUser, remove_report, resetReportedUsers } from '../../redux/userReducer/action';

const TableCard2 = ({ reportedUser }) => {

  const [reportedData, setReportedData] = useState(reportedUser);
  // console.log("reported", reportedData);
  // For Active to Inactive Status
  const [showRightTick, setShowRightTick] = useState(false);

  // For delete user

  const dispatch = useDispatch();
  const toast = useToast()

 



  const handleDeleteUser = (_id) => {
    const data = {
      userId: _id,
    };
    // Perform delete logic here
    // console.log(`Deleting user with ID: ${ _id }`);
    dispatch(deleteUser(data));

     // Dispatch the removeReportedUser action with the _id of the user to remove from reportedUser
  dispatch(resetReportedUsers(_id));
  
    toast({
      title: `User-${_id} deleted by admin successfully!`,
      description: "User Deleted!!",
      status: 'success',
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  

  };

  const handleRemoveReport = (reportedId, reporterId) => {
    // Perform rejection logic
    const data = {
      reportedId: reportedId,
      reporterId: reporterId,
    };

    dispatch(remove_report(data))
        // console.log("handleRemoveReport",reportedData)

        // Dispatch the removeReportedUser action with the _id of the user to remove from reportedUser
        dispatch(resetReportedUsers(reportedId));

        setShowRightTick(true);

        toast({
          title: `Report removed for User-${reportedId} successfully!`,
          description: "Report Removed!",
          status: 'success',
          duration: 3000,
          position: "top",
          isClosable: true,
        });
  };

  useEffect(() => {
    setReportedData(reportedUser);
  }, [reportedUser]);

  return (
    <TableContainer borderWidth="1px" borderRadius="md" overflow="hidden">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Reported By</Th>
            <Th>Message</Th>
            <Th>Reports Count</Th>
            <Th>Status</Th>
             <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reportedData.data?.length > 0 &&
            reportedData.data?.map((user) => (
              <Tr key={user._id}>
                <Td>{`${user.firstName} ${user.lastName}`}</Td>
                <Td>
                  {user.reported?.map((report, index) => (
                    <div key={index}>
                      <p>{report.reportedBy}</p>
                    </div>
                  ))}
                </Td>
                <Td>
                  {user.reported?.map((report, index) => (
                    <div key={index}>
                      <p>{report.message}</p>
                    </div>
                  ))}
                </Td>
                <Td>{user.reported.length}</Td>
                <Td>
                    <IconButton
                      icon={showRightTick ? <CheckIcon /> : <CloseIcon />}
                      colorScheme={showRightTick ? 'green' : 'red'}
                      aria-label={showRightTick ? 'Approved' : 'Rejected'}
                      onClick={() => handleRemoveReport(user._id, user.reported[0].reportedBy)}
                    />
                    </Td>
                    <Td>
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      aria-label="Delete"
                      mr={2}
                      onClick={() => handleDeleteUser(user._id)}
                    />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TableCard2