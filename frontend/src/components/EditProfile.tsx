import { zodResolver } from '@hookform/resolvers/zod';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Divider, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';

import backend from '../backend';
import identity from '../backend/identity';
import User from '../types/User';
import FormInput from './FormInput';

type ProfileModel = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const profileSchema = object({
  name: string().nonempty("Cần nhập họ và tên"),
  email: string().nonempty("Cần nhập Email").email("Email không hợp lệ"),
  phone: string().nonempty("Cần nhập số điện thoại"),
  address: string().nonempty("Cần nhập địa chỉ"),
});

type ProfileInput = TypeOf<typeof profileSchema>;

const EditProfile = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [edit, setEdit] = React.useState(false);

  const role = identity.getRole();
  const avatarSrc =
    role === "Member"
      ? "https://i.pravatar.cc/300?img=30"
      : role === "Manager"
      ? "https://i.pravatar.cc/300?img=31"
      : "https://i.pravatar.cc/300?img=32";

  useEffect(() => {
    const userId = identity.getUserId();
    const getUser = async () => {
      userId && setUser(await backend.users.getById(userId));
    };
    getUser();
  }, []);

  const methods = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  });
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

  const onSubmitHandler: SubmitHandler<ProfileInput> = async (values) => {};

  console.log(user);
  return (
    <div className="w-92 rounded-lg items-center flex flex-col w-full h-full mt-4">
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          {user && (
            <div className="flex flex-col mx-8">
              <div className="flex space-x-4">
                <div className="relative">
                  <img
                    src={avatarSrc}
                    className={`h-40 w-48 rounded-full ${edit && 'cursor-pointer'}`}
                  />
                  <PhotoCameraIcon className="absolute bottom-12 right-0"/>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="space-y-12">
                  <FormInput
                    name="email"
                    required
                    fullWidth
                    label="Email Address"
                    type="email"
                    disabled={!edit}
                    defaultValue={user?.email}
                  />
                  <FormInput
                    name="name"
                    required
                    fullWidth
                    label="Họ và tên"
                    type="name"
                    disabled={!edit}
                    defaultValue={user?.name}
                  />
                </div>
                <div className="space-y-12">
                  <FormInput
                    name="phone"
                    required
                    fullWidth
                    label="Số điện thoại"
                    type="phone"
                    disabled={!edit}
                    defaultValue={"0123456789"}
                  />
                  <FormInput
                    name="address"
                    required
                    fullWidth
                    label="Địa chỉ"
                    type="address"
                    disabled={!edit}
                    defaultValue={"144 Xuân Thủy, Mai Dịch, Cầu Giấy, Hà Nội"}
                  />
                </div>
              </div>
              <IconButton className="self-end" onClick={() => setEdit(!edit)}>
                {edit ? <DoneIcon color='success' fontSize='large'/> : <EditIcon fontSize='large'/>}
              </IconButton>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default EditProfile;
