

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
"Travel"];
	let init = function () {
		initAutoComplete();
		// apiLibrary.getBookDetails('Dune');
		// getBookReviews(888628);
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

	function getBookListFromAPI(listDate, listName) {
		const nyt_endpoint = "https://api.nytimes.com/svc/books/v3/";
		const nyt_key = "api-key=jGJGGPp2j3xzgOmII98GpJxgukWxBnS3";
		let date = listDate != "" ? listDate : "2019-01-01";
		let name = listName != "" ? listName : "hardcover-fiction";
		let url = nyt_endpoint + "lists/" + listDate + "/" + name + ".json?" + nyt_key;
		$.ajax({
			url: url
		}).then(function (res) {
			// let listTitle = res.results.list_name;
			let books = res.results.books;
			// console.log(res.results);
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
		const bookListWrapperEl = $(".book-list-wrapper");
		const bookListTemplate = `<div class="card detail row hoverable">
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
		</div>`;
		//before filling the list empty it
		bookListWrapperEl.empty();
		const detail = $(bookListTemplate);
		detail.find('.card.detail').attr('data-bookTitle', book.title);
		detail.find(".title").text(book.title);
		detail.find(".writer").text(book.contributor);
		detail.find(".description").text(book.description);
		detail.find(".image").attr("src", book.book_image);
		
		// console.log(book);
		detail.on('click', function(e) {
			e.preventDefault();
			// createBookDetailCard(book.title);
			switchToDetail(book.title);
		});
		bookListWrapperEl.append(detail);
	}

	function switchToDetail(title){
		$('.book-list').slideUp(200, function(){
			$('.book-detail').slideDown(200, function(){
				console.log('switchToDetail');
				getBookDetail(title);
			});
		});
	}

	function getBookDetail(title){
		let apiUrl = 'https://www.goodreads.com/search/index.xml?key=ceicGimSCSzGALUEWdy1Q&q=' + title;
		$.ajax({
			url: mockApiUrl,
			method: 'POST',
			data: { 'url': apiUrl },
			dataType: 'text'
		}).then(function(response){
			let bookJSON = JSON.parse(response);
			let thisBook = bookJSON.search.results.work[0];
			console.log(thisBook);
			console.log('authorId: ' + thisBook.best_book.author.id);
			console.log('bookId: ' + thisBook.best_book.id);
			getAuthorBooks(thisBook.best_book.author.id);
			getBookReviews(thisBook.best_book.id);

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
			// console.log('reviewJSON:');
			// console.log(reviewJSON);
			// 
			// let description = book.description;
			// let img = book.image_url;
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
			// console.log('booksJSON:');
			carouselEl.empty();
            for (var i = 0; i < 20; i++) {
				console.log(bookList[i]);
				let imgUrl = bookList[i].image_url;
				if (!imgUrl.includes('nophoto')) {
					var bookLink = $("<a>");
					bookLink.attr('href', bookList[i].link);
					bookLink.addClass("carousel-item");
					//sugBook.addClass("waves-effect waves-light btn");
					let coverImg = $("<img>");
					coverImg.attr("src", bookList[i].image_url);
					bookLink.append(coverImg);
					$("#suggest").append(bookLink);
				}
			}
			carouselEl.carousel({
				numVisible: 7,
				duration: 500,
				indicators: true
			});

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
		});
	}



	return {
		init: init
	};


}());
bookApp.init();

