import "react-native-gesture-handler";
import React from "react";
import {styles} from "../styles";
import {Text, View} from "react-native";

let dataList = {

}

const ChoosableItem = ({title}) => {
    const [isPressed, setPressed] = React.useState(false);
    const [itemStyle, setStyle] = React.useState(styles.item);

    React.useEffect(() => {
        dataList = {};
        return() => {
            dataList = {};
        }
    },[])

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

export {ChoosableItem, dataList};
