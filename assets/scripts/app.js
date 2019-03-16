let getData = (function() {
  let lists = [
    "Combined Print and E-Book Fiction",
    "Combined Print and E-Book Nonfiction",
    "Hardcover Fiction",
    "Hardcover Nonfiction",
    "Trade Fiction Paperback",
    "Mass Market Paperback",
    "Paperback Nonfiction",
    "E-Book Fiction",
    "E-Book Nonfiction",
    "Hardcover Advice",
    "Paperback Advice",
    "Advice How-To and Miscellaneous",
    "Chapter Books",
    "Childrens Middle Grade",
    "Childrens Middle Grade E-Book",
    "Childrens Middle Grade Hardcover",
    "Childrens Middle Grade Paperback",
    "Paperback Books",
    "Picture Books",
    "Series Books",
    "Young Adult",
    "Young Adult E-Book",
    "Young Adult Hardcover",
    "Young Adult Paperback",
    "Hardcover Graphic Books",
    "Paperback Graphic Books",
    "Manga",
    "Combined Print Fiction",
    "Combined Print Nonfiction",
    "Animals",
    "Audio Fiction",
    "Audio Nonfiction",
    "Business Books",
    "Celebrities",
    "Crime and Punishment",
    "Culture",
    "Education",
    "Espionage",
    "Expeditions Disasters and Adventures",
    "Fashion Manners and Customs",
    "Food and Fitness",
    "Games and Activities",
    "Hardcover Business Books",
    "Health",
    "Humor",
    "Indigenous Americans",
    "Relationships",
    "Paperback Business Books",
    "Family",
    "Hardcover Political Books",
    "Race and Civil Rights",
    "Religion Spirituality and Faith",
    "Science",
    "Sports",
    "Travel"
  ];
  // default options
  const nyt_endpoint = "https://api.nytimes.com/svc/books/v3/";
  // let nyt_listParams = 'lists/2019-01-01/hardcover-fiction.json?';
  const nyt_key = "api-key=jGJGGPp2j3xzgOmII98GpJxgukWxBnS3";
  let listOjb = {};
  lists.map(function(item) {
    listOjb[item] = null;
  });

  let init = function() {
    getBookList("", "");
    initAutoComplete();
  };

  // may delete this since we have the list already
  // function getListNames() {
  //     let url = nyt_endpoint + 'lists/names.json?' + nyt_key;
  //     $.ajax({
  //         url: url
  //     }).then(function(res){
  //         let results = res.results;
  //         let itemList;
  //         // console.log(results);
  //         results.map(function(item){
  //             itemList += "'" + item['list_name'] + "',\n";
  //         });
  //         console.log(itemList);
  //     });
  // }
  // getListNames();

  function getBookList(listDate, listName) {
    let date = listDate != "" ? listDate : "2019-01-01";
    let name = listName != "" ? listName : "hardcover-fiction";
    let url =
      nyt_endpoint + "lists/" + listDate + "/" + name + ".json?" + nyt_key;
    $.ajax({
      url: url
    }).then(function(res) {
      let listTitle = res.results.list_name;
      let books = res.results.books;
      // console.log(books)
      if (books) {
        books.map(function(book) {
          console.log(book.title);
          createCard(book);
        });
      }
    });
  }

  function initAutoComplete() {
    $("input.autocomplete").autocomplete({
      data: listOjb,
      onAutocomplete: initDatePicker
    });
  }
  function initDatePicker() {
    $(".datepicker").datepicker({
      setDefaultDate: true,
      format: "yyyy-mm-dd"
    });
  }
  return {
    init: init,
    getBookList: getBookList
  };
})();
getData.init();

const detailTemplate = `
<div class="card horizontal detail">
  <div class="card-image">
    <img
      class="image"
      src=""
    />
  </div>
  <div class="card-stacked">
    <div class="card-content">
      <p class="title"></p>
      <p class="writer"></p>
    </div>
    <div class="card-action">
      <p class="description"></p>
    </div>
  </div>
</div>
`;

function createCard(book) {
  const detail = $(detailTemplate);
  detail.find(".title").text(book.title);
  detail.find(".writer").text(book.contributor);
  detail.find(".description").text(book.description);
  detail.find(".image").attr("src", book.book_image);
  $(".details").append(detail);
}
