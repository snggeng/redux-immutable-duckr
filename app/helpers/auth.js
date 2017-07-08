import { ref, firebaseAuth } from 'config/constants'

export default function auth () {
  const email = 'admin@bigbox.com.sg'
  const password = 'M&9$h-B7VsPjh8D8'
  return firebaseAuth().signInWithEmailAndPassword(email, password).catch((error) => {
  // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    if (error) return { code: errorCode, message: errorMessage }
  })
}

export function checkIfAuthed (store) {
  return store.getState().users.isAuthed === true
}

export function logout () {
  return firebaseAuth().signOut()
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}
