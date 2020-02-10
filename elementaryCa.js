// columns and rows for grid
const columns = 10; //cant be less than 7. yes, I am lazy here (see preConfig function)
const rows = 8;
const stepsToRun = 16;

//code
var columnCA = [];
var rowData = [];
var configurationData = [];
var wolframDictionary = {
  "000": 0,
  "001": 0,
  "010": 0
};
for (let i = 0; i < columns; i++) {
  columnCA.push({
    headerName: 'c' + i.toString(),
    field: i.toString(),
    width: 40
  });
  configurationData[i.toString()] = "0";
}
rowData = [configurationData];


// let the grid know which columns and what data to use
var gridOptions = {
  columnDefs: columnCA,
  rowData: rowData,
  //onClick event for cell - 1/0 change
  onCellClicked: function(event) {
    resetCA();
    var colindex = event.column.getId();
    var rowindex = event.rowIndex;
    if (rowindex == 0) {
      row = this.api.getDisplayedRowAtIndex(rowindex);
      if (this.api.getValue(colindex.toString(), row) == '0') {
        row.setDataValue(colindex.toString(), '1');
      } else {
        row.setDataValue(colindex.toString(), '0');
      }
    };
  }
};

function randomConfig() {
  configurationData = [];
  for (let i = 0; i < columns; i++) {
    configurationData[i.toString()] = Math.round(Math.random()).toString();
  }
  gridOptions.api.setRowData([configurationData]);

}

function clearConfig() {
  //window.alert(configurationData);
  //gridOptions.api.setRowData([]);
  configurationData = [];

  for (let i = 0; i < columns; i++) {
    configurationData[i.toString()] = "0";
  }
  gridOptions.api.setRowData([configurationData]);
}

function preConfig() {
  //window.alert(configurationData);
  //gridOptions.api.setRowData([]);
  configurationData = [];

  for (let i = 0; i < columns; i++) {
    configurationData[i.toString()] = "0";
  }
  configurationData["1"] = "1";
  configurationData["4"] = "1";
  configurationData["5"] = "1";
  configurationData["7"] = "1";
  gridOptions.api.setRowData([configurationData]);
}

function sleep(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {}
}

function validateRule(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
    key = event.clipboardData.getData('text/plain');
  } else {
    // Handle key press
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /[0-9]/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
  parseWolfram();
}

function binary(argument) {
  result = '';
  sum = argument;
  while (sum > 0) {
    result = (sum % 2) + result;
    sum = Math.floor(sum / 2);
  }
  return result;
}

function parseWolfram() {
  //window.alert(binary(3));
  var wolframRule = document.getElementById("wolframRule");
  var wolframDisplay = document.getElementById("wolframDisplay");
  if (!isNaN(wolframRule.value)) {
    wolframRule.value = wolframRule.value % 256;
  } else {
    wolframRule.value = 30;
  }
  //sum = wolframRule.value;
  //window.alert(binary(3));
  binaryRule = binary(wolframRule.value);
  binaryRule = binaryRule.padStart(8, "0");
  wolframDisplay.value = wolframRule.value + ":\n" + binaryRule + "\n\n";
  for (let i = 7; i > -1; i--) {
    triplet = binary(7 - i).toString();
    triplet = triplet.padStart(3, "0");
    wolframDisplay.value += triplet + ":->" + binaryRule[i] + "\n";
    wolframDictionary[triplet] = binaryRule[i];
  }
  //window.alert(wolframDictionary["110"]);

}

function resetCA() {
  firstRow = gridOptions.api.getDisplayedRowAtIndex(0);
  gridOptions.api.setRowData([firstRow.data]);
  //window.alert('res');
}

function runCA() {
  resetCA();
  while (gridOptions.api.getDisplayedRowCount() < stepsToRun) {
    lastRowIndex = gridOptions.api.getLastDisplayedRow();
    lastRow = gridOptions.api.getDisplayedRowAtIndex(lastRowIndex);
    lastRowData = Object.create(lastRow.data);
    var newRowData = [];
    for (let i = 0; i < columns; i++) {
      askingTriplet = ((lastRowData[i - 1] === undefined) ? "0" : lastRowData[i - 1]).concat(lastRowData[i], ((lastRowData[i + 1] === undefined) ? "0" : lastRowData[i + 1]));
      newRowData.push(wolframDictionary[askingTriplet]);
    }
    gridOptions.api.updateRowData({
      add: [newRowData]
    });
  }
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
  var gridDiv = document.querySelector('#caGrid');
  new agGrid.Grid(gridDiv, gridOptions);
  parseWolfram();
});