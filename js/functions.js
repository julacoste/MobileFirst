document.addEventListener("DOMContentLoaded", function(event) { 
  
  	/**
  	 *	hasClass()
  	 */
  	function hasClass(inputElement, inputClassName) {
	  if (inputElement.classList)
	    return inputElement.classList.contains(inputClassName)
	  else
	    return !!inputElement.className.match(new RegExp('(\\s|^)' + inputClassName + '(\\s|$)'))
	}

	// Initialisation variables
	var opening = false;

	var headerNav = document.getElementById('header--nav');
	var headerBurger = document.getElementById('header--burger');
	var headerNavLinks = document.getElementById('header--nav').getElementsByTagName("a");

	var minheight = 0;
	var maxheight = window.innerHeight - 60;
	var time = 1000;
	var timer = null;
	var headerMenuOpened = false;

	headerNav.style.height = minheight + 'px';
	

	// Bind click sur le burger
	headerBurger.onclick = function() {
		if(!opening) {
			opening = true;
			
			if(!headerMenuOpened) { // Cas OUVRIR menu
				
				// On affiche le menu pour voir l'animation
				headerNav.style.display = 'block';

				// On change l'icone burger
				if (headerBurger.classList) {
					headerBurger.classList.add('open')	
				} else if (!hasClass(headerBurger, 'open')) {
					headerBurger.className += " " + 'open';
				}
			
			} else { // Cas FERMER menu

				// On change l'icone burger
				if (headerBurger.classList) {
					headerBurger.classList.remove('open');
				} else if (hasClass(headerBurger, 'open')) {
					var reg = new RegExp('(\\s|^)' + 'open' + '(\\s|$)');
					headerBurger.className=headerBurger.className.replace(reg, ' ');
				}

			}
			
			// On initialise le timer
		    clearInterval(timer);

		    // On initialise les valeurs pour ouvrir/fermer le menu : hauteur actuelle
		    var instanceheight = parseInt(headerNav.style.height);
		    
		    // On initialise les valeurs pour ouvrir/fermer le menu : timestamp actuel
		    var init = (new Date()).getTime();

		    // On initialise les valeurs pour ouvrir/fermer le menu : hauteur à atteindre à la fin de l'animation
		    var height = (headerMenuOpened) ? minheight : maxheight;
		    var disp = height - parseInt(headerNav.style.height);

		    // On éxécute le timer avec un intervalle de 1ms
		    timer = setInterval(function() {
		        var instance = (new Date()).getTime() - init;
		        if(instance <= time ) {
		            var pos = instanceheight + Math.floor(disp * instance / time);
		            headerNav.style.height =  pos + 'px';
		        }else {
		            headerNav.style.height = height + 'px';
		            if(headerMenuOpened) {
						headerNav.style.display = 'none';
					}
					headerMenuOpened = !headerMenuOpened;
					opening = false;
		            clearInterval(timer);
		        }
		    },1);
				
		}
	};

	headerNavLinks.onclick = function() {
		console.log("headerNavLinks.onclick");
		// window.scrollTo(0,100);
		headerBurger.click();
		return false;
	};

});

// $(document).ready(function(){
// 	var headerMenu = $('.header--nav');
// 	var headerBtn = $('.header--burger');
// 	var headerMenuOuvert = false;
	
// 	function ouvrirMenu(){
// 		headerMenu.slideDown("slow");
// 		headerBtn.addClass('open');
// 	}

// 	function fermerMenu(){
// 		headerMenu.slideUp("slow");
// 		headerBtn.removeClass('open');
// 	}

// 	headerBtn.click(function(){
// 		if (headerMenu.is(':hidden')){
// 			ouvrirMenu();
// 		} else {
// 			fermerMenu();	
// 		}
// 	})
// });
