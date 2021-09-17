import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Intro from '../screens/intro';
import SignIn from '../screens/signin';
import SignUp from '../screens/signup';
import Home from '../screens/home';
import FileManager from '../screens/filemanager';
import Settings from '../screens/settings';
import Account from '../screens/account';
import FileDetails from '../screens/filedetails';
import Chat from '../screens/chat';
import ChatIntro from '../screens/chatIntro';
import Scanner from '../screens/scanner';
 
const screens = {
   Intro:{
       screen: Intro,
       navigationOptions: {
        headerShown: false,
    }
       
   },
   Signin: {
       screen: SignIn,
       navigationOptions: {
        headerShown: false,
    }
   },
   Signup: {
       screen: SignUp,
       navigationOptions: {
        headerShown: false,
    }
   },
   Home: {
       screen: Home,
       navigationOptions: {
           headerShown: false,
       }
   },
   Filemanager: {
       screen: FileManager,
       navigationOptions: {
        headerShown: false,
    }
   },
   Settings: {
       screen: Settings,
       navigationOptions: {
        headerShown: false,
    }
   },
   Account: {
       screen: Account,
       navigationOptions: {
        headerShown: false,
    }
   },
   Filedetails : {
       screen: FileDetails,
       navigationOptions: {
        headerShown: false,
    }
   },
   ChatIntro : {
       screen: ChatIntro,
       navigationOptions: {
        headerShown: false,
    }
   },
   Chat : {
       screen: Chat,
       navigationOptions: {
        headerShown: false,
    }
   },
   Scanner : {
       screen: Scanner,
       navigationOptions: {
        headerShown: false,
    }
   },
}

const Stack = createStackNavigator(screens);

export default createAppContainer(Stack);