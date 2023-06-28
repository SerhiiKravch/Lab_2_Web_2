
let search = "";
let divider = `<li><hr class="dropdown-divider"></li>`;

async function create_element() {

    let target = location.pathname.substring(1);
    target = target.substring(0 , target.length - 1);

    if (target === "in_progress_project") {
        modal_delete_in_progress_projects();
        return;
    }

    switch (target) {

        case "customer": $("#customer_title").text("Додавання нового замовника");
                         $("#customer_yes").text("Додати");
                         break;
        case "performer":$("#performer_title").text("Додавання нового виконавця");
                         $("#performer_yes").text("Додати");
                         break;
        case "project":  $("#project_title").text("Додавання нового проекту");
                         $("#project_yes").text("Додати");
                         prepare_customers_for_dropdown();
                         prepare_performers_for_dropdown();
                         break;

    }

    $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(true)`);
    $(`#modal_${target}s`).modal('show');

}

// ...............................................................................................

async function edit_element (element) {

    let item;
    let target = location.pathname.substring(1);
    target = target.substring(0, target.length - 1);

    let id = parseInt($(element).closest("tr").children().first().text());

    $(`#${target}_title`).text("Редагування даних");
    $(`#${target}_yes`).text("Оновити дані");

    switch  (target) {

        case "customer": item = get_customer_by_id(id);
                        $("#customer_budget").val(item.budget);
                        $("#customer_name").val(item.name);
                        break;
        case "performer": item = get_performer_by_id(id);
                        $("#performer_count_workers").val(item.count_workers);
                        $("#performer_name").val(item.name);
                        $("#performer_experience").val(item.experience);
                        break;
        case "project": item = get_project_by_id(id);
                        $("#project_name").val(item.name);
                        prepare_customers_for_dropdown();
                        prepare_executors_for_dropdown();
                        break;

    }

    $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(false, ${id})`);
    $(`#modal_${target}s`).modal('show');
 
}

// ...............................................................................................

function find_element (element) {

    let search = $(element).val();
    let target = location.pathname.substring(1);
    let search_list = [];
 
    switch (target) {

        case "customers": search_list = find_customers(search); break;
        case "performers": search_list = find_performers(search); break;
        case "projects":  search_list = find_projects(search);  break;
        case "in_progress_projects":  search_list =find_projects(search, true);  break;

    }

    display_data(search_list);

}

// ...............................................................................................

function delete_element (item) {

    let button;
    let message;
    let target = location.pathname.substring(1);
    let id = parseInt($(item).closest("tr").children().first().text());
 
    switch (target) {
 
       case "projects":
          message = "Ви дійсно хочете видалити цей проект";
          button = "Видалити";
          break;
 
       case "customers":
          message = "Ви дійсно хочете видалити цього замовника";
          button = "Видалити";
          break;
 
       case "performers":
          message = "Ви дійсно хочете видалити цього виконавця";
          button = "Видалити";
          break;    
       case "in_progress_projects":
           message = "Ви дійсно хочете видалити інформацію про цей проект на виконанні"
           button = "Видалити";
           break;
    }

    modal_confirm_create("Повідомлення",
                        `${message}?`,
                        `${button}`,
                        "Відміна",
                        "delete", id);

   $(`#modal_confirm`).modal('show');

}

// ...............................................................................................

function display_data (search_list) {

    let data;
    let additional_attr = "";
    let target = location.pathname.substring(1);

    switch (target) {


        case "projects": data = get_projects_list();
                         break;
        case "customers": data = get_customers_list();
                          break;
        case "performers": data = get_performers_list();
                          break;
    }

    if (search_list) { data = search_list; }

    clear_table(data.length === 0);

    $("#total_count").text(`Загальна кількість: ${data.length}`);

    eval(`display_${target}_data(${additional_attr}data)`);

}

// ...............................................................................................

async function display_customers_data (data) {

    for (let element of data) {
       
       let block =
      `<tr>
          <td> <span class="m-2">${element.id}</span> </td>
          <td>${element.name}</td>
          <td> <span class="m-2">${element.budget}</span> </td>
          <td>${await prepare_related_projects_of("customer", element.name)}</td>
          <td>${get_icon_code()}</td>
       </tr>`;
 
       $("#table").append(block);
 
    }
 }

 async function display_performers_data (data) {

    for (let element of data) {
       
       let block =
      `<tr>
          <td> <span class="m-2">${element.id}</span> </td>
          <td>${element.name}</td>
          <td class="fit"> <span class="m-2">${element.count_workers}</span> </td>
          <td class="fit"> <span class="m-2">${element.experience}</span> </td>
          <td>${await prepare_related_projects_of("performer", element.name)}</td>
          <td>${get_icon_code()}</td>
       </tr>`;
 
       $("#table").append(block);
 
    }
 }
 
 function display_projects_data (data, is_in_progress) {

    for (let element of data) {
    
       let block = 
      `<tr>
          <td> <span class="m-2">${element.id}</span> </td>
          <td>${element.name}</td>
          <td>${element.customer}</td>
          <td>${element.performer}</td>
          <td>${get_icon_code(is_in_progress)}</td>
       </tr>`;
 
       $("#table").append(block);
 
    }
 }

 // ...............................................................................................

 function modal_confirm() {

    let page = location.pathname.substring(1);
 
    let target = $("#modal_confirm").attr("target");
    let src = $("#modal_confirm").attr("src");
 
    switch (target) {
 
       case "delete":
          let id = parseInt(src);
          page = page.substr(0, page.length - 1);
          eval(`remove_${page}(${id})`);
          display_data();
          save_data();
          break;
       
       case "delete_in_progress_projects":
          in_progress_projects_list = [];
          display_data();
          save_data();
          break;
 
    }
 }

 function modal_confirm_create (title, message, yes, no, target, src) {

    $(`#modal_confirm_title`).text(title);
    $(`#modal_confirm_message`).text(message);
    $(`#modal_confirm_yes`).text(yes);
    $(`#modal_confirm_no`).text(no);
    $("#modal_confirm").attr("target", target);
    $("#modal_confirm").attr("src", src);
 
 }

 // ...............................................................................................
 
 function modal_update_customers (added_new, id) {

    let name    = $("#customer_name").val();
    let budget  = $("#customer_budget").val();
 
    if (added_new) { add_customer(name, budget);      }
    else           { edit_customer(id, name, budget); }
 
    display_data();
    clear_input();
    save_data(); 

 }

 function modal_update_performers (added_new, id) {

    let name           = $("#performer_name").val();
    let count_workers = $("#performer_count_workers").val();
    let experience     = $("#performer_experience").val();
 
    if (added_new) { add_performer(name, experience, count_workers );      }
    else           { edit_performer(id, name, experience, count_workers); }
 
    display_data();
    clear_input();
    save_data();
 
 }

 //!!!!!!!!!!!!!!!

 function modal_update_projects (added_new, id) {

    let name      = $("#project_name").val();
    let customer  = $("#project_customer").text();
    let performer = $("#project_performer").text();
 
    customer  = customer  === "Виберіть замовника" ? "Не встановлено" : customer;
    performer = performer === "Виберіть виконавця" ? "Не встановлено" : performer;
 
    if (added_new) { add_project(name, customer, performer);      }
    else           { edit_project(id, name, customer, performer); }
 
    display_data();
    clear_input();
    save_data();
 
 }

