var button = document.getElementById("enter");
var input = document.getElementById("userInput");
var listUl = document.querySelector("ul");
var listItems = document.querySelectorAll("li");
var lis = listUl.children;

function populateList() {
  var itemsArray = JSON.parse(localStorage.getItem("itemsArray")) || [];
  for (var i = 0; i < itemsArray.length; i++) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(itemsArray[i]));
    li.addEventListener("click", toggleDone);
    listUl.appendChild(li);
  }
}

populateList();

function addDeleteButton(li) {
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("data-item", li.innerText);
  li.appendChild(deleteBtn);
}

for (let i = 0; i < lis.length; i++) {
  addDeleteButton(lis[i]);
}

function toggleDone(event) {
  // Check if the event target is the button or the text node inside the li element
  if (event.target.tagName !== "BUTTON") {
    event.target.classList.toggle("done");
  }
}


for (let i = 0; i < lis.length; i++) {
  lis[i].addEventListener("click", toggleDone);
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createListElement();
  }
}

function inputLength() {
  return input.value.length;
}

function createListElement() {
  var ul = document.getElementsByTagName("ul")[0];
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(input.value));
  li.addEventListener("click", toggleDone);
  addDeleteButton(li);
  ul.appendChild(li);
  input.value = "";

  // Save the list item to local storage if it's not empty
  if (li.innerText.trim() !== "") {
    // Remove the "Delete" button text from the li element
    var itemText = li.innerText.replace("Delete", "").trim();
    var itemsArray = JSON.parse(localStorage.getItem("itemsArray")) || [];
    itemsArray.push(itemText);
    localStorage.setItem("itemsArray", JSON.stringify(itemsArray));
  }
}

function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}

function deleteItem(event) {
  if (event.target.tagName == "BUTTON") {
    if (event.target.className == "delete") {
      let li = event.target.parentNode;
      let ul = li.parentNode;
      ul.removeChild(li);

      // Remove the item from local storage
      var itemsArray = JSON.parse(localStorage.getItem("itemsArray")) || [];
      var itemText = event.target.getAttribute("data-item");
      var itemIndex = itemsArray.indexOf(itemText);
      if (itemIndex !== -1) {
        itemsArray.splice(itemIndex, 1);
        localStorage.setItem("itemsArray", JSON.stringify(itemsArray));
      }
    }
  }
}

listUl.addEventListener("click", deleteItem);
button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
li.addEventListener("click", toggleDone);

