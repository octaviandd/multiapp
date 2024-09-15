/** @format */

import React, { useState } from "react";

interface SideTaskProps {
  taskData: any; // Replace 'any' with the type of your task data
}

const SideTask: React.FC<SideTaskProps> = ({ taskData }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(taskData);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-task ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleSideNav}>
        Open Side Task
      </button>
      <div className="side-task-content">
        {/* Render your task data here */}
        {/* Add more task data components as needed */}
      </div>
    </div>
  );
};

export default SideTask;
