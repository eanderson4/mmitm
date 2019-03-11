// Initialize and add the map
function initMap() {
  // The location of Uluru
  // Hidden valley 40.392969, -105.656709
  //var hiddenValleyLatLng = {lat: 40.392969, lng: -105.656709};

  // Loveland 39.680397, -105.897376
  // var lovelandLatLng = {lat:39.680397, lng: -105.897376};
  // Northern colorado view
  // ul corner
  // 40.887825, -106.865978
  // 
  // br corner
  // 40.029519, -105.278527
  // 39.622867, -105.324985
  var ulCorner={lat:40.887825,lng:-106.865978};
  var brCorner={lat:39.622867,lng: -105.324985};

  var northerColoradoBounds= new google.maps.LatLngBounds();

  northerColoradoBounds.extend(ulCorner);
  northerColoradoBounds.extend(brCorner);

  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4});
  map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
  map.fitBounds(northerColoradoBounds);
  // The marker, positioned at Uluru
  
  // 
  var icon={};
  icon.backcountry = {
      url: 'https://www.stonehousesigns.com/sites/default/files/products/formatted/Ski_Area_Boundary_Closed_FWJ45.jpg',
      // This marker is 20 pixels wide by 32 pixels high.
      scaledSize: new google.maps.Size(30, 50)
    };
   icon.resort = {
      url: 'https://www.stonehousesigns.com/sites/default/files/Stonehouse%20Signs%20Ski%20Sign%20Easier-Easiest%20Symbol%20Mountain%20Sign.jpg',
      // This marker is 20 pixels wide by 32 pixels high.
      scaledSize: new google.maps.Size(30, 30)
    };
/*
  var hiddenValleyMarker = new google.maps.Marker({
  	position: hiddenValleyLatLng, 
  	map: map,
  	title: 'Hidden Valley',
  	clickable: true,
  	icon: icon.backcountry
  });

  
  var lovelandMarker = new google.maps.Marker({
  	position: lovelandLatLng, 
  	map: map,
  	title: 'Loveland',
  	clickable: true,
  	icon: icon.resort
  });
*/

	var posts = document.getElementById('latestPosts').childNodes;

	var markers=[];

	posts.forEach(function(post){
		if(post && post.id &&post.id.startsWith('plot')){
      console.log('test',post.getAttribute('data-lng'))
			var attr={
				lat:parseFloat(post.getAttribute('data-lat')),
				lng:parseFloat(post.getAttribute('data-lng')),
				icon:post.getAttribute('data-icon'),
        csh:post.getAttribute('data-csh'),
        ref:post.getAttribute('data-ref'),
        refname:post.getAttribute('data-refname'),
				url:post.getAttribute('data-url'),
				title:post.getAttribute('data-title')
			}
      console.log('attr',attr);
			if(attr.lat && attr.lng && attr.icon && attr.url && attr.title){
        var marker=new google.maps.Marker({
          position: {lat:attr.lat,lng:attr.lng},
          map:map,
          title: attr.title,
          clickable: true,
          icon:icon[attr.icon]
        })
        console.log('Marker')
				markers.push({
          info: attr,
          element: marker
        });
			}
		}
	})


   function wrap(tag){
     var openTag='<'+tag+'>';
     var closeTag='</'+tag+'>';
     return function(inner){
       return openTag+inner+closeTag;
     }
   }

   var div=wrap('div');
   var p=wrap('p');
   var h1=wrap('h1');
   function a(inner,url){
     return '<a href="'+url+'">'+inner+'</a>';
   }
   function content(inner){
     return '<div id="content">'+inner+'</div>';
   }
   function body(inner){
    return '<div id="content">'+inner+'</div>'; 
   }



        markers.forEach(function(marker){
          var info=marker.info;
          var title=h1(info.title);
          var csh=info.csh?p(a('Colorado Ski History',info.csh)):'';
          var ref=info.ref?p(a(info.refname,info.ref)):'';
          var link=p(a(info.title +' Post',info.url));
          
          console.log('info',info);

          var contentString=content(
              title+
              link+
              csh +
              ref
            );


          marker.infoWindow= new google.maps.InfoWindow({
            content: contentString
          });

    		  marker.element.addListener('click',function(event){
    		          marker.infoWindow.open(map, marker.element);
    		  });
        });
}
