import Voice from '@react-native-voice/voice';
import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar, StyleSheet, useColorScheme, View
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import YoutubePlayer from "react-native-youtube-iframe";
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import store from './src/store';
import { fetchYoutubeData } from './src/util/fetchYoutubeData';


function App(){
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [start, setStart] = useState(false);
  const [recognizedArray, setRecognizedArray] = useState([])
  const [data,setData] = useState(store.getState());
  const [playing, setPlaying] = useState(false);
  const [currentPlaying,setCurrentPlaying] = useState(0);

  store.subscribe(()=>{
    setData(store.getState().data);
  })

  useEffect(()=>{
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    // fetchYoutubeData({searchQuery:'dog'});
  },[])
  
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      setCurrentPlaying(currentPlaying+1);  
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const searchForVideos =(results)=>{
    const result = results[0].split(" ")
    //Triggered when used in sentences only
    if(result.includes("dogs") || result.includes("dog"))
    {
      _stopRecognizing()
    return fetchYoutubeData({searchQuery:'dogs'})}

    if(result.includes("cats") || result.includes("cat"))
    {_stopRecognizing()
    return fetchYoutubeData({searchQuery:'cats'})}
}
 console.log(data)

 const onSpeechStart = (e) => {
  console.log('onSpeechStart: √',);
  setStart(true)
  // this.setState({
  //   started: '√',
  // });
};

const onSpeechRecognized = (e) => {
  //console.log('onSpeechRecognized: ', e);
  // this.setState({
  //   recognized: '√',
  // });
};

const onSpeechEnd = (e) => {
  console.log('onSpeechEnd:  √');
  // this.setState({
  //   end: '√',
  // });
};

const onSpeechError = (e) => {
  //console.log('onSpeechError: ', e);
  // this.setState({
  //   error: JSON.stringify(e.error),
  // });
};

const onSpeechResults = (e) => {
  console.log('onSpeechResults: ', e);
  //_stopRecognizing();
  searchForVideos(e.value)
  setRecognizedArray(e.value);
  // this.setState({
  //   results: e.value,
  // });
};

const onSpeechPartialResults = (e) => {
  //console.log('onSpeechPartialResults: ', e);
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
  setStart(false)
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
         <Button mode="contained" onPress={start?_stopRecognizing:_startRecognizing}>
           {start?" Press to stop listening":"Press to start listen"}
           </Button>
           <Text>{recognizedArray.toString()}</Text>

           <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={data[currentPlaying]}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
    </View>
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
