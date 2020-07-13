

import React from 'react';
import Routes from './routes';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
   'Deprecation in', 
   'Possible Unhandled',
   'Can','t perform',
   'Unrecognized Web'
]);

export default function App(){
    return <Routes/>
}