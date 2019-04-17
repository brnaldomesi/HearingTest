import Reflux from 'reflux';

var ExamActions = Reflux.createActions([
  "buttonPressed",
  "failedButtonPressed",
  "restartTest",
  "nextStep",
  "previousStep",
  "emailAndOrder",
  "hearingEnviroments"
]);

export default ExamActions;
