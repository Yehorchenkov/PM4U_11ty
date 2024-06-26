// Get the button element
const mybackbutton = document.getElementById('back_btn');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction(); };

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    mybackbutton.style.display = 'block';
  } else {
    mybackbutton.style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
