import axios from 'axios';
import { get } from 'lodash';
import { addData } from '../action';
import { CONSTANTS } from '../constants';
import store from '../store';
export function fetchYoutubeData({searchQuery}){

    const API_KEY = CONSTANTS.YOUTUBE_API;
    const url =`https://youtube.googleapis.com/youtube/v3/search?maxResults=5&q=${searchQuery}&key=${API_KEY}`;
    console.log(url)
    const gotData = [];
    axios.get(url).then((res) => {
        const items = get(res.data,'items',[]);
        items.forEach((item)=>{
            const videoID =get(item,'id.videoId','');
            console.log(videoID)
            gotData.push(videoID);      
        })
        console.log(gotData)
        store.dispatch(addData(gotData))
    })
    .catch((err) => alert(err));
};
