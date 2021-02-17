let app = {
    init: function () {
        localStorage.clear();
        document.getElementById('btnAdd').addEventListener('click', addPage)
        //document.getElementById('btnBack').addEventListener('click', backClicked)
        displayHomePage();
        //set key based on device id
        app.KEY = "device" in window ? "REVIEW" + device.uuid : "REVIEWTEMPKEY";
        //check localstorage for list of reviews
        app.getReviews();
        //add click listeners for navigation
        app.addListeners();
    },

        
    getReviews: () => {
        if (localStorage.getItem(app.KEY)) {
            let str = localStorage.getItem(app.KEY);
            app.reviews = JSON.parse(str);
        }
        //app.addSampleDataToLocalStorage();
        //app.displayReviewList();
    },
    saveReview: () => {
        app.addToLocalStorage();
        app.displayReviewList();
        console.log("about to displayhome");
        displayHomePage();
        console.log("after displayhome");
        //document.getElementById("btnAddBack").click();
    },
    deleteDetail: () => {
        let itemtodelete = document.getElementById('idDetails').textContent;
        if(itemtodelete!=null)
        {
            //const filterArray = array.filter((item) => item.id !== idToRemove);
            if(localStorage.getItem("appdata") == null)
            {
                
            }
            else
            {

                let data = JSON.parse(localStorage.getItem("appdata"));
                let result = data.filter((item) => item.id !== parseInt(itemtodelete));             
                localStorage.removeItem('appdata');
                localStorage.setItem('appdata', JSON.stringify(result));
            } 
        }
        /*
        deleteDetail
        */
        document.getElementById("btnAddBack").click();
    },
    clearAddPage: () => {
        
        document.getElementById("name").value = "";
        document.getElementById('bottom').innerHTML="";
        let temprating = document.getElementById('bottom');
        document.getElementById("bottom").setAttribute("data-rating", 0);
        for(let u=0;u<5;u++)
        {
            let ratingSpant = document.createElement("span");
            ratingSpant.setAttribute("class", "star");
            ratingSpant.innerHTML += '&nbsp;';
            ratingSpant.addEventListener("click", setRating);
            temprating.append(ratingSpant);
            
        }
        document.getElementById("imgAdd").src = ""; 
    },
    addToLocalStorage: () => {
        let id = app.randomNumber(0,200);
        let tempname = document.getElementById("name").value;
        let temprating = document.getElementById("bottom").getAttribute("data-rating");
        let tempimage = document.getElementById("imgAdd").src;
        var content = {"id": id, "title": tempname, "rating": temprating, "img": tempimage  };
        let result = [content];
        
        if(localStorage.getItem("appdata") == null)
        {
            localStorage.setItem('appdata', JSON.stringify(result));
        }
        else
        {
            let data = JSON.parse(localStorage.getItem("appdata"));
            data.push(content);
            localStorage.removeItem('appdata');
            localStorage.setItem('appdata', JSON.stringify(data));
        }   
    },
    gotoViewPage: (ev) =>{
        let id = ev.currentTarget.firstChild.nextElementSibling.innerHTML;
        let data = JSON.parse(localStorage.getItem('appdata'));
        let k=0;
        while(k<data.length)
        {
            if(data[k].id===parseInt(id))
            {
                console.log("found");
                document.getElementById('imgDetails').src = data[k].img;
                document.getElementById('detailName').innerHTML = data[k].title;
                document.getElementById('idDetails').textContent = data[k].id;
                let dStars = document.createElement("div");
                dStars.classList.add('rated');
                let detailsRating = document.getElementById('detailRating');
                detailsRating.innerHTML="";
                
                let noofratings = parseInt(data[k].rating);
                for(let u=0;u<5;u++)
                {
                    let ratingSpan = document.createElement("span");
                    if(u<noofratings)
                    {
                        ratingSpan.setAttribute("class", "star rated");
                    }
                    else
                    {
                        ratingSpan.setAttribute("class", "star");
                    }
                    dStars.append(ratingSpan);
                }
                detailsRating.append(dStars);
                
            }
            k++;
        }
        displayViewPage();
    },
    clearHomePage: () => {
      document.getElementById('cards').innerHTML="";
    },
    randomNumber:(min, max)=> {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    showTakePhotoSection: () => {
        document.querySelector(".photo-button").style.display = "block";
        document.querySelector(".photo-form").style.display = "none";
    },
    showPhotoSection: () => {
        document.querySelector(".photo-button").style.display = "none";
        document.querySelector(".photo-form").style.display = "block";
    },
    addListeners: () => {
        document.getElementById('btn').addEventListener('click', app.takePicture)
        //from home to details
        document.getElementById("btnAdd").addEventListener("click", app.nav);
        //from home to add
        document.getElementById("btnDetailsBack").addEventListener("click", app.btnAddBackClicked);
        //from add to home
        document.getElementById("btnAddBack").addEventListener("click", app.btnAddBackClicked);
        document.getElementById('btnSave').addEventListener('click', app.saveReview)
        document.getElementById('btnDelete').addEventListener('click', app.deleteDetail)
        
    },
    nav: ev => {
        app.clearAddPage();
        app.showTakePhotoSection();
        let btn = ev.target;
        let target = btn.getAttribute("data-target");
        console.log("Navigate to", target);
        document.querySelector(".page.active").classList.remove("active");
        document.getElementById(target).classList.add("active");
    },
    eventListeners: function () {
        //document.getElementById('btn').addEventListener('click', app.takePicture)
        //document.getElementById('btnSave').addEventListener('click', app.saveReview)

    },
    btnAddBackClicked: function () {
        app.clearHomePage();
        app.displayReviewList();
        displayHomePage();
    },
    takePicture: function () {
        let options = {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 300,
            targetHeight: 300
        };

        navigator.camera.getPicture(app.success, app.failure, options);

    },
    success: function (imgURI) {
        document.getElementById('imgAdd').src = imgURI;
        console.log(imgURI);
        app.showPhotoSection();

        // document.getElementById('msg11').textContent = imgURI;
    },
    failure: function (error) {
        console.log(error)
    },
    displayReviewList: function () {
      app.clearHomePage();
        let data = JSON.parse(localStorage.getItem("appdata"));
        //clearHome();
        if(data==null)
        {
            return;
        }
        let fragments = document.createDocumentFragment();
        let cards = document.querySelector('.cards');
        data.forEach((review) => {
            console.log(review);
            let divCard = document.createElement("div");
            let divAvatar = document.createElement("div");
            let pID = document.createElement("p");
            let h3Name = document.createElement("h3");
            let pStars = document.createElement("div");
            

            divCard.classList.add('card');
            divAvatar.classList.add('avatar');
            pID.classList.add('id');
            h3Name.classList.add('name');
            pStars.classList.add('rated');
            let noofratings = parseInt(review.rating);
            for(let u=0;u<5;u++)
            {

                let ratingSpan = document.createElement("span");
                if(u<noofratings)
                {
                    ratingSpan.setAttribute("class", "star rated");
                }
                else
                {
                    ratingSpan.setAttribute("class", "star");
                }
                pStars.append(ratingSpan);
            }
            let photo = '';
            let customPixURL = review.img;
            divAvatar.innerHTML = `<img src="${customPixURL}"  />`;
            h3Name.textContent = `${review.title}`;
            pID.textContent = review.id;
            //pStars.textContent = review.stars;
            divCard.append(divAvatar, pID, h3Name,  pStars);  //append the `card` to `cards`
            fragments.append(divCard);  
            cards.append(divCard);
            cards.append(divCard);
            divCard.append(pID);
            divCard.append(h3Name);
            divCard.append(pStars);
            divCard.addEventListener('click',app.gotoViewPage);
        })

    }

}
if (document.deviceready) {
    document.addEventListener("deviceready", app.init)
} else {
    document.addEventListener("DOMContentLoaded", app.init)
}



function addPage()
{
  
  displayAddPage();
}
function backClicked()
{
  displayHomePage();
}

document.addEventListener("DOMContentLoaded", function () {
  let stars = document.querySelectorAll(".star");
  stars.forEach(function (star) {
    star.addEventListener("click", setRating);
  });

  let rating = parseInt(
    document.querySelector(".stars").getAttribute("data-rating")
  );
  let target = stars[rating - 1];
  target.dispatchEvent(new MouseEvent("click"));
});

function setRating(ev) {
  let span = ev.currentTarget;
  let stars = ev.currentTarget.parentNode.childNodes;
  //let stars = document.querySelectorAll(".star");
  let match = false;
  let num = 0;
  stars.forEach(function (star, index) {
    if (match) {
      star.classList.remove("rated");
    } else {
      star.classList.add("rated");
    }
    //are we currently looking at the span that was clicked
    if (star === span) {
      match = true;
      num = index + 1;
    }
  });
  document.querySelector(".stars").setAttribute("data-rating", num);
}

function displayHomePage() {
  document.getElementById("homePage").style.display = "block";
  document.getElementById("add").style.display = "none";
  document.getElementById("details").style.display = "none";
  document.querySelector(".page.active").classList.remove("active");
  document.getElementById("homePage").classList.add("active");
}

function hideHomePage() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("add").style.display = "block";
  document.getElementById("details").style.display = "block";
}

function displayAddPage() {
  document.getElementById("add").style.display = "block";
  document.getElementById("homePage").style.display = "none";
  document.getElementById("details").style.display = "none";
  document.querySelector(".page.active").classList.remove("active");
  document.getElementById("add").classList.add("active");
}

function hideAddPage() {
  document.getElementById("addPage").style.display = "none";
  document.getElementById("addPage").style.display = "block";
  document.getElementById("viewPage").style.display = "block";
}

function displayViewPage() {
  document.getElementById("details").style.display = "block";
  document.getElementById("homePage").style.display = "none";
  document.getElementById("add").style.display = "none";
  document.querySelector(".page.active").classList.remove("active");
  document.getElementById("details").classList.add("active");
}

function hideViewPage() {
  document.getElementById("viewPage").style.display = "none";
  document.getElementById("addPage").style.display = "block";
  document.getElementById("homePage").style.display = "block";
}

function pageLoad(){
  body.addEventListener("click", function()
  { 
    alert("Welcome to Reviewr!"); 
  });
}

function generatePage(){
  
}


function submitPage(){
  let btnSubmit = document.getElementById("btnSubmit");
}
