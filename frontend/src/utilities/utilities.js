// Helper function used by handleTimeInput
// This function takes a string and returns time in either 0:00 or 00:00 format, OR partial strings of these formats.
export let formatTime = (val) => {
    // prepare val into noColon string
    let noColon = val.replaceAll(':', '')// get rid of all colons
    if (parseInt(noColon[0]) === 0) noColon = noColon.substring(1, noColon.length) // if noColon starts with 0, drop it
    noColon = noColon.substring(0, 4) // and ensure noColon doesn't exceed 4 digits
    let hours = parseInt(noColon.substring(0, 2)); // get the first two digits as a number
    let output = noColon // create variable function will return

    if (parseInt(noColon[1]) > 5) noColon = noColon[0] // The second character can't be more than 5: If it is, cut it out and continue

    if (noColon.length < 2) output = noColon // If there's only one digit, don't add any colons -- this prevents full deletion
    else if (

        hours > 15 // but 13, 14 and 15 can create valid 3 digit hours too (1:32, 1:59, etc.)
        || noColon[2] > 5 // if third digit is more than 5, 1:26 , 4 digits aren't valid. ex. 12:61
        || noColon.length < 4 // If digits are 3 or fewer, we'll want colon here "0:00" anyways

    ) output = insert(noColon, ":", 1).substring(0, 4) // Format to 3 digits: 0:00

    else output = insert(noColon, ":", 2).substring(0, 5) // Format to 4 digits: 00:00

    return output
}




// Helper function used by formatTime
export function insert(s, insert, index){
    const newString = s.slice(0, index) + insert + s.slice(index);
    return newString;
}