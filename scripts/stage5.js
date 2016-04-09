var video, canvas, context, imageData, detector, posit;
    var renderer1, renderer2, renderer3;
    var scene1, scene2, scene3, scene4;
    var camera1, camera2, camera3, camera4;
    var plane1, plane2, model, texture;
    var step = 0.0;

    var modelSize = 35.0; //millimeters

    function onLoad(){
      video = document.getElementById("video");
      canvas = document.getElementById("canvas");
      context = canvas.getContext("2d");
    
      canvas.width = parseInt(canvas.style.width);
      canvas.height = parseInt(canvas.style.height);
      
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (navigator.getUserMedia){
        init();
      }
    };
	
	function gotSources(sourceInfos) {
  /*for (var i = 0; i !== sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    var option = document.createElement('option');
    option.value = sourceInfo.id;
    if (sourceInfo.kind === 'audio') {
      option.text = sourceInfo.label || 'microphone ' +
        (audioSelect.length + 1);
      audioSelect.appendChild(option);
    } else if (sourceInfo.kind === 'video') {
      option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source: ', sourceInfo);
    }
  }*/
  
  console.log(sourceInfos);
}

if (typeof MediaStreamTrack === 'undefined' ||
    typeof MediaStreamTrack.getSources === 'undefined') {
  //alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
} else {
  MediaStreamTrack.getSources(gotSources);
}



function gotDevices2(deviceInfos) {
  console.log(deviceInfos);
}

navigator.mediaDevices.enumerateDevices()
.then(gotDevices2)
.catch(errorCallback);

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

    
    function init(){
	
		/*var videoSource = "3e2cf6ff1f0010910a5ab417130ec86a3b8af4df4536d653d472dd6824f90ac0";
		var constraints = {
		video: {deviceId: videoSource ? {exact: videoSource} : undefined}
	  };*/
	  
	  var constraints = {
		video: {width: 640, height: 360}
	  };
	
      /*navigator.getUserMedia(constraints, function (stream){
          if (window.URL) {
            video.src = window.URL.createObjectURL(stream);
          } else if (video.mozSrcObject !== undefined) {
            video.mozSrcObject = stream;
          } else {
            video.src = stream;
          }
        },
        function(error){
        }
      );*/
	  
	  navigator.mediaDevices.getUserMedia(constraints)
	  .then(function(stream) {
		if (window.URL) {
            video.src = window.URL.createObjectURL(stream);
          } else if (video.mozSrcObject !== undefined) {
            video.mozSrcObject = stream;
          } else {
            video.src = stream;
          }
	  })
	  .catch(errorCallback);
	
      
      detector = new AR.Detector();
      posit = new POS.Posit(modelSize, canvas.width);

      createRenderers();
      createScenes();

      requestAnimationFrame(tick);
    };

    function tick(){
      requestAnimationFrame(tick);
      
      if (video.readyState === video.HAVE_ENOUGH_DATA){
        snapshot();

        var markers = detector.detect(imageData);
        //drawCorners(markers);
        updateScenes(markers);
        
        render();
      }
    };

    function snapshot(){
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    };
    
    function drawCorners(markers){
      var corners, corner, i, j;
    
      context.lineWidth = 3;

      for (i = 0; i < markers.length; ++ i){
        corners = markers[i].corners;
        
        context.strokeStyle = "red";
        context.beginPath();
        
        for (j = 0; j < corners.length; ++ j){
          corner = corners[j];
          context.moveTo(corner.x, corner.y);
          corner = corners[(j + 1) % corners.length];
          context.lineTo(corner.x, corner.y);
        }

        context.stroke();
        context.closePath();
        
        context.strokeStyle = "green";
        context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
      }
    };

    function createRenderers(){
    
      renderer3 = new THREE.WebGLRenderer();
      renderer3.setClearColor(0xffffff, 1);
      renderer3.setSize(canvas.width, canvas.height);
      document.getElementById("container").appendChild(renderer3.domElement);
      
      scene3 = new THREE.Scene();
      camera3 = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5);
      scene3.add(camera3);
      
      scene4 = new THREE.Scene();
      camera4 = new THREE.PerspectiveCamera(40, canvas.width / canvas.height, 1, 1000);
      scene4.add(camera4);
    };

    function render(){
     

      renderer3.autoClear = false;
      renderer3.clear();
      renderer3.render(scene3, camera3);
      renderer3.render(scene4, camera4);
    };

    function createScenes(){
     
      texture = createTexture();
      scene3.add(texture);
    
      model = createModel();
      scene4.add(model);
    };
    
   
    
    function createTexture(){
      var texture = new THREE.Texture(video),
          object = new THREE.Object3D(),
          geometry = new THREE.PlaneGeometry(1.0, 1.0, 0.0),
          material = new THREE.MeshBasicMaterial( {map: texture, depthTest: false, depthWrite: false} ),
          mesh = new THREE.Mesh(geometry, material);
      
      object.position.z = -1;
      
      object.add(mesh);
      
      return object;
    };
    
    function createModel(){
      var object = new THREE.Object3D(),
          geometry = new THREE.SphereGeometry(1, 15, 15, Math.PI),
          texture = THREE.ImageUtils.loadTexture("textures/apple.jpg"),
          material = new THREE.MeshBasicMaterial( {map: texture} ),
          mesh = new THREE.Mesh(geometry, material);
      
      object.add(mesh);
      
      return object;
    };
	
	var wasFound = false;

    function updateScenes(markers){
      var corners, corner, pose, i;
      
      if (markers.length > 0){
	  
		if ( wasFound == false )
		{
			wasFound = true;
			
			setTimeout( function () {
            document.getElementById("camera_window").style.display = "none";
            document.getElementById("stage3_table").style.display = "none";
			document.getElementById("nextArea").style.display = "block";
			}, 5000 );
			document.getElementById("song").play();
		}
		
        corners = markers[0].corners;
        
        for (i = 0; i < corners.length; ++ i){
          corner = corners[i];
          
          corner.x = corner.x - (canvas.width / 2);
          corner.y = (canvas.height / 2) - corner.y;
        }
        
        pose = posit.pose(corners);
        
      
        updateObject(model, pose.bestRotation, pose.bestTranslation);
  
        step += 0.025;
        
        model.rotation.z -= step;
      }
      
      texture.children[0].material.map.needsUpdate = true;
    };
    
    function updateObject(object, rotation, translation){
      object.scale.x = modelSize;
      object.scale.y = modelSize;
      object.scale.z = modelSize;
      
      object.rotation.x = -Math.asin(-rotation[1][2]);
      object.rotation.y = -Math.atan2(rotation[0][2], rotation[2][2]);
      object.rotation.z = Math.atan2(rotation[1][0], rotation[1][1]);

      object.position.x = translation[0];
      object.position.y = translation[1];
      object.position.z = -translation[2];
    };
    

    window.onload = onLoad;