import React from "react";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    background:{
        backgroundColor: "#d9d9d9"
    },

    row: {
        flexDirection: "row",
    },
    col: {
        flex: 1,
        borderColor: "#cccccc",
        backgroundColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 10,
        margin: 5,
        marginBottom: 0,
        marginTop: 12,
        paddingLeft: 15
    },
    input:{
        flex: 0,
        borderColor: "#cccccc",
        backgroundColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 10,
        width:310,
        margin: 10,
        paddingLeft: 15,
        marginBottom: 0,
        flexDirection: "column"
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    h1: {
        fontSize:30,
        padding: 10,
        color: '#ff6600',
        fontFamily: 'Arial Rounded MT Bold'
    },
    btn:{
        flex: 0,
        borderColor: "#cccccc",
        backgroundColor: "#f29520",
        borderWidth: 2,
        borderRadius: 10,
        margin: 5,
    },
    icon:{
        backgroundColor:'white',
        paddingLeft:18,
    },
    resource:{
        padding: 32,
        backgroundColor: 'white'
    }
    
})

export default style