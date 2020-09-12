import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'


import {NameConfigureScreen} from "../Screens/NameConfigureScreen";
import {BirthdateConfigureScreen} from "../Screens/BirthdateConfigureScreen";
import {DescriptionConfigureScreen} from "../Screens/DescriptionConfigureScreen";
import {TagsConfigureScreen} from "../Screens/TagsConfigureScreen";
import {LanguagesConfigureScreen} from "../Screens/LanguagesConfigureScreen";

const ConfigureStackNavigator = () => {

    const Root = createStackNavigator()

    return (
            <Root.Navigator>
                <Root.Screen name="Name" component={NameConfigureScreen} />
                <Root.Screen name="Birthdate" component={BirthdateConfigureScreen} />
                <Root.Screen name="Description" component={DescriptionConfigureScreen} />
                <Root.Screen name="Tags" component={TagsConfigureScreen} />
                <Root.Screen name="Languages" component={LanguagesConfigureScreen} />
            </Root.Navigator>
    )
}

export {ConfigureStackNavigator};
