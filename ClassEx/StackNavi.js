import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

import Login2 from './../tetder/Login2';
import Danhsach2 from './../tetder/Danhsach';
import Homeone from './../tetder/Homeone';
import Monhocj from '../Thiandroi/Monhocj';

const Stack = createStackNavigator();
function MyStack() {
    return (
      <Stack.Navigator >
       <Stack.Screen options={{headerShown: false}} name="Monhocj" component={Monhocj} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login2} />
        
        <Stack.Screen options={{headerShown: false}} name="Homeone" component={Homeone} />
        <Stack.Screen options={{headerShown: false}} name="Danhsach2" component={Danhsach2} />
        
       
        
      </Stack.Navigator>
    );
  }


export default class StackNavi extends Component {
  render() {
    return (
      <NavigationContainer>
        <MyStack></MyStack>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({})