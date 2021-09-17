import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Animated, Easing
   
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Loader from './loader';
import { AsyncStorage } from 'react-native';
//import RNFetchBlob from 'rn-fetch-blob';
import { AuthContext } from '../components/context';
//import { useTheme } from 'react-navigation';

import styled from 'styled-components'
import { useTheme } from '../contexts/themeContext';
import axios from 'axios';

// const deviceheight =  Dimensions.get("screen").height;
// const devicewidth =  Dimensions.get("screen").width;
// const image = { uri: "https://media.giphy.com/media/3o752oeUYz6S2SHi5W/giphy.gif" };

export default function SignIn({navigation}) {
    const darkTheme = useTheme();

    const border = useState(new Animated.Value(0))[0];
    const valueY = useState(new Animated.Value(250))[0];
    const linearHeight = useState( new Animated.Value( Dimensions.get('window').height))[0];
   

    // const newLinearHeight = linearHeight;
    // console.log(newLinearHeight);
    //console.log(typeof(Number(linearHeight)))
    useEffect(() => {
        Animated.timing(border, {
            toValue:50,
            duration:2000,
            delay:500,
            useNativeDriver:true
        }).start()
        Animated.timing(valueY, {
            toValue:0,
            duration:2000,
            delay:500,
            easing:Easing.elastic(3),
            useNativeDriver:true
        }).start()
        Animated.timing(linearHeight, {
            toValue:350,
            duration:1000,
            delay:500,
            useNativeDriver:false
        }).start()
    })

    function background() {
        return darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9'] ;
    }

    const { colors } = useTheme();
    const [id,setid] = React.useState(null);
    const [loading,setloading] = React.useState(false);
    const [avatar_uri,seturi] = React.useState(require("../img/account.png"));
    const { signIn } = React.useContext(AuthContext);
    React.useEffect(()=>{
        
        setTimeout(async() => {
            try {
              userToken = await DeviceInfo.getAndroidId();
            var res = 10;
      
    fetch(`http://api.anteagle.tech/ms/?ms=${res}&IMEI=${userToken}`).then(resp=>{
        console.log("pinged");
    })
            } catch(e) {
              console.log(e);
            }
            console.log('user token: ', userToken);
            AsyncStorage.setItem("userToken",userToken);
            setid(userToken);
          }, 1000);
                const fetchdata = async() =>{
                    
                    const token = await AsyncStorage.getItem("userToken");
                    setid(token);
                    console.log(token);
                    const userName = await AsyncStorage.getItem('username');
                    
                    const resp = await  fetch('https://b797588889a05953f5e6bcf741a50f153190b29e381e9a5e8ed11389c.loca.lt/api/getdata/',{
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                            'Content-Type': 'application/json'
                          },
                        body: JSON.stringify({
                            'IMEI' : token
                        }),
                    });
            
                    const temp_1 = await resp.json();
                    console.log(temp_1);
                    const filled_temp = temp_1.filled_per;
                    const remaining_temp = temp_1.remaining_temp;
                    const current_temp = temp_1.current_storage;
                    const rows = resp.rows;
                    var item = rows.item(0);
                    console.log(item);
                    var result = resp.rows.item(0);
                    
                    console.log(result);    
                    
                    const g = await AsyncStorage.getItem('gender');
                    console.log(g);
                    if (g == 'Male'){
                        seturi(require('../img/account.png'))
                    }
                    else if(g=="Female"){
                        seturi(require("../img/account.png"))
                    }
                    else{
                        seturi(require("../img/account.png"));
                    }
                    
                }
                fetchdata();
            //AsyncStorage.getItem('keypair').then((resp)=>{
            //})
            // Animated.timing(pan, {
            //     toValue: { x: 800, y: 0 },
            //     delay: 1000,
            //     useNativeDriver: false,
            // }).start();
            // Animated.timing(list, {
            //     toValue: { x: 0, y: -480 },
            //     delay: 1000,
            //     useNativeDriver: false,
            // }).start();
    },[])
    

    return(
        
        <ScrollView style = {{flex:1, backgroundColor:"white"}} showsVerticalScrollIndicator = {false}>
           
        <LinearView >
          <LinearGradient start = {{x:0, y:0}} end = {{x:1, y:1}} colors={background()} style = {{height: "120%"}} >
                  
          <ContainerView style = {{height: linearHeight}}>
                <Header>
                    <HeaderText dark = {darkTheme}>Welcome Again</HeaderText>
                    <NormalText>We missed you so much</NormalText>
                </Header>
                
            </ContainerView>
            <MainView style = {[{borderRadius: border}, {transform: [{translateY:valueY}]}]}>
            <View style = {{paddingVertical:50, paddingHorizontal:20}}>
            <Text style = {{color:"#0075ff", fontSize:16}}>New to Sarvvid. <TextButton onPress = {() => navigation.navigate("Signup")}><HighlightedText style = {{fontSize:16}}>Sign Up</HighlightedText></TextButton></Text>
            <Main dark = {darkTheme}>
                <Input>
                    <NormalText style = {{color : "#000"}}>E-mail/Phone number</NormalText>
                    <StyledTextInput placeholder = "name/number"/>
                </Input>     
                <Input>
                    <NormalText style = {{color : "#000"}}>Password</NormalText>
                    <StyledTextInput placeholder = "password"/>
                </Input>     
                <ForgotText>Forgot password</ForgotText>
            </Main>
            <View style = {{width:"100%", alignItems: "center", justifyContent: "center"}}>
            <Button onPress = {() => navigation.navigate("Home"), () => {setloading(true);
                                    const password = 'dff';
                                    AsyncStorage.getItem('authtoken').then(au=>{
                                    AsyncStorage.getItem('userToken').then(f=>{
                                        setTimeout(async()=>{
                    
                                            var res = 0;
                                            let i;
                                            for(i = 0; i < 20;i++){
                                            const ms = await Ping.start("103.155.73.35",{timeout : 1000});
                                            res += ms;
                                        }
                                        res = res /20;
                                        axios.post(`http://api.anteagle.tech/api/login/?IMEI=${f}&ping=${res}`,{
                                        'Accept': 'application/json, text/plain, */*', 
                                        'Authtoken': au, // It can be used to overcome cors errors
                                        'Content-Type': 'application/json'
                                    }).then(res=>res.json()).then(resp=>{
                                        console.log(resp);
                                        if(resp.code==200){
                                            const foundUser = [{
                                                id : f,
                                                username : res,
                                                password : password,
                                                userToken : f
                                            }];
                                            setloading(false);
                                            signIn(foundUser);
                                        }
                                        else if(resp.code==206){
                                            setloading(false);
                                            alert("You are not registered try to register first");
                                            navigation.navigate("SignUpScreen");
                                        }
                                        else if(resp.code == 777){
                                            setloading(false);
                                            alert("You are not in the secure zone, Please try again later");
                                        }
                                        
                                    },[{
                                        name : 'logindata',
                                        data : JSON.stringify({
                                                    'email' : res,
                                                    'password' : password,
                                                    'IMEI' : f,
                                                })
                                    }]
                                    )
                                            },300)
                                    })
                                })}}>
                <ButtonText>Sign in</ButtonText>
            </Button>
            </View>
            </View>
          </MainView>
                       
                
            </LinearGradient>
          </LinearView>
         
           
           
            {/* <Container dark = {darkTheme}>
            <ContainerView>
                <Header>
                    <HeaderText dark = {darkTheme}>Welcome Again</HeaderText>
                    <NormalText>We missed you so much</NormalText>
                </Header>
                
            </ContainerView>
            <Main dark = {darkTheme}>
                <Input>
                    <NormalText>User name/Phone number</NormalText>
                    <StyledTextInput placeholder = "name/number"/>
                </Input>     
                <Input>
                    <NormalText>Password</NormalText>
                    <StyledTextInput placeholder = "password"/>
                </Input>     
                <ForgotText>Forgot password</ForgotText>
            </Main>
            <Button onPress = {() => navigation.navigate("Home")}>
                <ButtonText>Sign in</ButtonText>
            </Button>
            <NormalText>New to Sarvvid. <TextButton onPress = {() => navigation.navigate("Signup")}><HighlightedText>Sign Up</HighlightedText></TextButton></NormalText>
        </Container> */}
        </ScrollView>
    )
}

