import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './assesment.css';
import { images } from '../../assets/images'
import { Avatar } from "flowbite-react";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AssignmentForm from './UploadAssignments'
import ViewReport from './ViewReport';
import Detailreport from './DetailReport'

function Assesment() {

  const location = useLocation();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    if (location.state && location.state.activeTab !== undefined) {
      setSelectedTabIndex(location.state.activeTab);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <div>
        <Tabs selectedIndex={selectedTabIndex} onSelect={index => setSelectedTabIndex(index)}>
          <header className='p-4 pt-[40px]'>
            <div className="container mx-auto flex justify-between items-center">
              {/* Logo on the left */}
              <div className="text-xl font-bold">
                <Link to='/'> <img src={images.Logo} alt="Logo" className="logo-img w-auto" /> </Link>
              </div>

              {/* tablist */}
              <div className='tab-top-section'>
                <TabList>
                  <Tab>Upload Assignments</Tab>
                  <Tab>View Report</Tab>
                  <Tab>View Detailed Report</Tab>
                </TabList>
              </div>

              {/* Text and SVG on the right */}
              <div className="flex items-center space-x-4">
                <Avatar className='userheader' img={images.Avatar} rounded />
              </div>
            </div>
          </header>

          <div className="pt-[60px] container mx-auto tab-top-section">
            {/* React Tabs */}

            <TabPanel >
             <AssignmentForm/>
            </TabPanel>

            <TabPanel>
              <ViewReport/>
            </TabPanel>

            <TabPanel>
              <Detailreport/>
            </TabPanel>

          </div>
        </Tabs>
      </div>

    </div>
  )
}

export default Assesment;
