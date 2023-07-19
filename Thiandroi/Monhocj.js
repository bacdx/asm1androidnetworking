import { Text, StyleSheet, View,TouchableOpacity,Alert,FlatList,Modal,Button,ImageBackground } from 'react-native'
import React, { Component } from 'react'
import { TextInput } from 'react-native-gesture-handler'

export default class Monhocj extends Component {
     state={
        data:[],
        ten:'',
        tinchi:'',
        gia:'',
        trangthai:'',
        id:1,
        modalVisible:false

     }
 
     handleReloadTextInput = () => {
        this.setState({ ten: '' });
        this.setState({ tinchi: '' });
        this.setState({ gia: '' });
        this.setState({ trangthai: '' });
      };
    
    
   
// validate
     validate=()=>{
        
        let num = this.state.gia.replace(".", '');
    
        if(this.state.ten==""){
            Alert.alert('treong ten')

        }else if(this.state.tinchi==""){
            Alert.alert('treong tinchi')

        }else if(this.state.gia==""){
            Alert.alert('treong gia')

        }else if(this.state.trangthai==""){
            Alert.alert('treong trang thai')

        }
         else if(isNaN(num)){
            alert("gia phai la so")

        }
        else{
            Alert.alert('them thanh cong')
            this.addData(),
            this.handleReloadTextInput()
           
        }
     }

     validate2=(id)=>{
        
        let num = this.state.gia.replace(".", '');
    
        if(this.state.ten==""){
            Alert.alert('treong ten')

        }else if(this.state.tinchi==""){
            Alert.alert('treong tinchi')

        }else if(this.state.gia==""){
            Alert.alert('treong gia')

        }else if(this.state.trangthai==""){
            Alert.alert('treong trang thai')

        }
         else if(isNaN(num)){
            alert("gia phai la so")

        }
        else{
            Alert.alert('sua thanh cong')
           this.UpdateData(this.state.id)
            this.handleReloadTextInput()
            this.GetData()
           
        }
     }

// 
     addData=()=>{

        fetch('http://192.168.1.115:3000/monhoc', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "ten": this.state.ten,
              "tinchi": this.state.tinchi,
              "gia":this.state.gia,
              "trangthai":this.state.trangthai,
            
          })
      })
          .then((response) => response.json())
          .then((json) => console.log(json));
      }


      GetData=()=>{
        fetch('http://192.168.1.115:3000/monhoc/')
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
        fetch('http://192.168.1.115:3000/monhoc/' + id, {
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
        fetch('http://192.168.1.115:3000/monhoc/' + id, {
          method: 'PATCH',
          body: JSON.stringify({
            "ten": this.state.ten,
            "tinchi": this.state.tinchi,
            "gia":this.state.gia,
            "trangthai":this.state.trangthai,
          }),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      })
          .then((response) => response.json())
          .then((json) => console.log(json));
      }
      

  render() {
    return (
      <View onLayout={this.GetData()}>
      <View style={{marginTop:20}}>
       <Text style={styles.title}>WELLCOM</Text>

{/* NHap du lieu */}

        <TextInput
        style={styles.inpu}
        placeholder="NAME"
        onChangeText={(text)=>{this.setState({ten:text})}}
        ></TextInput>

           <TextInput
        style={styles.inpu}
        placeholder="Tin chi"
        onChangeText={(text)=>{this.setState({tinchi:text})}}
        ></TextInput>

           <TextInput
        style={styles.inpu}
        placeholder="Gia"
        onChangeText={(text)=>{this.setState({gia:text})}}
        ></TextInput>

           <TextInput
        style={styles.inpu}
        placeholder="Trang thai"
        onChangeText={(text)=>{this.setState({trangthai:text})}}
        ></TextInput>

        <TouchableOpacity style={styles.save}
        onPress={()=>{this.validate()}}
        >
        <Text style={styles.txt}>SAVE</Text>

        </TouchableOpacity>
        <View>
        <Text style={styles.title}>danh sach</Text>

        <FlatList 
      data={this.state.data}
      renderItem={({item})=>
      <View style={{flexDirection:'row',
       width:"100%"}}>
        <TouchableOpacity  style={{width:"80%"}}>
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
          <Text style={{fontSize:25,width:"20%"}}>{item.tinchi}</Text>
          <Text style={{fontSize:25,width:"20%"}}>{item.gia}</Text>
          <Text style={{fontSize:25,width:"20%"}}>{item.trangthai}</Text>
        
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
            <TextInput style={{borderBottomWidth:1,height:30,width:250}} placeholder='nhap tín chỉ'
              onChangeText={(text)=>{this.setState({tinchi:text})}}
            >
            </TextInput>
            <TextInput style={{borderBottomWidth:1,height:30,width:250}} placeholder='nhap giá'
              onChangeText={(text)=>{this.setState({gia:text})}}
            >
            </TextInput>
            <TextInput style={{borderBottomWidth:1,height:30,width:250}} placeholder='nhap trang thai'
              onChangeText={(text)=>{this.setState({trangthai:text})}}
            >
            </TextInput>
            <Button title='ok' onPress={()=> 
            {this.validate2(this.setState.id), this.GetData()}
            }>
              
            </Button>
            <Button title='no' onPress={()=> this.setState({modalVisible:false})}></Button>
          </View>
        </View>
      </Modal>
      </View>

        </View>
       
       </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
title:{
    fontSize:40,
    marginLeft:"35%"
},
inpu:{
    marginLeft:20,
    marginRight:20,
    borderRadius:15,
    borderWidth:1,
    marginTop:15,
    padding:5
},
save:{
    width:200,
    backgroundColor:"aqua",
    height:35,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    marginTop:20,
    marginLeft:"30%"
    

},
txt:{
    fontSize:20,
    fontWeight:'bold'
},

  
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