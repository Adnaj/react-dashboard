import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactPaginate from 'react-paginate';
import { Eye } from 'lucide-react';
import './assesment.css';
import { images } from '../../assets/images'
import { ChevronLeft, ChevronRight } from 'lucide-react';


function ViewReport() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [submittedStartDate, setSubmittedStartDate] = useState(null);
    const [submittedEndDate, setSubmittedEndDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const studentsPerPage = 10;

    const data = [
        { id: 1, name: 'John Smith', enrollment: '2023001', score: '88/100', date: '2024-01-15', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 2, name: 'Emily Davis', enrollment: '2023002', score: '90/100', date: '2024-02-10', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 3, name: 'Michael Johnson', enrollment: '2023003', score: '85/100', date: '2024-03-05', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 4, name: 'Sophia Martinez', enrollment: '2023004', score: '92/100', date: '2024-04-22', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 5, name: 'Liam Patel', enrollment: '2023005', score: '87/100', date: '2024-05-18', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 6, name: 'Olivia Lee', enrollment: '2023006', score: '89/100', date: '2024-06-25', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 7, name: 'Noah Kim', enrollment: '2023007', score: '91/100', date: '2024-07-12', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 8, name: 'Ava Clark', enrollment: '2023008', score: '88/100', date: '2024-08-19', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 9, name: 'Lily White', enrollment: '2023009', score: '86/100', date: '2024-01-16', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 10, name: 'James Brown', enrollment: '2023010', score: '90/100', date: '2024-02-15', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 11, name: 'Ella Williams', enrollment: '2023011', score: '93/100', date: '2024-03-10', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 12, name: 'Henry Moore', enrollment: '2023012', score: '88/100', date: '2024-04-12', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 13, name: 'Liam White', enrollment: '2023013', score: '92/100', date: '2024-05-10', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 14, name: 'Mia Martinez', enrollment: '2023014', score: '89/100', date: '2024-06-14', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 15, name: 'Lucas Smith', enrollment: '2023015', score: '87/100', date: '2024-07-15', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 16, name: 'Ethan Jones', enrollment: '2023016', score: '91/100', date: '2024-08-10', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 17, name: 'Harper Brown', enrollment: '2023017', score: '88/100', date: '2024-09-12', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 18, name: 'Zoe Williams', enrollment: '2023018', score: '86/100', date: '2024-10-10', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 19, name: 'Aiden Johnson', enrollment: '2023019', score: '89/100', date: '2024-11-05', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
        { id: 20, name: 'Charlotte Martinez', enrollment: '2023020', score: '87/100', date: '2024-12-18', pdfLink: 'https://drive.google.com/file/d/1-E5Huf8Z8atTleZRcnyIhZoU5gu-wY8C/view?usp=sharing' },
    ];

    // Sort the filteredData in descending order by date
    const filteredData = data
        .filter(student => {
            const studentDate = new Date(student.date);
            if (submittedStartDate && submittedEndDate) {
                return studentDate >= submittedStartDate && studentDate <= submittedEndDate;
            } else if (submittedStartDate) {
                return studentDate >= submittedStartDate;
            } else if (submittedEndDate) {
                return studentDate <= submittedEndDate;
            }
            return true;
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sorting in descending order

    // Get current students to display based on pagination
    const indexOfLastStudent = (currentPage + 1) * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredData.slice(indexOfFirstStudent, indexOfLastStudent);

    // Change page
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const pageCount = Math.ceil(filteredData.length / studentsPerPage);

    // Handle submit
    const handleSubmit = () => {
        setSubmittedStartDate(startDate);
        setSubmittedEndDate(endDate);
        setCurrentPage(0); // Reset to the first page after filtering
    };

    // Function to format the date to dd/mm/yyyy
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
            <div className="view-report-table">
                <table className="min-w-full divide-y">
                    <thead>
                        <tr>
                            <th className=" pl-[50px] tracking-wider">Student Name</th>
                            <th className=" text-center tracking-wider">Student Enrollment No</th>
                            <th className="tracking-wider">Final Score</th>
                            <th className=" tracking-wider">Detail Overview of Grade</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentStudents.map((student) => (
                            <tr key={student.id}>
                                <td className=" whitespace-nowrap">{student.name}</td>
                                <td className="text-center whitespace-nowrap">{student.enrollment}</td>
                                <td className="text-center whitespace-nowrap">{student.score}</td>
                                <td className="text-center  whitespace-nowrap">
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

                 {/* Pagination */}
            <ReactPaginate
                previousLabel={<ChevronLeft />} 
                nextLabel={<ChevronRight/>} 
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
