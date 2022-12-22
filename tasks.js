
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {

  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if (text.startsWith("hello")) {
    hello(text);
  } else if (text === 'help\n') {
    help();
  } else if (text === 'list\n') {
    list()
  } else if (text === 'add\n' || text === 'add \n') {
    console.log("please type what you want to add after the add command")
  } else if (text.startsWith("add") && text.length > 4) {
    add(text)
  }
  else {
    unknownCommand(text);
  }
}

let list1 = ["get potato", "get bread", "get tomato"]


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}


/**
 * Says hello
 * 
 * @param {string} c the text received
 * @returns {void}
 */
function hello(c) {
  console.log(`${c.trim()}!`)
}

/**
 * add to the list
 * 
 * @param {string} c the text received
 * @returns {void}
 */
function add(c) {
  console.log(`adding: "${c.slice(4, c.length - 1)}"...`);
  list1.push(c.slice(4, c.length - 1));
  console.log(`added!`);
}

/**
 * remove from the list
 * 
 * @param {string} c the text received
 * @returns {void}
 */
function remove(c) {
  console.log(`remove`)
}

/**
 * lists the list
 * 
 * 
 * @returns {void}
 */
function list() {
  console.log(`list:`);
  list1.map((item, index) => {
    index++;
    console.log(`${index}- ${item}`);
  })
}


/**
 * prints all the possible commands
 * This function is supposed to lists all the possible commands
 *
 * @returns {void}
 */
function help() {
  console.log("these are the commands:\n" +
    " + help: this command will list all the commands for you.\n" +
    " + hello: this command greets you, you have to type hello and then your name (ex: 'hello Emile' will return 'hello Emile!') so it will greet you with your name, and it can greet you without typing your name also (ex: 'hello' will return 'hello!'\n" +
    " + quit or exit: this command exit the application.\n"
  )
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Emile Kanaan")
