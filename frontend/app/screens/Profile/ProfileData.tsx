import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Avatar, TextInput, Title, Headline, Caption, Text, withTheme } from 'react-native-paper';
import AddUpdateProfileImageModal from './AddUpdateProfileImageModal';
import api from '../../utils/services/ApiServices';
import auth from '../../utils/services/AuthService';
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from '../../style';
import ForgotPasswordModal from './ForgotPasswordModal';


interface IProfileDataState {
    profileName: string
    username: string
    userImage: string
    walletAddress: string
    isProfilePictureModalOpen: boolean
    isForgotPasswordModalOpen: boolean
}
interface IProfileDataProps {
    theme: any
}
class ProfileData extends Component<IProfileDataProps, IProfileDataState> {
    constructor(props: IProfileDataProps) {
        super(props);
        this.state = {
            profileName: '',
            username: '',
            userImage: '',
            walletAddress: '',
            isProfilePictureModalOpen: false,
            isForgotPasswordModalOpen: false,
        }
    }

    componentDidMount() {
        let userData = (global as any).userData;
        // console.log(userData)
        this.setState({
            profileName: userData.name,
            username: userData.username,
            userImage: userData.userImage,
            walletAddress: userData.walletAddress,
            isProfilePictureModalOpen: false,
            isForgotPasswordModalOpen: false,
        })
    }
    toggleProfilePictureModal = () => {
        this.setState({ isProfilePictureModalOpen: !this.state.isProfilePictureModalOpen })
    }

    toggleForgotPasswordModal = () => {
        this.setState({ isForgotPasswordModalOpen: !this.state.isForgotPasswordModalOpen })
    }
    onCompleteImageUpload = async () => {
        try {
            this.toggleProfilePictureModal();
            (global as any).toggleLoading(true)
            let res = await api.getUserInfo()
            // console.log(res)
            if (!res.status)
                return (global as any).showSnackbar(res.msg, "red")
            await auth.setUserData(res.data)
            this.setState({ userImage: res.data.userImage })
        }
        catch (ex) {
            console.log(ex)
        }
        finally {
            (global as any).toggleLoading(false)
        }
    }
    onUserNameEdit = async () => {
        try {
            (global as any).toggleLoading(true)
            let param: any = {
                name: this.state.profileName
            }
            let data = await api.saveNameAndImage(param)
            if (!data.status)
                return (global as any).showSnackbar(data.msg, "red");
            (global as any).showSnackbar(data.msg, "green")
        }
        catch (ex) {
            console.log(ex, "Error")
        }
        finally {
            (global as any).toggleLoading(false)
        }
    }
    onPasswordChange = async () => {
        console.log("Password Change")
        this.toggleForgotPasswordModal();
    }

    render() {
        const { theme } = this.props;
        return (
            <View style={{ flex: 1, padding: 10 }}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={this.toggleProfilePictureModal}>
                        {this.state.userImage ?
                            <Avatar.Image source={{ uri: this.state.userImage }} size={100} style={[{ marginRight: 10 }, styles.boxShadow]} />
                            :
                            <Avatar.Icon icon="account" size={100} style={[{ marginRight: 10 }, styles.boxShadow]} />
                        }
                    </TouchableOpacity>
                    <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                        <TextInput
                            label="Profile Name"
                            value={this.state.profileName}
                            mode="outlined"
                            onChangeText={text => this.setState({ profileName: text })}
                            right={
                                // <TouchableOpacity onPress={this.onUserNameEdit}>
                                <TextInput.Icon onPress={this.onUserNameEdit} name="pencil" size={30} />
                                // </TouchableOpacity>
                            }
                        />
                    </View>
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Headline style={{ fontWeight: 'bold', fontSize: 28 }}>Account</Headline>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Card elevation={5}>
                        <Card.Content>
                            <Title style={{ fontWeight: 'bold', fontSize: 15 }}>Username</Title>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: theme.colors.placeholder }}>{this.state.username}</Text>
                        </Card.Content>
                    </Card>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Card elevation={5}>
                        <Card.Content style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 11 }}>
                                <Title style={{ fontWeight: 'bold', fontSize: 15 }}>Identity</Title>
                                <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 20, color: theme.colors.placeholder }}>{this.state.walletAddress}</Text>
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => console.log("On Press")}>
                                    <FontAwesome
                                        name="qrcode"
                                        size={40}
                                        color={Colors.green50}
                                    />
                                </TouchableOpacity>
                            </View>
                        </Card.Content>
                    </Card>
                </View>
                <View style={{ marginTop: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, paddingRight: 3 }}>
                            <Button
                                onPress={this.toggleForgotPasswordModal}
                                mode="contained"
                                labelStyle={{ letterSpacing: 0,padding: 10 }}
                                uppercase={false}
                            >
                                Backup Account
                            </Button>
                        </View>
                        <View style={{ flex: 1, paddingLeft: 3 }}>
                            <Button
                                onPress={this.toggleForgotPasswordModal}
                                mode="contained"
                                labelStyle={{ letterSpacing: 0, padding: 10 }}
                                uppercase={false}
                            >
                                Forgot Password
                            </Button>
                        </View>
                    </View>
                </View>
                <AddUpdateProfileImageModal
                    isOpen={this.state.isProfilePictureModalOpen}
                    toggleModal={this.toggleProfilePictureModal}
                    onDone={this.onCompleteImageUpload}
                />
                <ForgotPasswordModal
                    isOpen={this.state.isForgotPasswordModalOpen}
                    toggleModal={this.toggleForgotPasswordModal}
                    onDone={this.onPasswordChange}
                />
            </View>
        );
    }
}

export default withTheme(ProfileData);

const styles = StyleSheet.create({

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