let getData = function(){
    let nyt_endpoint = 'https://api.nytimes.com/svc/books/v3/';
    let nyt_listParams = 'lists/2019-01-01/hardcover-fiction.json?';
    let nyt_key = 'api-key=jGJGGPp2j3xzgOmII98GpJxgukWxBnS3'

    function getListNames(){
        let url = nyt_endpoint + 'lists/names.json?' + nyt_key;
        $.ajax({
            url: url
        }).then(function(res){
            let results = res.results;
            let itemList;
            // console.log(results);
            results.map(function(item){
                itemList += "'" + item['list_name'] + "',\n";
            });
            console.log(itemList);
        });
    }
    // getListNames();



    function getBookList(listDate, listName) {
        let date = listDate != '' ? listDate : '2019-01-01';
        let name = listName != '' ? listName : 'hardcover-fiction';
        let url = nyt_endpoint + 'lists/' + listDate + '/' + name + '.json?' + nyt_key;
        $.ajax({
            url: url
        }).then(function(res){
            let listTitle = res.results.list_name;
            let books = res.results.books;
            console.log(listTitle);
            if (books) {
                books.map(function(book){
                    console.log(book.title);
                });
            }
        });
    }
    getBookList('','');
}
getData();  