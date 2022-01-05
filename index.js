
//Al escuchar el primer evento tarde 20 milisegundos para escuchar el proximo. 
function debounce(func, wait = 20, immediate = true ){
    var timeout 
    return function(){
        var context = this, args = arguments
        var later = function() {
            timeout = null
            if(!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if(callNow) func.apply(context, args)
    }
}

const sliderImages = document.querySelectorAll('.slide-in')

//Corre esta funcion cada vez que alguien scrollea.

function checkSlide(e){

    //console.log(window.scrollY) nos dice cuanto scrolleamos para abajo contando desde la parte superior. 

    sliderImages.forEach(sliderImg => {

        //slideInAt = a mitad de camino de la imagen. 
            //Calculo para saber en que posicion tiene que aparecer la imagen Ej: 50%
      const sliderInAt = (window.scrollY + window.innerHeight) - sliderImg.height / 2
            // Nivel de pixeles, contados desde la parte inferior de nuestra ventana hasta la mitad de las imagenes.

        //El bottom de la imagen. 
        //.offsetTop, nos dira cuantos pixeles hay entre el topMax de la imagen, hasta el principio de la pagina.  
        
        //Pero como queremos saberlo desde el bottom de la imagen hacemos:
       const imageBottom = sliderImg.offsetTop + sliderImg.height 


       //Si la mitad de la imagen se muestra
       const isHalfShown = sliderInAt > sliderImg.offsetTop
       //Si no nos pasamos mas alla de la imagen.
       const isNotScrolledPast = window.scrollY < imageBottom 

       if(isHalfShown && isNotScrolledPast){
           sliderImg.classList.add('active')
       }else{
        sliderImg.classList.remove('active')
       }



     
    });

}

window.addEventListener('scroll',debounce(checkSlide))  