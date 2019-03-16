// https://www.goodreads.com/search/index.xml?key=ceicGimSCSzGALUEWdy1Q&q=Ender%27s+Game

let apiUrl = 'https://www.goodreads.com/search/index.xml?key=ceicGimSCSzGALUEWdy1Q&q=The+Terror';
apiUrl = 'https://www.goodreads.com/author/list.xml?key=ceicGimSCSzGALUEWdy1Q&id=721';

$.ajax({
    url: 'http://peterskitchen.co/xml2JSON.php',
    method: 'POST',
    data: { 'url': apiUrl },
    dataType: 'text'
}).then(function(response){
    console.log(response);
    
    
});



