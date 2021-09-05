import axios from 'axios';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { addData } from '../action';
import { CONSTANTS } from '../constants';
export function* fetchYoutubeData({searchQuery}){
    const dispatch = useDispatch();
    if(typeof setIsFetching !== 'function') return null;
    const API_KEY = CONSTANTS.YOUTUBE_API;
    const url =`https://youtube.googleapis.com/youtube/v3/search?maxResults=100&q=${searchQuery}&key=${API_KEY}`;
    const gotData = [];
   axios.get(url).then((res) => {
        const items = get(res.data,'items',[]);
        items.forEach((item)=>{
            const videoID =get(item,'id.videoId','');
            gotData.push(videoID);      
        })
    })
    .catch((err) => Alert.alert(err)).finally(()=>dispatch(addData(gotData)));
};
