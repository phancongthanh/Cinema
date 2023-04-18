import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { FormControlLabel, FormGroup, FormHelperText, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { literal, object, string, TypeOf } from 'zod';

import accounts from '../../backend/accounts';
import identity from '../../backend/identity';
import FormInput from '../../components/FormInput';
import useAuth from '../../hooks/useAuth';
import LoginModel from '../../types/LoginModel';
import RegisterModel from '../../types/RegisterModel';

const registerSchema = object({
  name: string()
    .nonempty('Cần nhập tên'),
  email: string().nonempty('Cần nhập Email').email('Email không hợp lệ'),
  password: string()
    .nonempty('Cần nhập mật khẩu')
    .min(5, 'Mật khẩu phải ít nhất 8 ký tự')
    .max(32, 'Mật khẩu phải ít hơn 32 ký tự'),
  passwordConfirm: string().nonempty('Cần nhập lại mật khẩu'),
  terms: literal(true, {
    errorMap: () => ({ message: 'Phải đồng ý với điều khoản' })
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Mật khẩu không khớp',
});

type RegisterInput = TypeOf<typeof registerSchema>;

const Register = () => {
  const {setAuth} = useAuth()

  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
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
      // reset();
    }
  }, [isSubmitSuccessful, reset]);



  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    setLoading(true);
    const registerForm : RegisterModel = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: 'Member'
    }
    const IsOk = await accounts.register(registerForm);
    setLoading(false);
    if(!IsOk) {
      alert('Đăng ký thất bại, ');
      return;
    } else {
      const login : LoginModel = {
        email: values.email,
        password: values.password,
        rememberMe: true
      }
      try{
        const IsloginOK = await accounts.login(login);
        setLoading(false);
        setAuth(identity.getRole());
        navigate('/')
        } catch (error) {
          setLoading(false);
          alert('Đăng nhập thất bại');
          return;
        }
    }

    setLoading(false);

  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className='max-w-lg border-gray-400 border p-12 rounded-lg justify-center items-center flex flex-col'>
        <h4 className='mb-10'>
          Đăng ký tài khoản 
        </h4>
        <FormProvider {...methods}>
          <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          <FormInput
              name='name'
              required
              fullWidth
              label='Tên'
              type='name'
              sx={{ mb: 2}}
            />
        
            <FormInput
              name='email'
              required
              fullWidth
              label='Email Address'
              type='email'
              sx={{ mb: 2}}
            />

            <FormInput
              name='password'
              required
              fullWidth
              label='Mật khẩu'
              type='password'
              sx={{ mb: 2}}
            />

            <FormInput
              name='passwordConfirm'
              required
              fullWidth
              label='Nhập lại mật khẩu'
              type='password'
              sx={{ mb: 2}}
            />
            
            <FormGroup>
              <FormControlLabel
                control={<Checkbox/>}
                {...register('terms')}
                label={
                  <Typography color={errors['terms'] ? 'error' : 'inherit'}>
                    Chấp nhận điều khoản sử dụng
                  </Typography>
                }
              />
              <FormHelperText error={!!errors['terms']} disabled>
                {errors['terms'] ? errors['terms'].message : ' '}
              </FormHelperText>
            </FormGroup>

            <LoadingButton
              variant='contained'
              loading={loading}
              fullWidth
              type='submit'
              sx={{ mt: 4, py: 2}}
            >
              Đăng ký
            </LoadingButton>
          </form>
        </FormProvider>
        <div className='mt-4'>Đã có tài khoản? <Link to={'/login'} className='text-blue-600 hover:text-blue-300'>Đăng nhập</Link></div>
      </div>
    </div>
  )
}

export default Register