// columns and rows for grid
const columns = 10; //cant be less than 7. yes, I am lazy here (see preConfig function)
const rows = 8;

//code
var columnCA = [];
var rowData = [];
var configurationData = [];
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

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
  var gridDiv = document.querySelector('#caGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});