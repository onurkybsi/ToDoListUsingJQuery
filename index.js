$("document").ready(function () {
  var toDoList = $("#toDoList").html();

  $("#addTodo").click(function () {
    if ($("#toBeAdded").val().trim()) {
      toDoList += `
        <li class="ui-state-default">
            <div class="checkbox">
                <label>
                    <input type="checkbox" value="" />
                    ${$("#toBeAdded").val()}
                </label>
            </div>
        </li>
            `;
      $("#toDoList").html(toDoList);
    }
  });
});
