import { Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Alert } from 'react-native';

export default function demofun() {
  
    state={
        data:[]
    }
    addData=()=>{

    }
    UpdateData=()=>{
        
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
      fetch('http://192.168.1.154:3000/posts')
            .then(response => response.json())
            .then(json => {
                this.setState({ data: json })
                console.log(this.state.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
   
  return (
    <View>
     <Button title='ADD'></Button>
       <Button title='UPDATE'></Button>
       <Button title='DLETE'
       onPress={()=>this.DeleteData}
       ></Button>
       <Button title='GETDATA' 
       onPress={this.GetData}></Button>


       <FlatList
       data={this.state.data}
       renderItem={({item})=>
       <TouchableOpacity
       onPress={()=>this.DeleteData(item.id
       )}
      
       >
       <View style={styles.flalit}>
       <Text>{item.title}</Text>
       <Text>{item.author}</Text>
       </View>
        
       </TouchableOpacity>
       }
       ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({})