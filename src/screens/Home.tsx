import { StyleSheet, Text, View , FlatList , Pressable} from 'react-native'
import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackPramList } from '../App'

import ProductItem from '../Components/ProductItem'
import Separator from '../Components/Separator'
import { PRODUCTS_LIST } from '../data/constants'


type HomeProps=NativeStackScreenProps<RootStackPramList , "Home">


const Home = ({navigation}:HomeProps) => {
  return (
    <View style={styles.container}>
    <FlatList
    data={PRODUCTS_LIST}
    keyExtractor={item => item.id.toString()}
    ItemSeparatorComponent={Separator}
    renderItem={({item}) => (
      <Pressable
      onPress={() => {
        navigation.navigate('Details', {
          product: item
        })
      }}
      >
        <ProductItem product={item}/>
      </Pressable>
    )}
    />
  </View>
  )
}

export default Home

const styles = StyleSheet.create({ 
  container: {
  flex: 1,
  alignItems: 'flex-start',
  justifyContent: 'center',

  padding: 12,
  backgroundColor: '#FFFFFF',
},})