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
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------------------------");
}

let savefile;
if (process.argv[2] == null) {
  savefile = "database.json";
} else {
  savefile = process.argv[2];
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
  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (text.startsWith("hello")) {
    hello(text);
  } else if (text === "help\n") {
    help();
  } else if (text === "list\n") {
    list();
  } else if (text === "add\n" || text === "add \n") {
    console.log("please type what you want to add after the add command");
  } else if (text.startsWith("add") && text.length > 4) {
    add(text);
  } else if (text.startsWith("remove")) {
    remove(text);
  } else if (text.startsWith("check")) {
    check(text);
  } else if (text.startsWith("uncheck")) {
    uncheck(text);
  } else if (text.startsWith("edit")) {
    edit(text);
  } else {
    unknownCommand(text);
  }
}
var list1
const fs = require("fs");
try {
  let data = fs.readFileSync(savefile);
  var objList = JSON.parse(data);
}
catch (e) {
  console.log(`this file is not present, we will create it!`)
}
if (objList !== undefined) {
  list1 = objList.list1;
} else {
  objList = { "list1": [] }
  list1 = objList.list1;
}


// let list1 = ["[ ] get potato", "[\u2713] get bread", "[\u2713] get tomato"];

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @param {string} c the text received
 * @returns {void}
 */
function hello(c) {
  console.log(`${c.trim()}!`);
}

/**
 * add items to the list
 *
 * @param {string} c the text received
 * @returns {void}
 */
function add(c) {
  console.log(`adding: "${c.slice(4, c.length - 1)}"...`);
  list1.push(`[ ] ${c.slice(4, c.length - 1)}`);
  console.log(`added!`);
}

/**
 * remove the last item from the list
 * and if you add it with a number it will remove the item of that number
 *
 * @param {string} c the text received
 * @returns {void}
 */
function remove(c) {
  if (c.length <= 7) {
    if (list1.length === 0) {
      console.log(`nothing to remove, the list is empty!`);
    } else {
      console.log("removing the last element...");
      list1.pop();
      console.log("last element removed!");
    }
  } else {
    let index = c.slice(7);
    if (
      index.slice(0, index.length - 1) > list1.length ||
      index.slice(0, index.length - 1) < 1 ||
      isNaN(index.slice(0, index.length - 1))
    ) {
      console.log(`item ${index.slice(0, index.length - 1)} does not exist!`);
    } else {
      console.log(`removing element: ${index.slice(0, index.length - 1)}`);
      list1.splice(index - 1, 1);
      console.log(`element ${index.slice(0, index.length - 1)} removed!`);
    }
  }
}

/**
 * edit the last item from the list
 * and if you add it with a number it will edit the item of that number
 *
 * @param {string} c the text received
 * @returns {void}
 */
function edit(c) {
  if (c.length <= 6) {
    console.log(
      "Error!\nPlease enter what you want to edit...\ntype help command for more informations"
    );
  } else {
    if (list1.length === 0) {
      console.log(`nothing to edit, the list is empty!`);
    } else {
      let index = parseInt(c.slice(5));
      if (isNaN(index)) {
        let element = c.slice(5);
        if (list1[list1.length - 1].slice(0, 3) === "[ ]") {
          console.log(
            `editing "${list1[list1.length - 1].slice(4)}" to "${element.slice(
              0,
              element.length - 1
            )}"...`
          );
          list1[list1.length - 1] = `[ ] ${element.slice(
            0,
            element.length - 1
          )}`;
          console.log(`editing completed!`);
        } else {
          console.log(
            `editing "${list1[list1.length - 1].slice(4)}" to "${element.slice(
              0,
              element.length - 1
            )}"...`
          );
          list1[list1.length - 1] = `[\u2713] ${element.slice(
            0,
            element.length - 1
          )}`;
          console.log(`editing completed!`);
        }
      } else if (index > list1.length || index < 1) {
        console.log(`item ${index} does not exist`);
      } else {
        let element = c.slice(6 + index.toString().length);
        if (list1[index - 1].slice(0, 3) === "[ ]") {
          console.log(
            `editing "${list1[index - 1].slice(4)}" to "${element.slice(
              0,
              element.length - 1
            )}"...`
          );
          list1[index - 1] = `[ ] ${element.slice(0, element.length - 1)}`;
          console.log(`editing completed!`);
        } else {
          console.log(
            `editing "${list1[index - 1].slice(4)}" to "${element.slice(
              0,
              element.length - 1
            )}"...`
          );
          list1[index - 1] = `[\u2713] ${element.slice(0, element.length - 1)}`;
          console.log(`editing completed!`);
        }
      }
    }
  }
}

