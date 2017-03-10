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
