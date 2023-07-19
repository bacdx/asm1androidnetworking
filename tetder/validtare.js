import { Text, StyleSheet, View,TextInput,TouchableOpacity,Alert,ImageBackground } from 'react-native'
import React, { Component } from 'react'

export default class validtare extends Component {
state={
    email:"",
    tuoi:""
}

    validate = () => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let num = this.state.tuoi.replace(".", '');
        if (reg.test(this.state.email) === false) {
         Alert.alert("sai dinh dang");
        //   this.setState({ email: text })
          return false;
        }
        else {
        //   this.setState({ email: text })
        //   Alert.alert("dung dinh dang");
        }
        if(isNaN(num)){
            alert("nhap so")
            }else{
           this.setState({tuoi : num})
           alert("ok")
           }
        
      }
  render() {
    return (
        <View style={{padding:20}}>
       <Text style={{marginLeft:"25%",fontSize:40,color:"blue",fontWeight:"bold"}}>Nhap thong tin</Text>
        
         <TextInput
         style={styles.t}
        
         placeholder="nhap ten"
         onChangeText={(text)=>{this.setState({email:text})}}
        // onChangeText={(text) => this.validate(text)}
        //  value={this.state.email}
         >
         </TextInput>

         <TextInput
         style={styles.t}
        
         placeholder="nhap tuoi"
         onChangeText={(text)=>{this.setState({tuoi:text})}}
      
         >
         </TextInput>


         <View style={{flexDirection:'row',justifyContent:'center'}}>
         <TouchableOpacity
         onPress={()=>this.validate()}
         style={styles.st}
         ><Text style={{
             color:'white',
             fontSize:20
         }}>
             Save
         </Text></TouchableOpacity>
         </View>
 
       </View>
    )
  }
}

const styles = StyleSheet.create({
st:{
    marginRight:20,
    alignItems:'center',
    width:150,
    backgroundColor:'blue',
    padding:15,
    borderRadius:10
},
t:{
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 5,
    height: 40,
    marginTop: 10
}

})