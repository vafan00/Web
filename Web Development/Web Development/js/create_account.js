document.getElementById("frm-create-account").onsubmit = create_category;
       
function create_category(a){
   
 a.preventDefault();
    //get input from user
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var firstname = document.getElementById("first-name").value;
    var lastname = document.getElementById("last-name").value;
    var birthday = document.getElementById("birth-day").value;
    var phone = document.getElementById("phone").value;
    var street = document.getElementById("street").value;
    var status = document.getElementById("status").value;

    
    //insert data into database

    db.transaction(function(tx){
        var query="INSERT INTO account(username, password, firstname, lastname, birthday, phone, street, status) VALUES( ? , ?, ?, ?, ?, ?, ?, ?)";
        tx.executeSql(query, [username, password, firstname, lastname, birthday, phone, street, status], fetch_transaction_success(username),
        transaction_error
        );
    });
 }
