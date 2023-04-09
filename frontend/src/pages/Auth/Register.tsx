import React, { useEffect } from 'react'
import {
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography,
} from '@mui/material';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Checkbox from '@mui/material/Checkbox';
import { LoadingButton } from '@mui/lab';
import FormInput from '../../components/FormInput';
import RegisterModel from '../../types/RegisterModel';
import accounts from '../../backend/accounts';
import LoginModel from '../../types/LoginModel';
import { useNavigate, Navigate } from 'react-router-dom';

const registerSchema = object({
  name: string()
    .nonempty('Cần nhập tên'),
  email: string().nonempty('Cần nhập Email').email('Email không hợp lệ'),
  password: string()
    .nonempty('Cần nhập mật khẩu')
    .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
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
      alert('Đăng ký thành công');
      const login : LoginModel = {
        email: values.email,
        password: values.password,
        rememberMe: true
      }
      const IsloginOK = await accounts.login(login);
      if(!IsloginOK) {
        alert('Đăng nhập thất bại');
        return;
      } else {
        alert('Đăng nhập thành công');
        navigate('/')
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
              defaultValue={'Nguyễn Văn A'}
            />
        
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
              sx={{ mb: 2}}
              defaultValue={'12345678'}
            />

            <FormInput
              name='passwordConfirm'
              required
              fullWidth
              label='Nhập lại mật khẩu'
              type='password'
              sx={{ mb: 2}}
              defaultValue={'12345678'}
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
      </div>
    </div>
  )
}

export default Register