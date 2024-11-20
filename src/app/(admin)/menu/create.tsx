import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { mixed, number, object, string } from 'yup';
import { Formik } from 'formik';
import { Button } from '@/src/components/Button';
import * as ImagePicker from 'expo-image-picker';
import { DeafultImage } from '@/src/components/ProductItem';

const CreatePizzaSchema = object({
  image: mixed().required('image is required'),
  name: string().required('Name is required'),
  price: number().required('Price is requied'),
});

const Create = () => {
  const { id, name, price, image } = useLocalSearchParams();
  const isUpdating = !!id;

  const pickImageAsync = async (setFieldValue: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setFieldValue('image', imageUri);
    } else {
      alert('You did not select any image.');
    }
  };

  const deletProduct = () => {
    console.warn("delete");
    
  }
  const deleteConfirmation = () => {
    Alert.alert('Confirm', 'You want to delete this product', [
      {
        text: 'Cancel',
      },{
        text: 'Delete',
        onPress: (deletProduct),
        style: 'destructive'
      }
    ]);
  };
  return (
    <View className="flex-1 justify-center p-5">
      <Stack.Screen
        options={{
          title: isUpdating ? 'Update Pizza' : 'Create Pizza',
          headerTitleAlign: 'center',
        }}
      />
      <Formik
        initialValues={{
          name: name ? (name as string) : '',
          price: price ? (price as string) : '',
          image: image ? (image as string) : null,
        }}
        validationSchema={CreatePizzaSchema}
        onSubmit={(values, actions) => {
          console.log(values);
        }}>
        {({ handleChange, handleSubmit, handleBlur, errors, values, touched, setFieldValue }) => (
          <>
            <View className="items-center">
              <Pressable onPress={() => pickImageAsync(setFieldValue)} className="my-3">
                <Image
                  className="aspect-square w-1/2 rounded-full"
                  source={{
                    uri: values.image ? values.image : image ? (image as string) : DeafultImage,
                  }}
                  resizeMode="cover"
                />
              </Pressable>
              <Pressable onPress={() => pickImageAsync(setFieldValue)}>
                <Text className="text-lg font-semibold ">Select Image</Text>
              </Pressable>
            </View>
            {touched.image && errors.image && (
              <Text className="px-2 font-semibold text-red-600">{errors.image}</Text>
            )}
            <View className="my-2 justify-center">
              <Text className="py-2 text-lg font-semibold">Name</Text>
              <TextInput
                className="rounded-lg border border-gray-500 bg-white px-4 py-3 font-[Poppins-Regular] text-lg"
                placeholder={name ? (name as string) : 'Name'}
                placeholderTextColor={'gray'}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              {touched.name && errors.name && (
                <Text className="px-2 font-semibold text-red-600">{errors.name}</Text>
              )}
            </View>
            <View className="my-2 justify-center">
              <Text className="py-2 text-lg font-semibold">Price($)</Text>
              <TextInput
                className="rounded-lg border border-gray-500 bg-white px-4 py-3 font-[Poppins-Regular] text-lg"
                placeholder={price ? (price as string) : '9.99'}
                placeholderTextColor={'gray'}
                placeholderClassName="font-bold"
                keyboardType="numeric"
                value={values.price}
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
              />
              {touched.price && errors.price && (
                <Text className="px-2 font-semibold text-red-600">{errors.price}</Text>
              )}
            </View>
            <Button
              className="mt-5"
              title={isUpdating ? 'Update' : 'Create'}
              onPress={() => handleSubmit()}
              style={{
                backgroundColor: '#016492',
              }}
            />
           {isUpdating && <Pressable onPress={deleteConfirmation} className='items-center mt-3'>
              <Text className="font-semibold text-blue-900 text-lg">Delete</Text>
            </Pressable>}
          </>
        )}
      </Formik>
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({});
