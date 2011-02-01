function printCurrentDate()
{
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	return (month + "/" + day + "/" + year);
}

function formatDate(dateValue, format) { 

/**
*	For example, the following are valid format strings: 
*	MM/DD/YYYY This will be a two digit month, then a slash, then a two digit day, then a slash, then a four digit year. 
*	DD-MM-YYYY This will be a two digit day, then a dash, then a two digit month, then a dash, then a four digit year. 
*	YYYY/M/D This will be a four digit year, then a slash, then the month without a leading zero, then a slash, then a day without a leading zero. 
*
*	The following are not valid format strings: 
*	MM/DD-YYYY This is not valid because the separator needs to be the same in both positions. 
*	MM~DD~YYYY This is not valid because the tilde is not a valid separator. 
*	MM/DD/YY This is not valid because the year has to be 4 digits. 
*
*   */


// The first part of the code validates the format: 

    var fmt = format.toUpperCase(); 
    var re = /^(M|MM|D|DD|YYYY)([\-\/]{1})(M|MM|D|DD|YYYY)(\2)(M|MM|D|DD|YYYY)$/; 
    if (!re.test(fmt)) { fmt = "MM/DD/YYYY"; } 
    if (fmt.indexOf("M") == -1) { fmt = "MM/DD/YYYY"; } 
    if (fmt.indexOf("D") == -1) { fmt = "MM/DD/YYYY"; } 
    if (fmt.indexOf("YYYY") == -1) { fmt = "MM/DD/YYYY"; } 
 
// The next thing the code does is get one and two digit months, one and two digit days, and a four digit year: 

    var M = "" + (dateValue.getMonth()+1); 
    var MM = "0" + M; 
    MM = MM.substring(MM.length-2, MM.length); 
    var D = "" + (dateValue.getDate()); 
    var DD = "0" + D; 
    DD = DD.substring(DD.length-2, DD.length); 
    var YYYY = "" + (dateValue.getFullYear()); 

// The next thing to do is figure out what separator was used and split up the format string into three pieces based on the separator. 

    var sep = "/"; 
    if (fmt.indexOf("-") != -1) { sep = "-"; } 
    var pieces = fmt.split(sep); 
    var result = ""; 

// Finally, the variable result is built with the three pieces. Each piece needs to be looked at independently and the correct variable added to the result string. For example, here is the first part of the result: 

    switch (pieces[0]) { 
         case "M" : result += M + sep; break; 
         case "MM" : result += MM + sep; break; 
         case "D" : result += D + sep; break; 
         case "DD" : result += DD + sep; break; 
         case "YYYY" : result += YYYY + sep; break; 
    } 

// If the first piece is the month without a leading zero, then the variable M and the separator are added to the result string. The second and third pieces of the result string are added in a similar fashion: 

    switch (pieces[1]) { 
         case "M" : result += M + sep; break; 
         case "MM" : result += MM + sep; break; 
         case "D" : result += D + sep; break; 
         case "DD" : result += DD + sep; break; 
         case "YYYY" : result += YYYY + sep; break; 
    } 
    switch (pieces[2]) { 
         case "M" : result += M; break; 
         case "MM" : result += MM; break; 
         case "D" : result += D; break; 
         case "DD" : result += DD; break; 
         case "YYYY" : result += YYYY; break; 
    } 

// When the full result string is built, that is returned as the value of the function: 

    return result; 
} 