'use strict';
// Projects controller

angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$sce', '$location', '$window', '$timeout', 'Authentication', 'Projects', 'FileUploader', 'linkify',
	function($scope, $stateParams, $sce, $location, $window, $timeout, Authentication, Projects, FileUploader, linkify ) {
		$scope.authentication = Authentication;

		// Create file uploader instance
		$scope.uploader = new FileUploader({
			url: '/api/projects/picture'
		});

		$scope.uploaderC = new FileUploader({
			url: '/api/projects/picture'
		});

		// Create new Project
		$scope.create = function() {
			// Create new Project object
			//please note the next segment of code it will not only combine standards but also subjects
			//the main function of the this next large block if if statements is do that
			//when a project has been created the overall standards and subjects are calculated
			//so that they can be searched by those subjects and standards
			//most of the if statements are to check if either that element exists or if it is not undefined
			//in the case of checking undefined typeof allows us to preform this check without causing a crash if the array doesnt exist

			$scope.essentialDetails.overallStandards = '';

			$scope.essentialDetails.overallSubjects = '';
			$scope.essentialDetails.overallSubjects += $scope.essentialDetails.litDetails.subjectName + ' , ';
			$scope.essentialDetails.overallSubjects += $scope.essentialDetails.mathDetails.subjectName + ' , ';
			$scope.essentialDetails.overallSubjects += $scope.essentialDetails.scienceDetails.subjectName + ' , ';
			$scope.essentialDetails.overallSubjects += $scope.essentialDetails.ssDetails.subjectName + ' , ';

			if($scope.essentialDetails.litDetails.standards !== undefined){
				$scope.essentialDetails.overallStandards += $scope.essentialDetails.litDetails.standards + ', ';
			}
			if($scope.essentialDetails.mathDetails.standards !== undefined){
				$scope.essentialDetails.overallStandards += $scope.essentialDetails.mathDetails.standards + ', ';
			}
			if($scope.essentialDetails.scienceDetails.standards !== undefined){
				$scope.essentialDetails.overallStandards += $scope.essentialDetails.scienceDetails.standards + ', ';
			}
			if($scope.essentialDetails.ssDetails.standards !== undefined){
				$scope.essentialDetails.overallStandards += $scope.essentialDetails.ssDetails.standards + ', ';
			}
			if(typeof $scope.essentialDetails.otherSubject !== 'undefined'){
				if(typeof $scope.essentialDetails.otherSubject[0] !== 'undefined'){
					if($scope.essentialDetails.otherSubject[0].subjectName !== undefined){
						$scope.essentialDetails.overallSubjects += $scope.essentialDetails.otherSubject[0].subjectName + ' , ';
					}
					if($scope.essentialDetails.otherSubject[0].standards !== undefined){
						$scope.essentialDetails.overallStandards += $scope.essentialDetails.otherSubject[0].standards + ', ';
					}
				}
				if(typeof $scope.essentialDetails.otherSubject[1] !== 'undefined'){
					if($scope.essentialDetails.otherSubject[1].subjectName !== undefined){
						$scope.essentialDetails.overallSubjects += $scope.essentialDetails.otherSubject[1].subjectName + ' , ';
					}
					if($scope.essentialDetails.otherSubject[1].standards !== undefined){
						$scope.essentialDetails.overallStandards += $scope.essentialDetails.otherSubject[1].standards + ', ';
					}
				}
				if(typeof $scope.essentialDetails.otherSubject[2] !== 'undefined'){
					if($scope.essentialDetails.otherSubject[2].subjectName !== undefined){
						$scope.essentialDetails.overallSubjects += $scope.essentialDetails.otherSubject[2].subjectName + ' , ';
					}
					if($scope.essentialDetails.otherSubject[2].standards !== undefined){
						$scope.essentialDetails.overallStandards += $scope.essentialDetails.otherSubject[2].standards + ', ';
					}
				}
				if(typeof $scope.essentialDetails.otherSubject[3] !== 'undefined'){
					if($scope.essentialDetails.otherSubject[3].subjectName !== undefined){
						$scope.essentialDetails.overallSubjects += $scope.essentialDetails.otherSubject[3].subjectName + ' , ';
					}
					if($scope.essentialDetails.otherSubject[3].standards !== undefined){
						$scope.essentialDetails.overallStandards += $scope.essentialDetails.otherSubject[3].standards + ', ';
					}
				}
				if(typeof $scope.essentialDetails.otherSubject[4] !== 'undefined'){
					if($scope.essentialDetails.otherSubject[4].subjectName !== undefined){
						$scope.essentialDetails.overallSubjects += $scope.essentialDetails.otherSubject[4].subjectName + ' , ';
					}
					if($scope.essentialDetails.otherSubject[4].standards !== undefined){
						$scope.essentialDetails.overallStandards += $scope.essentialDetails.otherSubject[4].standards + ', ';
					}
				}

			}
			//the slice is used to clean up so that the last standard does not have a quote and a space
			//we do not need it for projects since overall projects will never be used to display to the user
			$scope.essentialDetails.overallStandards = $scope.essentialDetails.overallStandards.slice(0, -2);


			var project = new Projects ({
				name: this.name,
				created: this.created,
				user: this.user,
				status: this.status,
				isPublic: this.isPublic,
				minGrade: this.minGrade,
				maxGrade: this.maxGrade,
				ask: this.ask,
				imagine: this.imagine,
				essentialDetails: this.essentialDetails,
				rating: null
			});



		$scope.additionalSubjects = ['Dance', 'English Language Development', 'Gifted', 'Health Education', 'Music', 'Physical Education',
		'Special Skills', 'Technology', 'Theatre', 'Visual Art'];

			// Redirect after save
			project.$save(function(response) {

				// Start upload of picture

				if($scope.uploaderC.queue.length > 0) {

					$scope.uploaderC.queue[0].url = '/api/projects/picture/' + response._id;
					$scope.uploaderC.uploadAll();
				}


				// Clear form fields
				$scope.name = '';


				$location.path('projects/' + response._id);


			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});


		};

		// Remove existing Project
		$scope.remove = function( project ) {
			if ( project ) { project.$remove();

				for (var i in $scope.projects ) {
					if ($scope.projects [i] === project ) {
						$scope.projects.splice(i, 1);
					}
				}
			} else {
				$scope.project.$remove(function() {
					$location.path('projects');
				});
			}
		};

		$scope.CombineStandards = function(){
			//please note it will not only combine standards but also subjects
			//the combine standards function's main goal is to be used in the edit project page
			//when a project has been edited the overall standards and subjects are calculated
			//so that they can be searched by those subjects and standards
			//most of the if statements are to check if either that element exists or if it is not undefined
			//in the case of checking undefined typeof allows us to preform this check without causing a crash if the array doesnt exist
			$scope.project.essentialDetails.overallStandards = '';

			$scope.project.essentialDetails.overallSubjects = '';
			$scope.project.essentialDetails.overallSubjects += $scope.project.essentialDetails.litDetails[0].subjectName + ' , ';
			$scope.project.essentialDetails.overallSubjects += $scope.project.essentialDetails.mathDetails[0].subjectName + ' , ';
			$scope.project.essentialDetails.overallSubjects += $scope.project.essentialDetails.scienceDetails[0].subjectName + ' , ';
			$scope.project.essentialDetails.overallSubjects += $scope.project.essentialDetails.ssDetails[0].subjectName + ' , ';

			if($scope.project.essentialDetails.litDetails[0].standards !== ''){
				$scope.project.essentialDetails.overallStandards += $scope.project.essentialDetails.litDetails[0].standards + ', ';
			}
			if($scope.project.essentialDetails.mathDetails[0].standards !== ''){
				$scope.project.essentialDetails.overallStandards += $scope.project.essentialDetails.mathDetails[0].standards + ', ';
			}
			if($scope.project.essentialDetails.scienceDetails[0].standards !== ''){
				$scope.project.essentialDetails.overallStandards += $scope.project.essentialDetails.scienceDetails[0].standards + ', ';
			}
			if($scope.project.essentialDetails.ssDetails[0].standards !== ''){
				$scope.project.essentialDetails.overallStandards += $scope.project.essentialDetails.ssDetails[0].standards + ', ';
			}
			if(typeof $scope.project.essentialDetails.otherSubject !== 'undefined'){
				if(typeof $scope.project.essentialDetails.otherSubject[0] !== 'undefined'){
					if($scope.project.essentialDetails.otherSubject[0].subjectName !== ''){
						$scope.project.essentialDetails.overallSubjects += $scope.project.essentialDetails.otherSubject[0].subjectName + ' , ';
					}
					if($scope.project.essentialDetails.otherSubject[0].standards !== ''){
						$scope.project.essentialDetails.overallStandards += $scope.project.essentialDetails.otherSubject[0].standards + ', ';
					}
				}
				if(typeof $scope.project.essentialDetails.otherSubject[1] !== 'undefined'){
					if($scope.project.essentialDetails.otherSubject[1].subjectName !== ''){
						$scope.project.essentialDetails.overallSubjects += $scope.project.essentialDetails.otherSubject[1].subjectName + ' , ';
					}
					if($scope.project.essentialDetails.otherSubject[1].standards !== ''){
						$scope.project.essentialDetails.overallStandards += $scope.project.essentialDetails.otherSubject[1].standards + ', ';
					}
				}
				if(typeof $scope.project.essentialDetails.otherSubject[2] !== 'undefined'){
					if($scope.project.essentialDetails.otherSubject[2].subjectName !== ''){
						$scope.project.essentialDetails.overallSubjects += $scope.project.essentialDetails.otherSubject[2].subjectName + ' , ';
					}
					if($scope.project.essentialDetails.otherSubject[2].standards !== ''){
						$scope.project.essentialDetails.overallStandards += $scope.project.essentialDetails.otherSubject[2].standards + ', ';
					}
				}
				if(typeof $scope.project.essentialDetails.otherSubject[3] !== 'undefined'){
					if($scope.project.essentialDetails.otherSubject[3].subjectName !== ''){
						$scope.project.essentialDetails.overallSubjects += $scope.project.essentialDetails.otherSubject[3].subjectName + ' , ';
					}
					if($scope.project.essentialDetails.otherSubject[3].standards !== ''){
						$scope.project.essentialDetails.overallStandards += $scope.project.essentialDetails.otherSubject[3].standards + ', ';
					}
				}
				if(typeof $scope.project.essentialDetails.otherSubject[4] !== 'undefined'){
					if($scope.project.essentialDetails.otherSubject[4].subjectName !== ''){
						$scope.project.essentialDetails.overallSubjects += $scope.project.essentialDetails.otherSubject[4].subjectName + ' , ';
					}
					if($scope.project.essentialDetails.otherSubject[4].standards !== ''){
						$scope.project.essentialDetails.overallStandards += $scope.project.essentialDetails.otherSubject[4].standards + ', ';
					}
				}

			}
			
			//the slice is used to clean up so that the last standard does not have a quote and a space
			//we do not need it for projects since overall projects will never be used to display to the user
			$scope.project.essentialDetails.overallStandards = $scope.project.essentialDetails.overallStandards.slice(0, -2);
		};

		// Update existing Project
		$scope.update = function() {
            console.log('In $scope.update');

			var project = $scope.project;

			project.imagine.plan = '';

			project.$update(function() {

				$location.path('projects/' + project._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			if ($scope.uploader.queue.length > 0) {
				$scope.uploader.queue[0].url = '/api/projects/picture/' + project._id;
				$scope.uploader.uploadAll();
			}
		};

		// Find a list of Projects
		$scope.find = function() {
			$scope.projects = Projects.query();
		};

		// Find existing Project
		$scope.findOne = function() {
			$scope.project = Projects.get({
				projectId: $stateParams.projectId
			});

		};

		// Called after the user selected a new picture file
		$scope.uploader.onAfterAddingFile = function (fileItem) {
			if ($window.FileReader) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL(fileItem._file);

				fileReader.onload = function (fileReaderEvent) {
					$timeout(function () {
						$scope.project.imagine.plan = fileReaderEvent.target.result;
					}, 0);
				};
			}
		};

		$scope.linkify = function(link) {
			//The linkify function parses text and creates hyperlinks out of URL's anything with www. is valid
			//the linkify function is only used in the view project page
			var text = linkify.normal(link);
			if(text) {
				//this is for every browser but firefox (and will only execute for compatible browsers)
				text = text.replace(/<a href="www./gi, '<a href="http://www.');
				//this line is specificly for linkify for the firefox browser
				text = text.replace(/<a target="_blank" href="www./gi, '<a target="_blank" href="http://www.');
			}
			//console.log(text); //used for debugging
			return $sce.trustAsHtml(text);
		};

		$scope.uploaderC.onAfterAddingFile = function (fileItem) {
			if ($window.FileReader) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL(fileItem._file);

				fileReader.onload = function (fileReaderEvent) {
					$timeout(function () {
						$scope.imageURL = fileReaderEvent.target.result;
					}, 0);
				};
			}
		};

/*	-------------------------------------Star Rating Stuff-------------------------------------- */

		/*BROKEN: Animation doesn't work after the first time the user rates a project.
			Broke at some point during development after the feature was done, and it's
			too late to go back in and fix it.
		*/

		//an array containing the name of the glyphicon to use for each star
		$scope.glyphs = new Array(
			'gold glyphicon glyphicon-star-empty',
			'gold glyphicon glyphicon-star-empty',
			'gold glyphicon glyphicon-star-empty',
			'gold glyphicon glyphicon-star-empty',
			'gold glyphicon glyphicon-star-empty'
		);

		/*
			Runs when a star glyphicon is hovered into. It sets all the stars up to the current one
			to have the filled-in star glyphicon.
		*/
		$scope.rating_hover = function(num){
			for(var i = 0; i < num; i++){
				$scope.glyphs[i] = 'gold glyphicon glyphicon-star';
			}
			for(i = num; i < 5; i++){
				$scope.glyphs[i] = 'gold glyphicon glyphicon-star-empty';
			}
		};

		//Runs when a star glyphicon is hovered out of. Resets the  stars' highlighing to the current rating
		$scope.reset_hover = function(){
			$scope.rating_hover($scope.rating);
		};

		//Prints out user's current rating of the project
		$scope.getMyRating = function(){

			if ($scope.project.rating && $scope.project.rating.ratings ){
				var rater = $scope.project.rating.ratings.filter(isRater)[0];
				console.log(rater);
				if (typeof rater === 'undefined'){
					$scope.rating = 0;	//current rating
					return 'You haven\'t yet rated this project. Give it a couple of stars?';
				}
				$scope.rating = rater.num;
				$scope.reset_hover();
				return ('Your currently rate this project at ' + rater.num + ' stars');
			}
			$scope.rating = 0;	//current rating
			return 'This project has not yet been rated. Give it a couple of stars?';

		};

        // Function to find the current rater
        var isRater = function(value){
			return value.reviewer === $scope.authentication.user._id;
        };

		//Changes the user's rating of the project
		$scope.rate = function(){
			console.log('In $scope.rate');
				if(!$scope.project.rating){
				$scope.project.rating = {		//Update the project's rating entry in schema
					ratings : [ // Create ratings array with  first rating and reviewer
						{
							num: $scope.rating,
							reviewer: $scope.authentication.user._id
						}
					],
					avg_rating : $scope.rating // For first instance, avg = only rating
				};
			} else {
                var rater = $scope.project.rating.ratings.filter(isRater)[0]; // Check if current user already has submitted a rating
                var length = $scope.project.rating.ratings.length;  // Hold current length
				var rateToRemove = 0;

								// Variable to hold resulting length after comptation
                var newLength = length + 1;

								// If length is 0, the average should be 0
                if(length === 0)
                {
                    $scope.project.rating.avg_rating = 0;
                }

				// If current user has already rated, delete previous rating
				if(typeof rater !== 'undefined') {
                    rateToRemove = rater.num;
                    var rateIndex = $scope.project.rating.ratings.indexOf(rater);
                    $scope.project.rating.ratings.splice(rateIndex, 1);
                    newLength -= 1;
                }

				// Add new rating to total rating and recalculaate average
				$scope.project.rating.avg_rating = ($scope.project.rating.avg_rating * length + $scope.rating - rateToRemove)/(newLength);

				// Push new rating object into project schema
				$scope.project.rating.ratings.push({
						num: $scope.rating,
						reviewer: $scope.authentication.user._id
				});
			}

			// Update project
			$scope.update();


		};



	}
]);
