let preload = document.getElementById("cube-loader");
let url = new URLSearchParams(window.location.search);    
let chosenUser = url.get("username");
let date = new Date;
let dateInfo;

const getDate = new Promise((resolve, reject) => {
    setTimeout(() => date ? resolve(date) : reject('error!'), 1000);
});

const getUserName = new Promise((resolve, reject) => {
    setTimeout (() => chosenUser ? resolve(chosenUser) : reject('not found!'), 3000);
});

const preloader = setTimeout(() => {
    preload.classList.toggle('hidden');
}, 3000);


if(url.has(`username`) && chosenUser !== ``) {
    Promise.all([getDate, getUserName])
    .then(([date, chosenUser]) => {
        dateInfo = date;
        return fetch(`https://api.github.com/users/${chosenUser}`);
})

.then(res => res.json())
.then(json => {
	console.log(json);
	if (json.message === "Not Found") {
	    let error = document.createElement("error");
	    error.innerHTML = "Информация о пользователе не доступна!";
	    error.classList.add("err");
	    document.body.appendChild(error);
	} else {

		let userProfile = json.html_url;

		let userAvatar = document.createElement("img");
			userAvatar.src = json.avatar_url;
			document.body.appendChild(userAvatar);

		let userName = document.createElement("a");
			userName.href = json.html_url;
			userName.innerHTML = json.url.slice(29);
			document.body.appendChild(userName);

		let userBio = document.createElement("div");
			userBio.innerHTML = json.bio;
			document.body.appendChild(userBio);
	}
})
.catch(err => {
	console.log('Информация о пользователе не доступна');
})