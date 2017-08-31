/**
 * imageMap.js
 * v.0.0.5.0
 *
 * Author
 * Fernando H. Moralles
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 */
(
function(f){
	if(typeof exports==="object"&&typeof module!=="undefined") {
		module.exports=f()
	} else if(typeof define==="function"&&define.amd) {
		define([],f)
	} else {
		var g;
		if(typeof window!=="undefined"){
			g=window
		} else if(typeof global!=="undefined"){
			g=global
		} else if(typeof self!=="undefined") {
			g=self
		}else { 
			g=this
		}
		g.imagemap = f();
	}
}
)

(function() {
		
	'use strict';
	
	function a(o) {
		
		var container = o.container;
		var image = o.image;
		var size = o.size;
		var zoom = o.zoom;
		var nivel = o.nivel;
		var botao = 'I';
		
		var coordenadas = { };
		coordenadas.centerLeft = 0;
		coordenadas.centerTop = 0;
		
		var markers = [ ];
		var marker = { };
		
		//
		function defineZoom(e) {
		
			var e = window.event || e; // old IE support
			var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
			
			console.log(delta);
			zoom = zoom + delta;
			setZoom(delta);
		}

		//
		function setZoom(delta) {
			
			if(zoom > (nivel-1)) {
				zoom = (nivel-1);
				return;
			} else if(zoom < 0) {
				zoom = 0;
			}
			
			var moveW = ((parseInt(size[0]) - window.innerWidth) / nivel);
			var maxLeftMargin = (((parseInt(size[0]) - window.innerWidth) / nivel) * zoom);
			var newWidth = window.innerWidth + maxLeftMargin;
			coordenadas.maxLeftMargin = maxLeftMargin * (-1);
			
			var moveH = ((parseInt(size[1]) - window.innerHeight) / nivel);
			var maxTopMargin = (((parseInt(size[1]) - window.innerHeight) / nivel) * zoom);
			var newHeight = window.innerHeight + maxTopMargin;
			coordenadas.maxTopMargin = maxTopMargin * (-1);

			if(delta == 1) {
				coordenadas.centerLeft -= parseInt(moveW/2);
				coordenadas.centerTop -= parseInt(moveH/2);
			} else if(delta == -1) {
				coordenadas.centerLeft += parseInt(moveW/2);
				coordenadas.centerTop += parseInt(moveH/2);
			}
			
			if(coordenadas.centerLeft > 0)
				coordenadas.centerLeft = 0;
			else if(coordenadas.centerLeft < coordenadas.maxLeftMargin)
				coordenadas.centerLeft = coordenadas.maxLeftMargin;
			
			if(coordenadas.centerTop > 0)
				coordenadas.centerTop = 0;
			else if(coordenadas.centerTop < coordenadas.maxTopMargin)
				coordenadas.centerTop = coordenadas.maxTopMargin;
			
			changeMapSize(newWidth, newHeight);
			changeMapPosition(coordenadas.centerLeft, coordenadas.centerTop);
			
			reloadMarkers();
			
		}
		
		function changeMapSize(w, h) {
			$("#imgmapa").css("width", w);
			$("#imgmapa").css("height", h);
					
		}
		
		function changeMapPosition(l, t) {
			$("#imgmapa").css("marginLeft", l);
			$("#imgmapa").css("marginTop", t);
		}	
		
		//
		function getMousePos(e) {
		
			if(botao == null || botao == undefined || botao == 'I') {
				//console.log('I [ x: ' + e.pageX + '; y: ' + e.pageY + ' ]');
				coordenadas.mouseXI = e.pageX;
				coordenadas.mouseYI = e.pageY;
				$("#imgmapa").css("cursor", "move");
				botao = 'F';
				e.preventDefault();
				
			} else {
				//console.log('F [ x: ' + e.pageX + '; y: ' + e.pageY + ' ]');
				var moveX = e.pageX - coordenadas.mouseXI;
				var atualMarginLeft = parseInt($("#imgmapa").css("marginLeft").replace("px", ""));
				var newMaringLeft = atualMarginLeft + moveX;
				if(newMaringLeft > 0) {
					newMaringLeft = 0;
				} else if(newMaringLeft < coordenadas.maxLeftMargin) {
					newMaringLeft = coordenadas.maxLeftMargin;
				}

				var moveY = e.pageY - coordenadas.mouseYI;
				var atualMarginTop = parseInt($("#imgmapa").css("marginTop").replace("px", ""));
				var newMaringTop = atualMarginTop + moveY;
				if(newMaringTop > 0) {
					newMaringTop = 0;
				} else if(newMaringTop < coordenadas.maxTopMargin) {
					newMaringTop = coordenadas.maxTopMargin;
				}
				
				changeMapPosition(newMaringLeft, newMaringTop);
				
				coordenadas.mouseXI = -1;
				coordenadas.mouseYI = -1;
				
				coordenadas.centerLeft = newMaringLeft;
				coordenadas.centerTop = newMaringTop;
				
				$("#imgmapa").css("cursor", "default");
				botao = 'I';
				//
			}
			
			reloadMarkers();
			
		}
		
		//
		function addMarker(object) {
			
			// object.image
			// object.position
			// object.width
			// object.height
			// object.onclick
			// object.reference
			// object.description
			
			//
			var atualMarginLeft = parseInt($("#imgmapa").css("marginLeft").replace("px", ""));
			var atualMarginTop = parseInt($("#imgmapa").css("marginTop").replace("px", ""));
			var atualWidth = parseInt($("#imgmapa").css("width").replace("px", ""));
			var atualHeight = parseInt($("#imgmapa").css("height").replace("px", ""));
		
			//
			var newmarker = {};
			newmarker.id = "img" + new Date().getTime();
			newmarker.image = object.image;
			newmarker.position = object.position;
			newmarker.onclick = object.onclick;
			newmarker.reference = object.reference;
			newmarker.description = object.description;
			markers.push(newmarker);
			
			//
			var imgmarker = document.createElement("img");
			imgmarker.id = newmarker.id;
			imgmarker.src = newmarker.image;
			imgmarker.left = parseInt(parseFloat(newmarker.position[0]/size[0]) * atualWidth) + atualMarginLeft;
			imgmarker.top = parseInt(parseFloat(newmarker.position[1]/size[1]) * atualHeight) + atualMarginTop;
			imgmarker.addEventListener('click', object.onclick, false);
			
			if(object.reference != null && object.reference != undefined) {
				imgmarker.reference = object.reference;
			}
			
			var wAux = 25;
			var hAux = 25;
			if(object.width != null && object.width != undefined)
				wAux = object.width;
			if(object.height != null && object.height != undefined)
				hAux = object.height;
			
			newmarker.width = wAux;
			newmarker.height = hAux;
			
			$("#"+container).append(imgmarker);
			$("#"+imgmarker.id).css("width", wAux);
			$("#"+imgmarker.id).css("height", hAux);
			$("#"+imgmarker.id).css("left", imgmarker.left);
			$("#"+imgmarker.id).css("top", imgmarker.top);
			$("#"+imgmarker.id).css("position", "absolute");
			
			if(object.onclick != null && object.onclick != undefined)
				$("#"+imgmarker.id).css("cursor", "pointer");
			
			reloadMarkers();
			sleep(10);
			
			return newmarker;
		}

		//
		function updateMarker(object) {
			
			if(object.id == null || object.id == undefined)
				return;
			
			var markerAux = null;
			var indexAux = null;
			for(var x in markers) {
				if(markers[x].id == object.id) {
					indexAux = x;
					markerAux = markers[x];
					break;
				}
			}
			
			if(markerAux == null)
				return;
			
			//
			if(object.image != null && object.image != undefined) {
				markerAux.image = object.image;
				$("#"+object.id).attr("src", object.image);
			}

			if(object.width != null) {
				markerAux.width = object.width;
				$("#"+object.id).css("width", object.width);
			}
				
			if(object.height != null) {
				markerAux.height = object.height;
				$("#"+object.id).css("height", object.height);
			}
			
			//
			if(object.onclick != null) {
				markerAux.onclick = object.onclick;
				$("#"+object.id).addEventListener('click', object.onclick, false);
			}
			
			if(object.position != null)
				markerAux.position = object.position;
			
			markers[indexAux] = markerAux;
			reloadMarkers();
			
		}
		
		//
		function reloadMarkers() {
			
			console.log('reloadMarkers');
			
			for(var x in markers) {

				console.log(markers[x]);
				
				var atualMarginLeft = parseInt($("#imgmapa").css("marginLeft").replace("px", ""));
				var atualMarginTop = parseInt($("#imgmapa").css("marginTop").replace("px", ""));
				var atualWidth = parseInt($("#imgmapa").css("width").replace("px", ""));
				var atualHeight = parseInt($("#imgmapa").css("height").replace("px", ""));

				markers[x].left = parseInt(parseFloat(markers[x].position[0]/size[0]) * atualWidth) + atualMarginLeft + ( (-1) * (markers[x].width/2) );
				markers[x].top = parseInt(parseFloat(markers[x].position[1]/size[1]) * atualHeight) + atualMarginTop + ( (-1) * (markers[x].height/2) );
				
				//changeMapPosition(markers[x].left, markers[x].top);
				console.log(markers[x]);
				$("#"+markers[x].id).css("left", markers[x].left);
				$("#"+markers[x].id).css("top", markers[x].top);
				
			}
		}

		//
		function removeMarker(markerId) {
			
			var m = $("#"+markerId)
			m.remove();
			
			for(var x in markers) {
				
				if (markers[x].id == markerId) {
					markers.splice(x, 1);
					break;
				}
			}			
			
		}

		//
		function removeMarkers() {
			
			var remove = [];
			for(var x in markers) {
				remove[x] = markers[x].id;
			}

			for(var x in remove) {
				removeMarker(remove[x]);
			}
		}
		
		function sleep(ms) {
		    var unixtime_ms = new Date().getTime();
		    while(new Date().getTime() < unixtime_ms + ms) {}
		}
		
		//Define div
		$("html").css("overflow", "hidden" );
		$("#"+container).css("width", "100%");
		$("#"+container).css("height", "100%");
		$("#"+container).css("backgroundColor", "#000000");
		
		var newimg = document.createElement("img");
		newimg.id = "imgmapa";
		newimg.src = image;
		newimg.addEventListener('mousewheel', defineZoom, false);
		newimg.addEventListener('mousedown', getMousePos, false);
		newimg.addEventListener('mouseup', getMousePos, false);
		
		if(nivel == null || zoom == undefined) {
			nivel = 20;
		}
		
		newimg.width = window.innerWidth;
		newimg.height = window.innerHeight;
		coordenadas.maxLeftMargin = 0;
		coordenadas.maxTopMargin = 0;
		if(zoom == null || zoom == undefined || zoom == 0) {
			zoom = 0;
		}

		$("#"+container).append(newimg);
		
		if(zoom > 0) {
			var aux = zoom;
			zoom = 0;
			for(var i = 0; i < aux; i++) {
				setZoom(1);
				zoom++;
			}
			
		}
		
		return {
			addMarker: addMarker,
			updateMarker: updateMarker,
			removeMarker: removeMarker,
			removeMarkers: removeMarkers
		}
		
	}

	return {
		Map: a
	}
	
});
