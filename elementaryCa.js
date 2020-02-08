// columns and rows for grid
const columns = 9;
const rows = 8;

//code
var columnCA = [];
var rowData = [];
var configurationData = [];
for (let i = 0; i < columns; i++) {
  columnCA.push({
    headerName: i.toString(),
    field: i.toString(),
    width: 40
  });
  configurationData[i.toString()] = "0";
}
rowData = [configurationData];


// let the grid know which columns and what data to use
var gridOptions = {
  onGridReady(params) {
    this.gridApi = params.api
  },
  columnDefs: columnCA,
  rowData: rowData,
  onCellClicked: function(event) {
    var colindex = event.column.getId();
    var rowindex = event.rowIndex;
    if (rowindex == 0) {
      window.alert(gridApi);
    };
  }
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});