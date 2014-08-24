angular.module('warungsate.controllers', [])

.controller('AppCtrl', function($scope, Feed, $localStorage, $ionicLoading) {
	$scope.$storage = $localStorage;
	if ($scope.$storage.pages == undefined)
		$scope.$storage.pages = [];

	$scope.refreshing = function (data) {
		$scope.$broadcast('scroll.refreshComplete');
		$ionicLoading.hide();
		console.log(data);
		console.log($.parseHTML(data[0].content));
		$scope.pages = data.reverse();
		$.each($scope.pages, function(i, el) {
			var parse = $.parseHTML(el.content);
			$scope.pages[i].date = parse[0].textContent;
			$scope.pages[i].image_url = parse[2].children[0].src;
			$scope.pages[i].image_thumb_url = parse[10].children[0].src;
			$scope.pages[i].short_description = parse[12].textContent;
			if (_.find($scope.$storage.pages, {publishedDate : el.publishedDate}) == undefined) {
				$scope.$storage.pages.unshift($scope.pages[i]);
			}
		});
	};

	Feed.refresh().then($scope.refreshing);
	$ionicLoading.show({
      template: '<div class="loading"></div>'
    });
	$scope.doRefresh = function() {
		Feed.refresh().then($scope.refreshing);
	}

})

.controller('PageCtrl', function($scope, $stateParams, $localStorage) {
  	console.log($stateParams.id);
  	$scope.title = $stateParams.id;
  	$scope.$storage = $localStorage;
	if ($scope.$storage.pages == undefined)
		$scope.$storage.pages = [];
	$scope.post = _.find($scope.$storage.pages, {title: $scope.title});
});
