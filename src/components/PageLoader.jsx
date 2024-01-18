import { Center } from '@chakra-ui/react'
import React from 'react'
import { Hourglass } from 'react-loader-spinner'
export const PageLoader = () => {
    return (
        <Center margin={"50px"} padding={"50px"}>
            <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#fc03fc', '#15ada3']}
            />
        </Center>
    )
}
