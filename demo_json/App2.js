import { Text, StyleSheet, View, Button, TouchableOpacity,Modal } from 'react-native'
import React, { Component } from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { Alert } from 'react-native';

export default class App2 extends Component {
    state={
        data:[],
        title:"",
        author:"",
        modalVisible:false
    }
    addData=()=>{
      fetch('http://192.168.1.154:3000/posts', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'yourValue',
            author: 'yourOtherValue',
        })
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }
    UpdateData=(id)=>{
      fetch('http://192.168.1.154:3000/posts/' + id, {
        method: 'PATCH',
        body: JSON.stringify({
            "title": this.state.title,
            "author": this.state.author
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }

    DeleteData=(id)=>{
      fetch('http://192.168.1.154:3000/posts/' + id, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            if (res.status == 200)
                Alert.alert("Thông báo", "Xóa lớp thành công!")
        });
    }

    GetData=()=>{
      fetch('http://192.168.1.154:3000/lop')
            .then(response => response.json())
            .then(json => {
                this.setState({ data: json })
                console.log(this.state.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    dialogdelete=(id)=>{
      Alert.alert("Thong bao","you want to delete",
      [{text:"OK",onPress:()=> this.DeleteData(id)},{text:"cancel"}]
      )
    }
  render() {
    return (
      <View>
       <Button title='ADD'
       onPress={this.addData}></Button>
       <Button title='UPDATE'
       onPress={()=>this.setState({modalVisible:true}) }
       >
        
       </Button>
       <Button title='DLETE'
       onPress={()=>this.DeleteData}
       ></Button>
       <Button title='GETDATA' 
       onPress={this.GetData}></Button>


       <FlatList
       data={this.state.data}
       renderItem={({item})=>
       <TouchableOpacity
      onPress={()=>this.dialogdelete(item.id)}
      
       >
       <View style={styles.flalit}>
       <Text>{item.title}</Text>
       <Text>{item.author}</Text>
       </View>
        
       </TouchableOpacity>
       }
       ></FlatList>
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
            <TextInput style={{borderBottomWidth:1,height:30,width:250}} placeholder='nhap'
            onChangeText={(text)=>this.setState({title:text})}
            ></TextInput>
            <TextInput style={{borderBottomWidth:1,height:30,width:250}} placeholder='nhap'
            onChangeText={(text)=>this.setState({author:text})}
            >
             
            </TextInput>
            <Button title='ok' onPress={()=> this.UpdateData(3)}></Button>
            <Button title='no' onPress={()=> this.setState({modalVisible:false})}></Button>
          </View>
        </View>
      </Modal>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  flalit:{
    borderBottomWidth:1,
    height:50
  },
  centeredView: {
    flex: 1,
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