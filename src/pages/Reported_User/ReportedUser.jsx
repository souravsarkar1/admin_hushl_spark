import TableCard2 from './TableCard2'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { reportedBy } from '../../redux/userReducer/action';
import { Box } from '@chakra-ui/react';

const ReportedUser = () => {
  const dispatch = useDispatch();
  const { reportedUser } = useSelector((store) => store.userReducer);
  // console.log({ "report": reportedUser });

  useEffect(() => {
    dispatch(reportedBy());
  }, [dispatch]);
  
  return (
    <Box>
      <TableCard2 reportedUser={reportedUser} />
    </Box>
  )
}

export default ReportedUser
