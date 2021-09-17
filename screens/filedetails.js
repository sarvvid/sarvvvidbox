import React, {useState} from 'react';
import styled from 'styled-components';
import { Text, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { useNavigationParam } from '@react-navigation/native';
import Footer from '../components/footer';
import account from '../img/account.png'
import { useTheme } from '../contexts/themeContext';
import search from '../img/search.png';
// import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios'

//import DocumentPicker from 'react-native-document-picker';


export default function FileDetails({navigation}) {

    const [documentUrl, setDocumentUrl] = useState('');
    const documentType = navigation.getParam('type');

    const uploadFile = async () => {
        // let result = await DocumentPicker.getDocumentAsync({type: documentType});
        // setDocumentUrl(result.uri);
        // alert(result.uri);
        

        let filename = documentUrl.split('/').pop();
        
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `${match[1]}` : ``;

        console.log(type)
        
        const form = new FormData();

        form.append(documentType, {
        uri: documentUrl,
        type: type,
        name: result.name,
        });

        fetch('http://localhost:19002', {
			method: 'POST',
			body: form
		}).then(response => {
			console.log(response)
		}).catch(err => {
			console.log(err);
		});


    }
    
    const darkTheme = useTheme();

    function background() {
        return darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9'] ;
    }

    const data = [
        {
            key:"1",
        },
        {
            key:"2",
        },
        {
            key:"3",
        },
        {
            key:"4",
        },
        {
            key:"5",
        },
        {
            key:"6",
        },
        {
            key:"7",
        },
        {
            key:"8",
        },
        {
            key:"9",
        },
    ]

    return(
        <View style = {{flex: 1 , backgroundColor: `${ darkTheme ? "#292929" : "#fff"}`}}>
            {/* <Text>{navigation.getParam('title')}</Text> */}
            <Container>
                <LinearView>
                    <LinearGradient start = {{x:0, y:0}} end = {{x:1, y:1}} colors={background()}  >
                        <Header>
                            <HeaderText>{navigation.getParam('title')}</HeaderText>
                            <Image source = {account}/>
                        </Header>
                    </LinearGradient>
                </LinearView>
                <Input>
                    <TextInput style = {{width:"80%"}} placeholder = "Search files" returnKeyLabel = "send"/>
                    <TouchableOpacity>
                        <Image source = {search}/>
                    </TouchableOpacity>
                </Input>
                <View style = {{paddingHorizontal:20, width: "100%"}}>
                    <AddCard onPress = {() => uploadFile()} style = {{backgroundColor: navigation.getParam('addcolor')}}>
                        <Image source = {navigation.getParam('add')}/>
                        <AddText>{`add new ${navigation.getParam('title')}`}</AddText>
                    </AddCard>
                </View>
                <View style = {{width: "90%"}}>
                <FlatList
                    data = {data}
                    renderItem = {({item}) => 
                    <View style = {{width: "100%", paddingHorizontal: 5}}>
                       <Card1 dark = {darkTheme}>
                           <Section1>
                               <Image source = {navigation.getParam('image')}/>
                               <View style = {{marginLeft:10}}>
                                   <Title dark  = {darkTheme}>{navigation.getParam('title')}</Title>
                                   <SectionDetails dark = {darkTheme}>type: png size:500kb</SectionDetails>
                               </View>
                           </Section1>
                           <Section2>
                               <Image source = {navigation.getParam('arrow')}/>
                           </Section2>
                       </Card1>
                    </View>
                }
                />
                </View>
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

const AddCard = styled.TouchableOpacity`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    padding: 12px;
    border-radius: 25px;
    margin-top: 15px;
    
`

const AddText = styled.Text`
    color: #fff;
    font-size: 25px;
    font-weight: bold;
    margin-left: 10px;
`

const Card1 = styled.TouchableOpacity`
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.dark ? "#434861" : "#fff"};
    border-radius: 15px;
    margin-vertical: 10px;
    elevation:5;
`
const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color : ${props => props.dark ? "#fff" : "#000"};
`
const SectionDetails = styled.Text`
    opacity: .5;
    color : ${props => props.dark ? "#fff" : "#000"};
`

const Section1 = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
const Section2 = styled.View`
    
`

const Input = styled.View`
margin-top: 25px;
 width: 90%;
 margin-bottom:10px ;
 border-radius: 25px;
 border-width: 2px;
 border-color: #0092ff;
 padding:5px;
 padding-left:15px;
 padding-right:15px;
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`