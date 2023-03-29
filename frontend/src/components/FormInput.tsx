import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
} & TextFieldProps;


const FormInput: FC<Props> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext() as {
    formState: {
      errors: Record<string, { message: string }>;
    };
    control: Control;
  };

  return (
    <Controller control={control} name={name} defaultValue="" render={({ field })=> (
        <TextField
          {...otherProps}
          {...field}
          error={!!errors[name]}
          helperText={errors[name] ? errors[name].message : ''}
        />
      )}
    />
  );
};

export default FormInput;
