/**
 * Project 2: Feedr
 * ====
 *
 * See the README.md for instructions
 */

(function() {

	var header = document.querySelector('header')
	var container = document.querySelector('#container')
	var state = {
		loading: false,
		newsSources: [
	  	{
	  		name: 'Mashable',
	  		url: 'https://crossorigin.me/http://mashable.com/stories.json',
	  		selected: false
	  	},
	  	{
	  		name: 'Reddit',
	  		url: 'https://www.reddit.com/top.json',
	  		selected: false
	  	}
		],
		articles: []
	}
	
	renderHeader(state, header)

	function renderHeader(data, into){
	   into.innerHTML = ` 
		   <section class="wrapper">
		      <a href="#"><h1>Feedr</h1></a>
		      <nav>
		        <section id="search">
		          <input type="text" name="name" value="">
		          <div id="search-icon"><img src="images/search.png" alt="" /></div>
		        </section>
		        <ul>
		          <li><a href="#">News Source: <span>Source Name</span></a>
		          	<ul>			
						${data.newsSources.map((item) => {
							return `<li>${renderSourceListItem(item)}</li>`
						}).join('')}
					</ul>
		          </li>
		        </ul>
		      </nav>
		      <div class="clearfix"></div>
		    </section>
	    `
	}

	function renderSourceListItem(item) {
		return `
			<a href="${item.url}" class="news-source">${item.name}</a>
		`
	}

	function renderLoading(data, into) {
		into.innerHTML = `
			<div id="pop-up" class="loader"></div>
		`
	}

	function renderNews(data, into) {
		into.innerHTML = `
			<section id="main" class="wrapper">
				<h1>news to come</h1>
			</section>
		`
	}

	//use a delegate instead?
	function fetchPosts(event){
		event.preventDefault()
		renderLoading(state, container)
		fetch(event.currentTarget.href).then((response) => {
			return response.json()
		}).then((dataAsJson) => {
			renderNews(state, container)
			console.log(dataAsJson)
		})
	}

	Array.from(document.querySelectorAll('.news-source')).forEach(function(source){
	  source.addEventListener('click', fetchPosts)
	})

})()
