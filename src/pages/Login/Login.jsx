import React, { useState } from "react";
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    Heading,
    useToast,
} from "@chakra-ui/react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"; // Import icons
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../redux/authentication/action";
import ButtonLoader from "../../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();
    const authData = useSelector(st => st.authReducer);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const location = useLocation();
    // console.log(authData);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        dispatch(adminLogin(loginData, toast));
        if (!authData.loginIsError && location.state) {
            setTimeout(() => {
                navigation(location.state);
            }, 2000);
        }
    };


    return (
        <Flex align="center" justify="space-evenly" h="100vh">
            <Box><img src="https://img.freepik.com/premium-vector/online-dating-with-young-lover-man-giving-flowers-her-girlfriend-through-smartphone-illustration_138260-997.jpg" alt="background_img" /></Box>
            <Box width="400px" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
                <Heading textAlign={"center"} marginBottom={10} color={"#ff747b"}>ADMIN PANEL</Heading>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={loginData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                        />
                        <InputRightElement>
                            {showPassword ? (
                                <RiEyeOffLine onClick={handleTogglePassword} />
                            ) : (
                                <RiEyeLine onClick={handleTogglePassword} />
                            )}
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button
                    backgroundColor="#ff747b"
                    width="full"
                    mt={4}
                    onClick={handleLogin}
                >
                    {authData.loginIsLoading ? <ButtonLoader w={40} h={40} /> : "Login"}
                </Button>
            </Box>
        </Flex>
    );
};

export default Login;
