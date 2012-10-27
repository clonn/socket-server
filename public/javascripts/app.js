!function(window, document) {

  var socket = io.connect()
    , chart = new SmoothieChart({ grid: { fillStyle: "#fff"}, labels: { fillStyle: "#000" } })
    , connection = new TimeSeries();



  /*
  var chart = new SmoothieChart({
        grid: { strokeStyle:'rgb(125, 0, 0)', fillStyle:'rgb(60, 0, 0)',
                  lineWidth: 1, millisPerLine: 250, verticalSections: 6, },
                    labels: { fillStyle:'rgb(60, 0, 0)' }
                    });
                    */

  socket.on('stat', function() {
    console.log(arguments);
    connection.append(+new Date(), arguments[0]);
  });

  socket.on('user', function() {
    console.log(arguments);
    connection.append(+new Date(), arguments[0]);
  });

  window.onload = function(e) {
    chart.addTimeSeries(connection, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 4 });
    chart.streamTo(document.getElementById("smoothie"), 400);
  };

}(window, document);
