import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground, Image, Alert, } from 'react-native';
import Loader from '../../components/Loader';
import { connect } from 'react-redux';
import newsFeedRedux from '../../ducks/newsFeed';
import { API_KEY, URL } from '../../ducks/newsFeed/newsFeed.slice';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface INewsFeedListState {
    isLoading: boolean
    isLoadMore: boolean
    newsFeed: any
    page: number
    stopLoad: boolean
}
interface INewsFeedListProps {
    newsFeed: any
    onNewsPress: (newItem: any) => void
    setNews: (data: any) => void
}
const category = "business";
const country = "in";
const pageSize = 10;
const qInTitle = `("Climate change" OR co2 OR "green house gas" OR ghg OR "carbon footprint")`

class NewsFeedList extends Component<INewsFeedListProps, INewsFeedListState> {
    constructor(props: INewsFeedListProps) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadMore: false,
            newsFeed: null,
            page: 1,
            stopLoad: false
        }
    }

    componentDidMount() {
        this.getNewsFeed()
    }
    getNewsFeed = async () => {
        try {
            this.setState({ isLoading: true })
            console.log(`${URL}${API_KEY}&qInTitle=${qInTitle}&pageSize=${pageSize}&page=${this.state.page}`)
            let response = await fetch(`${URL}${API_KEY}&qInTitle=${qInTitle}&pageSize=${pageSize}&page=${this.state.page}`);
            let responseJson = await response.json();
            if (responseJson.status == "ok")
                this.setState({ newsFeed: responseJson.articles, isLoading: false, page: this.state.page + 1 })
            else if (responseJson.status == "error") {
                this.setState({ isLoading: false, stopLoad: true })
                Alert.alert(
                    "Error",
                    responseJson.message,
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: true }
                );
            }
        } catch (error) {
            console.error(error);
        }

    }
    loadMore = async () => {
        if (this.state.stopLoad)
            return null
        try {
            this.setState({ isLoadMore: true })
            console.log(`${URL}${API_KEY}&qInTitle=${qInTitle}&pageSize=${pageSize}&page=${this.state.page}`)
            let response = await fetch(`${URL}${API_KEY}&qInTitle=${qInTitle}&pageSize=${pageSize}&page=${this.state.page}`);
            let responseJson = await response.json();
            console.log(responseJson.status)
            if (responseJson.status == "ok")
                await this.setState({
                    newsFeed: this.state.newsFeed.concat(responseJson.articles),
                    page: this.state.page + 1,
                    stopLoad: responseJson.articles.length == pageSize ? false : true,
                    isLoadMore: false
                })
            else if (responseJson.status == "error") {
                this.setState({ isLoadMore: false, stopLoad: true })
                Alert.alert(
                    "Error",
                    responseJson.message,
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: true }
                );
            }

        } catch (error) {
            console.error(error);
            this.setState({ isLoadMore: false })
        }
    }

    _renderFooter = () => {
        if (!this.state.isLoadMore) return null;
        return (
            <Loader isShow={true} />
        );
    };
    render() {
        const { newsFeed } = this.props;
        // console.log(this.state, "State")
        const navigation = []// useNavigation()
        console.log(navigation)
        if (this.state.isLoading)
            return <Loader isShow={true} />
        else
            return (
                <FlatList
                    data={this.state.newsFeed}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => this.props.onNewsPress(item)}>
                                <View style={{ width: "100%", height: 200, borderRadius: 8, flexDirection: 'row', marginTop: 15 }}>
                                    {item?.urlToImage &&
                                        <Image
                                            style={{ width: "100%", height: 200, position: 'absolute', borderRadius: 8, }}
                                            source={{ uri: item.urlToImage }}
                                        />
                                    }
                                    {item?.title &&
                                        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignSelf: 'flex-end', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                            <Text style={{ color: 'white', fontSize: 15, margin: 6 }}>{item.title}</Text>
                                        </View>
                                    }
                                </View>
                            </TouchableOpacity>

                        )
                    }}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this._renderFooter}
                    keyExtractor={(item, index) => index.toString()}
                />
            );
    }
}

const mapStateToProps = state => {
    return {
        newsFeed: state.newsFeed.newsFeed
    }
}
const mapDispatchToProps = dispatch => ({
    setNews: data => dispatch(newsFeedRedux.actions.setNews(data))
});



export default (connect(mapStateToProps, mapDispatchToProps)(NewsFeedList));