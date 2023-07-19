import { Text, StyleSheet, View,TextInput,TouchableOpacity,Alert } from 'react-native'
import React, { Component } from 'react'


export default class Login2 extends Component {
    state={
        username:"",
        passsword:""
    }
  render() {
    return (
      <View style={{padding:10}}>
      <Text style={{marginLeft:"38%"}}>HELO BAN GO VOI TOI</Text>
       <TextInput
       style={{
        marginLeft: 30,
              marginRight: 30,
              borderWidth: 1,
              borderRadius: 10,
              marginBottom: 20,
              paddingLeft: 5,
              height: 40,
              marginTop: 10
       }}
       placeholder="nhap ten"
    //    onChangeText={(conten) => { this.setState({ username: conten }) }}
       onChangeText={(text)=>{this.setState({username:text})}}
       ></TextInput>

<TextInput
       style={{
        marginLeft: 30,
              marginRight: 30,
              borderWidth: 1,
              borderRadius: 10,
              marginBottom: 20,
              paddingLeft: 5,
              height: 40,
              marginTop: 10
       }}
       placeholder="nhap pass"
       onChangeText={(text)=>{this.setState({passsword:text})}}
       ></TextInput>
       <View style={{alignItems:'center'}}>
       {/* const {navigation} = this.props
      navigation.navigate('Homet') */}
        <TouchableOpacity
        onPress={()=>{
            if(this.state.username=="a"&&this.state.passsword=="a"){
                Alert.alert("tc")
                const{navigation}=this.props
                navigation.navigate('Homeone')
            }else{
                Alert.alert("k tc")
            }
        }}
        style={{
            backgroundColor:'blue',
            width:200,
            alignItems:'center',
            borderRadius:15,
            padding:10
            
        }}>
            <Text style={{color:'white',fontSize:20}}>LOGIN</Text>
        </TouchableOpacity>
       </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({})