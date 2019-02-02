function getCookie( name ) {
    var dc,
        prefix,
        begin,
        end;

    dc = document.cookie;
    prefix = name + "=";
    begin = dc.indexOf("; " + prefix);
    end = dc.length; // default to end of the string

    // found, and not in first position
    if (begin !== -1) {
        // exclude the "; "
        begin += 2;
    } else {
        //see if cookie is in first position
        begin = dc.indexOf(prefix);
        // not found at all or found as a portion of another cookie name
        if (begin === -1 || begin !== 0 ) return null;
    } 

    // if we find a ";" somewhere after the prefix position then "end" is that position,
    // otherwise it defaults to the end of the string
    if (dc.indexOf(";", begin) !== -1) {
        end = dc.indexOf(";", begin);
    }

    return decodeURI(dc.substring(begin + prefix.length, end) ).replace(/"/g, ''); 
}

// Animation code adapted from https://css-tricks.com/using-css-transitions-auto-dimensions/
function collapseSection(element) {
    // get the height of the element's inner content, regardless of its actual size
    var sectionHeight = element.scrollHeight;
    
    // temporarily disable all css transitions
    console.log(element.style)
    console.log(element)
    console.log(element.style.transition)
    var elementTransition = element.style.transition
    element.style.transition = '';
    
    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we 
    // aren't transitioning out of 'auto'
    requestAnimationFrame(function() {
      element.style.height = sectionHeight + 'px';
      element.style.paddingTop = '0'
      element.style.paddingBottom = '0'
      element.style.transition = elementTransition;
      
      // on the next frame (as soon as the previous style change has taken effect),
      // have the element transition to height: 0
      requestAnimationFrame(function() {
        element.style.height = 0 + 'px';
      });
    });
    
    // mark the section as "currently collapsed"
    element.setAttribute('data-collapsed', 'true');
  }
  
