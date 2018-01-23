// An array that lists all types of coins in PenniesAmount
//             [£2,  £1,  50p,20p,10p,5p,2p,1p]
var CoinsArr = [200, 100, 50, 20, 10, 5, 2, 1];

// The regular expression in which all input would be tested against it.
var InputPattern = new RegExp("^(£?[0-9]+(?:.?[0-9]+))(p)?$");

// Define a global variable to handle the input value
var AmountFieldValue;

$(document).ready(function() {

  // if the user presses Enter in the input field
  $("#AmountField").keypress(function(e) {
    if (e.keyCode == 13) {
      // trigger the click event on the Go button
      $("#GoBtn").click();
    }
  });

  // if the Go button pressed
  $("#GoBtn").click(function() {
    //get the input value from the input field
    AmountFieldValue = $("#AmountField").val();

    // calculate the number of coins in the value
    var CoinsResult = CalcCoins(AmountFieldValue);
    // if the result is not empty
    if (CoinsResult != null) {
      // show the result div to show the coins count
      showResultsDiv(CoinsResult);
    } else {
      // hide the result div as there is no result
      hideResultsDiv();
    }

  });
});

/**
 * CalcCoins - Counts how many coin in the input value
 *
 * @param  String AmountFieldValue The input value from user
 * @return Array             an array of the count of all coins
 */
function CalcCoins(AmountFieldValue) {
  if (AmountFieldValue.length == 0) {
    //if the value is empty!
    //alert("Empty: Check the input value!");
    $("#errorMsg").html("Empty: Check the input value!");
    $("#errorMsgDiv").show().delay(5000).fadeOut();
    return null;
  } else {
    // a Counter of each coin
    var CoinsResult = [0, 0, 0, 0, 0, 0, 0, 0];
    //check if the input value is valid!
    if (isValidInput(AmountFieldValue)) {
      // get the input value in pennies.
      var PenniesAmount = convertToPennies(AmountFieldValue);
      if (PenniesAmount >= 1) {
        //loop through the predefined CoinsArr to count coins.
        for (var i = 0; i < CoinsArr.length; i++) {
          // if the current value is bigger than the coin in pennies
          if (PenniesAmount >= CoinsArr[i]) {
            // The equivalent coin counter equals the largest
            // integer less than or equal to the result of the division
            CoinsResult[i] = Math.floor(PenniesAmount / CoinsArr[i]);
            //deduct the pennies to go to next coin.
            PenniesAmount = (PenniesAmount - (CoinsResult[i] * CoinsArr[i]));
          }
        }
        // return the final counts
        return CoinsResult;
      }
    } else {
      // the input does not match the input pattern
      //alert("Invalid Input");
      $("#errorMsg").html("<p>Invalid Input: value must be in the following styles: <br> 432, 213p, £16.23p, £14, £54.04, £23.33333, or 001.41p</p>");
      $("#errorMsgDiv").show().delay(7000).fadeOut();
      return null;
    }
  }
}

/**
 * convertToPennies - This function will check if the input is in the style of GBP or Pennies.
 * if the value is in GBP style, it will be converted into Pennies
 * if the value is in Pennies style, it will be returned as it is
 * @param  String AmountFieldValue The input value from user
 * @return return an integer of the equivalent pennies of the input value.
 */
function convertToPennies(AmountFieldValue) {
  // if there is '£' sign only then the value is in GBP style.
  // Also, if there is a combination of both '£' and 'p' it will be in GBP style.
  //
  if (isValidInput(AmountFieldValue)) {
    var newAmountVal = cleanAmountText(AmountFieldValue);

    if (AmountFieldValue.charAt(0) == '£' || (AmountFieldValue.charAt(0) == '£' && AmountFieldValue.charAt(AmountFieldValue.length - 1) == 'p')) {
      //number is in GBP style
      return (Math.floor(parseFloat(newAmountVal) * 100));
    } else if (AmountFieldValue.charAt(AmountFieldValue.length - 1) == 'p' && newAmountVal.indexOf(".") == -1) {
      // if the input doesn't have a floating point, then it is Pennies style.
      // No conversion required!
      return (Math.floor(parseFloat(newAmountVal)));
    } else if (AmountFieldValue.charAt(AmountFieldValue.length - 1) == 'p' && newAmountVal.indexOf(".") >= 0) {
      // if the input has a floating point, then it is GBP style and it needs to be converted.
      return (Math.floor(parseFloat(newAmountVal) * 100));
    } else if (newAmountVal.indexOf(".") >= 0) {
      // if the input has a floating point, then it is GBP style and it needs to be converted.
      return (Math.floor(parseFloat(newAmountVal) * 100));
    } else {
      // if the input doesn't have a floating point, '£' or 'p', then it is Pennies style.
      // No conversion required!
      return (Math.floor(parseFloat(newAmountVal)));
    }
  } else {
    // the input does not match the input pattern
    return -1;
  }

}

/**
 * cleanAmountText - reomve the '£' & 'p' chars if there is any.
 *
 * @param  String AmountFieldValue The input from user
 * @return String             A string without '£' & 'p' chars.
 */
function cleanAmountText(AmountFieldValue) {
  if (isValidInput(AmountFieldValue)) {
    if ((AmountFieldValue.charAt(0) == '£' && AmountFieldValue.charAt(AmountFieldValue.length - 1) == 'p')) {
      //if the input includes both signs
      return (AmountFieldValue.substring(1, AmountFieldValue.length - 1));
    } else if (AmountFieldValue.charAt(0) == '£') {
      //if the input includes '£' sign at the begining
      return (AmountFieldValue.substring(1, AmountFieldValue.length));
    } else if (AmountFieldValue.charAt(AmountFieldValue.length - 1) == 'p') {
      //if the input includes 'p' sign at the end
      return (AmountFieldValue.substring(0, AmountFieldValue.length - 1));
    } else {
      //if the input has none of the signs.
      return (AmountFieldValue);
    }
  } else {
    // the input does not match the input pattern
    return -1;
  }
}

/**
 * isValidInput - Checks the input value if it meets the input pattern or not.
 *
 * @param  String AmountFieldValue The input from user
 * @return bool            True or False
 */
function isValidInput(AmountFieldValue) {
  // test the input value against the Input Pattern Specified.
  return (InputPattern.test(AmountFieldValue));
}

/**
 * showResultsDiv - Shows the alert div according to the calculated coin count
 *
 * @param  Array CoinsResult The number of each coin counted.
 */
function showResultsDiv(CoinsResult) {
  for (var i = 0; i < CoinsResult.length; i++) {
    var id = ("#" + CoinsArr[i] + "pCoin");
    if (CoinsResult[i] > 0) {
      // html <h3> includes the number of the counted result.
      var CoinCountContent = "<h3>" + CoinsResult[i] + "</h3>";
      // replace the content of .CoinCount class
      $((id + " .CoinCount")).html(CoinCountContent);
      // show the coin in the result div
      $(id).css("display", "inline-block");

    } else {
      // hide the coin in the result div
      $(id).css("display", "none");
    }
  }
  // show th result div
  $('#Result_Div').show();

}

/**
 * hideResultsDiv - Hides the results div when there is no a valid input
 *
 */
function hideResultsDiv() {
  $('#Result_Div').hide();
}
