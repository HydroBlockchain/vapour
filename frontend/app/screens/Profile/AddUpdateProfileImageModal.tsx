import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback, Modal } from 'react-native';
import { Text } from '../../components';
import { Colors } from '../../style';
import { FontAwesome, Ionicons } from "@expo/vector-icons";

interface IAddUpdateProfileImageModalState {

}
interface IAddUpdateProfileImageModalProps {
    isOpen: boolean
    toggleModal: () => void
}
class AddUpdateProfileImageModal extends Component<IAddUpdateProfileImageModalProps, IAddUpdateProfileImageModalState> {
    constructor(props: IAddUpdateProfileImageModalProps) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() { }
    OnPressGallery = () => { }

    OnPressCamera = () => { }
    onOkayPress = () => { }
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
                        <Text.H1 green>Profile</Text.H1>
                        <Text.Tertiary lightGray center style={{ marginVertical: 25 }}>
                            Your Profile shares with only your contacts
                        </Text.Tertiary>
                        <View style={{ alignItems: 'center' }}>
                            <FontAwesome
                                name={"user-circle"}
                                size={120}
                                style={{ backgroundColor: Colors.grey10, borderRadius: 70 }}
                                color={Colors.blue50}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.imageIcon} onPress={this.OnPressGallery} >
                                    <Ionicons name={"md-image"} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cameraIcon} onPress={this.OnPressCamera}>
                                    <Ionicons name={"md-camera"} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignItems: "flex-end", flexDirection: 'row', justifyContent: 'flex-end', marginTop: 25 }}>
                            <TouchableOpacity onPress={this.onCancelPress} >
                                <Text.Secondary green>Cancel</Text.Secondary>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onOkayPress} style={{ marginLeft: 10 }}>
                                <Text.Secondary green>Ok</Text.Secondary>
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
    }
});