$(document).ready(function() {
    const bars = document.querySelectorAll('.progress__bar');
    bars.forEach(function(bar){
        let percentage = bar.dataset.percent;
        let tooltip = bar.children[0];
        tooltip.innerText = percentage + '%';
        bar.style.width = percentage +'%';
        //console.log(percentage);
    })

    // Counter (to count no of targets completed and happy clients)

    const counters = document.querySelectorAll('.counter');
    //console.log(counters);

    function runCounter (){
        counters.forEach(counter =>{
            counter.innerText = 0;
            let target = +counter.dataset.count;
            // we cannot see updating values in the output browser because the JS is one threaded language 
            // i.e: only one function is taking place at one time
            // to see updated values in output browser, browser needs to be repainted. 
            // since the function countIt() is recursive function, browser is not getting time to get repainted 
            let countIt = function(){
                let displayedCount = counter.innerText;
                if(displayedCount < target){
                    counter.innerText = displayedCount + 1;
                    setTimeout (countIt(), 1);
                     // recursion to call function till max target is achieved
                     // to see the updating output in the output browser, we are setting time Out function
                }
                else{
                    counter.innerText = target;
                }
            }
            countIt();
        })
    }
   

    // to see updating output only when the user is scrolling the screen we will use "Intersection Observer"
    let counterSection = document.querySelector('.counter__section');
    let options ={
        rootMargin : '0px 0px -200px 0px'
    }
    let done = 0;
    const sectionObserver = new IntersectionObserver(function(entries){

        if(entries[0].isIntersecting && done !== 1){
            done = 1;
            runCounter();
        }
    }, options)
    sectionObserver.observe(counterSection);


    // Image filter
    var $wrapper = $('.portfolio__wrapper');
    //Initialise isotope
    $wrapper.isotope({
        filter : '*' ,
        layoutMode : 'masonry' ,
        animationOptions : {
            duration: 750, 
            easing: 'linear' // Animation timing function
        }
    });

    let links = document.querySelectorAll('.tabs a');
    //console.log(links);

    links.forEach(link => {
       let selector = link.dataset.filter;
        console.log(selector);
        link.addEventListener('click', function(e){
            console.log('something');
            e.preventDefault();

        $wrapper.isotope({
            filter : selector ,
            layoutMode : 'masonry' ,
            animationOptions : {
                duration: 750, // Animation timing function
                easing: 'linear'
            }
        });
        
        links.forEach(link=> {
            link.classList.remove('active');
        })

        e.target.classList.add('active');
 
        });
    })


    // Magnify pop up
    $('.magnify').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enable: true
        }
    });


    // Initialising Slider
    $('.slider').slick({
       arrows: false,
       autoplay: true
    });
});

