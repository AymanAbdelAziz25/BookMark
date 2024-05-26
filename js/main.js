var bookmarkName = document.getElementById("bookmarkName");
var bookmarkSite = document.getElementById("bookmarkSite");
var list = document.getElementById("demoList");
var bookmarkList = [];
if (localStorage.bookmarkList !== null) {
    bookmarkList = JSON.parse(localStorage.bookmarkList);
    bookmarkDisplay(bookmarkList);
};
function bookmarkSave() {
    if (validateUrl() === true && bookmarkName.value !== "") {
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
        bookmarkSite.classList.add("is-valid");
        bookmarkSite.classList.remove("is-invalid");
        var bookmark = {
            name: bookmarkName.value,
            site: bookmarkSite.value,
        };
        bookmarkList.push(bookmark);
        localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
        bookmarkDisplay(bookmarkList);
    }
    else if (bookmarkName.value === "" && validateUrl() === false) {
        Swal.fire({
            title: "Oops...",
            text: "Please Enter Valid Site Name & Site URL",
            icon: "error",
        });
        soundAlarm();
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");
        bookmarkSite.classList.add("is-invalid");
        bookmarkSite.classList.remove("is-valid");
    }
    else if (validateUrl() === false) {
        Swal.fire({
            title: "Oops...",
            text: "Please Enter Valid Site URL",
            icon: "error",
        });
        soundAlarm();
        bookmarkSite.classList.add("is-invalid");
        bookmarkSite.classList.remove("is-valid");
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
    }
    else if (bookmarkName.value === "") {
        Swal.fire({
            title: "Oops...",
            text: "Please Enter Valid Site Name",
            icon: "error"
        });
        soundAlarm();
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");
        bookmarkSite.classList.add("is-valid");
        bookmarkSite.classList.remove("is-invalid");
    }

};

function bookmarkDisplay(bList) {
    console.log(bList);
    var box = "";
    for (var i = 0; i < bList.length; i++) {

        box += `
        <div class="col-3">
        <p class="h6 py-2 my-2">${i + 1}</p>
        </div>
        <div class="col-3">
        <p class="h6 py-2 my-2">${bList[i].name}</p>
        </div>
        <div class="col-3">
        <a type="button" href='${bList[i].site}' target="_blank" class="btn my-2 btn-success"><i class="fa-solid fa-eye me-2"></i>Visit</a>
        </div>
        <div class="col-3">
        <button type="button" onclick="bookmarkDelete(${i})" class="btn my-2 btn-danger"><i class="fa-solid fa-trash-can me-2" ></i>Delete</button>
        </div> `;
    };
    list.innerHTML = box;
};
function bookmarkDelete(index) {
    bookmarkList.splice(index, 1);
    localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
    bookmarkDisplay(bookmarkList);
};
function validateUrl() {
    var pattern = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    console.log(pattern.test(bookmarkSite.value));
    return (pattern.test(bookmarkSite.value));
};
function soundAlarm(){
    var snd = new Audio('../audio/Beep Alarm.mp3');
    snd.play();
}

