import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Loader from '../../components/Loader';
import { Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment'
interface INewsDetailViewState {
    isLoading: boolean
}
interface INewsDetailViewProps {
    newDetail?: any
}

class NewsDetailView extends Component<INewsDetailViewProps, INewsDetailViewState> {
    constructor(props: INewsDetailViewProps) {
        super(props);
        this.state = {
            isLoading: false,

        }
    }

    componentDidMount() {

    }


    render() {
        console.log(this.props.newDetail, "New Detail")
        if (this.state.isLoading)
            return <Loader isShow={true} />
        else
            return (
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 10 }}>
                            <Text.H1>{this.props.newDetail.title}</Text.H1>
                        </View>
                        <View>
                            <Text.H3>-{this.props.newDetail.source.name}</Text.H3>
                        </View>
                        <View style={{ height: 250, width: '100%', borderRadius: 8, marginTop: 10 }}>
                            <Image
                                style={{ width: "100%", height: 250, position: 'absolute', borderRadius: 8, }}
                                source={{ uri: this.props.newDetail.urlToImage }}
                            />
                        </View>
                        <View style={{ marginTop: 10,alignItems:'flex-end' }}>
                            <Text.Secondary lightGray>{moment(this.props.newDetail.publishedAt).format("LLL")}</Text.Secondary>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text.Secondary>{this.props.newDetail.description}</Text.Secondary>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text.Tertiary>{this.props.newDetail.content}</Text.Tertiary>
                        </View>
                    </View>
                </ScrollView>
            );
    }
}



export default NewsDetailView;