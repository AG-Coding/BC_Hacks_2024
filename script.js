//Add an event listener to the toggler checkbox to listen for changes (when checked or unchecked)
document.querySelector('.toggler').addEventListener('change', function() {
  const toggler = this;
  const hamburger = document.querySelector('.hamburger > div');
  const menu = document.querySelector('.menu');
  const menuDiv = document.querySelector('.menu > div');
  const links = document.querySelectorAll('.menu > div a');
  
  //Check if the toggler (checkbox) is checked
  if (toggler.checked) {
      menu.style.width = "30vw";
      menu.style.opacity = "1";
      menuDiv.style.opacity = "1";
      links.forEach(link => link.style.opacity = "1");
  } else {
      menu.style.width = "0";
      menu.style.opacity = "0";
      menuDiv.style.opacity = "0";
      links.forEach(link => link.style.opacity = "0");
  }
});
