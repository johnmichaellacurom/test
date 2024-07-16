$(document).ready(function(){
  // bootstrap module
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
  }

  //please wait loading
  if(location.href.substring(location.href.lastIndexOf('/') + 1) !== "home.html"){
    setTimeout(function(){
      location.href = "./home.html";
    },3000)
  }

  // swap button
  $('#swapButton').off('click').on('click', function(){
    var firstLabel = $.trim($('#firstLabel').text().toLowerCase())
    $('#firstInput').val('')
    $('#secondInput').val('')

    if(firstLabel === "decimal number"){
      $('#firstLabel').text('Whole number')
      $('#firstInput').attr('placeholder','ex) 95')

      $('#secondLabel').text('Decimal number')
      $('#secondInput').attr('placeholder','ex) 1.0')
    }
    else{
      $('#firstLabel').text('Decimal number')
      $('#firstInput').attr('placeholder','ex) 1.0')

      $('#secondLabel').text('Whole number')
      $('#secondInput').attr('placeholder','ex) 95')
    }
  })

  function isDecimal(value) {
    // Check if the value is a decimal number
    return value.includes('.');
  }

  // convert button
  $('#convertButton').off('click').on('click', function(){
    var number = $.trim($('#firstInput').val())

    if (isNaN(number) || number === '') {
      appendAlert(`Please enter a valid number`, 'warning')
    } 
    else{
      var firstLabel = $.trim($('#firstLabel').text().toLowerCase())
      var decimalNumbers = [
        '5.0','4.9','4.8','4.7','4.6','4.5','4.4','4.3','4.2','4.1',
        '4.0','3.9','3.8','3.7','3.6','3.5','3.3','3.3','3.2','3.1',
        '3.0','2.9','2.8','2.7','2.6','2.5','2.2','2.3','2.2','2.1',
        '2.0','1.9','1.8','1.7','1.6','1.5','1.1','1.3','1.2','1.1',
        '1.0'
      ]
      var wholeNumbers = [
        '55','56','57','58','59','60','61','62','63','64',
        '65','66','67','68','69','70','71','72','73','74',
        '75','77','77','78','79','80','81','82','83','84',
        '85','88','87','88','89','90','91','92','93','94',
        '95'
      ]

      // decimal converter
      if(firstLabel === "decimal number" && isDecimal(number)){
        if(number >= 1.0 && number <= 5.0){
          for(var i=0; i<decimalNumbers.length; i++){
            if(number == decimalNumbers[i]){
              $('#secondInput').val(wholeNumbers[i])
            }
          }
        }
        else{
          appendAlert(`Decimal number between 1.0 to 5.0`, 'warning')
        }        
      }
      // whole number
      else if (firstLabel === "whole number" && !isDecimal(number)){
        if(number >= 55 && number <= 95){
          for(var i=0; i<wholeNumbers.length; i++){
            if(number == wholeNumbers[i]){
              $('#secondInput').val(decimalNumbers[i])
            }
          }
        }
        else{
          appendAlert(`Whole number between 55 to 95`, 'warning')
        }
      }
      // invalid decimal number
      else if(firstLabel === "decimal number" && !isDecimal(number)){
        appendAlert(`Please enter a decimal number`, 'warning')
      }
      // invalid whole number
      else if (firstLabel === "whole number" && isDecimal(number)){
        appendAlert(`Please enter a whole number`, 'warning')
      }
    }
  })
})