/**
 * Code created by Brad Westfall, brad@azpixels.com, @bradwestfall
 */

// Utility function for making tweets
var make_tweet = function(v) {

	var tweet = $(document.createElement('div'))
		.addClass('tweet')
		.data('user-id', v.user_id)

	var img = $(document.createElement('img')).attr('src', 'images/' + v.user_id + '.jpg');
	var h3 = $(document.createElement('h3')).text(v.username);
	var p = $(document.createElement('p')).text(v.tweet);

	// Since we are returning something that will be appended to a string, we can't
	// simply return the tweet variable as a jQuery object. You can't append jQuery
	// objects to strings. So we will do prop('outerHTML') to get the "string" version
	// of our object. This is one of many techniques to solve this type of problem
	return tweet.append(img).append(h3).append(p).prop('outerHTML');

}

// When the DOM is ready
$(function() {

	// When the user wants to make a tweet
	$('#post .field a').on('click', function() {

		var tweet_input = $(this).siblings('input');
		var tweet = tweet_input.val();

		if (tweet.length) {

			var tweet_html = make_tweet({
				user_id: 4,
				username: 'Brad Westfall',
				tweet: tweet
			});

			$('#tweets .tweet:first').before(tweet_html);
			tweet_input.val('')

		}

		// Return false on anchor clicks will do stopPropagation() and preventDefault()
		// at the same time
		return false;

	});

	// Click for Get More Tweets. Notice that this way of doing .on will allow
	// the event handler to be bound to all future a.get-more elements even if
	// they are added after the initial DOM is loaded. The HTML right now has no
	// a.get-more elements. See the setTimeout below for more info
	$('#tweets').on('click', 'a.get-more', function() {

		// Hold on to the "this" reference for later use
		var anchor = $(this);

		$.ajax({
			url: 'get_tweets.json',
			cache: false,
			type: 'GET',
			dataType: 'json',
			success: function(json) {

				var tweets = '';

				// Note that we are getting the make_tweet response as a string
				// and appending it to the 'tweets' variable. We wait until we
				// have all of the tweets before we plug it into the DOM (using
				// the 'before' method). This is because interaction with the
				// DOM is very resource expensive.
				$.each(json.tweets, function(k, t) {
					tweets += make_tweet(t)
				});

				$('#tweets .tweet:first').before(tweets);

				// We had to hold on to the reference because of where we are now, the "this"
				// keyword does not refer to the anchor anymore, because we are in a new function
				anchor.remove();

			}
		});

		// Return false on anchor clicks will do stopPropagation() and preventDefault()
		// at the same time
		return false;	

	});

	// Mimic the "get more" link being added after the DOM is loaded. This shows
	// how we can add an anchor to the DOM after the page has loaded and the
	// event handler (above) for that anchor will still work since we set it 
	// up to handle anchors added to the page after the initial DOM. We can
	// pretend this anchor as added as the result of an AJAX request that was
	// polling the server for any new tweets
	setTimeout(function() {

		$(document.createElement('a'))
			.attr('href', '#')
			.addClass('get-more')
			.text('2 More Tweets')
			.prependTo('#tweets');

	}, 1000);

});