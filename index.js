const getDatas = () => {
  let datas = Object.keys(localStorage).map(function (key) {
    return [String(key), localStorage[key]];
  });

  return datas;
};

const addItemToLocalStorage = (data) => {
  let toBeAdded = {
    value: data.value,
    done: false,
  };

  let nextId = 1;
  let currentDatas = getDatas();

  if (currentDatas.length > 0) {
    currentDatas.forEach((element) => {
      var id = Number(element[0].charAt(2));
      if (id > nextId) {
        nextId = id;
      }
    });
    nextId = nextId + 1;
  }

  toBeAdded.id = `cb${nextId}`;

  localStorage.setItem(`cb${nextId}`, JSON.stringify(toBeAdded));

  return toBeAdded;
};

const addItemToUl = (ulId, item) => {
  let itemId = item.id;
  let itemValue = item.value;
  let isDone = item.done;

  if (!isDone) {
    $(`#${ulId}`).append(`
      <li id="${itemId}" class="ui-state-default">
          <div class="checkbox">
            <input type="checkbox" />
            <label>
              ${itemValue}
            </label>
          </div>
      </li>
          `);
  } else {
    $(ulId).append(
      `<li id="${itemId}" style="margin-top: 10px;">
        <button class="btn btn-outline-dark btn-block" >
          ${itemValue}
        </button>
      </li>
      `
    );
  }
};

const getItems = () => {
  let datas = getDatas();

  datas.map((data) => {
    addItemToUl("toDoList", JSON.parse(data[1]));
  });
};

const printRemainingItems = (datasLength) => {
  let length = datasLength;
  console.log(length);
  $(".count-todos").text(length + " Items Left");
};

const deleteItemFromLocalStorage = (id) => {
  localStorage.removeItem(id);
};

const deleteItemFromUl = (itemId) => {
  $(`#${itemId}`).remove();
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
      let addedItem = addItemToLocalStorage({
        value: value,
        done: false,
      });
      datasLength++;
      addItemToUl("toDoList", addedItem);

      printRemainingItems(datasLength);
      $("#toBeAdded").val(String.empty);
    }
  });

  $("#toDoList").change(function (e) {
    let targetInput = $(e.target);
    if (targetInput.prop("checked")) {
      addItemToUl("#done-items", {
        id: targetInput.parents("li").prop("id"),
        value: targetInput.siblings("label").text().replace(" ", ""),
        done: true,
      });
      datasLength--;

      deleteItemFromUl(targetInput.parents("li").prop("id"));
      printRemainingItems(datasLength);
    }
  });

  $("#done-items").click(function (e) {
    let targetLiId = $(e.target).parents("li").prop("id");
    deleteItemFromUl(targetLiId);
    deleteItemFromLocalStorage(targetLiId);
  });
});
