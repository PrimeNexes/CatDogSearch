import Voice from '@react-native-voice/voice';
import { get } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView, StatusBar, StyleSheet, useColorScheme, View
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import YoutubePlayer from "react-native-youtube-iframe";
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { useSelector } from 'react-redux';
import store from './src/store';
import { counterAsync } from './src/thunk';
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
  const counter = useSelector((state) => state.counter)
  const [showPlayer,setShowPlayer] =useState(false)
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
  
  },[])
  useEffect(()=>{
    if(counter === 1) {setShowPlayer(true);setPlaying(false);}
  },[counter])
  useEffect(()=>{return ()=>Voice.destroy().then(Voice.removeAllListeners)},[])

  const onStateChange = useCallback((state) => {
    console.log(state)
    if (state === "ended") {
      setPlaying(false);
      setShowPlayer(false)
      setCurrentPlaying(currentPlaying+1);
      store.dispatch(counterAsync())
    }
  }, [currentPlaying]);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const searchForVideos =(results)=>{
    const result = results[0].split(" ")
    //Triggered when used in sentences only
    if(result.includes("dogs") || result.includes("dog"))
    {
      _stopRecognizing()
      setShowPlayer(true)
    return store.dispatch(fetchYoutubeData({searchQuery:'dogs'}))}

    if(result.includes("cats") || result.includes("cat"))
    {_stopRecognizing()
      setShowPlayer(true)
    return store.dispatch(fetchYoutubeData({searchQuery:'cats'}))}
}
 const onSpeechStart = (e) => {
  console.log('onSpeechStart: √',);
  setStart(true)
  setCurrentPlaying(0)
};

const onSpeechRecognized = (e) => null;

const onSpeechEnd = (e) => {
  console.log('onSpeechEnd:  √');
};

const onSpeechError = (e) => {
  alert('onSpeechError: ', e);
};

const onSpeechResults = (e) => {
  console.log('onSpeechResults: ', e);
  searchForVideos(e.value)
  setRecognizedArray(e.value);
};

const onSpeechPartialResults = (e) => null;

const _startRecognizing = async () => {
  console.log("STARTING")
  try {
    await Voice.start('en-US');
    setData([])
    setShowPlayer(false)
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

  return (
    <SafeAreaView style={backgroundStyle} style={{flex:1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle,{paddingTop:25,paddingHorizontal:12}]} >
         <Button mode="contained" onPress={start?_stopRecognizing:_startRecognizing}>
           {start?" Press to stop listening":"Press to start listen"}
           </Button>
           <Text style={styles.speachText}>{recognizedArray.toString()}</Text>
           <View style={{marginTop:85}}>{showPlayer?<YoutubePlayer
              height={300}
              play={playing}
              videoId={data[currentPlaying]}
              onChangeState={onStateChange}
            />:null}
           {!(showPlayer) && get(data,'data.length',1) !==0 ? <Text style={styles.centerText}>Next in {counter}</Text>:null}</View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  centerText: {
    alignSelf:'center',
    fontSize:20
  },
  speachText:{fontSize:24,marginTop:8},
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
