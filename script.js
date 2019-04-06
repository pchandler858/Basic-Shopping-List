var button = document.getElementById("enter");
var input = document.getElementById("userInput");
var listUl = document.querySelector("ul");
var listItems = document.querySelectorAll("li");
var lis = listUl.children;

function addDeleteButton(li) {
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.id = "delete";
  deleteBtn.textContent = "Delete";
  li.appendChild(deleteBtn);
}

for (let i = 0; i < lis.length; i++) {
  addDeleteButton(lis[i]);
}

function toggleDone(li) {
  this.classList.toggle("done");
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
    }
  }
}

listUl.addEventListener("click", deleteItem);
button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
