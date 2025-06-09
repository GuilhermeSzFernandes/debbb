const cartasClicadas = [];
let pontuacao = 0;
var bloqueado = false;
    
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.remove('hidden');
                entrada.target.classList.add('show');
            }
            else{
                entrada.target.classList.remove('show');
                entrada.target.classList.add('hidden');
            }
        });
    })

    const elementos = document.querySelectorAll('.hidden');

    elementos.forEach((elemento) => observador  .observe(elemento));

    function embaralharImgs(){
        var txtPontos = document.getElementById('txtPontos').innerText = "Pontos: 0";
        const jogoDiv = document.getElementById('jogoDiv');
        var paths = ["./img/1.jpg", "./img/1_v2.jpg", "./img/2.jpg", "./img/2_v2.jpg", "./img/3.jpg", "./img/3_v2.jpg", "./img/4.jpg", "./img/4_v2.jpg"]
        pontuacao = 0;
        
        jogoDiv.innerHTML = "";

        while(paths.length > 0){
            const num = Math.floor(Math.random() * paths.length)
            const pathimg = paths.splice(num, 1)[0]

            let imgEmb = document.createElement("img")
            imgEmb.src = "./img/costas.jpg"
            imgEmb.id = pathimg
            imgEmb.className = "card virado"
            jogoDiv.appendChild(imgEmb)
        
            imgEmb.addEventListener("click", function () {
                mostrarImg(imgEmb.id)
            })
        }
    }

    
    function mostrarImg(idImg){
        var carta = document.getElementById(idImg)
        var txtPontos = document.getElementById('txtPontos')

        if (bloqueado || carta.classList.contains("revelada")) {
            return;
        }
        carta.src = carta.id
        carta.className = "card revelada";
        cartasClicadas.push(carta.id)

        if(cartasClicadas.length === 2){
            bloqueado = true;
            if(cartasClicadas[0].replace("_v2", "") == cartasClicadas[1].replace("_v2", "")){
                console.log("Achou")
                cartasClicadas.length = 0
                pontuacao = pontuacao+1
                txtPontos.innerText = `Pontos: ${pontuacao}` 
                bloqueado = false;
            }
            else{
                setTimeout(() => {
                    const carta1 = document.getElementById(cartasClicadas[0]);
                    const carta2 = document.getElementById(cartasClicadas[1]);

                    carta1.src = "./img/costas.jpg";
                    carta2.src = "./img/costas.jpg";

                    carta1.classList.remove("revelada");
                    carta1.classList.add("virada");

                    carta2.classList.remove("revelada");
                    carta2.classList.add("virada");

                    cartasClicadas.length = 0
                    bloqueado = false;

                    
                }, 1000);
            }
        }

        setTimeout(() => {
            if(pontuacao == 4){
                alert("Parabéns, você venceu!")
                embaralharImgs()
            }
        },1000)

        
    }

document.getElementById('resetarJogo').addEventListener("click", function () {
    embaralharImgs()
})

document.getElementById('verProjeto').addEventListener("click", function () {
    const memory = document.getElementById('memory')
    const jogoDiv = document.getElementById('jogoDiv')

    if(memory.classList.contains("hiddenGame")){
        memory.classList.remove("hiddenGame");
        memory.classList.add("show");
        embaralharImgs()
    }
    else{
        jogoDiv.innerHTML = ""
        memory.classList.add("hiddenGame");
        memory.classList.remove("show");
    }
})
