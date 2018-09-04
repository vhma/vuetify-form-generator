/**
 * Created by AETERNAM on 03/09/2018.
 */
import firebase from 'firebase'
import firebase2 from 'firebase'
import env from '../config/development'

// uncomment the below if you use firestore DB instead of firebase DB
// require('firebase/firestore')

const config = {
    apiKey: env.FIREBASE.API_KEY,
    authDomain: `${env.FIREBASE.PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${env.FIREBASE.DATABASE_NAME}.firebaseio.com`,
    projectId: env.FIREBASE.PROJECT_ID,
    storageBucket: `gs://${env.FIREBASE.PROJECT_ID}.appspot.com`,
    messagingSenderId: env.FIREBASE.SENDER_ID
}

const config_mobile = {
    apiKey: env.FIREBASE_MOBILE.API_KEY,
    authDomain: `${env.FIREBASE_MOBILE.PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${env.FIREBASE_MOBILE.DATABASE_NAME}.firebaseio.com`,
    projectId: env.FIREBASE_MOBILE.PROJECT_ID,
    storageBucket: `gs://${env.FIREBASE_MOBILE.PROJECT_ID}.appspot.com`,
    messagingSenderId: env.FIREBASE_MOBILE.SENDER_ID
}

const googleProvider = new firebase.auth.GoogleAuthProvider()
const firebase_main =!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()


export{firebase_main}
const firebase_mobile = firebase.initializeApp(config_mobile, "firebase_mobile")

export {googleProvider}

export {firebase_mobile}

export const db = firebase_mobile.database()
export const branchOffice = db.ref('admin/broker/Aeternam/branchOffice')
export const covenant = db.ref('admin/broker/Aeternam/covenant')