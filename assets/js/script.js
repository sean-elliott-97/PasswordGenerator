// Assignment code here

//array variables with available characters for password
var lowerCase = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
var upperCase = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
var numeric = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var special = [
  " ",
  "!",
  '"',
  "#",
  "$",
  "%",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "\\",
  "]",
  "^",
  "_",
  "`",
  "{",
  "|",
  "}",
  "~",
];

//array of choices made when prompted
var passwordCriteria = [];

//array with generated password
var generatedPassword = [];

//starting array set to 0
var startingArr = 0;

function generatePassword() {
  //variable for random character from arrays
  var randChar;

  userPrompts();
  //adds one of each of the desired (random) characters from corresponding array

  if (passwordCriteria[1] == true) {
    randChar = Math.floor(Math.random() * lowerCase.length);
    generatedPassword[startingArr] = lowerCase[randChar];
    startingArr += 1;
  }
  if (passwordCriteria[2] == true) {
    randChar = Math.floor(Math.random() * upperCase.length);
    generatedPassword[startingArr] = upperCase[randChar];
    startingArr += 1;
  }
  if (passwordCriteria[3] == true) {
    randChar = Math.floor(Math.random() * numeric.length);
    generatedPassword[startingArr] = numeric[randChar];
    startingArr += 1;
  }
  if (passwordCriteria[4] == true) {
    randChar = Math.floor(Math.random() * special.length);
    generatedPassword[startingArr] = special[randChar];
    startingArr += 1;
  }
  for (var i = startingArr; i < passwordCriteria[0]; i++) {
    //variable for selecting type of character
    var randNumber = Math.floor(Math.random() * 4);
    if (randNumber == 0 && passwordCriteria[1] == true) {
      randChar = Math.floor(Math.random() * lowerCase.length);
      generatedPassword[i] = lowerCase[randChar];
      console.log("hit lowercase");
    } else if (randNumber == 1 && passwordCriteria[2] == true) {
      randChar = Math.floor(Math.random() * upperCase.length);
      generatedPassword[i] = upperCase[randChar];
      console.log("hit uppercase");
    } else if (randNumber == 2 && passwordCriteria[3] == true) {
      randChar = Math.floor(Math.random() * numeric.length);
      generatedPassword[i] = numeric[randChar];
      console.log("hit numeric");
    } else if (randNumber == 3 && passwordCriteria[4] == true) {
      randChar = Math.floor(Math.random() * special.length);
      generatedPassword[i] = special[randChar];
      console.log("hit special");
    } else {
      i -= 1;
      continue;
    }
    
  }
  //returns password without commas separating characters
  return generatedPassword.join("");

  
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//userPrompts();
function userPrompts() {
  //allows loop to execute
  passwordCriteria = [0];
  while (
    passwordCriteria[0] < 8 ||
    (passwordCriteria[0] > 128 && !passwordCriteria.includes("yes"))
  ) {
    var length = window.prompt(
      "How long would you like your password to be? (enter a number between 8 and 128):"
    );
    //ensures that input for length is a number and not a character/string
    if (isNaN(length)) {
      window.alert("please enter a valid number between 8 and 128");
      return userPrompts();
    }
    //ensures that number entered by user is acceptable
    if (length<8||length>128) {
      window.alert("please enter a valid number between 8 and 128");
      return userPrompts();
    }
    var lower = window.confirm("Would you like to use lowercase characters? (press ok for 'yes' or cancel for 'no'):");
    var upper = window.confirm("Would you like to use uppercase characters? (press ok for 'yes' or cancel for 'no'):");
    var numer = window.confirm("Would you like to use numeric characters? (press ok for 'yes' or cancel for 'no'):");
    var spec = window.confirm("Would you like to use special characters? (press ok for 'yes' or cancel for 'no'):");
    passwordCriteria = [length, lower, upper, numer, spec];
  
    //clears old password
    generatedPassword = [];
    //resets startingArr
  startingArr=0;
  //ensures that users select at least one criteria
  if(passwordCriteria[1]==""&&passwordCriteria[2]==""&&passwordCriteria[3]==""&&passwordCriteria[4]=="")
  {
    window.alert("you must select a criteria!");
    return userPrompts();
  }
  }
  
}

//ensures that password contains at least one of each of the desired characters from the above character arrays
function checkChars(generatedPassword) {
  if (passwordCriteria[1] == true && !generatedPassword.includes(lowerCase)) {
    return false;
  }
  if (passwordCriteria[2] == true && !generatedPassword.includes(upperCase)) {
    return false;
  }
  if (passwordCriteria[3] == true && !generatedPassword.includes(numeric)) {
    return false;
  }
  if (passwordCriteria[4] == true && !generatedPassword.includes(special)) {
    return false;
  }
  return true;
}

