import React, { Component } from 'react';
import { View, Image, FlatList, Dimensions } from 'react-native';
import * as firebase from 'firebase';
import Loader from '../../components/Loader';
import * as Progress from 'react-native-progress';
import { Surface, Shape } from '@react-native-community/art';

interface IPhotoListState {
    photoList: any
    isLoading: boolean
}
interface IPhotoListProps {
    lastUploadedImage?: any
}
class PhotoList extends Component<IPhotoListProps, IPhotoListState> {
    constructor(props: IPhotoListProps) {
        super(props);
        this.state = {
            photoList: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.getAllImages()
    }


    getAllImages = async () => {
        try {
            await this.setState({ isLoading: true })
            const ref = firebase
                .storage()
                .ref()
                .child(`Vapour`);
            let listData = await ref.listAll()
            // console.log(listData.items, "listData")
            let imageList = []
            for (let itemRef of listData.items) {
                let url = await itemRef.getDownloadURL()

                imageList.push({ imgURL: url, isImageUploaded: true })
            }
            console.log(imageList)
            this.setState({ photoList: imageList, isLoading: false })
        }
        catch (ex) {

        }
    }
    render() {
        if (this.state.isLoading)
            return <Loader isShow={true} />
        else
            return (
                <FlatList
                    data={this.state.photoList}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: '100%', height: 200, marginTop: 10 }}>
                                {!item.isImageUploaded &&
                                    <View style={{ position: 'relative', flex: 1, top: "40%" }}>
                                        <Loader isShow={true} />
                                    </View>
                                }

                                <Image
                                    source={{ uri: item.imgURL }}
                                    style={{
                                        width: "100%", height: "100%", borderRadius: 8, shadowColor: "#3FAC9D",
                                        shadowOffset: {
                                            width: 0,
                                            height: 12,
                                        },
                                        shadowOpacity: 0.58,
                                        opacity: item.isImageUploaded ? 1 : 0.2,
                                        shadowRadius: 16.0,
                                    }} />
                            </View>
                        )
                    }}
                    keyExtractor={item => item.imgURL}
                />

            );
    }
}

export default PhotoList;