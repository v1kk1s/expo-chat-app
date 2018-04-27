import * as firebase from 'firebase';
import _ from 'lodash';


/*
  Note: This firebase project will be deleted after the workshop
 */

const config = {
  apiKey: "AIzaSyAhfr4_9SHYgS0KHYxzEe3uNv-kY-nwh2s ",
  databaseURL: "https://rn-workshop-kyiv.firebaseio.com/",
  projectId: "rn-workshop-kyiv",
};

const firebaseApp = firebase.initializeApp(config);
let db;

export const subscribeToMessages = ({channel, callback}) => {
  db = firebaseApp.database().ref('/channels/' + channel);

  db.on('value', snap => {
    const messages = [];
    snap.forEach(item => {
      messages.push({...item.val(), id: item.key});
    });

    _.sortBy(messages, 'timestamp');

    callback(messages);
  });

};

export const addMessage = ({text, sender}) => db.push({text, sender, timestamp: {".sv" : "timestamp"}});