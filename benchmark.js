// Here is the framework for a simple milliseconds timer
var start = new Date().getTime();

// ... Code Here ...

var end = new Date().getTime();
var time = end - start;
console.log(time);








// 3307 milliseconds
var tweet = $(document.createElement('div'))
	.addClass('tweet')
	.data('tweet-id', t.tweet_id)
	.data('user-id', t.user_id)

var img = $(document.createElement('img')).attr('src', 'images/' + t.user_id + '.jpg');
var h3 = $(document.createElement('h3')).text(t.username);
var p = $(document.createElement('p')).text(t.tweet);



// 3556 milliseconds
var tweet = $('<div />', {
	'class': 'tweet',
	'data-tweet-id': t.tweet_id,
	'data-user-id': t.user_id
})

var img = $('<img />', {
	'src': 'images/' + t.user_id + '.jpg'
});

var h3 = $('<h3 />', {
	'text': t.username
});

var p = $('<p />', {
	'text': t.tweet
});



// 3654 milliseconds
var tweet = $('<div></div>')
	.addClass('tweet')
	.data('tweet-id', t.tweet_id)
	.data('user-id', t.user_id)

var img = $('<img>').attr('src', 'images/' + t.user_id + '.jpg');
var h3 = $('<h3></h3>').text(t.username);
var p = $('<p></p>').text(t.tweet);



// 4680 milliseconds
var tweet = $('<div class="tweet" data-tweet-id="' + t.tweet_id + '" data-user_id="' + t.user_id + '"></div>');
var img = $('<img src="images/' + t.user_id + '.jpg">');
var h3 = $('<h3>' + t.username + '</h3>');
var p = $('<p>' + t.tweet + '</p>');