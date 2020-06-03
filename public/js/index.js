// // Get references to page elements
// var $exampleText = $('#example-text')
// var $exampleDescription = $('#example-description')
// var $submitBtn = $('#submit')
// var $exampleList = $('#example-list')

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function (example) {
//     return $.ajax({
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       type: 'POST',
//       url: 'api/examples',
//       data: JSON.stringify(example)
//     })
//   },
//   getExamples: function () {
//     return $.ajax({
//       url: 'api/examples',
//       type: 'GET'
//     })
//   },
//   deleteExample: function (id) {
//     return $.ajax({
//       url: 'api/examples/' + id,
//       type: 'DELETE'
//     })
//   }
// }

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function () {
//   API.getExamples().then(function (data) {
//     var $examples = data.map(function (example) {
//       var $a = $('<a>')
//         .text(example.text)
//         .attr('href', '/example/' + example.id)

//       var $li = $('<li>')
//         .attr({
//           class: 'list-group-item',
//           'data-id': example.id
//         })
//         .append($a)

//       var $button = $('<button>')
//         .addClass('btn btn-danger float-right delete')
//         .text('ｘ')

//       $li.append($button)

//       return $li
//     })

//     $exampleList.empty()
//     $exampleList.append($examples)
//   })
// }

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function (event) {
//   event.preventDefault()

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   }

//   if (!(example.text && example.description)) {
//     alert('You must enter an example text and description!')
//     return
//   }

//   API.saveExample(example).then(function () {
//     refreshExamples()
//   })

//   $exampleText.val('')
//   $exampleDescription.val('')
// }

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function () {
//   var idToDelete = $(this)
//     .parent()
//     .attr('data-id')

//   API.deleteExample(idToDelete).then(function () {
//     refreshExamples()
//   })
// }

// // Add event listeners to the submit and delete buttons
// $submitBtn.on('click', handleFormSubmit)
// $exampleList.on('click', '.delete', handleDeleteBtnClick)

var cartArray = []
var cartPrice = []
var cartImage = []
var calculatedCost
const reducer = (a, b) => a + b

$('#productId').on('click', 'li', function(event) {
    event.preventDefault()
    console.log('add to cart button was clicked')
    var id = $(this).attr('id')
    console.log('this is the id of the item we are adding', id)
    var productName = $(this).attr('value')
    console.log(productName)
    var price = $(this).attr('price')
    var image = $(this).attr('image')
    cartImage.push(image)

    cartPrice.push(parseInt(price))
        // this worked just console logged before
    calculatedCost = cartPrice.reduce(reducer)
    console.log(calculatedCost)
    cartArray.push(productName)
    console.log('items in cart: ', cartArray)
})

$('#view-cart').on('click', function(e) {
    // e.preventDefault()
    console.log(cartPrice)
    localStorage.setItem("cartPrice", JSON.stringify(cartPrice));
    localStorage.setItem("cartArray", JSON.stringify(cartArray));
    localStorage.setItem("calculatedCost", calculatedCost);
    localStorage.setItem("cartImage", JSON.stringify(cartImage))
    // alert(cartArray)

    $.post('/cart', {
        cartArray,
        calculatedCost,
        cartImage
    })
})

// $('#submitpymt').on('click', function(event) {
//     $.get('/Purchase-Success')
//     //this needs work to reroute to purchase-success page
//     // we may have to put this in the same handler in card.js - we'll ask our trusty instructors :)
//     // my logic here is that ^^ if we do this re-route onclick, we're not necessarily doing the stripe payment auth
//     // so after the stripe payment auth, in that same event handler in card.js, we could tag on a .then
//     // to route us to the purchase-success page
//     // so this might not be the most appropriate place for this
// })