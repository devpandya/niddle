function useHTML() {}

function includeHTML(element) {
  let z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = element
    ? element.getElementsByTagName("import")
    : document.getElementsByTagName("import");
  debugger;
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("file");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            let nextDiv = getNextSibling(elmnt, "div");
            nextDiv.id = file.split(".")[0];
            nextDiv.innerHTML += this.responseText;
            if (nextDiv.getElementsByTagName("import").length > 0) {
              includeHTML(nextDiv);
            }
          }
          if (this.status == 404) {
            elmnt.innerHTML += "Page not found.";
          }
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

const getNextSibling = function (elem, selector) {
  // Get the next sibling element
  var sibling = elem.nextElementSibling;

  // If there's no selector, return the first sibling
  if (!selector) return sibling;

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
};
