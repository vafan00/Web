
document.getElementById("frm-create-category").onsubmit = create_category;
       
function create_category(a){
   
 a.preventDefault();
    //get input from user
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;

    
    //insert data into database

    db.transaction(function(tx){
        var query="INSERT INTO category(name, description) VALUES( ? , ?)";
        tx.executeSql(query, [name, description], fetch_transaction_success(name),
        transaction_error
        );
    });
 }

