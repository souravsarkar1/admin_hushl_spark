import React, {  } from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Button,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {useDispatch} from "react-redux";
import { approval_for_verifying_User,
   rejection_for_verifying_User,
    resetUsers } from '../../redux/userReducer/action';

const TableCard = ({ users, userId }) => {

  console.log("usersTble card",users)
  // const [isVerified, setIsVerified] = useState(null);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleApproval = (user) => {
    const { _id } = user;

    // Dispatch the approval action
    dispatch(approval_for_verifying_User({ userId: _id }));

    // Dispatch the resetUsers action
    dispatch(resetUsers(_id ));

    // Display a toast message
    toast({
      title: 'User Verified',
      status: 'success',
      duration: 3000,
      position:"top",
      isClosable: true,
    });
  };

  const handleRejection = (user) => {
    const { _id } = user;

    // Dispatch the rejection action
    dispatch(rejection_for_verifying_User({ userId: _id }));

    // Dispatch the resetUsers action
    dispatch(resetUsers( _id ));

    // Display a toast message
    toast({
      title: 'User Unverified',
      status: 'error',
      duration: 3000,
      position:"top",
      isClosable: true,
    });
  };

  return (
    <TableContainer borderWidth="1px" borderRadius="md" overflow="hidden">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Images</Th>
            <Th>Instagram Id</Th>
            <Th>Bio</Th>
            <Th>Approval</Th>
            <Th>Un-Approval</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.data?.length > 0 &&
            users.data?.map((el) => (
              <Tr key={el._id}>
                <Td>{`${el.firstName} ${el.lastName}`}</Td>
                <Td>
                  <img
                    src={el.photos}
                    alt="UserImage"
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                </Td>
                <Td>{el.insta_id}</Td>
                <Td>{el.bio}</Td>
                <Td>
                    <Button
                      colorScheme="green"
                      onClick={() => handleApproval(el)}
                      disabled={el.isVerified === true}
                      leftIcon={<CheckIcon />}
                    ></Button>
                    </Td>
                    <Td>
                    <Button
                      colorScheme="red"
                      onClick={() => handleRejection(el)}
                      disabled={el.isVerified === false}
                      leftIcon={<CloseIcon />}
                    ></Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableCard;