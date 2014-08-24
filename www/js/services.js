angular.module('warungsate.services', [])

.service('Feed', function($http, $q, $log) {
	var def = $q.defer();
	var url = 'http://www.warungsatekamu.org/category/saat-teduh-kamu/feed/';
	$http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=JSON_CALLBACK&q=' + encodeURIComponent(url))
		.success(function (data) {
			def.resolve(data.responseData.feed.entries);
		})
		.error(function (msg, code) {
			def.reject(msg);
			$log.error(msg, code);
		});
	return {
		refresh: function() {
			return def.promise;
		}
	}
});