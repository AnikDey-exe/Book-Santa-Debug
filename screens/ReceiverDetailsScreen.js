import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity} from 'react-native';
import { ListItem, Card, Icon, Header } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { diffClamp } from 'react-native-reanimated';

export default class ReceiverDetailsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userID: firebase.auth().currentUser.email,
            receiverID: this.props.navigation.getParam('details')["userId"],
            requestID: this.props.navigation.getParam('details')["requestId"],
            bookName: this.props.navigation.getParam('details')["bookName"],
            reasonToRequest: this.props.navigation.getParam('details')["reasonToRequest"],
            receiverName: '',
            receiverContact: '',
            receiverAddress: '',
            receiverRequestDocId: ''
        }
    }

    getReceiverDetails(){
        db.collection("Users").where("emailId","==",this.state.receiverID).get()
        .then(snapshot=>{
            snapshot.forEach(doc => {
                this.setState({
                    receiverName: doc.data().firstName,
                    receiverContact: doc.data().contact,
                    receiverAddress: doc.data().address
                })
            })
        })

        db.collection("RequestedBooks").where("requestID","==",this.state.requestID).get()
        .then(snapshot=>{
            snapshot.forEach(doc => {
                this.setState({
                    receiverRequestDocId: doc.id
                })
            })
        })
    }

    componentDidMount() {
        this.getReceiverDetails();
    }


    updateBookStatus = () => {
        db.collection("AllDonations").add({
            "bookName": this.state.bookName,
            "requestID": this.state.requestID,
            "requestedBy": this.state.receiverName,
            "donorID": this.state.userID,
            "requestStatus": "donor_interested"
        })
    }

    render() {
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.1}}>
                    <Header
                    leftComponent={<Icon name="bars" type='feather' color='#696969' onPress={() => props.navigation.goBack()}/>}
                    centerComponent={{text: "Donate Books",style:{color: 'white',fontSize: 20, fontWeight: 'bold',height: 50, paddingTop: 5}}}
                    backgroundColor="#eaf8f3"/>
                </View>

                <View style={{flex: 0.3}}>
                    <Card
                    title={"Book Information"}
                    titleStyle={{fontSize: 20}}>
                        <Card>
                            <Text style={{fontWeight: 'bold'}}> Name: {this.state.bookName} </Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight: 'bold'}}> Reason: {this.state.reasonToRequest} </Text>
                        </Card>
                    </Card>
                </View>

                <View style={{flex: 0.3}}>
                    <Card
                    title={"Receiver Information"}
                    titleStyle={{fontSize: 20}}>
                        <Card>
                            <Text style={{fontWeight: 'bold'}}> Receiver Name: {this.state.receiverName} </Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight: 'bold'}}> Receiver Contact: {this.state.receiverContact} </Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight: 'bold'}}> Receiver Address: {this.state.receiverAddress} </Text>
                        </Card>
                    </Card>
                </View>

                <View style={styles.buttonContainer}>
                    {this.state.receiverID !== this.state.userID} ? (
                        <TouchableOpacity 
                        style={styles.button}
                        onPress={()=>{
                            this.updateBookStatus(
                                this.props.navigation.navigate('My Donations')
                            )
                        }}>
                            <Text> I Want To Donate </Text>
                        </TouchableOpacity>
                    ) : (
                        null
                    )
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8
        },
        elevation: 60
    }
})