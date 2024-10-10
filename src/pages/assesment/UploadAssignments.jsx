import React, { useState, useEffect } from 'react';
import './assesment.css';
import { Upload, Button, message } from 'antd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function UploadAssignments() {
    const [startDate, setStartDate] = useState(null);
    const [facultyFirstName, setFacultyFirstName] = useState('');
    const [facultyLastName, setFacultyLastName] = useState('');
    const [moduleName, setModuleName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [courses, setCourses] = useState([]); // State to hold course list
    const [modules, setModules] = useState([]); // State to hold module list
    const [loading, setLoading] = useState(false); // Loading state for button

    useEffect(() => {
        // Fetch the course list from the API
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/ai_assessment/course_list/');
                if (response.status === 200) {
                    setCourses(response.data);
                    console.log("course", response.data);
                }
            } catch (error) {
                message.error('Failed to load course list.');
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        // Fetch the module list based on the selected course
        const fetchModules = async (courseId) => {
            try {
                const response = await axios.post(
                    `http://127.0.0.1:8000/ai_assessment/module_list/`,
                    { intCourseId: courseId }, // Send courseId in the request body as JSON
                    {
                        headers: {
                            'Content-Type': 'application/json' // Set header type as JSON
                        }
                    }
                );
                
                if (response.status === 200) {
                    console.log("courseId", courseId);
                    setModules(response.data);
                    console.log("module", response.data);
                }
            } catch (error) {
                message.error('Failed to load module list.');
                console.error('Error fetching modules:', error);
            }
        };
    
        // Fetch modules only if a course is selected
        if (courseName) {
            console.log(courseName);
            fetchModules(courseName);
        } else {
            setModules([]); // Reset modules if no course is selected
        }
    }, [courseName]);
    

    const beforeUpload = (file) => {
        const isFileSizeValid = file.size / 1024 / 1024 < 100; // Check if file is less than 100MB
        if (!isFileSizeValid) {
            message.error(`${file.name} is larger than 100MB. Please upload a smaller file.`);
        }
        return isFileSizeValid || Upload.LIST_IGNORE; // Return false to prevent upload if file is too large
    };

    const handleUploadChange = (info) => {
        setAssignments(info.fileList); // Update assignments state with uploaded files
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true); // Start loading

        // Validation checks
        if (!facultyFirstName.trim()) {
            message.error('Faculty first name is required.');
            setLoading(false);
            return;
        }
        if (!facultyLastName.trim()) {
            message.error('Faculty last name is required.');
            setLoading(false);
            return;
        }
        if (!courseName) {
            message.error('Please select a course.');
            setLoading(false);
            return;
        }
        if (!moduleName) {
            message.error('Please select a module.');
            setLoading(false);
            return;
        }
        if (!startDate) {
            message.error('Please select a module month.');
            setLoading(false);
            return;
        }
        if (assignments.length === 0) {
            message.error('Please upload at least one assignment file.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        assignments.forEach(file => {
            formData.append('studentAssignmentFile', file.originFileObj); // Append each file to FormData
        });
        formData.append('strFacultyFirstName', facultyFirstName);
        formData.append('strFacultyLastName', facultyLastName);
        formData.append('intModuleId', moduleName);  // Ensure moduleName is an integer
        formData.append('intCourseId', courseName);  // Assuming courseName is an ObjectId string
        formData.append('moduleMonth', startDate ? startDate.toISOString().split('T')[0] : '');

        try {
            const response = await axios.post('http://127.0.0.1:8000/ai_assessment/ai_assessment/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                message.success('Assignments uploaded successfully!');
                console.log('Form Data:', Object.fromEntries(formData.entries()));
                console.log(response.data);
            }
        } catch (error) {
            message.error('Failed to upload assignments. Please try again.');
            console.error(error);
        } finally {
            setLoading(false); // Stop loading when response is received
        }
    };

    return (
        <div className='max-w-[1194px] mx-auto tab-pannel-1'>
            <form onSubmit={handleSubmit} className="flex space-x-4">
                {/* First section - 60% width */}
                <div className="w-3/5 space-y-4 form-sec-1">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="faculty-first-name" className="block">Faculty First Name</label>
                            <input
                                id="faculty-first-name"
                                type="text"
                                placeholder="Type here"
                                required
                                className="mt-1 block w-full focus:outline-none"
                                value={facultyFirstName}
                                onChange={(e) => setFacultyFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="faculty-last-name" className="block">Faculty Last Name</label>
                            <input
                                id="faculty-last-name"
                                type="text"
                                placeholder="Type here"
                                required
                                className="mt-1 block w-full shadow-sm focus:outline-none"
                                value={facultyLastName}
                                onChange={(e) => setFacultyLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-col-1 gap-4">
                        <div>
                            <label htmlFor="module-name" className="block text-sm font-medium text-gray-700">Module Name</label>
                            <select
                                id="module-name"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={moduleName}
                                onChange={(e) => setModuleName(e.target.value)}
                            >
                                <option value="">Select Module</option>
                                {modules && modules.data && modules.data.map((module) => (
                                    <option key={module.id} value={module.id}>{module.vchr_name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Upload section */}
                        <div>
                            <Upload.Dragger
                                className='upload-input'
                                multiple
                                showUploadList={{ showRemoveIcon: true }}
                                listType='text'
                                accept='.pdf,.txt,.doc'
                                beforeUpload={beforeUpload}
                                onChange={handleUploadChange}
                            >
                                <div className='assgn-txt'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                                        <path d="M43.5776 22.1917C43.5776 34.0997 33.9943 43.749 22.1778 43.749C10.3613 43.749 0.77807 34.0997 0.77807 22.1917C0.77807 10.2837 10.3613 0.634485 22.1778 0.634485C33.9943 0.634485 43.5776 10.2837 43.5776 22.1917Z" stroke="#296D63" strokeWidth="0.667163" />
                                        <path d="M9.13785 22.4773H31.6005M20.4308 10.6492C21.0266 14.5919 24.0051 22.4773 31.1537 22.4773C24.0051 22.4773 21.0266 30.3627 20.4308 34.3054" stroke="#296D63" strokeWidth="1.00074" />
                                    </svg>
                                    <span className='pl-2'>Upload Students Assignments</span>
                                </div>
                                <Button>Upload Assignments</Button>
                                Or Drop files here
                            </Upload.Dragger>
                        </div>
                        {/* Upload section end */}
                    </div>
                </div>

                {/* Second section - 40% width */}
                <div className="w-2/5 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label htmlFor="course-name" className="block">Course Name</label>
                            <select
                                id="course-name"
                                required
                                className="mt-1 block w-full"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            >
                                <option value="">Select Course</option>
                                {courses && courses.data && courses.data.map((course) => (
                                    <option key={course.id} value={course.id}>{course.vchr_name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="module-month" className="block text-sm font-medium text-gray-700">Module Month</label>
                            <div className="flex w-full">
                                <DatePicker
                                    id="module-date"
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="MM/yyyy" // Format to show only month and year
                                    placeholderText="mm/yyyy"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    showMonthYearPicker // Enable month and year picker only
                                    showYearDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={15}
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="border-transparent bg-[#D9634E] hover:bg-[#D9634E] text-white px-4 py-2 rounded focus:outline-none hover:bg-transparent"
                        disabled={loading}
                        loading={loading} // Set loading state here
                    >
                        {loading ? "Uploading..." : 'Submit' }
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default UploadAssignments;
