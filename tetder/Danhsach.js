import { Text, StyleSheet, View,FlatList,Modal,TextInput,Button,ImageBackground ,Alert} from 'react-native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Danhsach2 extends Component {
  state={
    data:[],
    modalVisible:false,
    id : 1,
    ten:"",
    tuoi:"",
    email:"",
    phone:"",
    trangthai:""

    

}
handleReload = () => {
  this.setState({ ten: "" });
  this.setState({ tuoi: "" });
  this.setState({ email: "" });
  this.setState({ phone: "" });
};

GetData=()=>{
  fetch('http://192.168.1.154:3000/danhsach/')
        .then(response => response.json())
        .then(json => {
         
            this.setState({ data: json })
            console.log(this.state.data);
          
            
        })
        .catch(error => {
            console.error(error);
        });
}
DeleteData=(id)=>{
  fetch('http://192.168.1.115:3000/danhsach/' + id, {
    method: 'DELETE',
})
    .then(res => res.json()) // or res.json()
    .then(data => console.log(data))
   
}
dialogdelete=(id)=>{
  Alert.alert("Thong bao","you want to delete",
  [{text:"OK",onPress:()=> {this.DeleteData(id),this.GetData()}},{text:"cancel"}]
  )
}
UpdateData=(id)=>{
  fetch('http://192.168.1.115:3000/danhsach/' + id, {
    method: 'PATCH',
    body: JSON.stringify({
        "ten": this.state.ten,
        "tuoi": this.state.tuoi,
        "email":this.state.email,
        "phone":this.state.phone
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));
}

validate=(id)=>{
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  let phonee=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  let num = this.state.tuoi.replace(".", '');
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
      Alert.alert('sua thanh cong')
      this.UpdateData(this.state.id)
  }
}
  render() {
    return (
      <View style={{marginTop:25}} onLayout={this.GetData}>
      <TouchableOpacity onPress={()=>{
        const {navigation}=this.props
        navigation.navigate('Homeone')
      }}>
      <ImageBackground
      
       style={{height:30,width:30}  }source={require('../imgresource/back.png')}></ImageBackground>
      </TouchableOpacity>
      <Text style={{marginLeft:"25%",fontSize:40,color:"blue",fontWeight:"bold"}} >DANH SACH</Text>
      
      <View>

      <FlatList 
      data={this.state.data}
      renderItem={({item})=>
      <View style={{flexDirection:'row',
       width:"100%"}}>
        <TouchableOpacity  style={{width:"90%"}}>
          <View
          style={{
          
          alignItems:"center",
         flexDirection:"row",
         borderRadius:20,
         margin:5,
         backgroundColor:'tomato',
        padding:5,
         alignItems:'center',
         }}
          >
          <Text style={{fontSize:25,width:"20%"}}>{item.ten}</Text>
          <Text style={{fontSize:25,width:"20%"}}>{item.tuoi}</Text>
          <Text style={{fontSize:25,width:"20%"}}>{item.email}</Text>
          <Text style={{fontSize:25,width:"20%"}}>{item.phone}</Text>
        
          </View>
        </TouchableOpacity>
        
        
        <TouchableOpacity
     
        onPress={()=>{this.dialogdelete(item.id)}}
       style={{}}
        ><ImageBackground style={{height:30,width:30,margin:10,color:"blue"}  }source={require('../imgresource/icondelete.png')}
        
          ></ImageBackground></TouchableOpacity>

             <TouchableOpacity
        onPress={()=>{
          this.setState({modalVisible:true}),
          this.setState({id : item.id})
        } }
       style={{ }}
        ><ImageBackground style={{height:30,width:30,margin:10}} 
        source={require('../imgresource/iconupdate.png')}
          
          ></ImageBackground></TouchableOpacity>
        
       </View>
       }
      >
      </FlatList>
      <View style={styles.centeredView}>
       <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!this.state.modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update</Text>
            <TextInput style={{borderBottomWidth:1,height:30,width:250}} placeholder='nhap ten'
            onChangeText={(text)=>this.setState({ten:text})}
            ></TextInput>
            <TextInput style={{borderBottomWidth:1,height:30,width:250}} placeholder='nhap tuoi'
              onChangeText={(text)=>{this.setState({tuoi:text})}}
            >
            </TextInput>
            <TextInput style={{borderBottomWidth:1,height:30,width:250}} placeholder='nhap email'
              onChangeText={(text)=>{this.setState({email:text})}}
            >
            </TextInput>
            <TextInput style={{borderBottomWidth:1,height:30,width:250}} placeholder='nhap phone'
              onChangeText={(text)=>{this.setState({phone:text})}}
            >
            </TextInput>
            <Button title='ok' onPress={()=> 
            {this.validate(this.setState.id), this.GetData(),this.handleReload()}
            }>
              
            </Button>
            <Button title='no' onPress={()=> this.setState({modalVisible:false})}></Button>
          </View>
        </View>
      </Modal>
      </View>
      </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({

  
  centeredView: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
},
modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
buttonClose: {
    backgroundColor: '#2196F3',
},
textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
},
modalText: {
    marginBottom: 15,
    textAlign: 'center',
},
})