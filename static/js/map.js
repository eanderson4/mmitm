// Initialize and add the map
function initMap() {
  // Northern colorado view
  // ul corner
  // 40.887825, -106.865978
  // 
  // br corner
  // 39.622867, -105.324985
  var ulCorner={lat:40.887825,lng:-106.865978};
  var brCorner={lat:39.622867,lng: -105.324985};

  var northerColoradoBounds= new google.maps.LatLngBounds();

  northerColoradoBounds.extend(ulCorner);
  northerColoradoBounds.extend(brCorner);
  var bounds = new google.maps.LatLngBounds();

  // Set up map with bounds
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4});
  map.setMapTypeId(google.maps.MapTypeId.TERRAIN);


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

	var posts = document.getElementById('plot-points').childNodes;
	var markers=[];

	posts.forEach(function(post){
		if(post && post.id &&post.id.startsWith('plot')){
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
      console.log('Have Post: ',attr.title);
			if(attr.lat && attr.lng && attr.icon && attr.url && attr.title){
        var latLng={lat:attr.lat,lng:attr.lng};
        var marker=new google.maps.Marker({
          position: latLng,
          map:map,
          title: attr.title,
          clickable: true,
          icon:icon[attr.icon]
        })
        bounds.extend(latLng);
				markers.push({
          latLng, latLng,
          info: attr,
          element: marker
        });
			}
		}
	})

  // Extend bounds
  if (markers.length>0){
    markers.forEach(function(marker){
      bounds.extend(marker.latLng);
      map.fitBounds(bounds);
    })
  }
  else{
    map.fitBounds(northerColoradoBounds);
  }


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
          
          console.log('Marker: ',info.title,marker);

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
