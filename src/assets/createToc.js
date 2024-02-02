//Settings
window.articleWrapperId = 'contents';
window.tableWrapperId = 'toc';

//Create the table of contents
window.addEventListener('DOMContentLoaded', function (event) {
    //Get all headings only from the actual contents.
    let contentContainer = document.getElementById(window.articleWrapperId); // Add this div to the html
    let headings = contentContainer.querySelectorAll('h2,h3,h4'); // You can do as many or as few headings as you need.
    
    let tocContainer = document.getElementById(window.tableWrapperId); // Add this div to the HTML
    // create ul element and set the attributes.
    let ul = document.createElement('ul');
    
    ul.setAttribute('id', 'tocList');
    ul.setAttribute('class', 'aside')
    
    // Loop through the headings NodeList
    for (i = 0; i <= headings.length - 1; i++) {
    
        let id = headings[i].innerHTML.toLowerCase().replace(/ /g, "-"); // Set the ID to the header text, all lower case with hyphens instead of spaces.
        let level = headings[i].localName.replace("h", ""); // Getting the header a level for hierarchy
        let title = headings[i].innerHTML; // Set the title to the text of the header
    
        headings[i].setAttribute("id", id)  // Set header ID to its text in lower case text with hyphens instead of spaces.
    
        let li = document.createElement('li');     // create li element.
        li.setAttribute('class', 'sidenav__item') // Assign a class to the li
    
        let a = document.createElement('a'); // Create a link
        a.setAttribute("href", "#" + id) // Set the href to the heading ID
        a.innerHTML = title; // Set the link text to the heading text
        
        // Create the hierarchy
        // add a class for css
        let child;
        let grandchild;
        let great_grandchild;
        if(level == 1) {
            li.appendChild(a); // Append the link to the list item  
            ul.appendChild(li);     // append li to ul.
        } else if (level == 2) {
            child = document.createElement('ul'); // Create a sub-list
            child.setAttribute('class', 'sidenav__sublist menu-list')
            li.appendChild(a); 
            child.appendChild(li);
            ul.appendChild(child);
        } else if (level == 3) {
            grandchild = document.createElement('ul');
            grandchild.setAttribute('class', 'sidenav__sublist menu-list')
            li.appendChild(a);
            grandchild.appendChild(li);
            child.appendChild(grandchild);
        } else if (level == 4) {
            great_grandchild = document.createElement('ul');
            great_grandchild.setAttribute('class', 'sidenav__sublist menu-list');
            li.append(a);
            great_grandchild.appendChild(li);
            grandchild.appendChild(great_grandchild);
        }
        
    }
    
    toc.appendChild(ul);       // add list to the container
    
    // Add a class to the first list item to allow for toggling active state.
    let links = tocContainer.getElementsByClassName("sidenav__item");
    
    links[0].classList.add('is-active');
    
    // Loop through the links and add the active class to the current/clicked link
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("is-active");
            current[0].className = current[0].className.replace(" is-active", "");
            this.className += " is_active";
        });
    }
    
    //console.log(links); 
    });