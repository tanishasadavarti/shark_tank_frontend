
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}


let productdata=[]
function Fetchdata() {
    fetch("https://add-to-cart-backend-4v0v.onrender.com/pitches").then((res) => res.json())
        .then((data) => {
            Cardlist(data)
            productdata=data
        })
        .catch((err) => console.log(err))
}
Fetchdata()


function Cardlist(data){
    const store=data.map((el)=>Card(el.id,el.image,el.title,el.price,el.founder,el.category,el.description))
    mainSection.innerHTML=store.join("")
}

function Card(id,image,title,price,founder,category,description){
    let singlecard=`
    <a href="discription.html?image=${encodeURIComponent(image)}&title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(founder)}&description=${encodeURIComponent(description)}"style="width:100%;text-decoration:none;height:300px>
    <div class="card" data-id=${id}>
        <div class="card-img">
      <img src=${image} alt="pitch"style="width:70%">
        </div>
    <div class="card-body">
      <h4 class="card-title"style="color:black">${title}</h4>
      <p class="card-founder"style="color:black">Founder:${founder}</p>
      <p class="card-category"style="color:black">${category}</p>
      <p class="card-price"style="color:black">${price}</p>
      <a href="#"id="card-link"class="card-link"style="color:white;text-decoration:none;background-color:black;padding:10px 25px;font-weight:bold;border-radius:5px"data-id=${id}>Edit</a>
      <button class="card-button"data-id=${id}>Delete</button>
    </div>
  </div>
  </a>
    `
    return singlecard
}

// POST PART 

pitchCreateBtn.addEventListener("click",()=>{
let product={
    title:pitchTitleInput.value,
    price:pitchPriceInput.value,
    category:pitchCategoryInput.value,
    image:pitchImageInput.value,
    founder:pitchfounderInput.value,

}
//    console.log(product) 
fetch("https://add-to-cart-backend-4v0v.onrender.com/pitches",{
    method:"POST",
    headers :{
        'content-type':'application/json',
    },
    body:JSON.stringify(product)
}).then((res)=>res.json())
.then((data)=>{
    console.log(data)
    alert("product added....")
}).catch((err)=>{
    console.log(err)
    alert("somthing went wrong!")
})
})

// delete part 


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-button")) {
        console.log(e.target.dataset.id);
        deleteProduct(e.target.dataset.id);
    }
});

function deleteProduct(id) {
    fetch(`https://add-to-cart-backend-4v0v.onrender.com/pitches/${id}`, {
        method: "DELETE"
    })
    .then((res) => res.json())
    .then((data) => {
        alert("Deleted....");
        console.log(data);
    })
    .catch((err) => console.log(err));
}


// filter 
// <------------ food---------------->

filterFood.addEventListener("click",()=>{
    let store=productdata.filter((el)=>el.category==="Food")
    console.log(store)
    Cardlist(store)
})

// <------------ Electronics---------------->
filterElectronics.addEventListener("click",()=>{
    let filterdata=productdata.filter((el)=>el.category==="Electronics")
    console.log(filterdata)
    Cardlist(filterdata)
})

// <------------ Electronics---------------->
filterPersonalCare.addEventListener("click",()=>{
    let filterdata=productdata.filter((el)=>el.category==="filter-Personal-Care")
    console.log(filterdata)
    Cardlist(filterdata)
})

// sorting part

sortAtoZBtn.addEventListener("click",()=>{
    const sortAtoZdata=productdata.sort((a,b)=>a.price - b.price)
    // console.log(sortAtoZBtn)
    Cardlist(sortAtoZdata)

})

sortZtoABtn.addEventListener("click",()=>{
    const sortAtoZdata=productdata.sort((a,b)=>b.price - a.price)
    // console.log(sortAtoZBtn)
    Cardlist(sortAtoZdata)

})
// <---------------uodate all data ------------------->
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-link"))
        {
            let id=e.target.dataset.id
            populateform(id)
        }
})
function populateform(id){
    fetch(`https://add-to-cart-backend-4v0v.onrender.com/pitches/${id}`).then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        updatePitchTitleInput.value=data.title
        updatePitchImageInput.value=data.image
        updatePitchfounderInput.value=data.founder
        updatePitchCategoryInput.value=data.category
        updatePitchPriceInput.value=data.price
        updatePitchIdInput.value=data.id
    })
    .catch((err)=>console.log(err))
}
updatePitchBtn.addEventListener("click",()=>{
    // console.log(updatePitchPriceInput.value)
    let updateproductdata={
        title:updatePitchTitleInput.value,
        image:updatePitchImageInput.value,
        founder:updatePitchfounderInput.value,
        category:updatePitchCategoryInput.value,
        price:updatePitchPriceInput.value,
        id:updatePitchIdInput.value
    }
    console.log(updateproductdata)
    fetch(`https://add-to-cart-backend-4v0v.onrender.com/pitches/${updateproductdata.id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(updateproductdata)
    }).then((res)=>res.json())
    .then((data)=>{
        alert("data updated.....")

    })
    .catch((err)=>console.log(err))
})
// -------------------price update-----------------

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-link"))
        {
            let id=e.target.dataset.id
            populateprice(id)
        }
})
function populateprice(id){
    fetch(`https://add-to-cart-backend-4v0v.onrender.com/pitches/${id}`).then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        updatePricePitchPrice.value=data.price
        updatePricePitchId.value=data.id
    })
    .catch((err)=>console.log(err))
}
updatePricePitchPriceButton.addEventListener("click",()=>{
    // console.log(updatePitchPriceInput.value)
    let updateprice={
        price:updatePricePitchPrice.value,
        id:updatePricePitchId.value
    }
    console.log(updateprice)
    fetch(`https://add-to-cart-backend-4v0v.onrender.com/pitches/${updateprice.id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(updateprice)
    }).then((res)=>res.json())
    .then((data)=>{
        alert("price updated.....")

    })
    .catch((err)=>console.log(err))
})