import React from 'react';

const SelectOption = ({ icon }) => {
  return (
    <div className='w-10 h-10 border rounded-full shadow-md flex justify-center items-center cursor-pointer 
    hover:bg-gray-800 hover:border-gray-800 hover:text-white text-gray-800 transition duration-300'>
      {icon}
    </div>
  );
};

export default SelectOption;
