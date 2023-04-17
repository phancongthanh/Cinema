import React, { useEffect } from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography,
} from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { boolean, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import FormInput from './FormInput';
import { Link, useNavigate } from 'react-router-dom';


type ProfileModel = {
    name: string;
    email: string;
    phone: string;
    address: string;
}

const profileSchema = object({
    name: string().nonempty('Cần nhập họ và tên'),
    email: string().nonempty('Cần nhập Email').email('Email không hợp lệ'),
    phone: string().nonempty('Cần nhập số điện thoại'),
    address: string().nonempty('Cần nhập địa chỉ'),
  });
  
type ProfileInput = TypeOf<typeof profileSchema>;




const EditProfile = () => {
    
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const methods = useForm<ProfileInput>({
        resolver: zodResolver(profileSchema),
      })
      ;
    
      const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
      } = methods;
    
      useEffect(() => {
        if (isSubmitSuccessful) {
          reset();
        }
      }, [isSubmitSuccessful, reset]);
    
      const onSubmitHandler: SubmitHandler<ProfileInput> = async (values) => {
        setLoading(true);
        const loginForm : ProfileModel = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address,
        }
      };

      return (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className='max-w-lg border-gray-400 border p-12 rounded-lg justify-center items-center flex flex-col'>
            <h4 className='mb-10'>
              Đăng nhập
            </h4>
            <FormProvider {...methods}>
              <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
              <FormInput
                  name='email'
                  required
                  fullWidth
                  label='Email Address'
                  type='email'
                  sx={{ mb: 2}}
                  defaultValue={'Member@gmail.com'}
                />
                <FormInput
                  name='name'
                  required
                  fullWidth
                  label='Mật khẩu'
                  type='name'
                  defaultValue={'Nguyễn Văn A'}
                /> 
                <FormInput
                  name='phone'
                  required
                  fullWidth
                  label='Mật khẩu'
                  type='phone'
                  defaultValue={'0123456789'}
                /> 
    
                <FormInput
                  name='address'
                  required
                  fullWidth
                  label='Mật khẩu'
                  type='address'
                  defaultValue={'144 Xuân Thủy, Mai Dịch, Cầu Giấy, Hà Nội'}
                /> 
                
    
                <LoadingButton
                  variant='contained'
                  loading={loading}
                  fullWidth
                  type='submit'
                  sx={{ mt: 1, py: 2}}
                >
                  Đăng nhập
                </LoadingButton>
              </form>
            </FormProvider>
            <div className='mt-4'>Không có tài khoản? <Link to={'/register'} className='text-blue-600 hover:text-blue-300'>Đăng nhập</Link></div>
          </div>
        </div>
        )
    }
    