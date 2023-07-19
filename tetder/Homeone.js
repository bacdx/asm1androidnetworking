import { Text, StyleSheet,Image, View,TextInput,TouchableOpacity,Alert,ImageBackground } from 'react-native'
import React, { Component } from 'react'


export default class Homeone extends Component {
    state={
        data:[],
        ten:"",
        tuoi:"",
        email:"",
        phone:"",
        imageUrl: ''
    }
   

    validate=()=>{
        let num = this.state.tuoi.replace(".", '');
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
       
        let phonee=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if(this.state.ten==""){
            Alert.alert('treong ten')

        }else if(this.state.tuoi==""){
            Alert.alert('treong tuoi')

        } else if(isNaN(num)){
            alert("nhap so")

        }else if (reg.test(this.state.email) === false) {
            Alert.alert("sai dinh dang email");
           
             return false;
           }else if(phonee.test(this.state.phone)=== false){
            Alert.alert("sai dinh dang phone");
            return false;
           }
        else{
            Alert.alert('them thanh cong')
            this.addData()
        }
    }
    
    addData=()=>{
    

        fetch('http://192.168.1.154:3000/danhsach', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "ten": this.state.ten,
              "tuoi": this.state.tuoi,
              "email":this.state.email,
              "phone":this.state.phone,
              " imageUrl":this.state.imageUrl
          })
      })
          .then((response) => response.json())
          .then((json) => console.log(json));
      }
// them anmh
      handleInputChange = (text) => {
        this.setState({ imageUrl: text });
      }
      handleButtonPress = () => {
        const { imageUrl } = this.state;
        if (imageUrl !== '') {
          this.setState({ imageUrl: '' });
        }
      }
  render() {
    const { imageUrl } = this.state;
    return (
      <View style={{padding:20}}>
       <TouchableOpacity onPress={()=>{
        const {navigation}=this.props
        navigation.navigate('Login')
      }}>
      <ImageBackground
      
       style={{height:30,width:30}  }source={require('../imgresource/back.png')}></ImageBackground>
      </TouchableOpacity>
      <Text style={{marginLeft:"25%",fontSize:40,color:"blue",fontWeight:"bold"}}>Nhap thong tin</Text>
       
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
          placeholder="Enter image URL"
          onChangeText={this.handleInputChange}
          value={imageUrl}
        />
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
        onChangeText={(text)=>{this.setState({ten:text})}}
        >


        </TextInput>

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
        onChangeText={(text)=>{this.setState({tuoi:text})}}
        placeholder="nhap tuoi"
        >
        </TextInput>

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
        onChangeText={(text)=>{this.setState({email:text})}}
        placeholder="nhap email"
        >
        </TextInput>
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
       
        placeholder="nhap sdt"
        onChangeText={(text)=>{this.setState({phone:text})}}
        >


        </TextInput>

        <View style={{flexDirection:'row',justifyContent:'center'}}>
        <TouchableOpacity
        onPress={()=>{this.validate(),this.handleButtonPress()}}
        style={{
            marginRight:20,
            alignItems:'center',
            width:150,
            backgroundColor:'blue',
            padding:15,
            borderRadius:10
            
        }}
        ><Text style={{
            color:'white',
            fontSize:20
        }}>
            Save
        </Text></TouchableOpacity>


        <TouchableOpacity
        onPress={()=>
        {
        const {navigation}=this.props
        navigation.navigate('Danhsach2')

        }}
        style={{
            alignItems:'center',
            width:150,
            backgroundColor:'blue',
            padding:15,
            borderRadius:10
            
        }}
        ><Text style={{
            color:'white',
            fontSize:20
        }}>
            Show
        </Text></TouchableOpacity>

        </View>
   {imageUrl !== '' && (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({})