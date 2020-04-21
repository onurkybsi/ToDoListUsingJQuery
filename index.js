$("document").ready(function () {
  $("#addTodo").click(function () {
    if ($("#toBeAdded").val().trim()) {
      $("#toDoList").append(`
      <li class="ui-state-default">
          <div class="checkbox">
              <label>
                  <input type="checkbox" value="" />
                  ${$("#toBeAdded").val()}
              </label>
          </div>
      </li>
          `);
    }
  });
});
