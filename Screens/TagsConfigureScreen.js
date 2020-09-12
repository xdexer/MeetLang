import "react-native-gesture-handler"
import React from "react";
import {Button, SafeAreaView, Text, View} from "react-native";
import {styles} from "../styles";
import {Separator} from "../Components/Separator";
import {ChoosableItem, dataList} from "../Components/ChoosableItem";


const TagsConfigureScreen = ({navigation, route}) => {
    const { user } = route.params;

    const updateUserData = () => {
        user.tags = dataList;
    }


    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.footer}>Choose your hobby!</Text>
            </View>
            <Separator />
            <View>
                <ChoosableItem title="Music" />
                <ChoosableItem title="Games" />
                <ChoosableItem title="Netflix & Chill" />
                <ChoosableItem title="Journeys small and big" />
            </View>
            <Separator />
            <View style={styles.fixToText}>
                <Button title="Back" onPress={ () => navigation.goBack()} />
                <Button title="Next" onPress={ () => { updateUserData(); console.log(user); navigation.navigate("Languages", {user: user});}} />
                <Button title="test" onPress={ () => console.log(dataList)} />
            </View>
        </SafeAreaView>
    );

}

export {TagsConfigureScreen};
