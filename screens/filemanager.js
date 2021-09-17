import React from 'react';
import styled from 'styled-components';
import { Text, View, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Circle} from 'react-native-svg';
import { useTheme } from '../contexts/themeContext';
import Footer from '../components/footer';
import settings from '../img/settings.png';
import Account from '../img/account.png'
import audio from '../img/audio.png';
import audioa from '../img/audioa.png';
import audioadd from '../img/audioadd.png';
import image from '../img/image.png';
import imagea from '../img/imagea.png';
import imageadd from '../img/imageadd.png';
import video from '../img/video.png';
import videoa from '../img/videoa.png';
import videoadd from '../img/videoadd.png';
import doc from '../img/doc.png';
import doca from '../img/doca.png';
import docadd from '../img/docadd.png';
import other from '../img/other.png';
import othera from '../img/othera.png';
import file from '../img/file.png';
import filea from '../img/filea.png';
import fileadd from '../img/fileadd.png';
import otheradd from '../img/otheradd.png';
import search from '../img/search.png';

export default function FileManager({navigation})  {

    const darkTheme = useTheme();

    function background() {
        return darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9'] ;
    }

    const data = [
        {
                title: "Files",
                key: "File",
                image: file,
                color: "#878787",
                arrow: filea,
                add: fileadd,
                addcolor: "#c2c2c2",
                type: "*/*"
        },
        {
                title: "Images",
                key: "Images",
                image: image,
                color: "#ff4430",
                arrow: imagea,
                add: imageadd,
                addcolor: "#ff604f",
                type: 'image/*'
        },
        
        {
                title: "Audios",
                key: "Audios",
                image: audio,
                color: "#3c6ce7",
                arrow: audioa,
                add: audioadd,
                addcolor: "#3c6ce7",
                type : 'audio/*'
            
        },
        {
                title: "Videos",
                key: "Videos",
                image: video,
                color: "#3ce762",
                arrow: videoa,
                add: videoadd,
                addcolor: "#09d836",
                type : "video/*"
            
        },
        {
                title: "Documents",
                key: "Documents",
                image: doc,
                color: "#e1e502",
                arrow: doca,
                add:docadd,
                addcolor: "#dade00",
                type : 'application/*'
            
        },

    ]

    return (
        <View style = {{flex:1, backgroundColor: `${ darkTheme ? "#292929" : "#fff"}`}}>
            <Container>
            <LinearView>
                <LinearGradient start = {{x:0, y:0}} end = {{x:1, y:1}} colors={background()}  >
                  <AccountView>
                      <Image source = {Account}/>
                      <TouchableOpacity><Image source = {settings}/></TouchableOpacity>
                  </AccountView>        
                  <HeaderView>
                      <HeaderText>File Manager</HeaderText>
                  </HeaderView>
                  
                       <CardView>
                           <Card>
                                <Main>
                                    <SubHeading>Available</SubHeading>
                                    <Heading>Storage</Heading>
                                    <Details>
                                        <View style = {{flexDirection: "row", alignItems: "center"}}>
                                            <Round1 ></Round1>
                                            <DetailsText>Used Space</DetailsText>
                                        </View>
                                        <View style = {{flexDirection: "row", alignItems: "center"}}>
                                            <Round></Round>
                                            <DetailsText>Free Space</DetailsText>
                                        </View>
                                    </Details>
                                </Main>
                                <SvgView>
                                    <Svg >
                                        <Circle transform = {{translateX:15, translateY:15}} cx="60" cy="60" r="60" stroke = "#fff" strokeWidth = "20"></Circle>
                                        <Circle transform = {{translateX:15, translateY:15}} cx="60" cy="60" r="60" stroke = "#527BF5" strokeWidth = "20" strokeDasharray = "350" strokeDashoffset = "50"></Circle>
                                    </Svg>
                                    <Number >
                                        <NumberText>75%</NumberText>
                                        <NumberText>used</NumberText>
                                    </Number>
                                </SvgView>

                           </Card>
                       </CardView>
                
                </LinearGradient>
          </LinearView>
          <View style = {{width:"100%",padding:15, display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row"}}>
              <MainText dark = {darkTheme} >My Files</MainText>
              <MainText style = {{fontSize: 15, opacity: .8 }} dark = {darkTheme}>See all</MainText>
          </View>
          <Input>
                    <TextInput style = {{width:"80%"}} placeholder = "Search files" returnKeyLabel = "send"/>
                    <TouchableOpacity>
                        <Image source = {search}/>
                    </TouchableOpacity>
           </Input>

                <FlatList
                    data = {data}
                    renderItem = {({item}) => 
                    <View style = {{width: "100%", paddingHorizontal: 35}}>
                       <Card1 dark = {darkTheme} onPress = {() => navigation.navigate("Filedetails", item)}>
                           <Section1>
                               <Image source = {item.image}/>
                               <View style = {{marginLeft:10}}>
                                   <Title dark = {darkTheme}>{item.title}</Title>
                                   <SectionDetails dark = {darkTheme}>15MB Last Updated:25-08-2021</SectionDetails>
                               </View>
                           </Section1>
                           <Section2>
                               <Image source = {item.arrow}/>
                           </Section2>
                       </Card1>
                    </View>
                }
                />
            </Container>
            <Footer navigation = {navigation}/>
        </View>
    )
}

const Container = styled.View`
    width:100%;
    flex: .92;
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
const LinearView = styled.View`
    width: 100%;
   
    overflow: hidden;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
`

const Card = styled.View`
    background-color: #ff724d;
    border-radius: 25px;
    elevation:25;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 25px;
`
const CardView = styled.View`
    padding: 25px;
`
const Heading = styled.Text`
    font-size: 35px;
    color: white;
    font-weight: bold;
    
    
`
const SubHeading = styled.Text`
    font-size: 25px;
    opacity: .9;
    color: white;
    font-weight: bold;
    
`
const Main = styled.View`
    
`

const MainText = styled.Text`
      color : ${props => props.dark ? "#fff" : "#000"};
      font-size: 26px;
`
const SvgView = styled.View`
    width: 150px;
    height: 150px;

    position: relative;
   
   
`

const Number = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50px;
    left: 53px;
   
`
const  NumberText = styled.Text`
    color: #0075ff;
    font-size: 18px;
    font-weight: bold;
`

const Round = styled.View`
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 15px;
    margin-right: 5px;
`
const Round1 = styled.View`
    width: 10px;
    height: 10px;
    background-color: #527BF5;
    border-radius: 15px;
    margin-right: 5px;
`

const DetailsText = styled.Text`
    color: white;
    font-size: 14px;
`
const Details = styled.View`
    margin-top: 20px;
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
    margin-vertical: 15px;
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