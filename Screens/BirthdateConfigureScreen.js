import "react-native-gesture-handler"
import React from "react";
import {Button, SafeAreaView, Text, TextInput, View} from "react-native";
import {styles} from "../styles";
import {Separator} from "../Components/Separator";


const BirthdateConfigureScreen = ({navigation, route}) =>{
    const [birthdate, onChangeText] = React.useState("");
    const { user } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.footer}>When is your birthday?</Text>
            </View>
            <Separator />
            <View>
                <TextInput
                    style={{height: 40, borderColor: "gray", borderWidth: 1}}
                    onChangeText={text => onChangeText(text)}
                    birthdate={birthdate}
                />
            </View>
            <View style={styles.fixToText}>
                <Button title="Back" onPress={ () => navigation.goBack()} />
                <Button title="test" onPress={ () => { console.log(user);}} />
                <Button title="Next" onPress={ () => { user.birthdate = birthdate; navigation.navigate("Description", {user: user});}} />
            </View>
        </SafeAreaView>
    )
}

export {BirthdateConfigureScreen};
