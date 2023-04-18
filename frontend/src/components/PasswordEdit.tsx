import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';

import backend from '../backend';
import identity from '../backend/identity';
import FormInput from './FormInput';

const profileSchema = object({
  old: string().nonempty("Cần nhập mật khẩu"),
  new: string()
    .nonempty('Cần nhập mật khẩu')
    .min(5, 'Mật khẩu phải ít nhất 8 ký tự')
    .max(32, 'Mật khẩu phải ít hơn 32 ký tự'),
  newConfirm: string().nonempty('Cần nhập lại mật khẩu'),
});

type ProfileInput = TypeOf<typeof profileSchema>;

const PasswordEdit = () => {
    const [loading, setLoading] = React.useState(false);
    
  const methods = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  });
  const {
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = methods;

  

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

    const onSubmitHandler: SubmitHandler<ProfileInput> = async (values) => {
        setLoading(true)
        try {
            const result = await backend.accounts.changePassword(identity.getUserId()||"", values.old, values.new);
            setLoading(false)
            alert('Đổi mật khẩu thành công!')
        }
        catch(e) {
            console.log(e)
            setLoading(false)   
        }
    };

  return (
    <div className='flex flex-col items-center w-screen my-4'>
        <div className="flex flex-col w-[60rem] border rounded-2xl shadow items-center">
        <div className="w-92 rounded-lg items-center flex flex-col h-full my-8">
        <FormProvider {...methods}>
            <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="flex flex-col mx-8 ">

                    <Divider orientation="vertical" flexItem />
                    <div className="space-y-4">
                        <div className='text-2xl'>Thay đổi mật khẩu</div>
                    <FormInput
                        name="old"
                        required
                        fullWidth
                        label="Mật khẩu cũ"
                        type="password"
                    />
                    <FormInput
                        name="new"
                        required
                        fullWidth
                        label="Mật khẩu mới"
                        type="password"
                    />
                    <FormInput
                        name="newConfirm"
                        required
                        fullWidth
                        label="Xác nhận mật khẩu"
                        type="password"
                    />
                </div>
                
                <LoadingButton
                variant='contained'
                loading={loading}
                fullWidth
                type='submit'
                sx={{ mt: 1, py: 2}}
                >
                Đổi mật khẩu
                </LoadingButton> 
                </div>
            </form>
        </FormProvider>
        </div>
        </div>
    </div>
  );
};

export default PasswordEdit;
