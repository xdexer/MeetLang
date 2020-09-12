import {TextInput} from "react-native";
import {styles} from "../styles";
import React from "react";


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

export {MultilineTextInput};
