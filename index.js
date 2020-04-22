$("document").ready(function () {
  $("#addTodo").click(function () {
    if ($("#toBeAdded").val().trim()) {
      $("#toDoList").append(`
      <li class="ui-state-default">
          <div class="checkbox">
              <label>
                  <input type="checkbox" />
                  ${$("#toBeAdded").val()}
              </label>
          </div>
      </li>
          `);
    }
  });

  $("#checkAll").click(function () {
    $("input[type=checkbox]").prop("checked", true);
    $("#toDoList").empty();
  });

  $("input[type=checkbox]").change(function(){
    if($(this).is(':checked')){
      $(this).parentsUntil("ul").remove();  
    }
  });
});
