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

let dataList = {

}

const ChoosableItem = ({title}) => {
    const [isPressed, setPressed] = React.useState(false);
    const [itemStyle, setStyle] = React.useState(styles.item);

    const addData = () => {
            let counter = Object.keys(dataList).length;
            dataList[counter] = title;
            setStyle(styles.pressed_item);
            setPressed(true);
    }

    const deleteData = () => {
        const tempDataList = {};
        let counter = 0;

        for (const tag in dataList){
            if(dataList[tag] === title)
                continue;
            else{
                tempDataList[counter] = dataList[tag];
                counter++;
            }
        }
        dataList = tempDataList;
        setStyle(styles.item);
        setPressed(false);
    }

    return(
        <View style={itemStyle}>
            <Text style={{fontSize: 16}} onPress={ () => isPressed ? deleteData() : addData()}>
                {title}
            </Text>
        </View>
    )
}

const InitialDescConfigureScreen = () =>{
    // its necessary for Navigator to work properly
    const navigation = useNavigation();
    const [description, onChangeText] = React.useState('');

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
    // its necessary for Navigator to work properly
    const navigation = useNavigation();

    const updateUserData = () => {
        userData.tags = dataList;
    }

    React.useEffect(() =>{
        dataList = {};
    })


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
                <Button title="Next" onPress={ () => { updateUserData(); console.log(userData); navigation.navigate("Lang");}} />
                <Button title="test" onPress={ () => console.log(dataList)} />
            </View>
        </SafeAreaView>
    );

}

const InitialLangConfigureScreen = () => {
    // its necessary for Navigator to work properly
    const navigation = useNavigation();

    React.useEffect(() =>{
        dataList = {};
    })

    const updateUserData = () => {
        userData.langs = dataList;
    }

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.footer}>What languagse would you like to learn?</Text>
            </View>
            <Separator />
            <View>
                <ChoosableItem title="English"/>
                <ChoosableItem title="Spanish"/>
                <ChoosableItem title="Cebulacki"/>
                <ChoosableItem title="Deutch"/>
            </View>
            <View style={styles.fixToText}>
                <Button title="Back" onPress={ () => navigation.goBack()} />
                <Button title="Done!" onPress={ () => { updateUserData(); console.log(userData); navigation.navigate("Home")}} />
                <Button title="test" onPress={ () => console.log(dataList)} />
            </View>
        </SafeAreaView>
    );

}


export {InitialDescConfigureScreen, InitialTagsConfigureScreen, InitialLangConfigureScreen};
