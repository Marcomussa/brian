
const submitBTN = document.getElementById("submit-contactForm")
const serviceID = "service_d3nxvud"
const templateID = "template_uw8ku4c"

emailjs.init("w0qdp6mhuSS8BSVoY");

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contact-form-data").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que se envíe el formulario

        let userName = document.getElementsByName("userName")[0].value.trim();
        let userEmail = document.getElementsByName("userEmail")[0].value.trim();
        let userSubject = document.getElementsByName("userSubject")[0].value.trim();
        let userMessage = document.getElementsByName("userMessage")[0].value.trim();
        let response = grecaptcha.getResponse();

        let missingFields = [];
         //const response = grecaptcha.getResponse();

        if (userName === "") {
            missingFields.push("Nombre");
        }
        if (userEmail === "") {
            missingFields.push("Email");
        }
        if (userMessage === "") {
            missingFields.push("Mensaje");
        }

        if (missingFields.length > 0) {
            document.getElementById("result").innerHTML = `<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">Por favor, complete los siguientes campos: ${missingFields.join(", ")} </div>`
        } 
        else if(false){
            let timerInterval;
            Swal.fire({
                title: "Por favor, completa el reCAPTCHA antes de enviar el formulario.",
                html: "Me cerrare en <b></b> milisegundos",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
                }
            });
        } 
        else {
            document.getElementById("result").innerHTML = "";

            submitBTN.value = "Enviando...";

            const templateParams = {
               
            };

            emailjs.send(serviceID, templateID, templateParams).then(
                function (res) {
                  Swal.fire({
                    title: "¡El correo electrónico se ha enviado con éxito!",
                    text: "En breve nos comunicaremos con usted",
                    icon: "success",
                    confirmButtonText: "Listo",
                  });
        
                  submitBTN.value = "Enviado!";
                },
                function (err) {
                  submitBTN.value = "Error";
        
                  Swal.fire({
                    title: "¡Ha ocurrido un error!",
                    text: "Contactese con ...",
                    icon: "error",
                    confirmButtonText: "Listo",
                  });
                }
            );
        }
    });
});