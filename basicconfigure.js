import 'react-native-gesture-handler';
import React from 'react';
import {styles} from './styles';
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
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";


const Separator = () => {
    return <View style={styles.separator} />;
};


const DescriptionTextInput = (props) => {
    return(
        <TextInput
            {...props}
            style={styles.multiline_input}
            editable
            maxLength={1000}
        />
    );
}


const InitialDescConfigureScreen = () => {
    const [description, setDescription] = React.useState('');
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.footer}>What do you like? Tell us something about yourself</Text>
            </View>
            <Separator />
            <View>
                <DescriptionTextInput
                    multiline
                    numberOfLines={4}
                    setDescription={text => setDescription(text)}
                    description={description}
                    />
            </View>
            <Separator/>
            <View style={styles.fixToText}>
                <Button title="Back" onPress={ () => navigation.navigate("Home")} />
                <Button title="Next" onPress={ () => navigation.navigate("Tags")} />
            </View>
        </SafeAreaView>
    )
}

const InitialTagsConfigureScreen = () => {
    const userTags = [];
    const navigation = useNavigation();
    return(
        <SafeAreaView>
            <View>
                <Text style={styles.footer}>Choose your hobby!</Text>
            </View>
            <Separator />
            <View style={styles.fixToText}>
                <Button title="Back" onPress={ () => navigation.goBack()} />
                <Button title="Next" onPress={ () => navigation.navigate("Lang")} />
            </View>
        </SafeAreaView>
    );

}

const InitialLangConfigureScreen = () => {
    const userLangs = [];
    const navigation = useNavigation();
    return(
        <SafeAreaView>
            <View>
                <Text style={styles.footer}>What languagse would you like to learn?</Text>
            </View>
            <Separator />
            <View style={styles.fixToText}>
                <Button title="Back" onPress={ () => navigation.goBack()} />
                <Button title="Done!" onPress={ () => navigation.navigate("Home")} />
            </View>
        </SafeAreaView>
    );

}


export {InitialDescConfigureScreen, InitialTagsConfigureScreen, InitialLangConfigureScreen};
