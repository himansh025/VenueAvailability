function getIndianDate() {
    // Get the current time in milliseconds
    const now = new Date();
  
    // Calculate the offset between the local time and IST (Asia/Kolkata)
    const localOffset = now.getTimezoneOffset() * 60000; // in milliseconds
    const indianOffset = 5.5 * 60 * 60000; // IST is UTC+5:30
  
    // Get the UTC time in milliseconds
    const utcTime = now.getTime() + localOffset;
  
    // Calculate the IST time
    const indianTime = utcTime + indianOffset;
  
    // Create a new Date object for IST
    const indianDate = new Date(indianTime);
  
    // console.log("Indian Date and Time: " + indianDate.toString());
    // console.log("Year: " + indianDate.getFullYear());
    // console.log("Month: " + (indianDate.getMonth() + 1)); // Months are zero-based
    // console.log("Date: " + indianDate.getDate());
    // console.log("Hours: " + indianDate.getHours());
    // console.log("Minutes: " + indianDate.getMinutes());
    // console.log("Seconds: " + indianDate.getSeconds());
  
    return indianDate;
  }
  
  // Example usage
  // const indianDate = getIndianDate();
  // console.log('Indian Date and Time:', indianDate);
  
  module.exports = getIndianDate;