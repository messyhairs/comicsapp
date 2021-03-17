import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const SettingsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.storycontentbottomview}>
                <Text> Hello Users we really happy to see you in comics book world. This app is only
                for Comics book writer who have enthusiasim in Comics and story creating.Comics world is a
                excellent platform for writer who have knowledge in cartoon and Comics.
               </Text>
                <Text style={styles.textcontent}> What our app platform will do? </Text>
                   <Text>If producer Team like your comics.We can provide a set of producers,Flim makers to make your story or comics into
                    the screen.
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    storycontentbottomview: {
        paddingBottom: 50,
        textAlign: 'justify',
        width:'95%',
        marginLeft: 'auto',
        marginRight:'auto',
        marginTop:50
    },
    mainBody: {
        paddingBottom: 50
    },
    tagline: {
        textAlign: 'center',
        paddingTop: 10
    },
    summary: {
        textAlign: 'justify',
    },
    textcontent:{
        paddingTop: 30
    }
});