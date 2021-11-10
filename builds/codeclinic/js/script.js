(function () {
  // we can also specify URL of a distant file, download option opens a local file, otherwise we should use FileReader
  Papa.parse("dashBoardData.csv", {
    download: true,
    complete: function (results) {
      parseData(results.data);
    }
  });

  function parseData(data) {
    const colNames = data.shift();

    const x = data.map(function (el) { return el[0] });    // split('T')[0];
    x.unshift("x");
    const y = data.map(function (el) { return el[1]; });
    y.pop();
    y.unshift("Pulsometer readout");

    const redValues = data.map(function(el) { return el[3] });
    const blueValues = data.map(function(el) { return el[4] });
    const greenValues = data.map(function(el) { return el[5] });
    redValues.pop();
    blueValues.pop();
    greenValues.pop();
    
    let i = 0;
    const redAvg = redValues.reduce(function(i, el) { return +i + +el; }) / redValues.length;
    i = 0;
    const blueAvg = blueValues.reduce(function(i, el) { return +i + +el; }) / blueValues.length;
    i = 0;
    const greenAvg = greenValues.reduce(function(i, el) { return +i + +el; }) / greenValues.length;

    let chartXY = c3.generate({
      data: {
        x: "x",
        xFormat: "%Y-%m-%dT%H:%M:%SZ",
        columns: [
          x.splice(0, 100),
          y.splice(0, 100)
          // Test data
          // ['x', '2018-01-01', '2018-01-01', '2018-01-01', '2018-01-01', '2018-01-01', '2018-01-01', '2018-01-01', '2018-01-01', '2018-01-01', '2018-01-01'],
          // ['Pulsometer readout', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
        ]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            max: 5,
            fit: true,
            format: "%Y-%m-%dT%H:%M:%SZ"
          }
        }
      },
      bindto: '#chart'
    });

    let chartPie = c3.generate({
      data: {
        columns: [
          ['blue average', blueAvg],
          ['red average', redAvg],
          ['green average', greenAvg]
        ],
        type: 'pie',
      },
      bindto: '#piechart'
    });

    setTimeout(function () {
      chartXY.load({});
      chartPie.load({});
    }, 1000);
  };
})();