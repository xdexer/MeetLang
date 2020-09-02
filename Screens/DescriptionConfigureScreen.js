import 'react-native-gesture-handler';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput,
    View,
    Text,
    StatusBar,
    Button,
    Alert,
} from 'react-native';
import {styles} from '../styles';
import {MultilineTextInput} from "../Components/MultilineTextInput";
import {Separator} from "../Components/Separator";



const DescriptionConfigureScreen = ({navigation, route}) =>{
    // its necessary for Navigator to work properly
    const [description, onChangeText] = React.useState("");

    const { user } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.footer}>What do you like? Tell us something about yourself</Text>
            </View>
            <Separator />
            <View>
                <MultilineTextInput
                    multiline
                    numberOfLines={4}
                    onChangeText={text => onChangeText(text)}
                    description={description}
                />
            </View>
            <Separator/>
            <View style={styles.fixToText}>
                <Button title="Back" onPress={ () => navigation.goBack()} />
                <Button title="test" onPress={ () => { console.log(user);}} />
                <Button title="Next" onPress={ () => { user.desc = description; navigation.navigate("Tags", {user: user})}} />
            </View>
        </SafeAreaView>
    )
}


export {DescriptionConfigureScreen};
