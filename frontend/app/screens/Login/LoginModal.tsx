import React, { Component } from 'react';
import { View, Modal, StyleSheet, ImageBackground, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, Switch, AsyncStorage, TouchableHighlightBase } from "react-native";
import { Text, Button } from '../../components';
import { Colors } from '../../style';
import Carousel from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';
import api from '../../utils/services/ApiServices';
import Loader from '../../components/Loader';
import SnackBar from '../../components/SnackBar';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-paper';
import auth from '../../utils/services/AuthService';

interface ILoginModalState {
    username: string
    chosenUsername: string
    password: string
    repeatPassword: string
    index: number
    isEncrypt: boolean
    isUsernameExist: boolean
    isLoading: boolean
    profileName: string
    profileImageUri: string
    profileImageBase64: string
}

interface ILoginModalProps {
    isOpen: boolean
    toggleModal: () => void
    onProfileComplete: () => void
}

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.99);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const DATA = [];
for (let i = 0; i < 3; i++) {
    DATA.push(i)
}

class LoginModal extends Component<ILoginModalProps, ILoginModalState> {
    constructor(props: ILoginModalProps) {
        super(props);
        this.state = {
            username: "",
            chosenUsername: "",
            index: 0,
            isEncrypt: false,
            password: "",
            repeatPassword: "",
            isUsernameExist: null,
            profileName: '',
            isLoading: false,
            profileImageUri: "",
            profileImageBase64: "",

        }
    }
    carousel: any

    checkUsernameExist = async (username) => {
        try {
            this.setState({ username })
            // if (username.length > 2) {
            let res = await api.isUserNameExist(username)
            console.log(res)
            if (res.data.isExist) {
                this.setState({ isUsernameExist: true })
            }
            else {
                this.setState({ isUsernameExist: false })
            }
            // }
        }
        catch (ex) {
            this.setState({ isLoading: false })
            console.log(ex)
        }
    }

    saveProfile = async () => {
        try {
            (global as any).toggleLoading(true)
            let param: any = {
                name: this.state.profileName,
                profileImageBase64: this.state.profileImageBase64
            }
            if (param.profileImageBase64)
                param.fileExtension = this.state.profileImageUri.split('.').pop()
            let data = await api.saveNameAndImage(param)
            console.log(data)
            if (!data.status)
                return (global as any).showSnackbar(data.msg, "red")
            this.props.toggleModal();
            this.props.onProfileComplete()
        }
        catch (ex) {
            console.log(ex, "Error")
        }
        finally {
            (global as any).toggleLoading(false)
        }
    }
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


