import React, { useState, useEffect } from 'react';
import {Alert,  Text, View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import { Avatar, Button, IconButton } from 'react-native-paper';



export function printCount() {
    return tries;
}

export function clearCount() {
    tries = 0;
}

export default function BeginSession() {
    const [count, setCount] = useState(0);


    const nextGuess=(direction)=>{
        if (direction=='lower'){
            setCount((count) => count - 1)
            if (count == 0) {
                setCount((count) => 0);
            }
        }
        else{
            setCount((count) => count + 1)
        }
    }

	return (
        <View>
            <View style={styles.container}>
                <IconButton style={styles.iconLeft} size={30} color="grey" icon="moped"onPress={()=>{nextGuess('lower')}}></IconButton>
                <Avatar.Text style={styles.counter} size={70} label={count}></Avatar.Text>
                <IconButton style={styles.iconRight} size={50} color="grey" icon="moped" onPress={()=>{nextGuess('higher')}}></IconButton>
            </View>
            <View style={styles.container}>
                <IconButton style={styles.iconLeft} size={30} color="grey" icon="moped"onPress={()=>{nextGuess('lower')}}></IconButton>
                <Avatar.Text style={styles.counter} size={70} label={count}></Avatar.Text>
                <IconButton style={styles.iconRight} size={50} color="grey" icon="moped" onPress={()=>{nextGuess('higher')}}></IconButton>
            </View>
                <View style={styles.container}>
                <IconButton style={styles.iconLeft} size={30} color="grey" icon="moped"onPress={()=>{nextGuess('lower')}}></IconButton>
                <Avatar.Text style={styles.counter} size={70} label={count}></Avatar.Text>
                <IconButton style={styles.iconRight} size={50} color="grey" icon="moped" onPress={()=>{nextGuess('higher')}}></IconButton>
            </View>
                <View style={styles.container}>
                <IconButton style={styles.iconLeft} size={30} color="grey" icon="moped"onPress={()=>{nextGuess('lower')}}></IconButton>
                <Avatar.Text style={styles.counter} size={70} label={count}></Avatar.Text>
                <IconButton style={styles.iconRight} size={50} color="grey" icon="moped" onPress={()=>{nextGuess('higher')}}></IconButton>
            </View>
            <View>
                <Button icon="camera" mode="contained" onPress={() => navigation.navigate('View Sessions')}>
                    Previous sessions
                </Button>
            </View>
        </View>
        
    );

};
const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flexDirection: 'row',
        alignSelf: "center",
        justifyContent: "space-between",
    },
    iconLeft:{
//Centered horizontally
        alignSelf: "center"
    },
    iconRight:{
     //Centered horizontally
        alignSelf: "center"
    },
    counter:{
        alignSelf:"center"
          },
}

)