/**
 * check to changes from unckecked to checked
 * you want to enter it with a number it will check the item of that number
 *
 * @param {string} c the text received
 * @returns {void}
 */
function check(c) {
  if (c.length <= 7) {
    console.log(`Error!\nplease input the item number you want to check`);
  } else if (list1.length === 0) {
    console.log(`nothing to check, the list is empty!`);
  } else {
    let index = parseInt(c.slice(5));
    if (isNaN(index)) {
      console.log(`please enter a correct number`);
    } else if (index > list1.length || index < 1) {
      console.log(`item ${index} does not exist`);
    } else {
      if (list1[index - 1].slice(0, 3) === "[ ]") {
        let checked = list1[index - 1].replace("[ ]", "[\u2713]");
        console.log(`checking item ${index}...`);
        list1[index - 1] = checked;
        console.log(`item ${index} checked!`);
      } else {
        console.log(`this item is already checked!`);
      }
    }
  }
}

/**
 * uncheck to changes from ckecked to unchecked
 * you want to enter it with a number it will uncheck the item of that number
 *
 * @param {string} c the text received
 * @returns {void}
 */
function uncheck(c) {
  if (c.length <= 9) {
    console.log(`Error!\nplease input the item number you want to uncheck`);
  } else if (list1.length === 0) {
    console.log(`nothing to uncheck, the list is empty!`);
  } else {
    let index = parseInt(c.slice(7));
    if (isNaN(index)) {
      console.log(`please enter a correct number`);
    } else if (index > list1.length || index < 1) {
      console.log(`item ${index} does not exist`);
    } else {
      if (list1[index - 1].slice(0, 3) !== "[ ]") {
        let unchecked = list1[index - 1].replace("[\u2713]", "[ ]");
        console.log(`unchecking item ${index}...`);
        list1[index - 1] = unchecked;
        console.log(`item ${index} unchecked!`);
      } else {
        console.log(`this item is already unchecked!`);
      }
    }
  }
}

/**
 * lists the items in the list
 *
 *
 * @returns {void}
 */
function list() {
  if (list1.length === 0) {
    console.log(`the list is empty!`);
  } else {
    console.log(`here is the list:`);
    list1.map((item, index) => {
      index++;
      console.log(`${index} - ${item}`);
    });
  }
}

/**
 * prints all the possible commands
 * This function is supposed to lists all the possible commands
 *
 * @returns {void}
 */
function help() {
  console.log(
    "these are the commands:\n\n" +
    " + help : this command will list all the commands for you.\n\n" +
    " + hello : this command greets you, you have to type hello and then your name (ex: 'hello Emile' will return 'hello Emile!') so it will greet you with your name, and it can greet you without typing your name also (ex: 'hello' will return 'hello!'.\n\n" +
    " + quit or exit : this command exit the application.\n\n" +
    " + add : this command add items to the list.\n\n" +
    " + remove : this command removes the last item from the list and if you add after it a number (ex: 'remove 3') it will remove the number of element from the list.\n\n" +
    " + list : this command list all the items in the list.\n\n" +
    " + edit : this command will edit the items on the list (ex: 'edit new text' should change the last task to 'new text') or (ex: 'edit 1 new text' should change the task 1 to 'new text').\n\n" +
    " + check : this command will check the unchecked item from the list (ex: if the item 1 is unchecked type 'check 1' so the item 1 will be checked).\n\n" +
    " + uncheck : this command will uncheck the checked item from the list (ex: if the item 1 is checked type 'uncheck 1' so the item 1 will be unchecked).\n"
  );
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  let fs = require("fs");
  let data = JSON.stringify(objList);
  try {
    fs.writeFileSync(savefile, data);
    console.log(`Saving changes...`);
  } catch (error) {
    console.error(error);
  }

  console.log("Quitting now, goodbye!");
  process.exit();
}

// The following line starts the application
startApp("Emile Kanaan");
