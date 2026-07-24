document.addEventListener("DOMContentLoaded", () => {


    /*
    ===========================
        THEME SWITCHER
    ===========================
    */


    const themeButton = document.getElementById("themeToggle");
    const html = document.documentElement;


    const savedTheme = localStorage.getItem("theme");


    if(savedTheme){

        html.setAttribute("data-theme", savedTheme);

    }


    themeButton.addEventListener("click", () => {


        const currentTheme = html.getAttribute("data-theme");


        const newTheme =
            currentTheme === "dark"
            ? "light"
            : "dark";


        html.style.transition = "0.4s";


        html.setAttribute(
            "data-theme",
            newTheme
        );


        localStorage.setItem(
            "theme",
            newTheme
        );


        showToast(
            newTheme === "dark"
            ? "🌙 Dark mode enabled"
            : "☀️ Light mode enabled"
        );


    });



    /*
    ===========================
        SEARCH
    ===========================
    */


    const searchInput =
        document.getElementById("searchInput");


    const tasks =
        document.querySelectorAll(".task-card");


    searchInput.addEventListener(
        "input",
        () => {


        const value =
            searchInput.value
            .toLowerCase();



        tasks.forEach(task => {


            const text =
                task.innerText
                .toLowerCase();



            if(text.includes(value)){


                task.style.display="block";


                setTimeout(()=>{

                    task.style.opacity="1";

                },50);


            }

            else{


                task.style.opacity="0";


                setTimeout(()=>{

                    task.style.display="none";

                },300);


            }


        });


    });



    /*
    Keyboard shortcut CTRL + K
    */


    document.addEventListener(
        "keydown",
        (e)=>{


        if(
            e.ctrlKey &&
            e.key==="k"
        ){

            e.preventDefault();

            searchInput.focus();

        }


    });



    /*
    ===========================
        SCROLL BUTTON
    ===========================
    */


    const scrollButton =
        document.getElementById("scrollTop");



    window.addEventListener(
        "scroll",
        ()=>{


        if(window.scrollY > 500){


            scrollButton.classList.add(
                "show"
            );


        }

        else{


            scrollButton.classList.remove(
                "show"
            );


        }


    });



    scrollButton.addEventListener(
        "click",
        ()=>{


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    });



    


    /*
    ===========================
        BUTTON RIPPLE
    ===========================
    */


    const buttons =
        document.querySelectorAll(
            "a"
        );



    buttons.forEach(button=>{


        button.addEventListener(
            "click",
            function(e){


            const circle =
                document.createElement(
                    "span"
                );



            const diameter =
                Math.max(
                    this.clientWidth,
                    this.clientHeight
                );



            circle.style.width =
            circle.style.height =
                diameter+"px";



            circle.style.left =
                e.clientX -
                this.offsetLeft -
                diameter/2
                +"px";



            circle.style.top =
                e.clientY -
                this.offsetTop -
                diameter/2
                +"px";



            circle.classList.add(
                "ripple"
            );



            this.appendChild(circle);



            setTimeout(
                ()=>{
                    circle.remove();
                },
                600
            );


        });


    });



    /*
    ===========================
        CARD REVEAL
    ===========================
    */


    const observer =
        new IntersectionObserver(
            entries=>{


            entries.forEach(entry=>{


                if(entry.isIntersecting){


                    entry.target.style.opacity="1";


                    entry.target.style.transform=
                    "translateY(0)";


                }


            });


        },
        {
            threshold:.15
        });



    tasks.forEach(card=>{


        card.style.opacity="0";

        card.style.transform=
        "translateY(40px)";


        observer.observe(card);


    });



});





/*
===========================
        TOAST
===========================
*/


function showToast(message){


    const toast =
        document.getElementById(
            "toast"
        );


    toast.innerHTML =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(()=>{


        toast.classList.remove(
            "show"
        );


    },2500);



}

/*
===========================
    CREATE TASK MODAL
===========================
*/


const modal =
    document.getElementById("taskModal");


const openButtons =
    document.querySelectorAll(".new-task");


const closeModal =
    document.getElementById("closeModal");



openButtons.forEach(button=>{


    button.addEventListener(
        "click",
        ()=>{


        modal.classList.add(
            "active"
        );


    });


});



closeModal.addEventListener(
    "click",
    ()=>{


    modal.classList.remove(
        "active"
    );


});



modal.addEventListener(
    "click",
    (e)=>{


    if(e.target === modal){


        modal.classList.remove(
            "active"
        );


    }


});



document.addEventListener(
    "keydown",
    (e)=>{


    if(e.key === "Escape"){


        modal.classList.remove(
            "active"
        );


    }


});