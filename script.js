     let url = new URLSearchParams(window.location.search);    
     let chosenUser = url.get("username");
    
     //let chosenUser = "6thSence";	// для проверки
     let gitUrl = "https://api.github.com/users/";
     let FullGitUrl = gitUrl + chosenUser;


fetch(FullGitUrl) //"https://api.github.com/users/defunkt"
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