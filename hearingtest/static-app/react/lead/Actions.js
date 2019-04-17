/**
defines all needed reflux actions, if a method is
needed to do an action on the store from the interface,
its created here
**/
import Reflux from 'reflux';

var Actions = Reflux.createActions([
    "nextStepButtonPressed",
    "previousStepButtonPressed",
    "soundButtonPressed",
    "updateUserDataEnviroments",
    "updateUserData",
    "testRightEarSample",
    "testLeftEarSample",
    "hearRightEar",
    "hearLeftEar",
    "showResults",
    "startTest",
    "trackEvent",
    "sendEmail",
    "showBrowserUnsupportedPage",
    "sendUsersEmail",
])

export default Actions
