import React, { useState, useEffect } from 'react';
import axios from '../../constants/axiosConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactPaginate from 'react-paginate';
import { Eye } from 'lucide-react';
import './assesment.css';
import { images } from '../../assets/images';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ViewReport() {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [submittedStartDate, setSubmittedStartDate] = useState(null);
    const [submittedEndDate, setSubmittedEndDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true); // New loading state
    const studentsPerPage = 10;

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/ai_assessment/assessment_report/');
                console.log("API Response:", response.data.data); // Log the response
                const apiData = response.data.data.map((item, index) => {
                    const dateObj = new Date(item.dat_created);
                    const formattedDate = dateObj.toLocaleDateString('en-GB'); // format to dd/MM/yyyy
                    return {
                        id: index,
                        name: item.vchr_student_name,
                        enrollment: item.vchr_student_enrollment_number,
                        score: item.vchr_final_score,
                        date: formattedDate,
                        pdfLink: item.file_detailed_overview
                    };
                });
                setData(apiData);
                setLoading(false); // Set loading to false once data is fetched
                console.log("apidata", apiData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false); // Set loading to false even if there's an error
            }
        };
        fetchData();
    }, []);

    // Function to parse dd/MM/yyyy to Date object
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    // Filter, sort, and paginate the data
    const filteredData = data
        .filter(student => {
            const studentDate = parseDate(student.date);
            if (submittedStartDate && submittedEndDate) {
                return studentDate >= submittedStartDate && studentDate <= submittedEndDate;
            } else if (submittedStartDate) {
                return studentDate >= submittedStartDate;
            } else if (submittedEndDate) {
                return studentDate <= submittedEndDate;
            }
            return true;
        })
        .sort((a, b) => parseDate(b.date) - parseDate(a.date)); // Sort by date descending

    const indexOfLastStudent = (currentPage + 1) * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredData.slice(indexOfFirstStudent, indexOfLastStudent);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const pageCount = Math.ceil(filteredData.length / studentsPerPage);

    const handleSubmit = () => {
        setSubmittedStartDate(startDate ? parseDate(startDate.toLocaleDateString('en-GB')) : null);
        setSubmittedEndDate(endDate ? parseDate(endDate.toLocaleDateString('en-GB')) : null);
        setCurrentPage(0); 
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="tab-view-report max-w-[981px] mx-auto">
            <div className="flex space-x-1 date-filter">
                <img src={images.CalendorIcon} alt="Calendar Icon" />
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    dateFormat="dd/MM/yyyy"
                />
                -
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
                    dateFormat="dd/MM/yyyy"
                />
                <button onClick={handleSubmit}>
                    Apply now
                </button>
            </div>
            
            <div className="view-report-table">
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <p>Loading data...</p>
                    </div>
                ) : (
                    <table className="min-w-full divide-y">
                        <thead>
                            <tr>
                                <th className="pl-[50px] tracking-wider">Student Name</th>
                                <th className="text-center tracking-wider">Student Enrollment No</th>
                                <th className="tracking-wider">Final Score</th>
                                <th className="tracking-wider">Detail Overview of Grade</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentStudents.map((student, index) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap">{student.name}</td>
                                    <td className="text-center whitespace-nowrap">{student.enrollment}</td>
                                    <td className="text-center whitespace-nowrap">{student.score}</td>
                                    <td className="text-center whitespace-nowrap">
                                        <a
                                            href={student.pdfLink}
                                            className="text-blue-600 hover:text-blue-900"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Eye className="inline mr-2 h-4 w-4" /> View
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Pagination */}
                <ReactPaginate
                    previousLabel={<ChevronLeft />}
                    nextLabel={<ChevronRight />}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
            </div>
        </div>
    );
}

export default ViewReport;