    _renderItem = ({ item }) => {
        return (
            <View style={[styles.modalView, { height: 425, width: "89%", backgroundColor: "white" }]}>
                {item == 0 &&
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        <View >
                            <Text.Primary bold center>
                                Choose a username for your account
                            </Text.Primary>
                        </View>
                        <View style={{ alignItems: 'flex-end', paddingTop: 5 }}>
                            <TouchableOpacity onPress={this.onRecommend} style={styles.recommendButton} >
                                <Text.Primary style={{ fontSize: 12, width: '50%' }} white center>
                                    Recommend
                                </Text.Primary>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 40, paddingHorizontal: 10 }}>
                            <TextInput
                                onChangeText={this.checkUsernameExist}
                                style={styles.usernameInput}
                                placeholder={"Enter Your Username"}
                            />
                            {this.state.isUsernameExist === true &&
                                <Text.Tertiary style={{ color: Colors.red50, marginTop: 2 }}>
                                    Username Exist!
                                </Text.Tertiary>
                            }
                        </View>
                        <View style={{ paddingTop: 60, paddingHorizontal: 10 }}>
                            <Button.Primary style={styles.chooseButton} fullWidth onPress={this.chooseUsername} textType={"Primary"}>
                                <Text.Primary white bold >Choose Username</Text.Primary>
                            </Button.Primary>
                        </View>
                        <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                            <Button.Secondary fullWidth onPress={this.skipUsername} textType={"Primary"}>
                                <Text.Tertiary >Skip Choosing Username</Text.Tertiary>
                            </Button.Secondary>
                        </View>
                    </View>
                }
                {item == 1 &&
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        <View >
                            <Text.Primary bold center>
                                Encrypt account with password
                            </Text.Primary>
                        </View>
                        <View style={{ alignItems: 'flex-end', paddingTop: 5 }}>
                            <TouchableOpacity onPress={this.onRecommend} style={styles.recommendButton} >
                                <Text.Primary style={{ fontSize: 12, width: '50%' }} white center>
                                    Optional
                                </Text.Primary>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: "center" }}>
                            <View style={{ flex: 8 }}>
                                <Text.Tertiary >
                                    Enter a password to Encrypt the account key on this device
                                </Text.Tertiary>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Switch
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={this.toggleSwitch}
                                    value={this.state.isEncrypt}
                                />
                            </View>
                        </View>
                        {!this.state.isEncrypt ?
                            <View style={{ paddingTop: 20, alignItems: 'center' }}>
                                <Ionicons
                                    name={"md-lock"}
                                    size={120}
                                    color={Colors.blue50}
                                />
                            </View>
                            :
                            <View style={{ paddingTop: 20 }}>
                                <TextInput
                                    value={this.state.password}
                                    style={styles.usernameInput}
                                    secureTextEntry={true}
                                    onChangeText={(value) => this.setState({ password: value })}
                                    placeholder={"New Password"}
                                />
                                <TextInput
                                    value={this.state.repeatPassword}
                                    secureTextEntry={true}
                                    style={[styles.usernameInput, { marginTop: 10 }]}
                                    onChangeText={(value) => this.setState({ repeatPassword: value })}
                                    placeholder={"Repeat New Password"}
                                />
                            </View>
                        }
                        <View style={{ paddingTop: 20 }} >
                            <Text.Tertiary center>
                                Note that the password con not be recovered.
                            </Text.Tertiary>
                        </View>
                        <View style={{ paddingTop: 20, paddingHorizontal: 10 }}>
                            <Button.Primary style={styles.chooseButton} fullWidth onPress={this.createAccount} textType={"Primary"}>
                                <Text.Primary white bold>Create Account</Text.Primary>
                            </Button.Primary>
                        </View>
                    </View>
                }
                {item == 2 &&
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        <View >
                            <Text.Primary bold center>
                                Profile is only shared with contacts
                            </Text.Primary>
                        </View>
                        <View style={{ alignItems: 'flex-end', paddingTop: 5 }}>
                            <TouchableOpacity onPress={this.onRecommend} style={styles.recommendButton} >
                                <Text.Primary style={{ fontSize: 12, width: '50%' }} white center>
                                    Optional
                                </Text.Primary>
                            </TouchableOpacity>
                        </View>

                        <View style={{ paddingTop: 10, alignItems: 'center' }}>
                            {this.state.profileImageUri ?
                                < Avatar.Image style={styles.shadow} size={90} source={{ uri: this.state.profileImageUri }} />
                                :
                                < Avatar.Icon icon="account" size={90} style={styles.shadow} />
                            }
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={this.pickImage} style={styles.imageIcon} >
                                    <Ionicons name={"md-image"} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.takePhoto} style={styles.cameraIcon} >
                                    <Ionicons name={"md-camera"} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <TextInput
                                value={this.state.profileName}
                                style={[styles.usernameInput, { marginTop: 0 }]}
                                onChangeText={(value) => this.setState({ profileName: value })}
                                placeholder={"Profile Name"}
                            />
                        </View>

                        <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
                            <Button.Primary style={styles.chooseButton} fullWidth onPress={this.saveProfile} textType={"Primary"}>
                                <Text.Primary white bold>Save Profile</Text.Primary>
                            </Button.Primary>
                        </View>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Button.Secondary fullWidth onPress={this.skipProfile} textType={"Primary"}>
                                <Text.Tertiary >Skip and do this later</Text.Tertiary>
                            </Button.Secondary>
                        </View>
                    </View>
                }
            </View>
        );
    }

    createAccount = async () => {
        if (this.state.isEncrypt) {
            try {
                if (!this.state.password && this.state.isEncrypt)
                    return (global as any).showSnackbar("Please Enter Password!", "red")
                else if (this.state.isEncrypt && (this.state.password !== this.state.repeatPassword)) {
                    return (global as any).showSnackbar("Both password must be same!", "red")
                }
                (global as any).toggleLoading(true);
                let res = await api.savePassword(this.state.password)
                if (!res.status)
                    return (global as any).showSnackbar(res.msg, "red")
                this.carousel.snapToNext()
            }
            catch (ex) {
                console.log(ex)
            }
            finally {
                (global as any).toggleLoading(false);
            }

        }
        else
            this.carousel.snapToNext()
    }

    toggleSwitch = () => {
        this.setState({ isEncrypt: !this.state.isEncrypt })
    }
    chooseUsername = async () => {
        if (!this.state.username)
            return (global as any).showSnackbar("Please enter username!", "red")
        if (!this.state.isUsernameExist) {
            try {
                (global as any).toggleLoading(true);
                let res = await api.register({ username: this.state.username });
                if (!res.status)
                    return (global as any).showSnackbar(res.msg, "red")
                await auth.setToken(res.data.token);
                await auth.setUserData(res.data.userData);
                this.carousel.snapToNext()
            }
            catch (ex) {
                console.log(ex);
            }
            finally {
                (global as any).toggleLoading(false);
            }
        }
        else {
            return (global as any).showSnackbar("Please enter valid username!", "red")
        }
    }
    onRecommend = () => { }

    skipUsername = async () => {
        try {
            (global as any).toggleLoading(true);
            let res = await api.register({ username: this.state.username });
            if (!res.status)
                return (global as any).showSnackbar(res.msg, "red")
            await auth.setToken(res.data.token);
            await auth.setUserData(res.data.userData);
            this.carousel.snapToNext()
        }
        catch (ex) {
            console.log(ex);
        }
        finally {
            (global as any).toggleLoading(false);
        }
    }
    skipProfile = () => {
        this.props.toggleModal();
        this.props.onProfileComplete()
    }

    render() {
        // console.log(this.state)
        return (
            <Modal
                presentationStyle={"fullScreen"}
                animationType="slide"
                visible={this.props.isOpen}
                onRequestClose={this.props.toggleModal}
            >
                <SnackBar />
                <View style={styles.centeredView}>
                    <ImageBackground
                        source={require('../../../assets/images/vapor_logo.jpg')}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text.H2 style={{ color: 'white' }}>Create A Vapour Account</Text.H2>
                        </View>
                        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                            <Carousel
                                ref={(c) => this.carousel = c}
                                data={DATA}
                                renderItem={this._renderItem}
                                sliderWidth={SLIDER_WIDTH}
                                itemWidth={ITEM_WIDTH}
                                containerCustomStyle={styles.carouselContainer}
                                onSnapToItem={(index) => this.setState({ index })}
                                useScrollView={true}
                                scrollEnabled={false}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </Modal>
        );
    }
}

export default LoginModal;


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modal: {
        height: "100%",
    },
    usernameInput: {
        borderColor: Colors.blue50,
        borderWidth: 2,
        padding: 15,
        borderRadius: 5
    },
    chooseButton: {
        padding: 10,
        backgroundColor: Colors.blue50,
        borderRadius: 10,
        elevation: 2

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    carouselContainer: {
        marginTop: 50
    },
    recommendButton: {
        paddingVertical: 5,
        alignItems: "center",
        borderWidth: 1,
        width: 150,
        borderRadius: 8,
        backgroundColor: Colors.green50
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
    shadow: {
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
