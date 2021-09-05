import Voice from '@react-native-voice/voice';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet, useColorScheme
} from 'react-native';
import { Button } from 'react-native-paper';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { useSelector } from 'react-redux';
import { fetchYoutubeData } from './src/util/fetchYoutubeData';


function App(){
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [start, setstart] = useState(false);
  const [fetching,setIsFetching] = useState(false);

  useEffect(()=>{
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    fetchYoutubeData({searchQuery:'dog',setIsFetching});
  },[])
  
  const dataReducer = useSelector(
    (state) => state.dataReducer,
  );
  const {data} = dataReducer;

  const onSpeechStart = (e) => {
    console.log('onSpeechStart: ', e);
    setstart(true)
    // this.setState({
    //   started: '√',
    // });
  };

  const onSpeechRecognized = (e) => {
    console.log('onSpeechRecognized: ', e);
    // this.setState({
    //   recognized: '√',
    // });
  };

  const onSpeechEnd = (e) => {
    console.log('onSpeechEnd: ', e);
    // this.setState({
    //   end: '√',
    // });
  };

  const onSpeechError = (e) => {
    console.log('onSpeechError: ', e);
    // this.setState({
    //   error: JSON.stringify(e.error),
    // });
  };

  const onSpeechResults = (e) => {
    console.log('onSpeechResults: ', e);
    // this.setState({
    //   results: e.value,
    // });
  };

  const onSpeechPartialResults = (e) => {
    console.log('onSpeechPartialResults: ', e);
    // this.setState({
    //   partialResults: e.value,
    // });
  };

  const _startRecognizing = async () => {
    // this.setState({
    //   recognized: '',
    //   pitch: '',
    //   error: '',
    //   started: '',
    //   results: [],
    //   partialResults: [],
    //   end: '',
    // });
    console.log("STARTING")
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };


  const _stopRecognizing = async () => {
    console.log(stop)
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  console.log(data)
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
         <Button icon="camera" mode="contained" onPress={start?_stopRecognizing:_startRecognizing}>Press me</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
