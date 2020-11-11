import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from '../../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../style';
import { Ionicons } from "@expo/vector-icons";

interface ILoginItemCardState {

}
interface ILoginItemCardProps {
    itemName: string
    itemLogoName: string
    isOutlineCard: boolean

    onItemPress: () => void
}
class LoginItemCard extends Component<ILoginItemCardProps, ILoginItemCardState> {
    constructor(props: ILoginItemCardProps) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <TouchableOpacity style={{ paddingVertical: 10 }} onPress={this.props.onItemPress} activeOpacity={0.6}>

                <View style={[
                    {
                        flex: 1, flexDirection: 'row', justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 15,
                        borderRadius: 10
                    },
                    this.props.isOutlineCard ?
                        { borderColor: Colors.blue50, borderWidth: 2 } :
                        {
                            backgroundColor: Colors.blue50, shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }
                ]}

                >
                    <View style={{ width: 50 }}>
                        <Ionicons
                            name={this.props.itemLogoName}
                            size={30}
                            color={this.props.isOutlineCard ? Colors.blue50 : "white"}
                        />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text.Primary bold style={[{ fontSize: 15 }, this.props.isOutlineCard ? { color: Colors.blue50 } : { color: "white" }]}>
                            {this.props.itemName}
                        </Text.Primary>
                    </View>
                    <View style={{ width: 50, alignItems: 'flex-end' }}>
                        <Ionicons
                            name={"ios-arrow-dropright-circle"}
                            size={30}
                            color={this.props.isOutlineCard ? Colors.blue50 : "white"}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default LoginItemCard;