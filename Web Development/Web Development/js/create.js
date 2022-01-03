
document.getElementById("frm-create-product").onsubmit = create_product;
       
       function create_product(a){
          
        a.preventDefault();
           //get input from user
           var name = document.getElementById("name").value;
           var description = document.getElementById("description").value;
           var price = document.getElementById("price").value;
           var category_id = document.getElementById("category_id").value;
           var img = document.getElementById("img").value;
           
           //insert data into database

           db.transaction(function(tx){
               var query="INSERT INTO product(name, img, description, price, category_id) VALUES( ? , ?, ?, ?, ?)";
               tx.executeSql(query, [name, img, description,price,category_id], fetch_transaction_success(name),
               transaction_error
               );
           });
        }
         window.onload = get_category
        function get_category() {
            db. transaction( function (tx) {
            var query = "SELECT * FROM category";
            tx.executeSql(query, [], function (tx, result) {
            log("INFO","Get a List of categories successfully");
            add_category_option( result. rows);
            }, transaction_error);       
        });
        }
        function add_category_option(categories){
            var categories_select = document.getElementById("category_id");
            categories_select.innerHTML = `<option value=""> Please select category</option>`
            for (var category of categories){
                categories_select.innerHTML += `<option value ="${category.id}">${category.name}</option>`;
            }
        }
  