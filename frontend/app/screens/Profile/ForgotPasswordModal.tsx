import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback, Modal, TextInput } from 'react-native';
import { Text } from '../../components';
import { Colors } from '../../style';
import { FontAwesome, Ionicons } from "@expo/vector-icons";

interface IForgotPasswordModalState {
    password: string
    repeatPassword: string
}
interface IForgotPasswordModalProps {
    isOpen: boolean
    toggleModal: () => void
}
class ForgotPasswordModal extends Component<IForgotPasswordModalProps, IForgotPasswordModalState> {
    constructor(props: IForgotPasswordModalProps) {
        super(props);
        this.state = {
            password: "",
            repeatPassword: "",
        }
    }

    componentDidMount() { }
    onSetPassword = () => { }
    onCancelPress = () => {
        this.props.toggleModal();
    }
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.isOpen}
                onRequestClose={() => {
                    this.props.toggleModal()
                }}
            >
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <Text.H1 green>Set Password</Text.H1>
                        <Text.Tertiary lightGray style={{ marginTop: 5 }}>
                            Choose a strong password you will remember to protect your Vapour account
                        </Text.Tertiary>
                        <View style={{ marginTop: 25 }} >
                            <TextInput
                                value={this.state.password}
                                style={styles.usernameInput}
                                onChangeText={(value) => this.setState({ password: value })}
                                placeholder={"New Password"}
                            />
                            <TextInput
                                value={this.state.repeatPassword}
                                style={[styles.usernameInput, { marginTop: 10 }]}
                                onChangeText={(value) => this.setState({ repeatPassword: value })}
                                placeholder={"Repeat New Password"}
                            />
                        </View>
                        <View style={{ alignItems: "flex-end", flexDirection: 'row', justifyContent: 'flex-end', marginTop: 25 }}>
                            <TouchableOpacity onPress={this.onCancelPress} >
                                <Text.Secondary green>Cancel</Text.Secondary>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onSetPassword} style={{ marginLeft: 10 }}>
                                <Text.Secondary green>Set Password</Text.Secondary>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ForgotPasswordModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        height: 375,
        width: 320,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    usernameInput: {
        borderColor: Colors.blue50,
        borderWidth: 2,
        padding: 15,
        borderRadius: 5
    },

    imageIcon: {
        position: "relative",
        top: -35,
        right: 20,
        width: 40,
        height: 40,
        backgroundColor: Colors.grey10,
        borderRadius: 50,

        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    cameraIcon: {
        position: "relative",
        top: -35,
        right: -20,
        width: 40,
        height: 40,
        backgroundColor: Colors.grey10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});