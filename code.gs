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
   
  var ticketoutput = ticketcode+fullyear[1]+month+"01"
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
