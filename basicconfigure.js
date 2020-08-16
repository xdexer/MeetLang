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
import { useNavigation } from "@react-navigation/native";


const Separator = () => {
    return <View style={styles.separator} />;
};

const MultilineTextInput = (props) => {
    return(
        <TextInput
            {...props}
            style={styles.multiline_input}
            editable
            maxLength={1000}
        />
    );
}

const userData = {
}

let tagsList = {

}

const TagItem = ({title}) => {
    const [isPressed, setPressed] = React.useState(false);

    const addData = () => {
            let tagsCount = Object.keys(tagsList).length;
            tagsList["tag" + tagsCount] = title;
            setPressed(true);
    }

    const deleteData = () => {
        const tempTagList = {};
        let counter = 0;

        for (const tag in tagsList){
            if(tagsList[tag] === title){
                delete tagsList[tag];
            }
        }
        for (const tag in tagsList){
            tempTagList["tag" + counter] = tagsList[tag];
            counter++;
        }
        tagsList = tempTagList;
        setPressed(false);
    }

    return(
        <View style={styles.item}>
            <Text style={{fontSize: 16}} onPress={ () => isPressed ? deleteData() : addData()}>
                {title}
            </Text>
        </View>
    )
}

const InitialDescConfigureScreen = () => {
    const [description, onChangeText] = React.useState('');
    const navigation = useNavigation();

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
                <Button title="Back" onPress={ () => navigation.navigate("Home")} />
                <Button title="Next" onPress={ () => { userData.desc = description; navigation.navigate("Tags");}} />
            </View>
        </SafeAreaView>
    )
}

const InitialTagsConfigureScreen = () => {
    const navigation = useNavigation();
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.footer}>Choose your hobby!</Text>
            </View>
            <Separator />
            <View>
               <TagItem title="dupa" />
               <TagItem title="cipa" />
               <TagItem title="koks" />
               <TagItem title="woda" />
            </View>
            <View style={styles.fixToText}>
                <Button title="Back" onPress={ () => navigation.goBack()} />
                <Button title="Next" onPress={ () => { userData.tags = tagsList; console.log(userData); navigation.navigate("Lang");}} />
                <Button title="test" onPress={ () => console.log(tagsList)} />
            </View>
        </SafeAreaView>
    );

}

const InitialLangConfigureScreen = () => {
    const userLangs = [];
    const navigation = useNavigation();
    return(
        <SafeAreaView style={styles.container}>
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
