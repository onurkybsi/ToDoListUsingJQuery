const getDatas = () => {
  let datas = Object.keys(localStorage).map(function (key) {
    return [String(key), localStorage[key]];
  });

  return datas;
};

const loadContent = (data) => {
  $("#toDoList").append(`
      <li id="${data[0]}" class="ui-state-default">
          <div class="checkbox">
            <input type="checkbox" />
            <label>
              ${data[1]}
            </label>
          </div>
      </li>
          `);
};

$("document").ready(function () {
  let datas = getDatas();
  let datasLength = datas.length;
  $(".count-todos").text(datasLength + " Items Left");

  if (datasLength !== 0) {
    datas.map((d) => {
      loadContent(d);
      datasLength++;
    });
  }

  $("#addTodo").click(function () {
    if ($("#toBeAdded").val().trim()) {
      loadContent(["cb" + String(datasLength + 1), $("#toBeAdded").val()]);
      localStorage.setItem(
        "cb" + String(datasLength + 1),
        $("#toBeAdded").val()
      );

      datasLength++;

      $("#toBeAdded").val(String.empty);
      $(".count-todos").text(datasLength + " Items Left");
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
      datasLength--;
      $(".count-todos").text(datasLength + " Items Left");
    } else {
      
    }
  });
});
