import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    VStack,
    useToast,
    Textarea,
} from '@chakra-ui/react';
import { globalData, loginData } from '../../../data/global';
import { useDispatch, useSelector } from 'react-redux';
import { postExperience, updateExperienceDataSecondStep } from '../../../redux/experiences/action';
import LocationComponent from './ExperienceInputCompoenents/Location';
import HandleImageUpload from './ExperienceInputCompoenents/HandleImageUpload';
import HandleVidoeUpload from './ExperienceInputCompoenents/HandleVidoeUpload';
import ButtonLoader from '../../../components/Loader';
import TimeSelectorCalander from './ExperienceInputCompoenents/ScheduleCalander';
import HandleIncludedPakages from './ExperienceInputCompoenents/HandleIncludedPagages';
import { validationExperienceFormData } from '../../../utlis/experienceValidator';
// import { HandleIncludedPakages } from './ExperienceInputCompoenents/HandleIncludedPagages';

const ExperienceForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location_name: '',
        description: '',
        created_by: loginData.name,
        location: {
            longitude: 0,
            latitude: 0,
            name : ""
        },
        name: '',
        includedPackages: [
            {
                includedPackagesName: "",
                packagesDescription: ""
            }
        ],
        media: {
            videos: [
                {
                    title: '',
                    url: '',
                },
            ],
            images: [
                {
                    url: '',
                    title: '',
                },
            ],
        },
        schedulesAvailable: [
            { day: 'Monday', startTime: '', endTime: '', slots: 0 },
            { day: 'Tuesday', startTime: '', endTime: '', slots: 0 },
            { day: 'Wednesday', startTime: '', endTime: '', slots: 0 },
            { day: 'Thursday', startTime: '', endTime: '', slots: 0 },
            { day: 'Friday', startTime: '', endTime: '', slots: 0 },
            { day: 'Saturday', startTime: '', endTime: '', slots: 0 },
            { day: 'Sunday', startTime: '', endTime: '', slots: 0 },
        ],
    });
    const [finalFromData, setFinalFromData] = useState({
        media: {
            videos: [
                {
                    title: '',
                    url: '',
                },
            ],
            images: [
                {
                    url: '',
                    title: '',
                },
            ],
        },
        schedulesAvailable: [
            { day: 'Monday', startTime: '', endTime: '', slots: 0 },
            { day: 'Tuesday', startTime: '', endTime: '', slots: 0 },
            { day: 'Wednesday', startTime: '', endTime: '', slots: 0 },
            { day: 'Thursday', startTime: '', endTime: '', slots: 0 },
            { day: 'Friday', startTime: '', endTime: '', slots: 0 },
            { day: 'Saturday', startTime: '', endTime: '', slots: 0 },
            { day: 'Sunday', startTime: '', endTime: '', slots: 0 },
        ],
    })
    const [showHideSecondStep, setShowHideSecondStep] = useState(false);
    const authData = useSelector(st => st.authReducer);
    const dispatch = useDispatch();
    const toast = useToast();
    const loader = useSelector((state) => state.experienceReducer.postExperienceDataIsLoading);
    const preGeneratedExperienceData = useSelector((state) => state.experienceReducer.preGeneratedExpericeData);

    const { _id } = preGeneratedExperienceData;
    // console.log(_id);
    const handleSubmit = (e) => {
        e.preventDefault();
       const flag =  validationExperienceFormData(formData,toast);
        // Add your logic to send the form data to the server or perform any other actions
        if (flag) {
            dispatch(postExperience(authData.accessToken.data.accessToken.accessTokenJWT, formData, toast, setShowHideSecondStep)); // Assuming postExperience is your action creator
        }

        // You can also perform any other actions after form submission
        // For example, redirecting the user to another page
        // history.push('/success');
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        // console.log(finalFromData);
        // if (_id) {
        console.log(finalFromData);
        dispatch(updateExperienceDataSecondStep(_id, finalFromData, toast, authData.accessToken.data.accessToken.accessTokenJWT));
        // }

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue;
        if (name === 'reviews_count' || name === 'rating' || name === "price") {
            newValue = +value;
        } else {
            newValue = value;
        }
        setFormData((prevData) => ({ ...prevData, [name]: newValue }));
    };




    return (
        <Box w={'60%'} m={'auto'} textAlign={'center'}>
            <form>
                <VStack spacing={4} align="stretch">
                    {/* Title */}
                    <FormControl id="title">
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter the Title"
                        />
                    </FormControl>
                    {/* Name */}
                    <FormControl id="title">
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter the Name"
                        />
                    </FormControl>

                    {/* Price */}
                    <FormControl id="price">
                        <FormLabel>Price</FormLabel>
                        <Input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                        />
                    </FormControl>

                    {/* Location Name */}
                    <FormControl id="location_name">
                        <FormLabel>Location Name</FormLabel>
                        <LocationComponent formData={formData} setFormData={setFormData} toast={toast} />
                    </FormControl>


                    {/*Description */}
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description here"
                        />
                    </FormControl>
                    <HandleIncludedPakages formData={formData} setFormData={setFormData} />
                    {!showHideSecondStep && <Button onClick={handleSubmit} colorScheme={globalData.buttonColorNormal}>Complete Fist Step</Button>}


                    {showHideSecondStep && <Box>

                        {/* Media - Videos */}
                        <HandleVidoeUpload id={_id} formData={finalFromData} setFormData={setFinalFromData} />

                        {/* Media - Image URLs */}
                        <HandleImageUpload id={_id} formData={finalFromData} setFormData={setFinalFromData} />

                        {/* Available Schedule */}

                        <TimeSelectorCalander formData={finalFromData} setFormData={setFinalFromData} />

                        {/* Submit Button */}
                        <Box>
                            <Button onClick={handleFinalSubmit} colorScheme={globalData.buttonColorNormal} type="submit">
                                {loader ? <ButtonLoader w={40} h={40} /> : ' Submit'}
                            </Button>
                        </Box>
                    </Box>}
                </VStack>
            </form>
        </Box>
    );
};

export default ExperienceForm;
