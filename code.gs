function getScriptUrl() {
 var url = ScriptApp.getService().getUrl();
 return url;
}

function doGet(e) {
  Logger.log( Utilities.jsonStringify(e) );
  if (!e.parameter.page) {
    // When no specific page requested, return "home page"
    return HtmlService.createTemplateFromFile('home').evaluate();
  }
  // else, use page parameter to pick an html file from the script
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate();
  //return HtmlService.createTemplateFromFile('home').evaluate();
}

function changePage(page){
  HtmlService.createHtmlOutputFromFile(page).getContent();
}

function createTicket(ticketinfo){
  var id ;// please put the link here for spreadsheet
  var ss = SpreadsheetApp.openByUrl(id);
  var ws = ss.getSheetByName(""); // Name of sheet
  
  ws.appendRow([createTicketNum(ticketinfo.num),ticketinfo.title,ticketinfo.description,ticketinfo.category,new Date(),"OPEN"]);

}

// making the ticket number
function ticketnum(ticketcode){
   
  var today = new Date();
  var month = today.getMonth();
  var fullyear = today.getFullYear().toString().split([0]);
  var number = createRandomNum();
   
  var ticketoutput = ticketcode+fullyear[1]+month+ number;
  return ticketoutput;
}

// checking for each code
function createTicketNum(ticketc){
  var ticketnumber;
  var ticketoutputnumber;

  switch(ticketc){
    case "PROB":
      ticketnumber = "PROB";
      ticketoutputnumber = ticketnum(ticketnumber);
      return ticketoutputnumber;
      
    case "WANT":
      ticketnumber = "WANT";
      ticketoutputnumber = ticketnum(ticketnumber);
      return ticketoutputnumber;
      
    case "PROJ":
      ticketnumber = "PROJ";
      ticketoutputnumber = ticketnum(ticketnumber);
      return ticketnumber;
  }
}

// Creating ticketing number
function createRandomNum(){
  
   var randomnumber = Math.random(99)*100;
   var stringsplit = [{}]; 
   var stringsplit = String(randomnumber).split(".");
   
   return stringsplit[0];
}

// Reading the Excelsheet
// TODO CODE: Requirements are for spreadsheet name and data.
function getExcelData(spreadsheetName){
  var ss = SpreadsheetApp.getActiveSpreadsheet();// Spreadsheet
  var sheet = ss.getSheetByName(spreadsheetName);// Spreadsheet name
  var last_row = sheet.getLastRow();
  var data = sheet.getRange("A1:G" + last_row).getValues();

  return data;}

  // reads through excel sheet
  function loadForm(){
    var ss = SpreadsheetApp.getActiveSpreadsheet();// Spreadsheet
    var sheet = ss.getSheetByName("tickets");// Spreadsheet name
    var last_row = sheet.getLastRow();
    var data = sheet.getRange("A1:" + last_row).getValues();

    var ticketnumbers = [];// checking for duplicate ticket numbers

    for(var i = 0;i< data.length;i++){ // Reading through the excel sheet.
      ticketnumbers.push(data[i][0]);
    }

  }
