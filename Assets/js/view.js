function refresh(){
    location.reload()
}

function remove(){ 
    document.getElementById("confirm-delete").style.visibility = "hidden";
  }

  function viewPage(id){
    window.location.href = `http://127.0.0.1:5500/show.html?id=${id}`; 
   
}
 
 function ref(){
let employee = document.getElementById('table-back');
let count = 1;
let output="";

fetch("http://localhost:3002/api/employees")
.then((res) => res.json())
.then((employ) =>{ console.log(employ); 
// const path = image.path
    employ.forEach( row=>{
     var id = row._id;
     var date = new Date(row.dob);
    output +=`
     <tr class ="pro">
    <td scope="row">${count}</th>
        <td class="zero">
        <div class="pic-setter">
        <img src="${row.image && row.image.path}" alt="">
    </div>
    
            ${row.salutation + " "+row.firstName + " "+row.lastName}
        </td>
    <td>${row.email}</td>
    <td>${row.phone}</td>
    <td>${row.gender}</td>
    <td>${date.toISOString().split('T')[0]}</td>
    <td>${row.country}</td>
    
    <td class="dropdown" class= dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="fa-solid fa-ellipsis"></i>
    <ul class="dropdown-menu">
    <li><a class="dropdown-item" onclick = "viewPage('${id}')"><i class="fa fa-sharp fa-light fa-eye" id="buttonDropdown_action"></i>view</a></li>
    <button type="button" class="btn click" data-bs-toggle="modal" data-bs-target="#exampleModa" onclick = " editDetails('${id}')"><i class="fa fa-sharp fa-light fa-pen" id="buttonDropdown_action"></i>edit</button>
      <li><button class="dropdown-item" onclick = "deletion('${id}')"><i class="fa fa-sharp fa-light fa-trash" id="buttonDropdown_action"></i>Delete</button></li>
    </ul>
    
    </td>
   
    </tr>
    
     `
   
count++;

 


    })
    employee.innerHTML=output;
    
    //============================== pagination starts here ========================
    let tag = document.getElementsByClassName('pro'); 
    console.log(tag.length);
    let pageNum = document.getElementById('pagination-num');
    let display = 5
    let flag = 1;
    let buttonCount = Math.ceil(tag.length/display)

pageNum.innerHTML="";
    
    for (let i=1; i<=buttonCount;i++){
        let button = document.createElement('button');
        button.innerHTML=i;
        pageNum.appendChild(button);
    }
    
    document.getElementById('prev-button').addEventListener('click',prev);
    document.getElementById('next-button').addEventListener('click',next);
    
    document.getElementById('prev-button').setAttribute('disabled',true)
    
    function main(pageNum) {
        let tag = document.getElementsByClassName('pro');
        let display = 4;
        let nextPage = display * pageNum;
        let prevPage = display * (pageNum - 1);
        
        for (let i = 0; i < tag.length; i++) {
          tag[i].style.display = "none";
          if(i< nextPage && i>= prevPage){
           tag[i].style.display = "table-row";
          }
        }
      }
      
      main(1);
    
          
      var buttonNumbers = pageNum.getElementsByTagName('button');
      for(let i=0; i<buttonNumbers.length; i++){
        buttonNumbers[i].addEventListener('click',buttonClick)
      }
      function buttonClick(){
        if(this.innerHTML==buttonCount){
           document.getElementById('next-button').setAttribute('disabled',true);
           document.getElementById('prev-button').removeAttribute('disabled');
        }
        else if(this.innerHTML==1){
            console.log(this.innerHTML)
            document.getElementById('next-button').removeAttribute('disabled');
            document.getElementById('prev-button').setAttribute('disabled',true);
         }
         else{
            document.getElementById('next-button').removeAttribute('disabled');
            document.getElementById('prev-button').removeAttribute('disabled');
         }
         flag = this.innerHTML;
         main(flag);
      }
    
      function prev(){
        console.log(flag)
      document.getElementById('next-button').removeAttribute('disabled');
      if(flag !==1){
        flag --;
      }
      if(flag === 1){
        document.getElementById('prev-button').setAttribute('disabled',true);
      }
      main(flag);
      }
    
    
      function next(){
        console.log(flag)
        document.getElementById('prev-button').removeAttribute('disabled');
        if(flag !== buttonCount){
            flag++
            
        }
        if(flag==buttonCount){
            document.getElementById('next-button').setAttribute('disabled',true);
        }
        
        main(flag);
      }
      
    

//============================== pagination ends here ==========================
})


}
function validate(){
    var fName = document.getElementById("firstname").value;
    var regfName =  (/^[A-Za-z]/);
    if(regfName.test(fName)){
        document.getElementById("firstname").style.border= "1px solid green";
    }else{ 
        document.getElementById("firstname").style.border= "1px solid red";
        document.getElementById("firstname").focus();
        return false;

    }

    var sName = document.getElementById("secondname").value;
    var regsName =  (/^[A-Za-z]/);
    if(regsName.test(sName)){
        document.getElementById("secondname").style.border= "1px solid green";
    }else{
        document.getElementById("secondname").style.border= "1px solid red";
        document.getElementById("secondname").focus();
        return false;

    }

    var userName = document.getElementById("username").value;
    var  regusername = /^([a-zA-Z0-9\.-])/;
    if(regusername.test(userName)){
        document.getElementById("username").style.border= "1px solid green";
    }else{
        document.getElementById("username").style.border= "1px solid red";
        document.getElementById("username").focus();
        return false;

    }
    
    var password = document.getElementById("password").value;
    if(password==""){
        document.getElementById("password").style.border= "1px solid red";
        document.getElementById("password").focus();
        return false;
    }else{
        document.getElementById("password").style.border= "1px solid green";
        
    }

    var email = document.getElementById("inputEmail4").value;
    var regemail = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})$/;
    if(regemail.test(email)){
        document.getElementById("inputEmail4").style.border= "1px solid green";
    }else{
        document.getElementById("inputEmail4").style.border= "1px solid red";
        document.getElementById("inputEmail4").focus();
        return false;

    }

    var phone = document.getElementById("inputtel4").value;
    var regphone = /^[7-9][0-9]{9}$/;
    if(regphone.test(phone)){
        document.getElementById("inputtel4").style.border= "1px solid green";
    }else{
        document.getElementById("inputtel4").style.border= "1px solid red";
        document.getElementById("inputtel4").focus();
        return false;

    }

    var date = document.getElementById("inputdate4").value;
    if(date==""){
        document.getElementById("inputdate4").style.border= "1px solid red";
        document.getElementById("inputdate4").focus();
        return false;
    }else{
        document.getElementById("inputdate4").style.border= "1px solid green";
        
    }

    var Address = document.getElementById("inputAddress").value;
    var regaddress = (/^[A-Za-z0-9]/);
    if(regaddress.test(Address)){
        document.getElementById("inputAddress").style.border= "1px solid green";
    }else{
        document.getElementById("inputAddress").style.border= "1px solid red";
        document.getElementById("inputAddress").focus();
        return false;

    }

    var qualifications = document.getElementById("qualifications").value;
    var regqulification = (/^[A-Za-z0-9]/);
    if(regqulification.test(qualifications)){
        document.getElementById("qualifications").style.border= "1px solid green";
    }else{
        document.getElementById("qualifications").style.border= "1px solid red";
        document.getElementById("qualifications").focus();
        return false;

    }

    var city = document.getElementById("city").value;
    var regcity =  (/^[A-Za-z]/);
    if(regcity.test(city)){
        document.getElementById("city").style.border= "1px solid green";
        
    }else{
        document.getElementById("city").style.border= "1px solid red";
        document.getElementById("city").focus();
        return false;
    }

    var pin = document.getElementById("pin").value;
    if(pin==""){
        document.getElementById("pin").style.border= "1px solid red";
        document.getElementById("pin").focus();
        return false;
    }else{
        document.getElementById("pin").style.border= "1px solid green";
        
    }
    // refreash();
}


