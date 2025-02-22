import React, { useState, useCallback } from 'react';
import { InputField, Button } from '../../components';
import { apiRegister, apiLogin } from '../../apis/user';
import Swal from 'sweetalert2';

const initialState = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  mobile: ''
};

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [payload, setPayload] = useState(initialState);

  const resetPayload = () => setPayload(initialState);

  const handleSubmit = useCallback(async () => {
    const { lastname, firstname, mobile, ...data } = payload;

    if (!payload.email || !payload.password) {
      Swal.fire('Warning', 'Please enter email and password', 'warning');
      return;
    }
    if (isRegister && (!payload.firstname || !payload.lastname || !payload.mobile)) {
      Swal.fire('Warning', 'Please enter all required fields', 'warning');
      return;
    }
    try {
      if (isRegister) {
        const response = await apiRegister(payload);
        if (response?.success) {
          Swal.fire('Congratulation', response?.mes, 'success').then(() => {
            setIsRegister(false);
            resetPayload();
          });
        } else {
          Swal.fire('Oops!', response?.mes, 'error');
        }
      } else {
        const rs = await apiLogin(data);
        Swal.fire(rs?.success ? 'Congratulation' : 'Oops!', rs?.mes, rs?.success ? 'success' : 'error');
        console.log(rs);
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  }, [isRegister, payload]);

  return (
    <div className='w-screen h-screen relative'>
      <img
        src="https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg"
        alt="background"
        className='w-full h-full object-cover'
      />
      <div className='absolute top-0 bottom-0 left-0 right-1/2 flex items-center justify-center'>
        <div className='p-8 bg-white rounded-md min-w-[500px] transition-all duration-300 shadow-lg'>
          <h1 className='text-[28px] font-semibold text-main mb-8 text-center'>
            {isRegister ? 'Register' : 'Login'}
          </h1>
          
          {/* Họ và Tên chỉ hiển thị khi đăng ký */}
          {isRegister && (
            <div className='flex items-center gap-2'>
              <InputField value={payload.firstname} setValue={setPayload} nameKey='firstname' />
              <InputField value={payload.lastname} setValue={setPayload} nameKey='lastname' />
            </div>
          )}
          
          <InputField value={payload.email} setValue={setPayload} nameKey='email' />
          
          {isRegister && <InputField value={payload.mobile} setValue={setPayload} nameKey='mobile' />}
          
          <InputField type='password' value={payload.password} setValue={setPayload} nameKey='password' />
          
          <Button name={isRegister ? 'Register' : 'Login'} handleOnclick={handleSubmit} fw />

          <div className='flex items-center justify-between my-2 text-sm'>
            {!isRegister && (
              <span className='text-blue-500 hover:text-blue-700 transition duration-200 cursor-pointer'>
                Forgot your account?
              </span>
            )}
            <span
              className='text-blue-500 hover:text-blue-700 transition duration-200 cursor-pointer'
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Go Login' : 'Create account' }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
