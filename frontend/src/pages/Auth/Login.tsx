import { Input } from '@mui/material';
import React from 'react'
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type Inputs = {
  Username: String;
  Password: String;
};

const Login = () => {
  const { control, handleSubmit} = useForm<Inputs>({
    defaultValues: {
      Username: '',
      Password: ''
    }
  });

  const onSubmit: SubmitHandler<Inputs> = data => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="Username"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        name="Password"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <input type="submit" />
    </form>
  )
}

export default Login