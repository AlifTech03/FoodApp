import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const Main = () => {
  return (
    <Redirect href={'./menu'}/>
  )
}

export default Main