const Container = styled.View`
   
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.dark ? "#292929" : "#fff"};
    flex:1;
    
`
const ContainerView = styled(Animated.View)`
    width:95%;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Header = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    
    height: 50px;
   
    
`

const HeaderText = styled.Text`
    font-size: 40px;
    font-weight: bold;
    margin:0px;
    includeFontPadding:false;
    color:#fff;
    
    
`

const NormalText = styled.Text`
    color: #fff;
    margin-bottom: 10px;
    margin-top: 10px;
    includeFontPadding:false;
`
const MainView = styled(Animated.View)`
    flex: 1.5;
    background-color: #fff;
   elevation:5;
    bottom: 50px;
    
`

const ForgotText = styled.Text`
    color: #0075ff;
    margin-bottom: 10px;
    margin-top: 30px;
    opacity: .8;
    includeFontPadding:false;
`

const Main = styled.View`
    
     
     
     padding-vertical:25px;
     padding-left:5px;
     padding-right:5px;
     display: flex;
     flex-direction: column;
     align-items: flex-start;
    
    
     
     background-color: ${props => props.dark ? "#434861" : "#fff"};

 
     
`

const Input = styled.View`
     
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     width: 100%;
     margin-top: 5px;
`

const StyledTextInput = styled.TextInput`
   border-width: 2px;
   padding-horizontal:15px;
   padding-vertical:10px;
   border-radius: 25px;
   border-color: #4da0ff;
   width: 100%;
   

`

const Button = styled.TouchableOpacity`
    width: 220px;
    align-items: center;
    padding: 12px;
    border-radius: 25px;
    background: #418de1;
    color: white;
    margin-top: 50px;
`
const TextButton = styled.TouchableOpacity`
    
`

const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
`

const HighlightedText = styled.Text`
    color: #0075ff;
    font-weight: bold;
`

const LinearView = styled(Animated.View)`
    width: 100%;
   flex:1;
    overflow: hidden;

`