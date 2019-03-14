// https://www.goodreads.com/search/index.xml?key=ceicGimSCSzGALUEWdy1Q&q=Ender%27s+Game

let apiUrl = 'https://www.goodreads.com/search/index.xml?key=';
let apiKey = 'ceicGimSCSzGALUEWdy1Q';

$.ajax({
    url: apiUrl + apiKey + 'q='
}).then(function(response){
    let  parser, xmlDoc;

    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text,"text/xml");
    console.log(xmlDoc);
});