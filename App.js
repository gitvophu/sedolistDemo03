import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList,Button,TextInput} from 'react-native';
import Constants from 'expo-constants';
import {Notifications} from 'expo';
import * as Permission from 'expo-permissions';
import Notification from './src/components/Notification';
const notificationList = [
    {title:'title #1', body:'body #1', message:'message #1'},
];
class AppContainer extends React.Component{
    tokenPushNotification = '';
    constructor(props){
        super(props);
        
        
    }
    registerPushNotificationPermissionAsync = async () => {
        if(Constants.isDevice){
            // lay quyen ra kiem tra

            const {status:existingStatus} = await Permission.getAsync(Permission.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if(existingStatus !== 'granted'){
                const {status} = await Permission.askAsync(Permission.NOTIFICATIONS) ;
                finalStatus = status;
            }
            if(finalStatus !== 'granted'){
                alert('Không có quyền push notification');
                return;
            }
            // lay token push notification
            let token = await Notifications.getExpoPushTokenAsync();
            console.log(token);
            this.setState({notificationToken:token});
            this.tokenPushNotification = token;
            

        }else{
            alert("Push notification thất bại, yếu cầu phải là thiết bị thật");
        }
    }

    componentDidMount(){
        // dang ky permission
        this.registerPushNotificationPermissionAsync();
        // lang nghe su kien push notification
        this._notificationSubscription = Notifications.addListener((notification) => {
            console.log(notification)
            const {title,body,message} = notification.data;
            const new_notification = {title,body,message};
            if(message){
                alert(message)
                console.log(message);
            }else{
                alert("Có push thông báo nhưng ko có nội dung");
            }
            
            this.setState({ 
                notificationList:[...this.state.notificationList,new_notification]  
            });
        });
    }
    UNSAFE_componentWillMount(){
        this.setState({
            notificationList
        })
    }
    randNum(){
        return Math.floor(Math.random()*99999);
    }
    sendPushNotification = async () => {
        const message = {
          to: this.tokenPushNotification,
          sound: 'default',
          title: 'Original Title',
          body: 'And here is the body!',
          data: {title:'random title '+this.randNum(), body:'random body '+ this.randNum(), message:'random message '+this.randNum()},
          _displayInForeground: true,
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
    };
    render(){
        const s_notificationList = this.state.notificationList;

        return <View style={styles.container}>
            <View style={styles.notificationList}>
                <Text style={styles.title}>DANH SÁCH THÔNG BÁO</Text>
                <FlatList 
                    data={s_notificationList}
                    keyExtractor={(item,index)=>index+""}
                    renderItem={({item})=>{
                        return <Notification title={item.title} body={item.body} message={item.message}/>
                    }}
                />
                
            </View>
            <View style={styles.bottem}>
                <Button title="push notification" onPress={()=>this.sendPushNotification()}/>
                <Text style={styles.titleGuide}>Hướng dẫn test chức năng PUSH NOTIFICATION:</Text>
                <Text style={styles.method1}>Cách 1: Test thông qua Website của expo với token phía dưới</Text>
                <Text>https://expo.io/notifications</Text>
                <Text>Token:</Text>
                <TextInput value={`${this.state.notificationToken}`}/>
                <Text style={styles.method2}>Cách 2: Test bằng cách click click nút push notification trên màn hình</Text>
            </View>
            
        </View>
    }
}
const styles = StyleSheet.create({
    container:{
        height:'100%',
        flex:1,
        marginTop:50,
        
    },
    notificationList:{
        flex:2
    },
    bottem:{
        flex:2,
        margin:10
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        color:'#3f51b5',
        alignSelf:'center'
    },
    method1:{
        fontWeight:'bold',
    },
    method2:{
        fontWeight:'bold',
    },
    titleGuide:{
        fontWeight:'bold',
        fontSize:18
    }
})
export default AppContainer;