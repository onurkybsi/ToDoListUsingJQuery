const getDatas = () => {
  let datas = Object.keys(localStorage).map(function (key) {
    return [String(key), localStorage[key]];
  });

  return datas;
};

const addItemToLocalStorage = (data) => {
  let nextId = 1;
  let currentDatas = getDatas();
  console.log(data);

  if(currentDatas.length > 0){
    currentDatas.forEach((element) => {
      var id = Number(element[0].charAt(2));
      if (id > nextId) {
        nextId = id;
      }
    });
    nextId = nextId + 1;
  }

  localStorage.setItem(`cb${nextId}`, data);

  return nextId;
};

const addItemToUl = (ulId, itemId, itemLabel) => {
  $(`#${ulId}`).append(`
      <li id="${itemId}" class="ui-state-default">
          <div class="checkbox">
            <input type="checkbox" />
            <label>
              ${itemLabel}
            </label>
          </div>
      </li>
          `);
};

const getItems = () => {
  let datas = getDatas();

  datas.map((data) => {
    addItemToUl("toDoList", data[0], JSON.parse(data[1]).value)
  });
};

const printRemainingItems = (datasLength) => {
  $(".count-todos").text(datasLength + " Items Left");
};

$("document").ready(function () {
  let datas = getDatas();
  let datasLength = datas.length;
  printRemainingItems(datasLength);

  if (datasLength !== 0) {
    getItems();
  }

  $("#addTodo").click(function () {
    let value = $("#toBeAdded").val();
    if (value.trim()) {
      let addedId = addItemToLocalStorage(JSON.stringify({ 
      "value": value,
      "done": false
    }));

      addItemToUl("toDoList",  addedId, value);

      printRemainingItems(datasLength + 1);
      $("#toBeAdded").val(String.empty);
    }
  });

  $("#toDoList").change(function (e) {
    let targetInput = $(e.target);
    if (targetInput.prop("checked")) {
      $("#done-items").append(
        `<li style="margin-top: 10px;">
          <button class="btn btn-outline-dark btn-block" >
            ${targetInput.siblings("label").text().replace(" ", "")}
          </button>
        </li>
        `
      );

      targetInput.parentsUntil("li").remove();
      printRemainingItems(datasLength - 1);
    }
  });
});
