const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const likeButton = document.getElementById("like")
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const songTime = document.getElementById("song-time");
const totalTime = document.getElementById("total-time");


const EstamosdePé = {
    songName: "Estamos de Pé",/// nome da música
    artist : "Marcus Salles",///nome do artista
    file: "Estamos de Pé-Marcus Salles",///file é o nome do arquivo imagem e som
    liked: false,
};
const RealidadedoCéu = {
    songName: "Realidade do Céu",
    artist : "A Cabana Sounds",
    file: "Realidade do Céu-Cabana sounds",
    liked: false,
};
const Unico = {
    songName: "Unico",
    artist : "Marco Telles",
    file: "Unico-Marco Telles",
    liked: false,
};
const AbramasPortas = {
    songName: "Abram as Portas",
    artist : "CIA Worship",
    file: "Abram as Portas   CIA Worship (Clipe Oficial)",
    liked: false,
};
const BondadedeDeus = {
    songName: "Bondade de Deus",
    artist : "worship",
    file: "Bondade_de_Deus",
    liked: false,
};
const EleVem = {
    songName: "Ele Vem",
    artist : "Gabriel Guedes. feat Gabriela Rocha",
    file: "Gabriel Guedes   Ele Vem (Ao Vivo)   feat. Gabriela Rocha",
    liked: false,
};
const NadaMais = {
    songName: "Nada Mais",
    artist : "Gabriel Guedes",
    file: "Gabriel Guedes   Nada Mais (Clipe Oficial)",
    liked: false,
};
const MeAtraiu = {
    songName: "Me Atraiu",
    artist : "Gabriela Rocha",
    file: "Gabriela Rocha   ME ATRAIU (AO VIVO)",
    liked: false,
};
const NomeiodosLouvores = {
    songName: "No Meio dos Louvores",
    artist : "Israel Salazar",
    file: "No Meio Dos Louvores-Israel Salazar",
    liked: false,
};
const OnomedeleeJesus = {
    songName: "O nome dele é Jesus",
    artist : "Dunamis",
    file: "O_Nome_Dele_é_jesus",
    liked: false,
};
const Pisaduras = {
    songName: "Pisaduras",
    artist : "Rodolfo Abrantes",
    file: "Pisaduras",
    liked: false,
};
const PodemorarAqui = {
    songName: "Pode Morar Aqui",
    artist : "Theo Rubia",
    file: "pode_morar_aqui",
    liked: false,
};
const SaidaFrente = {
    songName: "Sai da Frente",
    artist : "Arena Louvor",
    file: "Sai_da_Frente",
    liked: false,
};
const UmnovoCantico = {
    songName: "Um novo Cantico",
    artist : "Cabana Sounds",
    file: "Um_Novo_Cântico",
    liked: false,
};

let isPlaying = false;/// onde fica a lista das músicas
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [EstamosdePé, RealidadedoCéu, Unico, AbramasPortas, BondadedeDeus, EleVem, NadaMais, MeAtraiu,
 NomeiodosLouvores, OnomedeleeJesus, Pisaduras, PodemorarAqui, SaidaFrente, UmnovoCantico];
let sortedPlaylist = [...originalPlaylist];
let index = 0;    

function playSong(){
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    song.play();
    isPlaying = true;
}    
function pauseSong(){
    play.querySelector(".bi").classList.add("bi-play-circle-fill");
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
    song.pause();
    isPlaying = false;
}
function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }
    else {
        playSong();
    }
}
function likeButtonRender(){
    if (sortedPlaylist[index].liked === true){
        likeButton.querySelector(".bi").classList.remove("bi-heart");
        likeButton.querySelector(".bi").classList.add("bi-heart-fill");
        likeButton.classList.add("button-active");
    }
    else {
        likeButton.querySelector(".bi").classList.add("bi-heart");
        likeButton.querySelector(".bi").classList.remove("bi-heart-fill");
        likeButton.classList.remove("button-active");
    }
}
function initializeSong(){ ///Função de busca da img,song.
    cover.src = `images/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
}
function previousSong(){///voltar música
    if(index === 0){
        index = sortedPlaylist.length - 1;
    }
    else{
        index -=1;
    }
    initializeSong();
    playSong();///Quando avançar, já vai tocar.
}
function nextSong(){///avançar a música
    if(index === sortedPlaylist.length - 1){
        index = 0;
    }
    else{
        index += 1;
    }
    initializeSong();
    playSong();///Quando avançar, já vai tocar.
}
function updateProgress(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}
function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = ( clickPosition/width) * song.duration;
    song.currentTime = jumpToTime;
}
function shuffleArray(preShuffleArray){
    const size = sortedPlaylist.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}
function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add("button-active");
    }
    else{
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove("button-active");
    }
}
function repeatButtonClicked(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add("button-active");
    }
    else {
        repeatOn = false;
        repeatButton.classList.remove("button-active");
    }
}
function nextOrRepeat(){ /// função para o fim da música, se vai avançar ou repetir.
    if (repeatOn === false){
        nextSong();
    }
    else {
        playSong();
    }
}
function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, '0')}:${min.toString().
        padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
function updateTotalTime(){
  totalTime.innerText = toHHMMSS(song.duration);
}
function likeButtonClicked(){
    if(sortedPlaylist[index].liked === false){
        sortedPlaylist[index].liked = true; 
    }
    else {
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem("playlist", JASON.stringfy(originalPlaylist));
}

initializeSong();

play.addEventListener("click", playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgress);
song.addEventListener("ended", nextOrRepeat);
song.addEventListener("loadedmetadata", updateTotalTime);
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click", shuffleButtonClicked);
repeatButton.addEventListener("click", repeatButtonClicked);
likeButton.addEventListener("click", likeButtonClicked);
