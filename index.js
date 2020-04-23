$("document").ready(function () {
  let liCount = $("#toDoList").children("li").length;

  $("#addTodo").click(function () {
    if ($("#toBeAdded").val().trim()) {
      $("#toDoList").append(`
      <li id="cb${liCount + 1}" class="ui-state-default">
          <div class="checkbox">
            <input type="checkbox" />

            <label>
              ${$("#toBeAdded").val()}
            </label>
          </div>
      </li>
          `);

      liCount++;

      $("#toBeAdded").val(String.empty);

      $(".count-todos").text(liCount + " Items Left");
    }
  });

  $("#checkAll").click(function () {
    $("input[type=checkbox]").prop("checked", true);
    // $("#toDoList").empty();
  });

  $("input[type=checkbox]").on("click", function () {
    console.log($("input[type=checkbox]"));
  });
});
