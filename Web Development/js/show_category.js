window.onload = get_category;

function get_category(){
   db.transaction(function(tx){
    var query= "SELECT p.id, p.name, p.description FROM category p";
    tx.executeSql(query, [], function(tx,result){
        log("INFO", "Get a list of category successfully.");
        show_category(result.rows)
    },transaction_error);
   });
}

function show_category(categories) {
    var category_list = document.getElementById("category-list"); 
    for (var category of categories)
    {
        category_list.innerHTML += `
        <tr id="category-list-item-${category.id}">
        <td class="text-start" id="category-list-name-${category.id}">${category.id}</td>
        <td>${category.name}</td>
        <td>${category.description}</td>
        <td>
            <button onclick="delete_category(this.id)" id="${category.id}" class="btn btn-danger btn-sm"> Delete</button>
        </td>
    </tr>
    `;
        
    }
}
function delete_category(id){
db.transaction(function(tx){
var query="DELETE FROM category WHERE id = ? "
    tx.executeSql(query,[id], function(tx,result){
    var category_row = document.getElementById(`category-list-item-${id}`);
    var category_name = document.getElementById(`category-list-name-${id}`);
    var message = `Delete "${category_name.innerText}" successfully`;
    category_row.outerHTML="";
    log(`INFO`, message)
    alert(message)
    })
});
}