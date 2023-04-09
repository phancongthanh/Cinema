import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  defaultValue?: string | undefined;
} & TextFieldProps;


const FormInput: FC<Props> = ({ name, defaultValue, ...otherProps}) => {
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
    <Controller control={control} name={name} 
    defaultValue={defaultValue || ''}
     render={({ field })=> (
        <TextField
          {...otherProps}
          {...field}
          error={!!errors[name]}
          helperText={errors[name] ? errors[name].message : ' '}
          // InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
};

export default FormInput;
