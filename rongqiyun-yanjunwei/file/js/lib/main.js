function openTerminal(options) {
    var client = new WSSHClient();
    var term = new Terminal({cols: 80, rows: 24, screenKeys: true, useStyle: true});
    term.on('data', function (data) {
        client.sendClientData(data);
    });
    term.open();
    $('.terminal').detach().appendTo('#term');
    client.connect({
        onError: function (error) {
            term.write('Error: ' + error + '\r\n');
        },
        onConnect: function () {
            client.sendInitData(options);
        },
        onClose: function () {
            term.write("\rconnection closed");
            term.destroy();
        },
        onData: function (data) {
            term.write(data);
        },
        data: options
    })
}

var charWidth = 6.2;
var charHeight = 15.2;

/**
 * for full screen
 * @returns {{w: number, h: number}}
 */
function getTerminalSize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    return {
        w: Math.floor(width / charWidth),
        h: Math.floor(height / charHeight)
    };
}
function connect(id,appName) {
    var options = {
            docker_id: id,
            host_ip: appName,
    };
    openTerminal(options);
}