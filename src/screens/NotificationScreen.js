import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


class AppContainer extends React.Component{

    
    render(){
        
        return <View style={styles.container}>
            <Text>Hello</Text>
        </View>
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        // backgroundColor:'red',
        
    }
})
export default AppContainer;