import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { object, string } from 'yup';
import { Formik } from 'formik';
import { Button } from '@/src/components/Button';
import { router } from 'expo-router';

const ValidationSchema = object({
  email: string()
    .email('Invalid email address') // Ensures the email is valid
    .required('Email is required'), // Ensures the field is not empty
  password: string()
    .required('Password is required') // Ensures the field is not empty
    .min(8, 'Password must be at least 8 characters') // Minimum length requirement
    .max(20, 'Password cannot exceed 20 characters') // Maximum length requirement
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter') // Lowercase letter requirement
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // Uppercase letter requirement
    .matches(/[0-9]/, 'Password must contain at least one number') // Number requirement
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'), // Special character requirement
});
const SignIn = () => {
  return (
    <View className="flex-1 justify-center p-3">
      <Text className='text-xl mb-5 font-[Poppins-Regular] '>Welcome to Food-APP</Text>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}>
        {({ handleChange, handleBlur, handleSubmit, errors, values, touched }) => (
          <>
            <View className="my-2 justify-center">
              <Text className="py-2 text-lg font-semibold">Email</Text>
              <TextInput
                className="rounded-lg border border-gray-500 bg-white px-4 py-3 font-[Poppins-Regular] text-lg"
                placeholder={'johndoe@gmail.com'}
                placeholderTextColor={'gray'}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {touched.email && errors.email && (
                <Text className="px-2 font-semibold text-red-600">{errors.email}</Text>
              )}
            </View>
            <View className="my-2 justify-center">
              <Text className="py-2 text-lg font-semibold">Password</Text>
              <TextInput
                className="rounded-lg border border-gray-500 bg-white px-4 py-3 font-[Poppins-Regular] text-lg"
                placeholder={'Password'}
                placeholderTextColor={'gray'}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              {touched.password && errors.password && (
                <Text className="px-2 font-semibold text-red-600">{errors.password}</Text>
              )}
            </View>
            <Button
             className='mt-5 mb-3 bg-blue-900'
              title='Sign in'
            />
            <Text className='font-bold text-blue-800 text-center' onPress={() => router.navigate('/(auth)/sign-up')}>Create an account</Text>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
