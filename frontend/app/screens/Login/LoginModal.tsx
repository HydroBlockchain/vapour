import React, { Component } from 'react';
import { View, Modal, StyleSheet, ImageBackground, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, Switch } from "react-native";
import { Text, Button } from '../../components';
import { Colors } from '../../style';
import Carousel from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';

interface ILoginModalState {
    username: string
    password: string
    repeatPassword: string
    index: number
    isEncrypt: boolean
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
            index: 0,
            isEncrypt: false,
            password: "",
            repeatPassword: "",
        }
    }
    carousel: any

    componentDidMount() {

    }

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
                            <TextInput style={styles.usernameInput} placeholder={"Enter Your Username"}></TextInput>
                        </View>
                        <View style={{ paddingTop: 60, paddingHorizontal: 10 }}>
                            <Button.Primary style={styles.chooseButton} fullWidth onPress={this.chooseUsername} textType={"Primary"}>
                                <Text.Primary white bold>Choose Username</Text.Primary>
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
                            <Ionicons
                                name={"md-person"}
                                size={50}
                                style={{ backgroundColor: Colors.grey10, padding: 20, borderRadius: 70 }}
                                color={Colors.blue50}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.imageIcon} >
                                    <Ionicons name={"md-image"} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cameraIcon} >
                                    <Ionicons name={"md-camera"} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <TextInput
                                value={this.state.repeatPassword}
                                style={[styles.usernameInput, { marginTop: 0 }]}
                                onChangeText={(value) => this.setState({ repeatPassword: value })}
                                placeholder={"Repeat New Password"}
                            />
                        </View>

                        <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
                            <Button.Primary style={styles.chooseButton} fullWidth onPress={this.savProfile} textType={"Primary"}>
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
    createAccount = () => {
        this.carousel.snapToNext()
    }
    savProfile = () => {
        this.props.toggleModal();
        this.props.onProfileComplete()
    }
    toggleSwitch = () => {
        this.setState({ isEncrypt: !this.state.isEncrypt })
    }
    chooseUsername = () => {

    }
    onRecommend = () => { }

    skipUsername = () => {
        this.carousel.snapToNext()
    }
    skipProfile = () => {
        this.props.toggleModal();
        this.props.onProfileComplete()
    }

    render() {
        return (
            <Modal
                presentationStyle={"fullScreen"}
                animationType="slide"
                visible={this.props.isOpen}
                onRequestClose={this.props.toggleModal}
            >
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
    }
});
