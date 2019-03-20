

let bookApp = (function () {
	const mockApiUrl = 'http://peterskitchen.co/xml2JSON.php';

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
	lists.sort();
	let init = function () {
		initAutoComplete();
		$('.fixed-action-btn').floatingActionButton();
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
				autoClose: true,
				format: 'yyyy-mm-dd',
				onSelect: function(date){
					getBookListFromAPI(date,val);
				}
			});
		});
	}

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
				autoClose: true,
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
		let url = nyt_endpoint + "lists/" + listDate + "/" + name + ".json?" + nyt_key;
		$.ajax({
			url: url
		}).then(function (res) {
			let books = res.results.books;
			// console.log(books);
			if (books) {
				$('section .search-wrapper').addClass('list-selected');
				$('.mainlogo').addClass('small'); 
				$('section.book-list').slideDown(300, function(){
					$(".book-list-wrapper").empty(); //before filling - empty it
					books.map(function (book) {
						createCard(book);
					});
				});
			}
		});
	}

	
	function createCard(book) {
		const bookListWrapperEl = $(".book-list-wrapper");
		const bookListTemplate = `<div class="card detail row hoverable">
		<div class="card-image col s12 m4 l4 size ">
		<img
			class="image"
			src=""
		/>
		</div>
		<div class="card-stacked col s12 m8 l8">
		<div class="card-content book-info">
			<h3 class="title"></h3>
			<p class="writer"></p>
		</div>
		<div class="card-action">
			<p class="description"></p>
		</div>
		</div>
		</div>`;	
		const detail = $(bookListTemplate);
		detail.find(".title").text(book.title);
		detail.find(".writer").text(book.contributor);
		detail.find(".description").text(book.description);
		detail.find(".image").attr("src", book.book_image);
		
		// console.log(book);
		detail.on('click', function(e) {
			e.preventDefault();
			// createBookDetailCard(book.title);
			switchToDetail(book.primary_isbn10, book);
		});
		bookListWrapperEl.append(detail);
	}

	function switchToDetail(isbn, bookDetail){
		$('.book-list').slideUp(200, function(){
			$('.book-detail').slideDown(200, function(){
				// console.log('switchToDetail: ' + isbn);
				displayBookInfo(bookDetail);
				getBookDetail(isbn);
			});
		});
	}

	function displayBookInfo(bookInfo) {
		console.log(bookInfo);
		$(".book-title").text(bookInfo.title);
		$(".book-writer").text(bookInfo.contributor);
		$(".book-image").attr("src",bookInfo.book_image);
	}

	function getBookDetail(isbn){
		showButton();
		let apiUrl = 'https://www.goodreads.com/book/isbn/' + isbn + '?key=ceicGimSCSzGALUEWdy1Q';
		//let apiUrl = 'https://www.goodreads.com/search/index.xml?key=ceicGimSCSzGALUEWdy1Q&q=' + encodeURI(title);
		$.ajax({
			url: mockApiUrl,
			method: 'POST',
			data: { 'url': apiUrl },
			dataType: 'text'
		}).then(function(response){
			let bookJSON = JSON.parse(response);
			let thisBook = bookJSON.book;
			console.log('thisBook');
			console.log(thisBook);
			if (thisBook) {
				let bookId = thisBook.id;
				let authorId = thisBook.authors.author.id;
				let publishDate = `${thisBook.publication_month}/${thisBook.publication_day}/${thisBook.publication_year}`;
				console.log('authorId: ' + bookId);
				console.log('bookId: ' + bookId);
				getAuthorBooks(authorId);
				getAuthorInfo(authorId);
				getBookReviews(bookId);
				$('.book-summary').html(thisBook.description);
				$(".publish-date").text("Publish date: " + publishDate);
				$('.no-book').remove();
			} else {
				// can't find book
				$('.book-detail .card').html('<h3 class="no-book">No book found! Oh no!</h3>');
			}
		});
	}

	function getAuthorInfo(authorId){
		let apiUrl = 'https://www.goodreads.com/author/show/' + authorId + '?format=xml&key=ceicGimSCSzGALUEWdy1Q';
		// let bookReviewObj = {};
		$.ajax({
			url: mockApiUrl,
			method: 'POST',
			data: { 'url': apiUrl },
			dataType: 'text'
		}).then(function(response){
			authorJSON = JSON.parse(response);
			// console.log('getAuthorInfo:');
			// console.log('about: ' + authorJSON.author.about);
			// console.log('image: ' + authorJSON.author.image_url);
			$('.book-detail .bio').html(authorJSON.author.about);
			if(authorJSON.author.image_url){ 
				let authorImg = authorJSON.author.image_url;
				$(".authorImg").attr('src', authorImg);
			}
		});
	}


	function getAuthorBooks(authorId) {
		let carouselEl = $('.carousel');
		let apiUrl = 'https://www.goodreads.com/author/list.xml?key=ceicGimSCSzGALUEWdy1Q&id=' + authorId;
		$.ajax({
			url: mockApiUrl,
			method: 'POST',
			data: { 'url': apiUrl },
			dataType: 'text'
		}).done(function(response){
			let booksJSON = JSON.parse(response);
			let bookList = booksJSON.author.books.book;
			console.log('getAuthorBooks:');
			console.log(booksJSON);
			carouselEl.empty();
			let listLen = 20;
			if (bookList.length != undefined) {
				if (bookList.length < 20) {
					listLen = bookList.length;
				}
				for (var i = 0; i < listLen; i++) {
					let imgUrl = bookList[i].image_url;
					var bookLink = $("<a>");
					bookLink.attr('href', bookList[i].link).attr("target", "_blank").addClass("carousel-item");
					if (!imgUrl.includes('nophoto')) {
						let coverImg = $("<img>");
						coverImg.attr("src", imgUrl);
						bookLink.append(coverImg);
					} else {
						bookLink.text(bookList[i].title)
					}
					carouselEl.append(bookLink);
				}
				carouselEl.carousel({
					numVisible: 7,
					duration: 500,
					indicators: true
				});
			} else {
				carouselEl.html('<p>Can\'t find any other books by this author.');
			}

		});
	}


	function getBookReviews(bookId){
		let apiUrl = 'https://www.goodreads.com/book/show/' + bookId + '.xml?key=ceicGimSCSzGALUEWdy1Q&text_only=true';
		// let bookReviewObj = {};
		$.ajax({
			url: mockApiUrl,
			method: 'POST',
			data: { 'url': apiUrl },
			dataType: 'text'
		}).then(function(response){
			reviewJSON = JSON.parse(response);
			console.log('getBookReviews.reviews_widget ');
			console.log(reviewJSON.book);
			$('.book-reviews').html(reviewJSON.book.reviews_widget);
		});
	}
	
	$('.backToList').on('click', goBackToList);
	$('.backToStart').on('click', goBackToStart);

	function goBackToList(){
		$('.book-detail').slideUp(200, function(){
			$('.book-list').slideDown(200, function(){
				console.log('goBackToList');
			});
		})
	}
	function goBackToStart(){
		$('.book-list').slideUp(200, function(){
			console.log('goBackToStart');
			$('.search-wrapper').removeClass('list-selected');
		});
	}
	function showButton() {
		$('.fixed-action-btn').toggle();
	}


	return {
		init: init
	};


}());
bookApp.init();

