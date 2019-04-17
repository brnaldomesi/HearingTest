/**
object that holds the user data, gender, age, email,
and hearingEnviroments
**/
var UserData = function UserData() {
  this.gender = null;
  this.age = null;
  this.email = null;
  this.zipcode = null;
  this.hearingEnviroments = {
    tv:false,
    conversation:false,
    enviroments:false,
    music:false,
    audience:false,
    phone:false,
    curious:false
  }
}

export default UserData
