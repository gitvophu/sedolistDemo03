import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


class Notification extends React.Component{

    constructor(props){
        super(props);
    }
    render(){
        const {title,body,message} = this.props;
        return <View style={styles.container}>
            <Text style={styles.title}>Title: {title}</Text>
            <Text>Body: {body}</Text>
            <Text>Message: {message}</Text>
        </View>
    }
}
const styles = StyleSheet.create({
    container:{
        padding:5,
        borderBottomWidth:1,
        borderColor:'gray',
        marginBottom:5
    },
    title:{
        fontSize:18,
        color:'#009688'
    },
})
export default Notification;