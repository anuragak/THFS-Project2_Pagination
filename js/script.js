//set up a global array containing an index of li tags
let liArray = [];
$('.student-item').map(i=>liArray.push(i));

/*appendPageLinks function summary:
1.Removes pagination div if exists, then adds one.
2.Adds the the li & link tags to pagination div.
3.Inside the link tag event handler:
  3a.Initialises currentPage.
  3b.Passes currentPage to the setup function along with liArray. (liArray not edited)
  3c.Removes any active css class and adds it to the current page.*/
function appendPageLinks(liArray) {
  //if exists remove pagination div and all it's contents
  $('.pagination').remove();

  //create a new pagination div with child ul tags
  $(".page").append("<div class='pagination'><ul/></div>");

  //work out the total number of totalPages
  const totalPages = Math.ceil(liArray.length / 10);

  if(totalPages === 1){return};

  //for each page add a link tag
  for (let i = 0; i < totalPages; i++) {
    //if first page, add a css class named active
    i===0 ?
    $(".pagination ul").append(`<li><a href='#' class ='active'>${ i + 1 }</a></li>`)
    : $(".pagination ul").append(`<li><a href='#'>${ i + 1 }</a></li>`);

  }//end of for loop
  console.log(`appendPageLinks function fired, liArray = ${liArray.length}`);
  //event handler for all link tags, only fires when links are clicked
  $('.pagination ul li a').on('click', (event) => {
    //current page number definied, and passed to setup function along with liArray
    const currentPage = parseInt($(event.target).text());
    setup(currentPage, liArray);
    console.log(`event handler function fired, liArray = ${liArray.length}`);
    //remove css class active and then assign it to current page
    $('.pagination ul li a').removeClass('active');
    $(event.target).addClass('active');
  });//end of event handler
} //end of function

/*setup function summary:
1.Removes the dynamic counter span if it exists, then adds one.
2.Hides all student-item li tags.
3.Loops through the liArray and conditionally adds student-item li tags if they
  belong on the current page.*/
function setup(currentPage, liArray) {

  const upperLimit = 10 * currentPage;
  const lowerLimit = upperLimit - 10;

  $('.count').remove();
  //add student counter
  $(".page-header")
  .append(`<span class='count'>Number of students: </span>`)
  .append($(`<span class='count'>${ liArray.length }</span>`).hide().fadeIn());


  //hide all li tags
  $('.student-item').hide();

  //display li tags that belong on current page
  for (let i = 0; i < liArray.length; i++) {
    if (i >= lowerLimit && i < upperLimit) {
      $('.student-item').eq(liArray[i]).fadeIn();
    }//end of if statement
  }//end of for loop
}//end of function

/*currentPage is declared in the appendPageLinks event handler, so we are passing
it an inital value of 1 when the page loads*/
setup(1, liArray);
appendPageLinks(liArray);

//add an input field
$(".page-header")
.append('<input id="search" placeholder="Search for students...">');

//add event listener to input field, pass keyupEvent function as call back
$('#search').keyup(keyupEvent);

/*keyupEvent function summary
1.
2.
3.*/
function keyupEvent (){
  //remove student counter
  $('.count').remove();
  //clear the contents of the li array
  liArray = [];
  //input holds a string from the input field
  let input = $('#search').val().trim().toLowerCase();
  //initiate a bool to store state, default false
  let match = false;

  //for each h3 name string is stored in name
  for (let i = 0; i < $('.student-item').length; i++) {
    let name = $('.student-item h3').eq(i).text();

    //if the input from the input field contains strings matching our name string
    //for(let i = 0; i<$('.student-item').length; i++){
    if(name.includes(input)) {
      //push the index of that li/h3 tag into liArray
      liArray.push(i);
      //we have a match
      match = true;
    }//end of if statement
  }//end of for loop

  //update our two functions with a new li array
  setup(1, liArray);
  appendPageLinks(liArray);

  //if lost div exists remove it
  $('.lost').remove();
  //if match is false create a lost div to contain a message to the user
  if (!match) {
    $('.page-header')
    .after($(`<div class='lost'>
    <span class='yikes-title'>Yikes! </span><br>
    <span class='yikes'>It appears "${ input }"
    doesn't match with any of our students.</span><br>
    <img src="img/gone.jpeg" class="gone" alt="">
    </img></div>`).hide().fadeIn(1500));
  }//end of if statement
}//end of function
