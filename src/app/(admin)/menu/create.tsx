import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native';
import React from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { mixed, number, object, string } from 'yup';
import { Formik } from 'formik';
import { Button } from '@/src/components/Button';
import * as ImagePicker from 'expo-image-picker';
import { DeafultImage } from '@/src/components/ProductItem';
import {
  useDeleteProduct,
  useInsertproduct,
  useProduct,
  useUpdateproduct,
} from '@/src/hooks/useProducts';

import * as FileSystem from 'expo-file-system';
import { randomUUID } from 'expo-crypto';
import { decode } from 'base64-arraybuffer';
import { supabase } from '@/src/utils/supabase';
import RemoteImage from '@/src/components/RemoteImgae';

const CreatePizzaSchema = object({
  image: mixed().nullable(),
  name: string().required('Name is required'),
  price: number().required('Price is requied'),
});

const Create = () => {
  const { id: idString } = useLocalSearchParams();

  const id = idString
    ? parseFloat(typeof idString === 'string' ? idString : idString[0])
    : undefined;
  const { data: product } = useProduct(id);
  const isUpdating = !!id;
  const { mutate: insertProduct } = useInsertproduct();
  const { mutate: updateProduct } = useUpdateproduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const pickImageAsync = async (setFieldValue: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
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

  const ondeletProduct = () => {
    deleteProduct(id);
    router.replace('/(admin)/menu/');
  };
  const deleteConfirmation = () => {
    Alert.alert('Confirm', 'You want to delete this product', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: ondeletProduct,
        style: 'destructive',
      },
    ]);
  };
  const uploadImage = async (image: string | null) => {
    if (!image?.startsWith('file://')) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';
    const { data, error } = await supabase.storage
      .from('product-image')
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
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
          name: product?.name,
          price: product?.price,
          image: product?.image,
        }}
        validationSchema={CreatePizzaSchema}
        onSubmit={async (values, actions) => {
          const imageUrl = await uploadImage(values.image!);
          if (isUpdating) {
            updateProduct(
              {
                id,
                name: values.name,
                price: values.price,
                image: imageUrl,
              },
              {
                onSuccess: () => {
                  router.back();
                },
              }
            );
          } else {
            uploadImage(values.image!);
            insertProduct(
              {
                name: values.name!,
                price: values.price!,
                image: imageUrl,
              },
              {
                onSuccess: () => {
                  actions.resetForm();
                  router.back();
                },
              }
            );
          }
        }}>
        {({ handleChange, handleSubmit, handleBlur, errors, values, touched, setFieldValue }) => (
          <>
            <View className="items-center">
              <Pressable onPress={() => pickImageAsync(setFieldValue)} className="my-3">
                {isUpdating ? (
                  <RemoteImage
                    className="aspect-square w-1/2 rounded-full"
                    path={values.image!}
                    fallback={DeafultImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    className="aspect-square w-1/2 rounded-full"
                    source={{
                      uri: values.image ? values.image : DeafultImage,
                    }}
                    resizeMode="cover"
                  />
                )}
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
                placeholder={'Name'}
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
                placeholder={'9.99'}
                placeholderTextColor={'gray'}
                placeholderClassName="font-bold"
                keyboardType="numeric"
                value={values.price?.toString()}
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
            {isUpdating && (
              <Pressable onPress={deleteConfirmation} className="mt-3 items-center">
                <Text className="text-lg font-semibold text-blue-900">Delete</Text>
              </Pressable>
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

export default Create;
