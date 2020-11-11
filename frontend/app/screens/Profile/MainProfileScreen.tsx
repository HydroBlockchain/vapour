import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Text } from '../../components';
import { Colors } from '../../style';
import { FontAwesome } from "@expo/vector-icons";
import AddUpdateProfileImageModal from './AddUpdateProfileImageModal'
import ForgotPasswordModal from './ForgotPasswordModal';

interface IMainProfileScreenState {
    profileName: string
    isProfilePictureModalOpen: boolean
    isForgotPasswordModalOpen: boolean
}
interface IMainProfileScreenProps {

}
class MainProfileScreen extends Component<IMainProfileScreenProps, IMainProfileScreenState> {
    constructor(props: IMainProfileScreenProps) {
        super(props);
        this.state = {
            profileName: 'Nik Maniya',
            isProfilePictureModalOpen: false,
            isForgotPasswordModalOpen: false,
        }
    }

    componentDidMount() {

    }
    toggleProfilePictureModal = () => {
        this.setState({ isProfilePictureModalOpen: !this.state.isProfilePictureModalOpen })
    }

    toggleForgotPasswordModal = () => {
        this.setState({ isForgotPasswordModalOpen: !this.state.isForgotPasswordModalOpen })
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 10 }}>
                <View>
                    <View style={{ height: 100, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={this.toggleProfilePictureModal}>
                            <FontAwesome
                                name="user-circle"
                                size={100}
                                color={Colors.grey70}
                            />
                        </TouchableOpacity>
                        <View style={styles.profileNameView}>
                            <View style={{ flex: 8, paddingLeft: 10, flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center' }}>
                                <Text.Primary bold style={{ fontSize: 14 }} green>Profile Name</Text.Primary>
                                <TextInput
                                    value={this.state.profileName}
                                    onChangeText={(value) => this.setState({ profileName: value })}
                                    style={{ fontWeight: 'bold', fontSize: 18, paddingLeft: 4 }}
                                    placeholder={"Enter Profile Name"}
                                />
                            </View>
                            <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center', }}>
                                <FontAwesome
                                    name="pencil"
                                    size={28}
                                    color={Colors.grey70}
                                />
                                <FontAwesome
                                    name="share-alt"
                                    size={28}
                                    style={{ paddingLeft: 10 }}
                                    color={Colors.grey70}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <Text.H1 green>Account</Text.H1>
                        <View style={styles.usernameView}>
                            <View style={{ paddingLeft: 10, flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center' }}>
                                <Text.Primary bold style={{ fontSize: 14 }} green>Registered Username</Text.Primary>
                                <TextInput
                                    value={this.state.profileName}
                                    onChangeText={(value) => this.setState({ profileName: value })}
                                    style={{ fontWeight: 'bold', fontSize: 18 }}
                                    placeholder={"Enter Profile Name"}
                                />
                            </View>
                        </View>
                        <View style={[styles.usernameView, { marginTop: 25 }]}>
                            <View style={{ flex: 9, paddingLeft: 10, flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center' }}>
                                <Text.Primary bold style={{ fontSize: 14 }} green>Identity</Text.Primary>
                                <TextInput
                                    value={this.state.profileName}
                                    onChangeText={(value) => this.setState({ profileName: value })}
                                    style={{ fontWeight: 'bold', fontSize: 18 }}
                                    placeholder={"Enter Profile Name"}
                                />
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                                <FontAwesome
                                    name="qrcode"
                                    size={28}
                                    color={Colors.green50}
                                />
                            </View>
                        </View>
                        <View style={[{ marginTop: 25, flexDirection: 'row' }]}>
                            <View style={{ flex: 1 }}>
                                <View style={{ marginRight: 5 }}>
                                    <TouchableHighlight onPress={this.toggleForgotPasswordModal}>
                                        <Text.Primary center green style={styles.backupForgetView}>Backup Account</Text.Primary>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ marginLeft: 5 }}>
                                    <TouchableHighlight onPress={this.toggleForgotPasswordModal}>
                                        <Text.Primary center green style={styles.backupForgetView}>Forgot Password</Text.Primary>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <ForgotPasswordModal
                    isOpen={!this.state.isForgotPasswordModalOpen}
                    toggleModal={this.toggleForgotPasswordModal}
                />
                <AddUpdateProfileImageModal
                    isOpen={this.state.isProfilePictureModalOpen}
                    toggleModal={this.toggleProfilePictureModal}
                />
            </View>
        );
    }
}

export default MainProfileScreen;

const styles = StyleSheet.create({
    profileNameView: {
        height: 80,
        width: Dimensions.get('screen').width * 0.65,
        marginLeft: 10,
        borderRadius: 8,
        backgroundColor: '#e6e6e6',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    usernameView: {
        height: 80,
        marginTop: 10,
        borderRadius: 8,
        backgroundColor: '#e6e6e6',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    backupForgetView: {
        borderColor: Colors.grey40,
        borderWidth: 1,
        borderRadius: 8,
        padding: 15
    }
});