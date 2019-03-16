
var key='ceicGimSCSzGALUEWdy1Q&q=Jaws';

fetch('http://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=' + key, {
    mode: 'no-cors'
}).then(response => response.text())
.then(xmlString => $.parseXML(xmlString))
.then(data => console.log(data));