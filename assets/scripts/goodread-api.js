// https://www.goodreads.com/search/index.xml?key=ceicGimSCSzGALUEWdy1Q&q=Ender%27s+Game

apiUrl = 'https://www.goodreads.com/author/list.xml?key=ceicGimSCSzGALUEWdy1Q&id=721';


function getBookDetails(title){
    
    let t = title != '' ? title : 'Cujo';
    let apiUrl = 'https://www.goodreads.com/search/index.xml?key=ceicGimSCSzGALUEWdy1Q&q=' + t;
    $.ajax({
        url: 'http://peterskitchen.co/xml2JSON.php',
        method: 'POST',
        data: { 'url': apiUrl },
        dataType: 'text'
    }).then(function(response){
        console.log(response);
        
        
    });
}


function getAuthorBooks(id){
    let t = title != '' ? title : 720; // John Grisham
    $.ajax({
        url: 'http://peterskitchen.co/xml2JSON.php',
        method: 'POST',
        data: { 'url': apiUrl },
        dataType: 'text'
    }).then(function(response){
        console.log(response);
        
        
    });
}



