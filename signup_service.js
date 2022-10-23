import { users } from "./database.js"

export function checkIfUserExists(users, email) {
  if (users.find(user => user.email === email)) {
      return true
    } else {
      return false
    }
}

export function findUserByEmail(email) {
  if(checkIfUserExists(users, email)) {
    return users.find(user => user.email === email)
  } else {
    console.log("User doens't exist")
  }
}