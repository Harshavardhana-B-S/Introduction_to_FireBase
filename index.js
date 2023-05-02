import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
  databaseURL: "https://playground-63fe0-default-rtdb.firebaseio.com",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const input = document.getElementById("input-field");
const addCartBtn = document.getElementById("add-button");
const displayBox = document.getElementById("shopping-list");

addCartBtn.addEventListener("click", () => {
  const inputTxt = input.value;
  push(shoppingListInDB, inputTxt);
  // createItemList(inputTxt);
  clearInputValue();
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    displayBox.innerHTML = "";

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];

      appendItemToShoppingListEl(currentItem);
    }
  } else {
    displayBox.innerHTML = "No items in list... yet";
  }
});
// onValue(shoppingListInDB, function(snapshot) {
//     let itemsArray=Object.values(snapshot.val());

//     clearDuplicateValue();

//     for(let i=0;i<itemsArray.length;i++){

//         let currentItem=itemsArray[i];
//         // let currentItemID=currentItem[0];
//         let currentItemValue=currentItem[1];
//         appendItemToShoppingListEl(currentItemValue);

//     }

//     // console.log(itemsArray);

// })

function clearInputValue() {
  input.value = " ";
}

// function  clearDuplicateValue(){
//     displayBox.innerHTML="";
// }

// function appendItemToShoppingListEl(item) {
//     let itemID = item[0]
//     let itemValue = item[1]

//     let newEl = document.createElement("li")

//     newEl.innerText = itemValue;

//     newEl.addEventListener("click", function() {
//         let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

//         remove(exactLocationOfItemInDB)
//     })

//     displayBox.append(newEl)
// }

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  displayBox.append(newEl);
}
