 window.addEventListener("load", function () {   // to execute the function when the window is loaded properly. 
    const search = window.location.search;    //fetches the property_id from url   
    const params = new URLSearchParams(search);   //converts the id to an object
    const property_id = params.get('property_id');   
  
    var is_interested_image = document.getElementsByClassName("is-interested-image")[0];
    is_interested_image.addEventListener("click", function (event) {
      var XHR = new XMLHttpRequest();    //eventlistener executes the function when the pic is clicked.
  
      // On success
      XHR.addEventListener("load", toggle_interested_success);
  
      // On error
      XHR.addEventListener("error", on_error);
  
      // Set up request
      XHR.open("GET", "api/toggle_interested.php?property_id=" + property_id);
  
      // Initiate the request
      XHR.send();
  
      document.getElementById("loading").style.display = 'block';
      event.preventDefault();
    });
  });
  
  var toggle_interested_success = function (event) {
    document.getElementById("loading").style.display = 'none';
  
    var response = JSON.parse(event.target.responseText);
    if (response.success) {
      var is_interested_image = document.getElementsByClassName("is-interested-image")[0];
      var interested_user_count = document.getElementsByClassName("interested-user-count")[0];
  
      if (response.is_interested) {
          is_interested_image.classList.add("fas");
          is_interested_image.classList.remove("far");
          interested_user_count.innerHTML = parseFloat(interested_user_count.innerHTML) + 1;
      }
      else {
          is_interested_image.classList.add("far");
          is_interested_image.classList.remove("fas");
          interested_user_count.innerHTML = parseFloat(interested_user_count.innerHTML) - 1;
      }
    } else if (!response.success && !response.is_logged_in) {
      //if user tries to mark a property interested without logging in, this code runs
      window.$("#login-modal").modal("show");
    }
  };
  
  