window.onload = get_account();

function get_account(){
   db.transaction(function(tx){
    var query= "SELECT a.id, a.username, a.password, a.firstname, a.lastname, a.birthday, a.phone, a.street, a.status FROM account a";
    tx.executeSql(query, [], function(tx,result){
        log("INFO", "Get a list of account successfully.");
        show_account(result.rows)
    },transaction_error);
   });
}

function show_account(accounts) {
    var account_list = document.getElementById("account-list"); 
    for (var account of accounts)
    {
        account_list.innerHTML += `
        <tr id="account-list-item-${account.id}">
        <td class="text-start" id="account-list-name-${account.id}">${account.id}</td>
        <td>${account.username}</td>
        <td>${account.password}</td>
        <td>${account.firstname}</td>
        <td>${account.lastname}</td>
        <td>${account.birthday}</td>
        <td>${account.phone}</td>
        <td>${account.street}</td>
        <td>${account.status}</td>
        <td>
            <button onclick="delete_account(this.id)" id="${account.id}" class="btn btn-danger btn-sm"> Delete</button>
        </td>
    </tr>
    `;
        
    }
}
function delete_account(id){
db.transaction(function(tx){
var query="DELETE FROM account WHERE id = ? "
    tx.executeSql(query,[id], function(tx,result){
    var account_row = document.getElementById(`account-list-item-${id}`);
    var account_name = document.getElementById(`account-list-name-${id}`);
    var message = `Delete "${account_name.innerText}" successfully`;
    account_row.outerHTML="";
    log(`INFO`, message)
    alert(message)
    })
});
}