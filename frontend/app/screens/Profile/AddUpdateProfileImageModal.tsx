import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback, Modal } from 'react-native';
import { Text } from '../../components';
import { Colors } from '../../style';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import api from '../../utils/services/ApiServices';
import { Avatar } from 'react-native-paper';


interface IAddUpdateProfileImageModalState {
    profileImageUri: string
    profileImageBase64: string
}
interface IAddUpdateProfileImageModalProps {
    isOpen: boolean
    toggleModal: () => void
    onDone: () => void
}
class AddUpdateProfileImageModal extends Component<IAddUpdateProfileImageModalProps, IAddUpdateProfileImageModalState> {
    constructor(props: IAddUpdateProfileImageModalProps) {
        super(props);
        this.state = {
            profileImageUri: "",
            profileImageBase64: ""
        }
    }

    componentDidMount() { }

    takePhoto = async () => {
        let result: any = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            this.setState({ profileImageUri: result.uri })
            this.setState({ profileImageBase64: "data:image/png;base64," + result.base64 })
        }
    }
    pickImage = async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
            base64: true
        });

        if (!result.cancelled) {
            this.setState({ profileImageUri: result.uri })
            this.setState({ profileImageBase64: "data:image/png;base64," + result.base64 })
        }
    };
    onCancelPress = () => {
        this.props.toggleModal();
    }
    onSave = async () => {
        try {
            (global as any).toggleLoading(true)
            let param: any = {
                profileImageBase64: this.state.profileImageBase64
            }
            if (param.profileImageBase64)
                param.fileExtension = this.state.profileImageUri.split('.').pop()
            let data = await api.saveNameAndImage(param)
            // console.log(data)
            if (!data.status)
                return (global as any).showSnackbar(data.msg, "red");
            (global as any).showSnackbar(data.msg, "green")
            this.props.onDone();
        }
        catch (ex) {
            console.log(ex, "Error")
        }
        finally {
            (global as any).toggleLoading(false)
        }
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
                        <Text.H1 green>Profile</Text.H1>
                        <Text.Tertiary lightGray center style={{ marginVertical: 25 }}>
                            Your Profile shares with only your contacts
                        </Text.Tertiary>
                        <View style={{ alignItems: 'center' }}>
                            {this.state.profileImageUri ?
                                <Avatar.Image source={{ uri: this.state.profileImageUri }} size={120} style={[{ marginRight: 10 }, styles.boxShadow]} />
                                :
                                <Avatar.Icon icon="account" size={120} style={[{ marginRight: 10 }, styles.boxShadow]} />
                            }
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.imageIcon} onPress={this.pickImage} >
                                    <Ionicons name={"md-image"} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cameraIcon} onPress={this.takePhoto}>
                                    <Ionicons name={"md-camera"} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignItems: "flex-end", flexDirection: 'row', justifyContent: 'flex-end', marginTop: 25 }}>
                            <TouchableOpacity onPress={this.onCancelPress} >
                                <Text.Secondary green>Cancel</Text.Secondary>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onSave} style={{ marginLeft: 10 }}>
                                <Text.Secondary green>Save</Text.Secondary>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default AddUpdateProfileImageModal;

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
        height: 400,
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
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});