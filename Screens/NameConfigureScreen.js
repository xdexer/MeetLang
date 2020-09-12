import 'react-native-gesture-handler';
import React from "react";
import {Button, SafeAreaView, Text, TextInput, View} from "react-native";
import {styles} from "../styles";
import {Separator} from "../Components/Separator";




const NameConfigureScreen = ({navigation, route}) =>{
    const [name, onChangeText] = React.useState("");

    const { user } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.footer}>Tell us your name?</Text>
            </View>
            <Separator />
            <View>
                <TextInput
                    style={{height: 40, borderColor: "gray", borderWidth: 1}}
                    onChangeText={text => onChangeText(text)}
                    name={name}
                />
            </View>
            <View style={styles.fixToText}>
                <Button title="Back" onPress={ () => navigation.goBack()} />
                <Button title="Next" onPress={ () => { user.name = name; navigation.navigate("Birthdate", {user: user});}} />
            </View>
        </SafeAreaView>
    )
}

export {NameConfigureScreen};
