import React,{useEffect} from 'react'
import TableCard from './TableCard';
import {useDispatch, useSelector} from "react-redux";
import { getUser } from '../../redux/userReducer/action';
import { Box } from '@chakra-ui/react';

const MalePage = () => {
  const dispatch = useDispatch();
  const {users} = useSelector((store)=>store.userReducer);
  // console.log({users});

  useEffect(()=>{
    dispatch(getUser("Male"));
},[dispatch])

  return (
    <Box>
      <TableCard users={users}/>
    </Box>
  )
}

export default MalePage
