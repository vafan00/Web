window.onload = get_product;

function get_product(){
   db.transaction(function(tx){
    var query= "SELECT p.id, p.name, c.name AS category_name FROM product p ,category c WHERE p.category_id = c.id";
    tx.executeSql(query, [], function(tx,result){
        log("INFO", "Get a list of products successfully.");
        show_product(result.rows)
    },transaction_error);
   });
}

function show_product(products) {
    var product_list = document.getElementById("product-list"); 
    for (var product of products)
    {
        product_list.innerHTML += `
        <tr id="product-list-item-${product.id}">
        <td class="text-start" id="product-list-name-${product.id}">${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category_name}</td>
        <td>
            <button onclick="delete_product(this.id)" id="${product.id}" class="btn btn-danger btn-sm"> Delete</button>
        </td>
    </tr>
    `;
        
    }
}
function delete_product(id){
db.transaction(function(tx){
var query="DELETE FROM product WHERE id = ? "
    tx.executeSql(query,[id], function(tx,result){
    var product_row = document.getElementById(`product-list-item-${id}`);
    var product_name = document.getElementById(`product-list-name-${id}`);
    var message = `Delete "${product_name.innerText}" successfully`;
    product_row.outerHTML="";
    log(`INFO`, message)
    alert(message)
    })
});
}