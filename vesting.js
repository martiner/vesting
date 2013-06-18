function Vesting(date, vestingLengthF, optionsNumberF) {
	this.effectiveDate = new Date(date.getTime());
	this.startDate = new Date(date.getTime());
	this.startDate.setFullYear(date.getFullYear() - 1);
	this.vestingLength = vestingLengthF;
	this.optionsNumber = optionsNumberF;

	this.monthsDiff = function (start, end) {
		var months;
		months = (end.getFullYear() - start.getFullYear()) * 12;
		months -= start.getMonth() + 1;
		months += end.getMonth();
		return months <= 0 ? 0 : months;
	}

	this.fullMonths = function() {
		return this.monthsDiff(this.startDate, this.effectiveDate);
	};

	this.totalMonths = function() {
		return this.monthsDiff(this.startDate, this.vestingEnds());
	};

	this.vestingEnds = function() {
		var end = new Date(this.startDate.getTime());
		end.setFullYear(this.startDate.getFullYear() + this.vestingLength);
		return end;
	};

	this.vested = function() {
		var v = Math.round(this.optionsNumber / this.totalMonths() * this.fullMonths());
console.log(v);
		return v;
	};

	this.vestedPct = function() {
		return Math.round(100 / this.totalMonths() * this.fullMonths());
	};

}

angular.module("vesting", ['ui.date','ui.bootstrap'])
	.controller("VestingCtrl", function ($scope) {
		$scope.vest = new Vesting(new Date(), 4, 1000);
	})
;


