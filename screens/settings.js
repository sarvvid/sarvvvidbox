import React, {useState, useEffect} from 'react';
import { useThemeUpdate, useTheme } from '../contexts/themeContext';
import styled from 'styled-components';
// import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, View, Image, TouchableOpacity, Button,StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import account from '../img/account.png';
import Footer from '../components/footer';
import chat from '../img/chat.png';

export default function Settings({navigation})  {



    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();

    function background() {
        return darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9'] ;
    }


    return (
        <View style = {{flex:1, backgroundColor: `${ darkTheme ? "#292929" : "#fff"}` }} >
            <Container>
                 <LinearView>
                    <LinearGradient start = {{x:0, y:0}} end = {{x:1, y:1}} colors={background()}  >
                        <Header>
                            <HeaderText>Settings</HeaderText>
                            <Image source = {account}/>
                        </Header>
                    </LinearGradient>
                </LinearView>
                <Card dark = {darkTheme}>
                    <View style = {{width: "100%"}}>
                        <Head>Account Settings</Head>
                        <Item><ItemText dark = {darkTheme}>Edit profile</ItemText></Item>
                        <Item><ItemText dark = {darkTheme}>Change password</ItemText></Item>
                        <Item onPress = {toggleTheme} ><ItemText dark = {darkTheme}>Dark theme</ItemText></Item>
                        <Item><ItemText dark = {darkTheme}>Enable notifications</ItemText></Item>
                    </View>
                    <View style = {{width: "100%"}}>
                        <Head>Others</Head>
                        <Item><ItemText  dark = {darkTheme} onPress = {() => navigation.navigate("Scanner")}>Sarvvid web</ItemText></Item>
                        <Item><ItemText  dark = {darkTheme}>Privacy policy</ItemText></Item>
                        <Item><ItemText  dark = {darkTheme}>Terms and conditions</ItemText></Item>
                        <Item><ItemText  dark = {darkTheme}>About</ItemText></Item>
                        <Item><ItemText  dark = {darkTheme}>FAQ</ItemText></Item>
                        
                    </View>
                </Card>
               <Chat onPress = { () => {navigation.navigate("ChatIntro")}}>
                    <ChatImage source = {chat} />
                    <Text>Support</Text>
               </Chat>

                
            </Container>
            <Footer navigation =  {navigation}/>

        </View>
    )
}

const Container = styled.View`
    width:100%;
    flex: .9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
   
`
const LinearView = styled.View`
    width: 100%;
   
    overflow: hidden;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
`

const HeaderText = styled.Text`
    font-size: 35px;
    font-weight: bold;
    margin:0px;
    includeFontPadding:false;
    color: #fff;
   
    
    
`

const Header = styled.View`
    padding: 25px;
    padding-bottom: 35px;
    padding-top:55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

const Card = styled.View`
     border-radius: 15px;
     padding-vertical:25px;
     padding-left:10px;
     padding-right:10px;
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     width: 90%;
     margin-top: 100px;
     elevation:5;
     background-color: ${props => props.dark ? "#434861" : "#fff"};
`

const Head = styled.Text`
    color: #0075ff;
    margin-top: 15px;
    font-weight: bold;
    border-bottom-width: 2px;
    padding-bottom: 2px;
    border-color: #ccc;
   
    
`

const Item = styled.TouchableOpacity`
   
    padding-left: 8px;
    margin-top: 10px;
`

const ItemText = styled.Text`
    font-size: 16px;
    color: ${props => props.dark ? "#fff" : "#000"};
`
const Chat = styled.TouchableOpacity`
    position: absolute;
    bottom: 5px;
    right: 25px;
`

const ChatImage = styled.Image`
   
` 