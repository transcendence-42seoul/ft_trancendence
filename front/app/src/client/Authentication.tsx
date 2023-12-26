import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from '../common/cookie/cookie';

function AuthenticationPage() {
  const token = getCookie('token');
  const [userIdx, setUserIdx] = useState<number>(0);

  const navigate = useNavigate();
  const [inputs, setInputs] = useState(Array(6).fill(''));
  const inputRefs = useRef(new Array(6).fill(null));

  const tfaCode = inputs.join('');

  const fetchUserIdx = async () => {
    try {
      const userData = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUserIdx(userData.data.user_idx);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyTFA = async () => {
    if (inputs.every((input) => input.length === 1)) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/tfa/${userIdx}/verify`,
          { token: tfaCode },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        navigate('/main');
      } catch (error: any) {
        if (error.response) {
          console.error('Error Response:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      }
    }
  };

  useEffect(() => {
    fetchUserIdx();
  }, []);

  // verify with tfa code
  useEffect(() => {
    if (userIdx > 0) {
      verifyTFA();
    }
  }, [inputs, navigate, tfaCode]);

  const moveToNextInput = (index: number, value: string) => {
    if (index < inputRefs.current.length - 1 && value) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index: number, value: string) => {
    if (index > 0 && !value) {
      setInputs(inputs.map((input, i) => (i === index - 1 ? '' : input)));
      inputRefs.current[index - 1].focus();
    }
  };

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);

      moveToNextInput(index, value);
    };

  const handleKeyDown =
    (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        handleBackspace(index, inputs[index]);
      }
    };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        {/* 안내 */}
        <div className="p-10 bg-gray-200 rounded-lg">
          <div className="text-2xl font-bold">OTP 인증</div>
          <p>앱에 표시된 6자리 코드를 입력하세요.</p>
        </div>
        {/* 인증번호 입력 */}
        <div className="mt-10 flex space-x-3">
          {inputs.map((input, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              className="border-2 border-gray-300 rounded-lg p-4 text-center"
              style={{ width: '5rem' }}
              value={input}
              onChange={handleChange(index)}
              onKeyDown={handleKeyDown(index)}
              maxLength={1}
              pattern="\d*"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthenticationPage;
