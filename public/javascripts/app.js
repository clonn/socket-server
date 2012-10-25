!function(window, document) {

  var socket = io.connect()
    , chart = new SmoothieChart({ grid: { fillStyle: "#fff"}, labels: { fillStyle: "#000" } })
    , connection = new TimeSeries();

  socket.on('ping', function() {
    console.log(arguments);
    socket.emit('pong', new Date());
  });

  socket.on('stat', function() {
    console.log(arguments);
    connection.append(+new Date(), arguments[0]);
  });
  
  window.onload = function(e) {
    chart.addTimeSeries(connection, { strokeStyle: 'rgba(69, 183, 244, 1)', fillStyle: 'rgba(255, 255, 255, 1)', lineWidth: 4 });
    chart.streamTo(document.getElementById("smoothie"), 500);
  };
  
}(window, document);
