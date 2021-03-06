function _closePreviewer(){
	var _img_previewer = document.getElementById("_img_previewer");
	document.getElementById("img-prev").style.transform = "rotate(0deg)";
	document.getElementById("img-prev").style.width = "100vh";
	_img_previewer.style.display = "none";
	_img_previewer.classList.remove("_opened");
}

var _imagePreview = document.getElementsByClassName('_img_tb_previewed');

for (var i = 0; i < _imagePreview.length; i++) {
    _imagePreview[i].addEventListener('click', function() {
	
	var _img_previewer = document.getElementById("_img_previewer");

	document.getElementById("img-prev").src = this.src;
	_img_previewer.classList.add("_opened");
	_updateFileName(this.src);
	document.getElementById("_img_previewer").style.display = "block";
    });
}

var _nextImage = document.getElementById('_right');

_nextImage.addEventListener('click', function() {
	var _img_src = document.getElementById("img-prev").src;
	var _next_src = _getNextImage(_img_src, 'next');
	document.getElementById("img-prev").src = _next_src;
	_updateFileName(_next_src);
});


function _getNextImage(_current_src, _nav){
	
	var _imagePreview = document.getElementsByClassName('_img_tb_previewed');
	
	var _n = _imagePreview.length;
	for (var i = 0; i < _n; i++) {
		
		if(_imagePreview[i].src == _current_src){
			
			var pointer;			

			if(_nav == "next"){
				pointer = (i+1)%_n;
			}
			else{
				pointer = (i-1) < 0 ? _n - 1 : i-1;
			}
			
			document.getElementById('_resolution_').innerHTML = "";
			document.getElementById("img-prev").style.transform = "rotate(0deg)";
			document.getElementById("img-prev").style.width = "100vh";
			return _imagePreview[pointer].src;
		}
	}
}

var _prevImage = document.getElementById('_left');

_prevImage.addEventListener('click', function() {
	var _img_src = document.getElementById("img-prev").src;
	var _prev_src = _getNextImage(_img_src, "previous");
	document.getElementById("img-prev").src = _prev_src;
	_updateFileName(_prev_src);
});

document.onkeydown = function(e) {
	
	var _imagePreview = document.getElementById("_img_previewer");
	
	if(_imagePreview.classList.contains("_opened")){
		e = e || window.event;

        	if (e.keyCode == '37') {
            		document.getElementById('_left').click();
        	} else if (e.keyCode == '39') {
            		document.getElementById('_right').click();
        	}
	}
        
    }

function _showImagePixels(_inst){
	var width = _inst.naturalWidth;
	var height = _inst.naturalHeight;

	var _resolutions = width + " x " + height;
	document.getElementById('_resolution_').innerHTML = _resolutions;
}

function _rotateRight(){
	var _img_previewer = document.getElementById("img-prev");
	
	var _rotate_string = _img_previewer.style.transform;

	var numberPattern = /\d+/g;

	var _deg = _rotate_string.match(numberPattern);

	if(_deg == null){
		_deg  = 90;
	}
	else{
		_deg = parseInt(_deg);
		_deg = (_deg == 360) ? 0 : _deg;
		_deg += 90;
	}

	if(_deg == 270 || _deg == 90){
		_img_previewer.style.width = "90vh";
	}
	else{
		_img_previewer.style.width = "100vh";
	}
	
	_img_previewer.style.transform = "rotate(" + _deg + "deg)";
}

function _updateFileName(_url){
	var _filename = _url.substring(_url.lastIndexOf('/')+1);
	document.getElementById("_file_name_").innerHTML = _filename;
}