import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from "flowbite-react";
import './home.css';
import { images } from '../../assets/images';
import Header from '../../components/header/Header';

function Home() {
  return (
    <div className=''>
      <Header className='absolute w-full top-[42px]' />
      <div className=''>
        <div className="flex items-center h-screen justify-center xl:pt-[200px] 2xl:pt-[50px]">
          <div className="w-full max-w-[449px]">
            <div className='home-profile'>

              <Avatar img={images.Avatar} rounded>
                <div className="">
                  <p>Welcome back <span>👋🏻</span></p>
                  <h3>Wade Willson</h3>
                </div>
              </Avatar>
              <p className="">Navigate Your Assessment Workflow</p>

            </div>

            <div className='navigate-div'>
              <div className="navigate-btn">
                {/* Pass activeTab 0 for Upload Assignments */}
                <Link to="/assesment" state={{ activeTab: 0 }}>
                  <img src={images.UploadIcon} alt="" />
                  <p>Upload Assignments</p>
                  <img className='arrowIcon' src={images.Arrow} alt="" />
                </Link>
              </div>

              <div className="navigate-btn">
                {/* Pass activeTab 1 for View Assessment Report */}
                <Link to="/assesment" state={{ activeTab: 1 }}>
                  <img src={images.ReportIcon} alt="" />
                  <p>View Assessment Report</p>
                  <img className='arrowIcon' src={images.Arrow} alt="" />
                </Link>
              </div>

              <div className="navigate-btn">
                {/* Pass activeTab 2 for View Detailed Report */}
                <Link to="/assesment" state={{ activeTab: 2 }}>
                  <img src={images.DetailIcon} alt="" />
                  <p>View Detailed Report</p>
                  <img className='arrowIcon' src={images.Arrow} alt="" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
