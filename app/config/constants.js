import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDrxYHpwNYIsfrxN8zPMgQEuceGZSViVuE',
  authDomain: 'furniture-warehouse-dashboard.firebaseapp.com',
  databaseURL: 'https://furniture-warehouse-dashboard.firebaseio.com',
}

// M&9$h-B7VsPjh8D8

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const user = firebase.auth().currentUser

export const usersDucksExpirationLength = 100000
export const userExpirationLength = 100000
export const repliesExpirationLength = 300000
