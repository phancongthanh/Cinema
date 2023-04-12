import React, { useEffect } from 'react'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography,
} from '@mui/material';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { boolean, literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import FormInput from '../../components/FormInput';
import LoginModel from '../../types/LoginModel';
import accounts from '../../backend/accounts';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import users from '../../backend/users';
import identity from '../../backend/identity';

const loginSchema = object({
  email: string().nonempty('Cần nhập Email').email('Email không hợp lệ'),
  password: string()
    .nonempty('Cần nhập mật khẩu')
    .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
    .max(32, 'Mật khẩu phải ít hơn 32 ký tự'),
  rememberMe: boolean(),
});

type LoginInput = TypeOf<typeof loginSchema>;

const Login = () => {

  const {setAuth} = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
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

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    setLoading(true);
    const loginForm : LoginModel = {
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe
    }
    alert(JSON.stringify(loginForm));
    const IsloginOK = await accounts.login(loginForm);
    if(!IsloginOK) {
      alert('Đăng nhập thất bại');
      return;
    } else {
      alert('Đăng nhập thành công');
      setAuth(identity.getRole());
      navigate('/')
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
              defaultValue={'abcd1234@gmail.com'}
            />
            <FormInput
              name='password'
              required
              fullWidth
              label='Mật khẩu'
              type='password'
              defaultValue={'12345678'}
            /> 

            <FormGroup>
              <FormControlLabel
                control={<Checkbox/>}
                {...register('rememberMe')}
                label={
                  <Typography color={errors['rememberMe'] ? 'error' : 'inherit'}>
                    Ghi nhớ đăng nhập
                  </Typography>
                }
              />
            </FormGroup>

            <Link to={'/register'} className='text-blue-600 hover:text-blue-300 '>Quên mật khẩu?</Link>

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
        <div className='mt-4'>Không có tài khoản? <Link to={'/register'} className='text-blue-600 hover:text-blue-300'>Đăng ký</Link></div>
      </div>
    </div>
  )
}

export default Login