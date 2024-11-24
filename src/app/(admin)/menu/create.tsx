import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native';
import React from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { mixed, number, object, string } from 'yup';
import { Formik } from 'formik';
import { Button } from '@/src/components/Button';
import * as ImagePicker from 'expo-image-picker';
import { DeafultImage } from '@/src/components/ProductItem';
import { useDeleteProduct, useInsertproduct, useProduct, useUpdateproduct } from '@/src/hooks/useProducts';

const CreatePizzaSchema = object({
  image: mixed().nullable(),
  name: string().required('Name is required'),
  price: number().required('Price is requied'),
});

const Create = () => {
  const { id: idString } = useLocalSearchParams();
  
  const id = idString ? parseFloat(typeof idString === 'string' ? idString : idString[0]): undefined;
  const { data: product } = useProduct(id)
  const isUpdating = !!id;        
  const { mutate: insertProduct } = useInsertproduct();
  const { mutate: updateProduct } = useUpdateproduct();
  const { mutate: deleteProduct } = useDeleteProduct();

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

  const ondeletProduct = () => {
    deleteProduct(id);
    router.replace('/(admin)/menu/')
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
        onSubmit={(values, actions) => {
          if (isUpdating) {
            console.log("update", values);
            updateProduct(
              {
                id,
                name: values.name,
                price: values.price,
                image: values.image,
              },
              {
                onSuccess: () => {
                  router.back();
                },
              }
            );
          } else {
            insertProduct(
              {
                name: values.name!,
                price: values.price!,
                image: values.image,
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
                <Image
                  className="aspect-square w-1/2 rounded-full"
                  source={{
                    uri: values.image ? values.image : DeafultImage,
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
