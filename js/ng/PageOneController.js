
ngApp.controller('PageOneController', ['CONFIG', '$scope', '$location', '$window','$http', function(CONFIG, $scope, $location, $window, $http) {

  console.log('My Application');

  $scope.filterParams = {
    active : false,
    searchText : null
  }
  var textFilter = [];
  var myListBackUp = []

  $scope.starRating1 = 4;
  $scope.starRating2 = 5;
  $scope.starRating3 = 2;
  $scope.hoverRating1 = $scope.hoverRating2 = $scope.hoverRating3 = 0;

  $scope.click1 = function (param) {
    console.log('Click(' + param + ')');
  };

  $scope.mouseHover1 = function (param) {
    console.log('mouseHover(' + param + ')');
    $scope.hoverRating1 = param;
  };

  $scope.mouseLeave1 = function (param) {
    console.log('mouseLeave(' + param + ')');
    $scope.hoverRating1 = param + '*';
  };

  $scope.click2 = function (param) {
    console.log('Click');
  };

  $scope.mouseHover2 = function (param) {
    console.log('mouseHover(' + param + ')');
    $scope.hoverRating1 = param;
  };

  $scope.mouseLeave2 = function (param) {
    console.log('mouseLeave(' + param + ')');
    $scope.hoverRating2 = param + '*';
  };

  $scope.click3 = function (param) {
    console.log('Click');
  };

  $scope.mouseHover3 = function (param) {
    console.log('mouseHover(' + param + ')');
    $scope.hoverRating3 = param;
  };

  $scope.mouseLeave3 = function (param) {
    console.log('mouseLeave(' + param + ')');
    $scope.hoverRating3 = param + '*';
  };

/********************************************************** GETTING ALL TRACKS ***************************************************************/
  $http({
    method : "GET",
    url : "https://104.197.128.152:8000/v1/tracks"
  }).then(function mySucces(response) {
    // console.log(response);
    console.log('GET ALL TRACKS',response.data);
    $scope.trackList = response.data.results;
    // console.log('songs',$scope.trackList );
    myListBackUp = angular.copy($scope.trackList)

  }, function myError(response) {
    // console.log(response);
  });



/**********************************************************SEARCH TRACK WITH TITLE**********************************************************/
  $http({
    method : "GET",
    url : "https://104.197.128.152:8000/v1/tracks?title=tack1"                     // Hymn%20for%20the%20weekend NOT FOUND , THEREFORE USED title= track1
  }).then(function mySucces(response) {                                           //HYMM FOR WEEKEND NOT FOUND IN FIRST PAGE
    console.log('SEARCH WITH TRACK',response);


  }, function myError(response) {
    console.log(response);
  });






/****************************************SEARCH TRACKS WITH TITLE************************************/
$http({
  method : "GET",
  url : "https://104.197.128.152:8000/v1/tracks?title=Hymn%20for%20the%20weekend"                //HYMM FOR WEEKEND NOT FOUND IN FIRST PAGE
}).then(function mySucces(response) {
  console.log('SEARCH',response);


}, function myError(response) {
  console.log(response);
});




/*****************************************EDIT TRACK RECORD**************************************/
$http({
  method : "POST",
  url : "https://104.197.128.152:8000/v1/tracks/48",                             // ID 1 IS NOT FOUND SO USED ID 48
  data : {
    "id": 1,
    "title": "animals",
    "rating": 4.5,
    "genres": [
      1
    ]
  }
}).then(function mySucces(response) {
  console.log('EDIT',response);
}, function myError(response) {
  console.log(response);
});


/****************************************SEARCH MUSIC FILTER******************************************/
  $scope.findMusic = function(){
    // alert("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    // console.log($scope.filterParams.searchText);
    $scope.filterParams.active = true;

    $scope.trackList = angular.copy(myListBackUp);

    if($scope.filterParams.searchText == ''){
      $scope.trackList.forEach(function(el, index){
        textFilter[index] = el;
      });
    }

    if ($scope.filterParams.searchText) {
      // console.log($scope.filterParams.searchText);
      textFilter = $scope.trackList.filter(function(el, index){
        if((el.title.search(new RegExp($scope.filterParams.searchText, 'i'))>-1)){
          // console.log('found');
          return el;
        }
      });
    }
    $scope.trackList = textFilter.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    });
  }


  $scope.resetFilter = function(){
    // alert('hiiiiiii+++++++++++');
    $scope.filterParams.active = false;
    $scope.filterParams.searchText = null;
    $scope.trackList = angular.copy(myListBackUp);
  }




/**************************************ADD NEW TRACK**********************************************/
$scope.addNewTrack = function(){
  // alert('add new Track')
  $http({
    method : "POST",
    url : "http://104.197.128.152:8000/v1/tracks",
    data : {
      "title": "animals",
      "rating": 4.5,
      "genres": [
        1
      ]
    }
  }).then(function mySucces(response) {
    console.log('Created Record',response);
    $scope.trackList.push(response.data);
    myListBackUp = angular.copy($scope.trackList);
    $scope.trackList = angular.copy(myListBackUp);
  }, function myError(response) {
    console.log(response);
  });



}


  /**************************************GO TO SECOND PAGE**********************************************/
    $scope.goToGenrePage = function(){
         alert('go to genre page')
         $location.path('/page2')
    }

}]);
