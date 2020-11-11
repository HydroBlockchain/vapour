import React, { Component } from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';
import { Text } from '../../components';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LoginItemCard from './LoginItemCard';
import { Colors } from '../../style';
import LoginModal from './LoginModal';

interface ILoginUIState {
    isModalOpen: boolean
}
interface ILoginUIProps {
    onProfileComplete: () => void
}
class LoginUI extends Component<ILoginUIProps, ILoginUIState> {
    constructor(props: ILoginUIProps) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    componentDidMount() {

    }
    toggleModal = () => {
        console.log(this.state)
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginImageContainer}>
                    <View>
                        <Image
                            source={require('../../../assets/images/vapor_logo.jpg')}
                            style={styles.LoginImage}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text.Secondary center bold>
                        A Vapor Account allows you to reach people securely in peer to peer through a fully disturbed network.
                    </Text.Secondary>
                </View>
                <View style={{ flex: 5, alignSelf: "stretch" }}>
                    <ScrollView>
                        <View style={{ flex: 1 }}>
                            <LoginItemCard
                                isOutlineCard={false}
                                itemLogoName={"md-person"}
                                onItemPress={this.toggleModal}
                                itemName={"Create a Vapor Account"}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <LoginItemCard
                                isOutlineCard={false}
                                itemLogoName={"md-person"}
                                onItemPress={this.toggleModal}
                                itemName={"Connect From another Device"}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <LoginItemCard
                                isOutlineCard={true}
                                itemLogoName={"md-person"}
                                onItemPress={this.toggleModal}
                                itemName={"Connect from Backup"}
                            />
                        </View>
                        <View style={{ flex: 1, width: '100%' }}>
                            <LoginItemCard
                                isOutlineCard={true}
                                itemLogoName={"md-person"}
                                onItemPress={this.toggleModal}
                                itemName={"Connect to management server"}
                            />
                        </View>
                    </ScrollView>
                </View>
                {this.state.isModalOpen &&
                    <LoginModal onProfileComplete={this.props.onProfileComplete} toggleModal={this.toggleModal} isOpen={this.state.isModalOpen} />
                }
            </View>
        );
    }
}

export default LoginUI;

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'column', padding: 10, alignContent: 'center', alignItems: 'center', backgroundColor: Colors.grey10 },
    loginImageContainer: { flex: 3, alignItems: 'center', flexDirection: 'column', justifyContent: 'center' },
    LoginImage: { borderRadius: 200 / 2, width: 200, height: 200 },
});