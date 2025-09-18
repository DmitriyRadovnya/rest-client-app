import * as yup from 'yup';

const passwordRegex =
  /^(?=.*\p{L})(?=.*\d)(?=.*[^\p{L}\d\s]).{8,}$/u;

export const signUpSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email'),

  password: yup
    .string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must be at least 8 characters long, include at least one letter, one number, and one special character'
    ),

  username: yup.string().required('Username is required'),
});

export type SignUpValues = yup.InferType<typeof signUpSchema>;
