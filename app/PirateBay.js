var cheerio = require( 'cheerio-without-node-native' );

var categories = {
	audio: {
		music: 101,
		audiobooks: 102,
		soundclips: 103,
		flac: 104,
		other: 199
	},
	video: {
		movies: 201,
		moviesdvdr: 202,
		musicvideos: 203,
		movieclips: 204,
		tvshows: 205,
		handheld: 206,
		hdmovies: 207,
		hdtvshows: 208,
		movies3d: 209,
		other: 299
	},
	application: {
		windows: 301,
		mac: 302,
		unix: 303,
		handheld: 304,
		ios: 305,
		android: 306,
		other: 399
	},
	games: {
		pc: 401,
		mac: 402,
		psx: 403,
		xbox360: 404,
		wii: 405,
		handheld: 406,
		ios: 407,
		android: 408,
		other: 499
	},
	porn: {
		movies: 501,
		moviesdvdr: 502,
		pictures: 503,
		games: 504,
		hdmovies: 505,
		movieclips: 506,
		other: 599
	},
	other: {
		ebooks: 601,
		comics: 602,
		pictures: 603,
		covers: 604,
		physibles: 605,
		other: 699
	}
};

var baseURL = 'https://pirateproxy.one';

function parseResults( body ) {
  var parsedResults = [];

  var $ = cheerio.load( body ),
      tableRows = $( '#searchResult tr:not(.header)' );

  if( ! tableRows.length ) return parsedResults;

  tableRows.each(function(){
    parsedResults.push({
      title: $( this ).find( '.detLink' ).text(),
      magnetLink: $( this ).find( 'a[title="Download this torrent using magnet"]' ).attr( 'href' )
    });
  });

  return parsedResults;
}

function top( category ) {
  return new Promise(function (resolve, reject) {
      fetch( baseURL + '/top/' + category, {
        method: 'GET',
      }).then(function( response ){
        response.text().then(function( body ){
          parsedResults = parseResults( body );
          resolve( parsedResults );
        });
      })
  });}

function search( category, query ) {
  return new Promise(function (resolve, reject) {
      fetch( baseURL + '/search/' + query + '/0/99/' + category, {
        method: 'GET',
      }).then(function( response ){
        response.text().then(function( body ){
          parsedResults = parseResults( body );
          resolve( parsedResults );
        });
      })
  });
}

exports.categories = categories;
exports.top = top;
exports.search = search;
