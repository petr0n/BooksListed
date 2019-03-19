

let bookApp = (function () {
	// get list from json file
	const mockApiUrl = 'http://peterskitchen.co/xml2JSON.php';
	

	// console.log(apiLibrary.getAuthorBooks(72));
	let lists = [];
	function getListNames(){
		$.get('../assets/scripts/best-sellers-list.json')
			.done(function(list){
				lists = list['data'];
			});
	}
		console.log(lists);
	
	let init = function () {
		getListNames();
		initAutoComplete();
		// apiLibrary.getBookDetails('Dune');
	};
	
	function initAutoComplete() {
		let listOjb = {}
		lists.map(function (item) { listOjb[item] = null; });
		$("input.autocomplete").autocomplete({
			data: listOjb,
			minLength: 0,
			autoClose: false,
			onAutocomplete: initDatePicker
		});
	}

	function initDatePicker(val) {
		$('.datepicker-wrapper').slideDown(200, function(){
			// console.log(val);
			$(".datepicker").datepicker({
				setDefaultDate: true,
				autoClose: false,
				format: 'yyyy-mm-dd',
				onSelect: function(date){
					getBookListFromAPI(date,val);
				}
			});
		});
	}

	function getBookListFromAPI(listDate, listName) {
		const nyt_endpoint = "https://api.nytimes.com/svc/books/v3/";
		const nyt_key = "api-key=jGJGGPp2j3xzgOmII98GpJxgukWxBnS3";
		let date = listDate != "" ? listDate : "2019-01-01";
		let name = listName != "" ? listName : "hardcover-fiction";
		let url =
			nyt_endpoint + "lists/" + listDate + "/" + name + ".json?" + nyt_key;
		$.ajax({
			url: url
		}).then(function (res) {
			// let listTitle = res.results.list_name;
			let books = res.results.books;
			console.log(books);
			if (books) {
				$('section .search-wrapper').addClass('list-selected');
				$('.mainlogo').addClass('small'); 
				$('section.book-list').slideDown(300, function(){
					books.map(function (book) {
						// console.log(book.title);
						createCard(book);
					});
				});
			}
		});
	}

	
	function createCard(book) {
		const bookListTemplate = `
    <div class="card detail row hoverable">
      <div class="card-image col s12 m3 l2 size ">
        <img
          class="image"
          src=""
        />
      </div>
      <div class="card-stacked col s12 m9 l10 ">
        <div class="card-content book-info">
          <p class="title"></p>
          <p class="writer"></p>
        </div>
        <div class="card-action">
          <p class="description"></p>
        </div>
      </div>
    </div>
		`;	
		const detail = $(bookListTemplate);
		detail.find(".title").text(book.title);
		detail.find(".writer").text(book.contributor);
		detail.find(".description").text(book.description);
		detail.find(".image").attr("src", book.book_image);
		
		detail.on('click', function(e) {
			e.preventDefault();

		});
		$(".book-list-wrapper").append(detail);
		// // console.log(book);
		// detail.on('click', function () {
		// 	const publishDate = $("<p>").text(book.published_date);
		// 	detail.find(".book-info").append(publishDate);
		// 	// console.log("click")
	
		// });
	}

	function bookDetail(title){
		let apiUrl = 'https://www.goodreads.com/search/index.xml?key=ceicGimSCSzGALUEWdy1Q&q=' + title;
		// let bookObj = {};
		$.ajax({
			url: mockApiUrl,
			method: 'POST',
			data: { 'url': apiUrl },
			dataType: 'text'
		}).then(function(response){
			let bookJSON = JSON.parse(response);
			let thisBook = bookJSON.search.results.work[0];
			console.log('authorId: ' + thisBook.best_book.author.id);
			console.log('bookId: ' + thisBook.id);
		});
	}

	function createReviews(title){
		let apiUrl = 'https://www.goodreads.com/book/show.xml?key=ceicGimSCSzGALUEWdy1Q&title=' + title;
		// let bookReviewObj = {};
		$.ajax({
			url: mockApiUrl,
			method: 'POST',
			data: { 'url': apiUrl },
			dataType: 'text'
		}).then(function(response){
			reviewJSON = JSON.parse(response);
			console.log('reviewJSON:');
			console.log(reviewJSON.author.books.book);
		});
	}
	
	function createCarousel(authorId){
		let apiUrl = 'https://www.goodreads.com/author/list.xml?key=ceicGimSCSzGALUEWdy1Q&id=' + authorId;
		$.ajax({
			url: mockApiUrl,
			method: 'POST',
			data: { 'url': apiUrl },
			dataType: 'text'
		}).done(function(response){
			let booksJSON = JSON.parse(response);
			let bookList = booksJSON.author.books.book;
			console.log('booksJSON:');
			console.log(bookList);
		});
	}




	return {
		init: init
	};


})();
bookApp.init();

