import React, { useEffect } from 'react'
import {
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Checkbox from '@mui/material/Checkbox';
import { LoadingButton } from '@mui/lab';
import FormInput from '../../components/FormInput';

const registerSchema = object({
  username: string()
    .nonempty('Name is required')
    .max(32, 'Name must be less than 100 characters'),
  email: string().nonempty('Email is required').email('Email is invalid'),
  password: string()
    .nonempty('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().nonempty('Please confirm your password'),
  terms: literal(true, {
    invalid_type_error: 'Accept Terms is required',
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

type RegisterInput = TypeOf<typeof registerSchema>;

const Register = () => {
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
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    console.log(values);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className='max-w-lg border-gray-400 border p-12 rounded-lg justify-center items-center flex flex-col'>
        <h4 className='mb-10'>
          Đăng ký tài khoản 
        </h4>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
          <FormInput
              name='username'
              required
              fullWidth
              label='Tài khoản'
              type='username'
              sx={{ mb: 2}}
            />
        
            <FormInput
              name='email'
              required
              fullWidth
              label='Email Address'
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
                control={<Checkbox required />}
                {...register('terms')}
                label={
                  <Typography color={errors['terms'] ? 'error' : 'inherit'}>
                    Chấp nhận điều khoản sử dụng
                  </Typography>
                }
              />
              <FormHelperText error={!!errors['terms']}>
                {errors['terms'] ? errors['terms'].message : ''}
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