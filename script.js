    // var url = new URLSearchParams(window.location.search);    
    // var chosenUser = url.get("username");
    
    // var chosenUser = "6thSence";	// для проверки
    // var gitUrl = "https://api.github.com/users/";
    // var FullGitUrl = gitUrl + chosenUser;


fetch("https://api.github.com/users/defunkt")
.then(res => res.json())
.then(json => {
	console.log(json);
	if (json.message === "Not Found") {
	    var error = document.createElement("error");
	    error.innerHTML = "Информация о пользователе не доступна!";
	    error.classList.add("err");
	    document.body.appendChild(error);
	} else {

		var userProfile = json.html_url;

		var userAvatar = document.createElement("img");
			userAvatar.src = json.avatar_url;
			document.body.appendChild(userAvatar);

		var userName = document.createElement("a");
			userName.href = json.html_url;
			userName.innerHTML = json.name;
			document.body.appendChild(userName);

		var userBio = document.createElement("div");
			userBio.innerHTML = json.bio;
			document.body.appendChild(userBio);
	}
})
.catch(err => {
	console.log('Информация о пользователе не доступна');
})