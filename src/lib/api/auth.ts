import firebase from 'firebase'

export type AuthError = firebase.auth.Error

function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider()

  // NOTE: After this, `firebase.auth().onAuthStateChanged()` hook gets triggered and logs user in.
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((userCredential) => userCredential.user)
    .catch((error) => console.error('Login failed. Error:', error))
}

function signOut() {
  return firebase
    .auth()
    .signOut()
    .catch((error) => console.error('Logout failed. Error:', error))
}

interface LoginStatusHooks {
  onLogin: (user: firebase.User) => void
  onLogout: () => void
  onError: (error: firebase.auth.Error) => void
}

function onStatusChange(hooks: LoginStatusHooks) {
  firebase.auth().onAuthStateChanged(
    (user) => {
      if (user) {
        hooks.onLogin(user)
      } else {
        hooks.onLogout()
      }
    },
    (error) => {
      hooks.onError(error)
    }
  )
}

const Auth = {
  signIn,
  signOut,
  onStatusChange,
}

export default Auth
