import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    Platform, AlertIOS, ToastAndroid,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    Button,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Textarea from 'react-native-textarea';
import SplashScreen from './splashscreen';
import { StatusBar } from 'react-native';
import SendSMS from 'react-native-sms';
import * as Notifications from 'expo-notifications';
const goto = async () => {
    location.reload('homeScreenStack')
}
const Storycreatescreen = (props) => {
    const [username, setusername] = useState('');
    const [useremail, setuseremail] = useState('');
    const [title, settitle] = useState('');
    const [storypara, setstorypara] = useState('');
    // const [mobileNumber, setMobileNumber] = useState('');
    // const [bodySMS, setBodySMS] = useState(
    //     'Please follow https://aboutreact.com',
    // );

    // const [password, setpassword] = useState('');
    // const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [
        isRegistraionSuccess,
        setIsRegistraionSuccess
    ] = useState(false);

    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const addressInputRef = createRef();
    const passwordInputRef = createRef();

    const createstory = async () => {
        setErrortext('');
        // if (!username) {
        //     alert('Please fill Name');
        //     return;
        // }
        // if (!useremail) {
        //     alert('Please fill Email');
        //     return;
        // }
        // if (!userage) {
        //     alert('Please fill Age');
        //     return;
        // }
        // if (!useraddress) {
        //     alert('Please fill Address');
        //     return;
        // }
        // if (!password) {
        //     alert('Please fill Password');
        //     return;
        // }
        //Show Loader
        // setLoading(true);
        try {
            let users = await AsyncStorage.getItem('userdatas');
            const userdatas = JSON.parse(users);
            console.log(userdatas);
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log('************* create',token);
            // this.setState({ data: userdatas });
            const gettoken = userdatas.token;
            const getuserid = userdatas.userid;
            console.log(gettoken);
            // const geturl = 'http://192.168.1.16:8000/api/getuserdetails/';
            const geturl = 'https://tranquil-dusk-36378.herokuapp.com/api/getuserdetails/'
            // const geturl = 'http://localhost:8000/api/getuserdetails/';

            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + gettoken,
                    'Accept': 'application/json',
                },

            };
            Axios.get(geturl + getuserid, config)
                .then(response => {
                    // this.setState({ profiles: response.data.profile });
                    console.log(response.data.profile.useremail)
                    // const url = 'http://192.168.1.16:8000/api/createstory';
                    const url = 'https://tranquil-dusk-36378.herokuapp.com/api/createstory'
                    // const url = 'http://localhost:8000/api/createstory';
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + gettoken
                        },
                        body: JSON.stringify({
                            username: response.data.profile.username,
                            useremail: response.data.profile.useremail,
                            // password: password,
                            title: title,
                            storypara: storypara,
                        })
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            //Hide Loader
                            // setLoading(false);
                            console.log(responseJson);
                            if (responseJson.message === 'done') {
                                Notifications.scheduleNotificationAsync({
                                    content: {
                                        // title: responseJson.message,
                                        title: 'Hello' + ' ' +  'you created new stories',
                                        body: 'Blog World',
                                        // data: { data: 'goes here' },
                                        // data: 'Hello' + ' ' + responseJson.result.username + ' ' + 'welcom to TechVlog'
                                    },
                                    trigger: { seconds: 1 },
                                });
                                // setIsRegistraionSuccess(true);
                                if (Platform.OS === 'android') {
                                    ToastAndroid.show("your Blog book created succesfully!", ToastAndroid.SHORT);
                                    // if (mobileNumber.length != 10) {
                                    //     alert('Please insert correct contact number');
                                    //     return;
                                    // }

                                    // SendSMS.send(
                                    //     {
                                    //         body: 'HELLO TEST',
                                    //         // Recipients Number
                                    //         recipients: [8754388419],
                                    //         // An array of types 
                                    //         // "completed" response when using android
                                    //         successTypes: ['sent', 'queued'],
                                    //     },
                                    //     (completed, cancelled, error) => {
                                    //         if (completed) {
                                    //             alert('SMS Sent Completed');
                                    //         } else if (cancelled) {
                                    //             alert('SMS Sent Cancelled');
                                    //         } else if (error) {
                                    //             alert('Some error occured');
                                    //         }
                                    //     },
                                    // );
                                }
                                setTimeout(() => {
                                    // window.location.reload('homeScreenStack')
                                    // <SplashScreen />
                                    props.navigation.navigate('SplashScreen')
                                }, 1000);
                                console.log(
                                    'blog created Successful'
                                );
                            } else {
                                setErrortext(responseJson.msg);
                                if (Platform.OS === 'android') {
                                    ToastAndroid.show(responseJson.msg, ToastAndroid.SHORT);
                                }
                            }
                        })
                        .catch((error) => {
                            //Hide Loader
                            // setLoading(false);
                            console.error(error);
                        });

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        catch (e) {
            // error reading value
            console.log(e);
        }
    }

    // const getstories = async () => {
    //     try {
    //         let users = await AsyncStorage.getItem('userdatas');
    //         const userdatas = JSON.parse(users);
    //         console.log(userdatas);
    //         // this.setState({ data: userdatas });
    //         const gettoken = userdatas.token;
    //         const getuserid = userdatas.userid;
    //         console.log(gettoken);
    //         const localurl = 'http://192.168.1.16:8000/api/getuserdetails/';
    //         // const localurl = 'http://localhost:8000/api/getuserdetails/';
    //         const config = {
    //             headers: {
    //                 'content-type': 'multipart/form-data',
    //                 'Authorization': 'Bearer ' + gettoken,
    //                 'Accept': 'application/json',
    //             },

    //         };
    //         Axios.get(localurl + getuserid, config)
    //             .then(response => {
    //                 // this.setState({ profiles: response.data.profile });
    //                 console.log(response.data.profile.useremail)
    //                 // const url = 'http://172.26.240.1:8000/api/createstory';
    //                 const localurl = 'http://192.168.1.16:8000/api/createstory';
    //                 // const localurl = 'http://localhost:8000/api/createstory';
    //                 fetch(localurl, {
    //                     method: 'POST',
    //                     headers: {
    //                         Accept: 'application/json',
    //                         'Content-Type': 'application/json',
    //                         'Authorization': 'Bearer ' + gettoken
    //                     },
    //                     body: JSON.stringify({
    //                         username: response.data.profile.username,
    //                         useremail: response.data.profile.useremail,
    //                         // password: password,
    //                         title: title,
    //                         storypara: storypara,
    //                     })
    //                 })
    //                     .then((response) => response.json())
    //                     .then((responseJson) => {
    //                         //Hide Loader
    //                         // setLoading(false);
    //                         console.log(responseJson);
    //                         if (responseJson.message === 'done') {
    //                             // setIsRegistraionSuccess(true);

    //                             console.log(
    //                                 'Story created Successful'
    //                             );

    //                         } else {
    //                             setErrortext(responseJson.msg);
    //                             if (Platform.OS === 'android') {
    //                                 ToastAndroid.show(responseJson.msg, ToastAndroid.SHORT);
    //                             }
    //                             if (Platform.OS === 'ios') {
    //                                 AlertIOS.alert(responseJson.msg);
    //                                 // ToastAndroid.show("your story updated succesfully!", ToastAndroid.SHORT);
    //                             }
    //                         }
    //                     })
    //                     .catch((error) => {
    //                         //Hide Loader
    //                         // setLoading(false);
    //                         console.error(error);
    //                     });

    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             })
    //     }
    //     catch (e) {
    //         // error reading value
    //         console.log(e);
    //     }
    // }
    // if (isRegistraionSuccess) {

    //     return (
    //         <View
    //             style={{
    //                 flex: 1,
    //                 backgroundColor: '#eeeeee',
    //                 justifyContent: 'center',
    //             }}>
    //             <Text style={styles.successTextStyle}>
    //                 Story created Successfully

    //     </Text>
    //             {/* <TouchableOpacity
    //                 style={styles.viewbtn}
    //                 activeOpacity={0.5}
    //                 onPress={() => props.navigation.navigate('homeScreenStack')}>
    //                 <Text style={styles.buttonTextStyle}>view stories now</Text>
    //             </TouchableOpacity> */}
    //              <TouchableOpacity
    //                 style={styles.viewbtn}
    //                 activeOpacity={0.5}
    //                 onPress={goto}>
    //                 <Text style={styles.buttonTextStyle}>view stories now</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <StatusBar hidden />
            <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView enabled>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(title) => settitle(title)}
                        underlineColorAndroid="#f000"
                        placeholder="Blog Title"
                        placeholderTextColor="#8b9cb5"
                        returnKeyType="next"
                    />
                    <Textarea
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        onChangeText={(storypara) =>
                            setstorypara(storypara)
                        }
                        returnKeyType="next"
                        // maxLength={120}
                        placeholder='Content of Blog'
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                    />
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={createstory}>
                        <Text style={styles.buttonTextStyle}>FINISH</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                {/* <Button style={styles.buttonStyle} title="CreateStory" onPress={createstory} /> */}
            </ScrollView>
        </View>
    );
};
export default Storycreatescreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonbot: {
        position: 'relative',
        bottom: 0
    },
    buttonStyle: {
        backgroundColor: '#123962',
        borderWidth: 0,
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    viewbtn: {
        backgroundColor: '#ff4f81',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#ffffff',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: '#00334e',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        // borderRadius: 30,
        borderColor: '#dadae8',
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,
        // outline: 'none'
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: '#0d0735',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    textareaContainer: {
        height: 300,
        padding: 5,
        marginTop: 20,
        width: 300
    },
    textarea: {
        // textAlignVertical: 'top',  // hack android
        // height: 570,
        fontSize: 14,
        color: '#333',
    },
    bottom: {
        // flex: 1,
        justifyContent: 'flex-end',
        // marginBottom: 36
    },
    maincontainer: {
        height: '100%',
        // backgroundColor: 'red'
    }
});