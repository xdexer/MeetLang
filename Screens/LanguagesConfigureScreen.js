import "react-native-gesture-handler";
import React from "react";
import {Button, SafeAreaView, Text, View} from "react-native";
import {styles} from "../styles";
import {Separator} from "../Components/Separator";
import {ChoosableItem, dataList} from "../Components/ChoosableItem";

const LanguagesConfigureScreen = ({navigation, route}) => {
    const { user } = route.params;


    const updateUserData = () => {
        user.langs = dataList;
    }

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.footer}>What languagse would you like to learn?</Text>
            </View>
            <Separator />
            <View>
                <ChoosableItem title="English" />
                <ChoosableItem title="Spanish"/>
                <ChoosableItem title="Cebulacki"/>
                <ChoosableItem title="Deutch"/>
            </View>
            <View style={styles.fixToText}>
                <Button title="Back" onPress={ () => navigation.goBack()} />
                <Button title="Done!" onPress={ () => { updateUserData(); console.log(user); navigation.navigate("Home", {user: user})}} />
                <Button title="test" onPress={ () => console.log(dataList)} />
            </View>
        </SafeAreaView>
    );

}

export {LanguagesConfigureScreen};
