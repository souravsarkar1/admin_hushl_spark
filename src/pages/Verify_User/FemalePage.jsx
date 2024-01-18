import React,{useEffect} from 'react'
import TableCard from './TableCard';
import {useDispatch, useSelector} from "react-redux";
import { getUser } from '../../redux/userReducer/action';
import { Box } from '@chakra-ui/react';
// import Pagination from '../Pagination';

const FemalePage = () => {
  const dispatch = useDispatch();
  const {users} = useSelector((store)=>store.userReducer);
  // console.log({"female":users});

  useEffect(()=>{
    dispatch(getUser("Female"));
},[dispatch])

  return (
    <Box>
    <TableCard users={users}/>
    {/* <Pagination/> */}
    </Box>
  )
};

export default FemalePage