// ...............................................................................................

 // ...............................................................................................

 function set_customer (element) {

    let customer = $(element).text();
 
    customer = customer === ". . ." ? "Виберіть замовника" : customer;
 
    $("#project_customer").text(customer);
 
 }

 function set_performer (element) {

    let performer = $(element).text();
 
    performer = performer === ". . ." ? "Виберіть виконавця" : performer;
 
    $("#project_performer").text(performer);
 
 }

// ...............................................................................................

 function prepare_customers_for_dropdown() {

    let list = $("#project_customers_list");
 
    get_data("customers").then((result) => {
 
       if (result.length != 0) {
          
          list.find("li:not(:first)").remove();
          list.append(divider);
 
          for (let item of result) {
 
                list.append(`<li><span class="dropdown-item" ` +
                            `onclick="set_customer(this)">${item.name}</span></li>`);
          }
       }
 
    });
 }

 function prepare_performers_for_dropdown() {

    let list = $("#project_performers_list");
 
    get_data("performers").then((result) => {
 
       if (result.length != 0) {
          
          list.find("li:not(:first)").remove();
          list.append(divider);
 
          for (let item of result) {
 
                list.append(`<li><span class="dropdown-item" ` +
                            `onclick="set_performer(this)">${item.name}</span></li>`);
          }
       }
 
    });
 }
 
 // ...............................................................................................

 
async function prepare_related_projects_of(target, name) {

    let list = "";
 
    // Отримуємо інформацію про усіх лікарів
    await get_data("projects").then((result) => {
       
       if (result !== null && result.length !== 0) {
          
          for (let item of result) {
             
             if (item[target] === name) {
                
                list += `<li style="margin-left: 10px">${item.name}</li>`;
             }
          }
       }
 
    });
 
    return list;
 }
 
  // ...............................................................................................

  function clear_table (table_is_empty) {

    let target = location.pathname.substring(1);
    let span = (target === "projects") ? 5 :
               (target === "customers") ? 5 : 6;
 
    $("#table tbody").empty();
 
    let block =
   `<tr class="text-center text-secondary" id="table_empty">
       <td colspan="${span}"> <span class="mx-5 fs-4">Немає даних для відображення</span> </td>
    </tr>`;
 
    if (table_is_empty) { $("#table tbody").append(block); }
    else                { $("#table_empty").remove();      }
 
 }
 
 function clear_input() {

    let target = location.pathname.substring(1);
 
    switch (target) {
       
       case "projects":  $("#project_name").val("");
                         $("#project_customer").text("Виберіть замовника");
                         $("#project_performer").text("Виберіть виконавця");
                         $("#project_customers_list").find("li:not(:first)").remove();
                         $("#project_performers_list").find("li:not(:first)").remove();
                         break;
       case "customers": $("#customer_name").val("");
                         $("#customer_budget").val("");
                         break;
       case "performers": $("#performer_name").val("");
                         $("#performer_count_workers").val("");
                         $("#performer_experience").val("");
                         break;
    }
 }
 
 // ...............................................................................................

 function get_icon_code (only_delete) {

    const icon_edit = 
   `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-pencil-square btn-control mx-1" viewBox="0 0 16 16" onclick="edit_element(this)">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>`;
 
    const icon_delete = 
   `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-trash btn-control mx-1" viewBox="0 0 16 16" onclick="delete_element(this)">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>`;
 
    const icons =
   `<span class="d-flex mx-2">
       ${!only_delete ? icon_edit : ""}${icon_delete}
    </span>`;
 
    return icons;
 
 }
 
 // ...............................................................................................
 
 function delay (time) {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
          resolve();
       }, time);
    });
 }
 
 // ...............................................................................................
 
 $(document).on("hidden.bs.modal", () => { clear_input(); });
 
 jQuery(async () => {
 
    await load_data();
    display_data();
 
 });

 