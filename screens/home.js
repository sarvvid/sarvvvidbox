import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import Svg, {Circle} from 'react-native-svg';
import Account from '../img/account.png'
import { useTheme } from '../contexts/themeContext';
import { Text, View, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import Footer from '../components/footer';
import settings from '../img/settings.png'

import SQLite from 'react-native-sqlite-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import AwesomeAlert from 'react-native-awesome-alerts';
import { AuthContext } from '../components/context';
import Drawer from 'react-native-circle-drawer';
import search from '../img/search.png';
//import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';
import Colors from '../constants/Colors'

import Loading from "react-native-dynamic-text-loading"; 
import {AsyncStorage} from "react-native";
import axios from 'axios';


const data = [
	{
		key: 1,
		amount: 0,
		svg: { fill: Colors.colors.yellow },
	},
	{
		key: 2,
		amount: 100,
		svg: { fill: Colors.colors.light },
	},
];

var SCHT = {'0':'92a2', '1':'0f11', '2':'0cf1', '3':'6955', '4':'7779', '5':'e171', '6':'0b6a', '7':'751a', '8':'713f', '9':'c939', 'A':'73c5', 'B':'d832', 'C':'d6d3', 'D':'d289', 'E':'a703', 'F':'603f', 'G':'77d8', 'H':'4fc8', 'I':'85d1', 'J':'de77', 'K':'8788', 'L':'3042', 'M':'48d5', 'N':'1c41', 'O':'c396', 'P':'84f8', 'Q':'f40c', 'R':'c78e', 'S':'3494', 'T':'089f', 'U':'c19a', 'V':'a66f', 'W':'41df', 'X':'a82f', 'Y':'9723', 'Z':'b7c0'};
      var key = '541DBC699AD251F68C3C55A86C147CFD7C6D2E90BE9E170507B153560C8A65AAAFB2BB839B16F9DED96A41FE15406FEC0116BFDD7BCF7F27B827F2E047E8196DDF03E3A7C6364FD6626041CB8B8133051D969DC67E7ED6EF0944DE6A0BC96443225EE15C60AC49C17EEFA5AF3E54FECB19FD1573BF94C9D5198DB816FC814EF3';
      var enc = '';
      let i=0;
      for(i=0;i<key.length;i++){
        enc += SCHT[key.slice(i,i+1)]
      }
var deviceHeight = Dimensions.get('screen').height;
var deviceWidth = Dimensions.get('screen').width;
console.log(deviceWidth,deviceHeight);




export default function Home({navigation}) {

    const darkTheme = useTheme();

    function background() {
        return darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9'] ;
    }


    const valueY = useState(new Animated.Value(-100))[0];
    const headerOpacity = useState(new Animated.Value(0))[0];
    const cardOpacity = useState(new Animated.Value(0))[0];
    const cardX = useState(new Animated.Value(.8))[0];
    
    useEffect(() => {
        Animated.timing(valueY, {
            toValue:0,
            duration:1000,
           
            useNativeDriver: true,
        }).start();
        Animated.timing(cardX, {
            toValue:1,
            duration:500,
            delay:800,
            useNativeDriver: true,
        }).start();
        Animated.timing(headerOpacity, {
            toValue:1,
            duration:1000,
            delay: 200,
            useNativeDriver: true,
        }).start();
        Animated.timing(cardOpacity, {
            toValue:1,
            duration:1,
            delay: 800,
            useNativeDriver: true,
        }).start();
    },[])

    const [totalInternal, setTotalInternal] = useState(0);
    const [freeInternal, setFreeInternal] = useState(0);
    const [usedInternal, setUsedInternal] = useState(0);
    FileSystem.getTotalDiskCapacityAsync().then(resp => setTotalInternal(resp/1000000000));
    FileSystem.getFreeDiskStorageAsync().then(resp => setFreeInternal(resp/1000000000));
    
    
    const used = totalInternal-freeInternal;
    const usedPercentage = (used/totalInternal)*100;
    const freePercentage = (freeInternal/totalInternal)*100;
    const showFree = Math.round((freePercentage/100)*320);

    //decentralized storage variables
    const freePercentageDe = 65;
    const usedPercentageDe = 35;

    const showFreeDe = Math.round((freePercentageDe/100)*320);
        

        


    const netinfo = useNetInfo();
	const [id,setid] = React.useState(null);
	const [filled,setfilled] = React.useState(0);
	const [total,settotal] = React.useState(20);
	const [inter_free,setinter_free] = React.useState(0);
	const [inter_tot,setinter_total] = React.useState(100);
	const [inter_data,setinter_data] = React.useState(data);
	const [showalert,setshow] = React.useState(false);
	const [st,setst] = React.useState("de");
 	const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
		db.transaction((trans) => {
		  trans.executeSql(sql, params, (trans, results) => {
			resolve(results);
		  },
			(error) => {
			  reject(error);
			});
		});
	  });
	// const dec
	const [avatar_uri,seturi] = React.useState(require("../img/account.png"));
	const [temp_data,setdata] = React.useState(data);
	const [auth,setauth] =React.useState(null);
	const[switc,setswitc] = React.useState(Colors.colors.yellow	);
	const[switc_2,setswitc_2] = React.useState(Colors.colors.light);
	const[inter_per,setinter_per] = React.useState(0);
	const [inter_storage,setinter_storage] = React.useState(0);
	const { signOut, toggleTheme } = React.useContext(AuthContext);
	const pan = useRef(new Animated.ValueXY()).current;
	//const dr = useRef(new Drawer(props));
	// RNFS.downloadFile({
	// 	fromUrl: "https://m.apkpure.com/termux/com.termux/download",
	// 	toFile: `${RNFetchBlob.fs.dirs.PictureDir}/termux.apk`,
	// }).promise.then((r)=>{
	// 	console.log(r);
	// })
	// console.log(RNFetchBlob.fs.dirs.PictureDir);
	const successdb =()=>{
		console.log('successsss............')
	}
	const faildb =() =>{
		console.log('fail')
	}
	// myIPFS();
	useEffect(() => {
		
		db = SQLite.openDatabase({
			name: 'sqlite',
			location: 'default',
			createFromLocation: `/storage/emulated/0/Sdcard/sqlite.db`
		},
		successdb,	
		faildb
		);
        
		// console.log(RNFetchBlob.fs.dirs);
		setTimeout(async() => {
			const pu = await AsyncStorage.getItem('mypub');
			console.log(pu);
		}, 2000);
		const fetchdata = async() =>{
			
	
		const token = await AsyncStorage.getItem("userToken");
		setid(token);
		const au = await AsyncStorage.getItem("authtoken");
		setauth(au);
		var ping_res = 10;
       
	fetch(`http://api.anteagle.tech/ms/?ms=${ping_res}&IMEI=${token}`).then(resp=>{
                console.log("pinged");
            })
		console.log(token);
		//const info = await RNFS.getFSInfo();
		//console.log(info);
		const filled = used;
		const f_per = usedPercentage;
		const rem = freePercentage;
		setinter_free(f_per);
		setinter_total(rem);
		setinter_per(f_per);
		console.log(id);
		const imei = await await DeviceInfo.getAndroidId();
		console.log("dsfffffffffffffffffffFFF>>>>>>>>>>>>>>",imei)
		setinter_storage((info.totalSpace/(1000*1000*1000)).toFixed(1))
		var res = 0;
		const resp = await  axios.fetch(`http://api.anteagle.tech/api/getstorage/?IMEI=${token}&ping=${ping_res}`,{
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
				"Authtoken" : au
              },
		);
		console.log(resp)
		const temp_1 = await resp.json();
		console.log(temp_1);
		if(temp_1.notsecure){
			setshow(true)
			const respref = await fetch("http://api.anteagle.tech/refreshtoken/",{
			method : 'POST',
			headers:{
				'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
				'Authtoken' : enc
			},
			body : JSON.stringify({
				'IMEI' : imei,
			}),
				
			})
			var tempref = await respref.json()
			AsyncStorage.setItem("authtoken",tempref.authtoken);
		}
		else{

	
		const temp = [
			{
				key: 1,
				amount: temp_1.filled_per,
				svg: { fill: Colors.colors.yellow },
			},
			{
				key: 2,
				amount: temp_1.remaining_per,
				svg: { fill: Colors.colors.light },
			},
		];
		const temp_2 = [
			{
				key: 1,
				amount: (((info.totalSpace - info.freeSpace)/info.totalSpace)*100).toFixed(1),
				svg: { fill: Colors.colors.yellow },
			},
			{
				key: 2,
				amount: ((info.freeSpace / info.totalSpace)*100),
				svg: { fill: Colors.colors.light },
			},
		]
		setinter_data(temp_2);
		setdata(temp);
		settotal(temp_1.current_storage);
		setfilled(temp_1.filled_per);
		console.log(temp_data);
		const g = await AsyncStorage.getItem('gender');
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
	}
	fetchdata();	
	Animated.timing(pan, {
		toValue: { x: 800, y: 0 },
		delay: 1000,
		useNativeDriver: false,
	}).start();
		// Drawer(dr,{
		// 	status: "close"
		// })
	},[]);




    return (
        <View style = {{flex: 1 , backgroundColor: `${ darkTheme ? "#292929" : "#fff"}` }}>
        <Container>
           
          
          <LinearView style = {[{opacity: headerOpacity}, {transform: [{translateY: valueY}]}]}>
          <LinearGradient start = {{x:0, y:0}} end = {{x:1, y:1}} colors={background()} style = {{height:250,}} >
                  <AccountView>
                      <Image source = {Account}/>
                      <TouchableOpacity><Image source = {settings}/></TouchableOpacity>
                  </AccountView>        
                  <HeaderView>
                      <HeaderText>Home</HeaderText>
                      <HeaderSub>Let's clean and manage your files.</HeaderSub>
                  </HeaderView>
                  
                       
                
            </LinearGradient>
            {/* <AwesomeAlert
                show={showalert}
                showProgress={true}
                message="Syncing you with database."
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
               
            /> */}


          </LinearView>
          
            <CardView>
                <Card dark = {darkTheme} style = {[{opacity: cardOpacity}, {transform : [{scale: cardX}]}]}>
                    <CardHead dark = {darkTheme}>Internal Storage</CardHead>
                    <CardMain>
                        <SvgView>
                            <Svg >
                                <Circle transform = {{translateX:15, translateY:15}} cx="50" cy="50" r="50" stroke = "#32dac9" strokeWidth = "15"></Circle>
                                <Circle transform = {{translateX:15, translateY:15}} cx="50" cy="50" r="50" stroke = "#653df8" strokeWidth = "15" strokeDasharray = "320" strokeDashoffset = {showFree}></Circle>
                            </Svg>
                            <Number >
                                <NumberText>{`${Math.round(usedPercentage)}%`}</NumberText>
                                <NumberText>used</NumberText>
                            </Number>
                        </SvgView>
                        <Details>
                            <DetailsText>Available Space: <HighText>{`${Math.round(freeInternal)}GB`}</HighText></DetailsText>
                            <DetailsText>Used Space: <HighText>{`${Math.round(used)}GB`}</HighText></DetailsText>
                            <Button>
                                <ButtonText>Storage</ButtonText>
                            </Button>
                        </Details>
                    </CardMain>
                </Card>
                <Card dark = {darkTheme} style = {[{opacity: cardOpacity}, {transform : [{scale: cardX}]}]}>
                    <CardHead dark = {darkTheme}>De-centralized Storage</CardHead>
                    <CardMain>
                        <SvgView>
                            <Svg >
                                <Circle transform = {{translateX:15, translateY:15}} cx="50" cy="50" r="50" stroke = "#32dac9" strokeWidth = "15"></Circle>
                                <Circle transform = {{translateX:15, translateY:15}} cx="50" cy="50" r="50" stroke = "#653df8" strokeWidth = "15" strokeDasharray = "320" strokeDashoffset = {showFreeDe}></Circle>
                            </Svg>
                            <Number >
                                <NumberText>{`${usedPercentageDe}%`}</NumberText>
                                <NumberText>used</NumberText>
                            </Number>
                        </SvgView>
                        <Details>
                            <DetailsText>Available Space: <HighText>{`${freePercentageDe}GB`}</HighText></DetailsText>
                            <DetailsText>Used Space: <HighText>{`${usedPercentageDe}GB`}</HighText></DetailsText>
                            <Button>
                                <ButtonText>Storage</ButtonText>
                            </Button>
                        </Details>
                    </CardMain>
                </Card>
            </CardView>

        </Container>
         <Footer navigation = {navigation}/>
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


const HeaderText = styled.Text`
    font-size: 40px;
    font-weight: bold;
    margin:0px;
    includeFontPadding:false;
    color: #fff;
    
    
`





const AccountView = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 25px;
    padding-vertical:25px;
    padding-left: 25px;
    padding-right:25px;
`


const HeaderView = styled.View`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 25px;
    padding-right: 25px;
    
`
const LinearView = styled(Animated.View)`
    width: 100%;
   
    overflow: hidden;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
`

const HeaderSub = styled.Text`
    color: #fff;
    margin-top: 3px;
    font-size: 16px;
`

const CardView = styled.View`
width: 100%;
padding-left: 10px;
padding-right: 10px;
 
`

const Card = styled(Animated.View)`
  background-color: ${props => props.dark ? "#434861" : "#fff"};
   border-radius: 25px;
   padding: 15px;
   padding-left: 20px;
   padding-right: 20px;
   margin-top: 25px;
   elevation: 5;
`

const CardHead = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color : ${props => props.dark ? "#fff" : "#000"};
   
`

const CardMain = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
   

`
const SvgView = styled.View`
    width: 150px;
    height: 150px;

    position: relative;
   
   
`

const Details = styled.View`
   
   
    
`

const DetailsText = styled.Text`
    color: #0075ff;
    font-size: 18px;
`
const HighText = styled.Text`
    color:#0075ff;
    font-weight: bold;
`

const Button = styled.TouchableOpacity`
    width: 120px;
    align-items: center;
    padding: 10px;
    border-radius: 25px;
    background: #418de1;
    color: white;
    margin-top: 10px;
`

const ButtonText = styled.Text`
    color: white;
    
`
const Number = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 45px;
    left: 48px;
   
`
const  NumberText = styled.Text`
    color: #0075ff;
    font-size: 16px;
    font-weight: bold;
`