import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Text } from '../../components';
import { Colors } from '../../style';
import { TextInput } from 'react-native-paper';
import api from '../../utils/services/ApiServices';

interface IForgotPasswordModalState {
    password: string
    repeatPassword: string
}
interface IForgotPasswordModalProps {
    isOpen: boolean
    toggleModal: () => void
    onDone: () => void
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
    onSetPassword = async () => {
        try {
            if (!this.state.password)
                return (global as any).showSnackbar("Please Enter Password!", "red")
            else if (this.state.password !== this.state.repeatPassword) {
                return (global as any).showSnackbar("Both password must be same!", "red")
            }
            (global as any).toggleLoading(true);
            let res = await api.savePassword(this.state.password)
            if (!res.status)
                return (global as any).showSnackbar(res.msg, "red");
            (global as any).showSnackbar(res.msg, "green");
            this.props.onDone()
        }
        catch (ex) {
            console.log(ex)
        }
        finally {
            (global as any).toggleLoading(false);
        }
    }
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
                                secureTextEntry={true}
                                mode={"outlined"}
                                onChangeText={(value) => this.setState({ password: value })}
                                label={"New Password"}
                            />
                            <TextInput
                                value={this.state.repeatPassword}
                                style={{ marginTop: 10 }}
                                secureTextEntry={true}
                                mode={"outlined"}
                                onChangeText={(value) => this.setState({ repeatPassword: value })}
                                label={"Confirm Password"}
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