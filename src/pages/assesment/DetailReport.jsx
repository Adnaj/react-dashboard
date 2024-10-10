import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactPaginate from 'react-paginate';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import './assesment.css';
import axios from '../../constants/axiosConfig';
import { images } from '../../assets/images';
import { Modal } from "flowbite-react";

function ViewReport() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [submittedStartDate, setSubmittedStartDate] = useState(null);
    const [submittedEndDate, setSubmittedEndDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true); // New state for loading
    const itemsPerPage = 10;

    // Fetch data from API
    const fetchData = async () => {
        try {
            const response = await axios.get('/ai_assessment/detailed_assessment_report/');
            const fetchedData = response.data.data.map(item => ({
                id: item.id,
                module: item.vchr_module_name,
                faculty: item.vchr_faculty_name,
                dateOfEvaluation: item.dat_evaluation,
                studentsCount: item.int_assessment_count,
                students: item.details.map(detail => ({
                    name: detail.vchr_student_name,
                    score: detail.vchr_final_score
                }))
            }));
            setData(fetchedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Stop loading once data is fetched
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter and sort data
    const filteredData = data
        .filter(entry => {
            const entryDate = new Date(entry.dateOfEvaluation);
            if (submittedStartDate && submittedEndDate) {
                return entryDate >= submittedStartDate && entryDate <= submittedEndDate;
            } else if (submittedStartDate) {
                return entryDate >= submittedStartDate;
            } else if (submittedEndDate) {
                return entryDate <= submittedEndDate;
            }
            return true;
        })
        .sort((a, b) => new Date(b.dateOfEvaluation) - new Date(a.dateOfEvaluation));

    // Pagination
    const indexOfLastEntry = (currentPage + 1) * itemsPerPage;
    const indexOfFirstEntry = indexOfLastEntry - itemsPerPage;
    const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const handleSubmit = () => {
        setSubmittedStartDate(startDate);
        setSubmittedEndDate(endDate);
        setCurrentPage(0); // Reset to the first page after filtering
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="tab-view-report max-w-[981px] mx-auto">
            <div className="flex space-x-1 date-filter">
                <img src={images.CalendorIcon} alt="" />
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

            <div className="view-report-table overflow-x-auto">
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <p>Loading data...</p>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left">Module Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty Name</th>
                                <th className="text-center">List of Students</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Evaluation</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentEntries.map((entry) => (
                                <tr key={entry.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.module}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.faculty}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center justify-center">
                                            <span className="inline-flex text-count items-center justify-center">{entry.studentsCount}</span>
                                            <button
                                                className='eyeicon'
                                                onClick={() => {
                                                    setSelectedStudent(entry.students);
                                                    setOpenModal(true);
                                                }}
                                            >
                                                <img src={images.EyeIcon} alt="" /> view
                                            </button>
                                        </div>
                                    </td>
                                    <td className="text-center">{formatDate(entry.dateOfEvaluation)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

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

                <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} className='modal-bdy'>
                    <Modal.Body>
                        {selectedStudent ? (
                            <div>
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 text-left">
                                            <th className="text-center">NO</th>
                                            <th className="text-center">Student name</th>
                                            <th className="text-center">Final Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedStudent.map((student, index) => (
                                            <tr key={index} className="border-t border-gray-200">
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">{student.name}</td>
                                                <td className="text-center">{student.score}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No student data available</p>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default ViewReport;
