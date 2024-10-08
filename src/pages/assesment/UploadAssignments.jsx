import React, { useState } from 'react';
import './assesment.css';
import { images } from '../../assets/images'
import 'react-tabs/style/react-tabs.css';
import { Upload, Button, message } from 'antd';
import DatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';


function UploadAssignments() {

    const [startDate, setStartDate] = useState(null);

    const beforeUpload = (file) => {
        const isFileSizeValid = file.size / 1024 / 1024 < 5; // Check if file is less than 5MB
        if (!isFileSizeValid) {
            message.error(`${file.name} is larger than 5MB. Please upload a smaller file.`);
        }
        return isFileSizeValid || Upload.LIST_IGNORE; // Return false to prevent upload if file is too large
    };

    return (
        <div className=' max-w-[1194px] mx-auto tab-pannel-1'>
            <form className="flex space-x-4">
                {/* First section - 60% width */}
                <div className="w-3/5 space-y-4 form-sec-1">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="faculty-first-name" className="block">Faculty First Name</label>
                            <input id="faculty-first-name" type="text" placeholder="Type here" required className="mt-1 block w-full focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="faculty-last-name" className="block">Faculty Last Name</label>
                            <input id="faculty-last-name" type="text" placeholder="Type here" required className="mt-1 block w-full  shadow-sm focus:outline-none " />
                        </div>

                    </div>

                    <div className="grid grid-col-1 gap-4">

                        <div>
                            <label htmlFor="module-name" className="block text-sm font-medium text-gray-700">Module Name</label>
                            <select id="module-name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option>Advanced Mathematics</option>
                                <option>Module 2</option>
                                <option>Module 3</option>
                            </select>
                        </div>


                        {/* upload section */}
                        <div>
                            <Upload.Dragger className='upload-input'
                                multiple
                                showUploadList={{ showRemoveIcon: true }}
                                listType='text'
                                accept='.pdf,.txt,.doc'
                                beforeUpload={beforeUpload}
                            >
                                <div className='assgn-txt'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                                        <path d="M43.5776 22.1917C43.5776 34.0997 33.9943 43.749 22.1778 43.749C10.3613 43.749 0.77807 34.0997 0.77807 22.1917C0.77807 10.2837 10.3613 0.634485 22.1778 0.634485C33.9943 0.634485 43.5776 10.2837 43.5776 22.1917Z" stroke="#296D63" stroke-width="0.667163" />
                                        <path d="M9.13785 22.4773H31.6005M20.4308 10.6492C21.0266 14.5919 24.0051 22.4773 31.1537 22.4773C24.0051 22.4773 21.0266 30.3627 20.4308 34.3054" stroke="#296D63" stroke-width="1.00074" />
                                    </svg>
                                    <span className='pl-2'>Upload Students Assignments</span>
                                </div>
                                <Button>Upload Assignments</Button>
                                Or Drop files here
                            </Upload.Dragger>
                        </div>

                        {/* upload section end */}
                    </div>

                </div>

                {/* Second section - 40% width */}
                <div className="w-2/5 space-y-4">


                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label htmlFor="course-name" className="block ">Course Name</label>
                            <select id="course-name" required className="mt-1 block w-full ">
                                <option>Type here</option>
                                <option>Course 1</option>
                                <option>Course 2</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="module-month" className="block text-sm font-medium text-gray-700">Module Month</label>
                            {/* <input id="module-month" type="text" placeholder="mm/yyyy" required className="mt-1 block w-full  focus:outline-none" /> */}
                            <div>
                                <div className="flex w-full">
                                    {/* DatePicker component */}
                                    <DatePicker
                                        id="module-date"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy" // Day/Month/Year format
                                        placeholderText="dd/mm/yyyy"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        showYearDropdown // Enables year dropdown
                                        scrollableYearDropdown // Allows scrolling through years
                                        yearDropdownItemNumber={15} // Shows a range of 15 years in the dropdown
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <button type="submit" className=" border-transparent focus:outline-none">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UploadAssignments
