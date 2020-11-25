import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Loader from '../../components/Loader';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '../../components';
import { Colors } from '../../style';
import ActionSheet from 'react-native-actionsheet'
// import w3s from '../../utils/services';


interface IPostItemState {
    isLiked: boolean
    isLoading: boolean
}
interface IPostItemProps { }

class PostItem extends Component<IPostItemProps, IPostItemState> {
    ActionSheet: any = "";
    constructor(props: IPostItemProps) {
        super(props);
        this.state = {
            isLoading: false,
            isLiked: false,
        }
    }

    async componentDidMount() {
        // let contract = await w3s.createSnowflakeContract()
        // console.log(contract)
    }

    render() {
        // if (this.state.isLoading)
        //     return <Loader isShow={true} />
        // else
        return (
            <View style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                height: 440,
                marginVertical: 5, backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 10, marginTop: 10
            }}>
                <View>

                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome
                            name="user-circle"
                            size={50}

                        />
                        <View style={{ marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => this.ActionSheet.show()}>
                                <Text.Primary bold style={{ fontSize: 16 }}>
                                    Nik Maniya
                                    </Text.Primary>
                            </TouchableOpacity>
                            <Text.Secondary lightGray style={{ fontSize: 13 }}>
                                2 Hours Ago
                            </Text.Secondary>
                        </View>
                        <View style={{ marginRight: 10, alignItems: 'flex-end', flex: 1, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.ActionSheet.show()}>
                                <FontAwesome
                                    name="ellipsis-v"
                                    size={30}
                                    color={Colors.grey70}
                                />
                            </TouchableOpacity>
                            <ActionSheet
                                ref={o => this.ActionSheet = o}
                                title={'Which one do you like ?'}
                                options={['Copy Link', 'Reply', 'Share', 'Report', 'cancel']}
                                cancelButtonIndex={4}
                                onPress={(index) => { /* do something */ }}
                            />
                        </View>
                    </View>
                    <View >
                        <Image
                            style={{ width: "100%", marginTop: 10, height: 200, borderRadius: 8, }}
                            source={require('../../../assets/images/vaporLogo.png')}
                        />
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text.Primary bold numberOfLines={2}>Announcing HiveFest - 18 December 2020 - Alt space VR</Text.Primary>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text.Tertiary lightGray numberOfLines={3}>
                            Ohh Those Found memory... Exactly one year ago steemFest HiveFest was in full effect in hectic sweaty hot bangkok.
                            who cloud have foreseen where we ar.
                            </Text.Tertiary>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View>
                                    <Text.Tertiary darkGray style={{ fontSize: 14 }} >$100,000</Text.Tertiary>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                    <View>
                                        <TouchableOpacity onPress={() => this.setState({ isLiked: !this.state.isLiked })}>
                                            <FontAwesome
                                                name={this.state.isLiked ? "heart" : "heart-o"}
                                                size={25}
                                                color={this.state.isLiked ? Colors.red50 : Colors.grey40}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text.Tertiary darkGray style={{ fontSize: 14, paddingLeft: 5 }} >400</Text.Tertiary>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row-reverse", }}>
                                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                    <View>
                                        <TouchableOpacity onPress={() => this.setState({ isLiked: !this.state.isLiked })}>
                                            <FontAwesome
                                                name={"retweet"}
                                                size={25}
                                                color={Colors.grey40}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text.Tertiary darkGray style={{ fontSize: 14, paddingLeft: 5 }} >0</Text.Tertiary>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                    <View>
                                        <TouchableOpacity onPress={() => this.setState({ isLiked: !this.state.isLiked })}>
                                            <FontAwesome
                                                name={"comments"}
                                                size={25}
                                                color={Colors.grey40}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text.Tertiary darkGray style={{ fontSize: 14, paddingLeft: 5 }} >1</Text.Tertiary>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = dispatch => ({

});



export default (connect(mapStateToProps, mapDispatchToProps)(PostItem));