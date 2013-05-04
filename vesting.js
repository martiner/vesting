angular.module("vesting", ['ui.date','ui.bootstrap'])
.controller("VestingCtrl", function ($scope) {
	$scope.effectiveDate = new Date();
	$scope.startDate = new Date();
	$scope.startDate.setFullYear($scope.startDate.getFullYear() - 1);
	$scope.vestingLength = 4;
	$scope.optionsNumber = 1000;

	$scope.fullMonths = function() { 
		return monthsDiff($scope.startDate, $scope.effectiveDate);
	};

	$scope.totalMonths = function() { 
		return monthsDiff($scope.startDate, $scope.vestingEnds());
	};

	$scope.vestingEnds = function() {
		var end = new Date($scope.startDate.getTime());
		end.setFullYear($scope.startDate.getFullYear() + $scope.vestingLength);
		return end;
	};

	$scope.vested = function() {
		return Math.round($scope.optionsNumber / $scope.totalMonths() * $scope.fullMonths());
	};

	$scope.vestedPct = function() {
		return Math.round(100 / $scope.totalMonths() * $scope.fullMonths());
	};
})
;


function monthsDiff(start, end) {
	var months;
	months = (end.getFullYear() - start.getFullYear()) * 12;
	months -= start.getMonth() + 1;
	months += end.getMonth();
	return months <= 0 ? 0 : months;
}
