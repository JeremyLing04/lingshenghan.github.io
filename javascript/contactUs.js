function saveToCookie() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;
    
    const formData = {
      name: name,
      email: email,
      feedback: feedback
    };
    
    const formDataString = JSON.stringify(formData);
    
    document.cookie = "formData=" + encodeURIComponent(formDataString) + "; max-age=604800; path=/";
 }

function thanks(){
    alert('Thanks for your feedback!');
    location.reload();
}

document.querySelector('.btn').onclick = function() {
    saveToCookie();
    thanks(); 
  };