ref();
function deletion(id){  
    document.getElementById('confirm-delete').style.visibility = "visible";
    var del=document.getElementById("del")
    del.addEventListener('click', ()=>{
    fetch(`http://localhost:3002/api/employees/${id}`,{
        method:'DELETE'

      });
      document.getElementById('confirm-delete').style.visibility = "hidden";

      ref();
    }
  
    )
    }


   // add new user===============================

    const addUser = document.getElementById('modal');

     
    if(addUser !== null){
    addUser.addEventListener('submit',(e)=>{
        e.preventDefault();
       

    var salutation = document.getElementById('salutation').value;
    var firstName = document.getElementById('firstname').value;
    var secondName = document.getElementById('secondname').value;
    var email = document.getElementById('inputEmail4').value;
    var telephone = document.getElementById('inputtel4').value;
    var Gender = document.getElementsByName('gender');
    for(i=0; i<Gender.length; i++ ) {
    
    if(Gender[i].checked){
       var Gender = Gender[i].value;
    }
    }
    var inputAdress = document.getElementById('inputAddress').value;
    var country = document.getElementById('country').value;
    var state = document.getElementById('state').value;
    var city = document.getElementById('city').value;
    var pin = document.getElementById('pin').value;
    var qualifications = document.getElementById('qualifications').value;  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var date = document.getElementById('inputdate4').value;


    var changedate = new Date(date);
    var formateddate = changedate.toISOString().split('T')[0]
    console.log(formateddate);
    
    var imageInput = document.getElementById('file');
    console.log(imageInput.value);

        var imageFile = imageInput.files[0];

        if (!imageFile) {
            document.getElementById('add-img').style.visibility="visible";
            document.getElementById('img-border').style.border="2px dashed red";
            return;
        }
        
        if (imageFile) {
            document.getElementById('add-img').style.visibility="hidden";
            document.getElementById('img-border').style.border="2px dashed ";
        }
        var formData = new FormData();
        formData.append('image', imageFile);
        formData.append('salutation', salutation);
        formData.append('firstName', firstName);
        formData.append('lastName', secondName);
        formData.append('email', email);
        formData.append('phone', telephone);
        formData.append('gender', Gender);
        formData.append('adress', inputAdress);
        formData.append('country', country);
        formData.append('state', state);
        formData.append('city', city);
        formData.append('pin', pin);
        formData.append('qualifications', qualifications);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('dob', formateddate);
      
         
       fetch("http://localhost:3002/api/employees",{
        method:'POST',
        headers:{
            // 'content-type':'application/json'
        },
        
        body:formData
       })
       .then(res=>res.json())
       .then((employ)=>{console.log(employ)
        refresh();
      })

        .catch(error => {
        console.error('Error:', error);})
    })
    }
    

     
  


