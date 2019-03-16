// https://www.goodreads.com/search/index.xml?key=ceicGimSCSzGALUEWdy1Q&q=Ender%27s+Game

let apiUrl = 'https://www.goodreads.com/search/index.xml?key=';
let apiKey = 'ceicGimSCSzGALUEWdy1Q';

// http://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/show/BOOK_ID.xml?key=YOUR_KEY
$.ajax({
    url: 'http://cors-anywhere.herokuapp.com/' + apiUrl + apiKey + '&q=The+Terror',
    method: 'POST',
    dataType: 'text'
}).then(function(response){
    
    // xmlString = (new XMLSerializer()).serializeToString(response);
    
    xml = response.replace(/(\r\n|\n|\r|[ ]{2,})/gm,"");
    //console.log(xml);
    
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml,"text/xml");
    // //var jsonText = JSON.stringify(xmlToJson(response));
    //console.log(xmlDoc);
    console.log(xmlToJson(xmlDoc));
    $('#json').html(JSON.stringify(xmlToJson(xmlDoc)));
    // console.log(JSON.stringify(xmlToJson(response)));
    // xmlDoc = $.parseXML(response),
    // $response = $(xmlDoc);
    // console.log($response);

    //parser = new DOMParser();
    // xmlDoc = parser.parseFromString(response,"text/xml");
    // console.log(xmlDoc);
});
/// Changes XML to JSON
// Modified version from here: http://davidwalsh.name/convert-xml-json
function xmlToJson(xml) {
    // Create the return object
    let obj = {};
  
    if (xml.nodeType === 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let j = 0; j < xml.attributes.length; j += 1) {
          const attribute = xml.attributes.item(j);
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) { // text
      obj = xml.nodeValue;
    }
  
    // do children
    // If just one text node inside
    if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
      obj = xml.childNodes[0].nodeValue;
    } else if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i += 1) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
        if (typeof (obj[nodeName]) === 'undefined') {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof (obj[nodeName].push) === 'undefined') {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  };