//===========edit user ===============================================================

function editDetails(id ){
    console.log(id);
 

    fetch(`http://localhost:3002/api/employees/${id}`,{
        method:'get'
    })  
    
    .then((res)=>res.json())

    .then((employ)=>{console.log(employ)
        
    document.getElementById("edit-salu").value = employ.salutation;
    document.getElementById("edit-first").value = employ.firstName;
    document.getElementById("edit-second").value = employ.lastName;
    document.getElementById("edit-email").value = employ.email;
    document.getElementById("edit-phone").value = employ.phone;
    var changedateEdit = new Date(employ.dob);
    var formateddate = changedateEdit.toISOString().split('T')[0]
    console.log(formateddate);
    document.getElementById("edit-date").value = formateddate;
    document.getElementById("edit-quali").value = employ.qualifications;
    document.getElementById("edit-country").value = employ.country;
    document.getElementById("edit-state").value = employ.state;
    document.getElementById("edit-city").value = employ.city;

    var genders =  document.getElementsByName("Gender");
    var dbgender = employ.gender;
    for(var i=0;i<genders.length;i++){
        if(genders[i].value == dbgender){
            genders[i].checked = true;
       console.log(dbgender);
    }

    }

    document.getElementById("edit-adress").value = employ.adress;  
    document.getElementById("edit-pin").value = employ.pin;  
   const imageView = document.getElementById("img-edit"); 
   imageView.src = '';
   imageView.src = employ.image.path;
   
    console.log(employ.image.path);
    

})
const formUpdation = document.getElementById('edit-form');
formUpdation.addEventListener('submit',(e)=>{

    e.preventDefault(); 
    
    var salutation = document.getElementById('edit-salu').value;
    var firstName = document.getElementById('edit-first').value;
    var secondName = document.getElementById('edit-second').value;
    var email = document.getElementById('edit-email').value;
    var telephone = document.getElementById('edit-phone').value;
    var Gender = document.querySelector('input[name="Gender"]:checked').value;
    var inputAdress = document.getElementById('edit-adress').value;
    var country = document.getElementById('edit-country').value;
    var state = document.getElementById('edit-state').value;
    var city = document.getElementById('edit-city').value;
    var pin = document.getElementById('edit-pin').value;
    var qualifications = document.getElementById('qualifications').value;
    var date = document.getElementById('edit-date').value;
    var imageInput = document.getElementById('fileInput');
    console.log(imageInput.value);

        var imageFile = imageInput.files[0];
        
        
        var formupd = new FormData();
        formupd.append('image', imageFile);
        formupd.append('salutation', salutation);
        formupd.append('firstName', firstName);
        formupd.append('lastName', secondName);
        formupd.append('email', email);
        formupd.append('phone', telephone);
        formupd.append('gender', Gender);
        formupd.append('adress', inputAdress);
        formupd.append('country', country);
        formupd.append('state', state);
        formupd.append('city', city);
        formupd.append('pin', pin);
        formupd.append('qualifications', qualifications);
        formupd.append('dob', date);
   
        formupd.forEach((value, key) => {
            console.log(key, value);
        });
    
   
     fetch(`http://localhost:3002/api/employees/${id}`,{
        method:"PUT",
        body:formupd,
    }
)
.then(response => {
    console.log(response);
    if (response.ok) {
        console.log('Success');
    } else {
        console.error('Error:', response.statusText);
    }
    refresh();
})
.catch(error => {
    console.error('Fetch error:', error);
});
 


})
}

//search bar
function search(){
    let input = document.getElementById('site-search').value;
    input = input.toLowerCase();
    let tag = document.getElementsByTagName('tr');

    for(i=0;i<tag.length;i++){
        if(!tag[i].innerHTML.toLowerCase().includes(input)){
            tag[i].style.display = "none";
        }
        else{
            tag[i].style.display = "table-row";
        }
    }
}
 
//============================================image input===
const dropArea = document.querySelector(".card-body");
const inputFile = document.getElementById('file');
let imgView = document.getElementById('img-view');
inputFile.addEventListener("change", uploadImage);
function uploadImage() {
  let imgLink = URL.createObjectURL(inputFile.files[0]);
  const imgTAG = document.createElement('img');
  imgTAG.src = imgLink;
  imgView.textContent = "";
  imgView.appendChild(imgTAG);
  imgView.style.border = 0;
  imgView.style.width = '200px'
}


function previewImage() {
    var fileInput = document.getElementById('fileInput');
    var imgEdit = document.getElementById('img-edit');

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            imgEdit.src = e.target.result;
        }; 
        reader.readAsDataURL(fileInput.files[0]);
    }
}