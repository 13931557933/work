function WSSHClient() {}

WSSHClient.prototype._generateEndpoint = function () {
    if (window.location.protocol == 'https:') {
        var protocol = 'wss://';
    } else {
        var protocol = 'ws://';
    }
    // var endpoint = protocol + window.location.host + '/ws';
    var endpoint = "ws://webssh.gearboxtest.sspaas.net/kube/webssh";
    //ws://blackhole.sspaas.net:9530/{username}/{app_name}/{app_id}
    return endpoint;
};

WSSHClient.prototype.connect = function (options) {
    var projectId = sspaasMemory.get('currentProjectInfo') ? sspaasMemory.get('currentProjectInfo').project_id : '';
    var token = getCookie('glearBoxToken') ? getCookie('glearBoxToken') : '';  
    var endpoint = this._generateEndpoint();
    window.WebSocketAllFn = options;
    if (window.WebSocket) {
        this._connection = new WebSocket(endpoint,[token,projectId]);
    }
    else if (window.MozWebSocket) {
        this._connection = MozWebSocket(endpoint,[token,projectId]);
    }
    else {
        options.onError('WebSocket Not Supported');
        return;
    }
    this._connection.onopen = function () {
        options.onConnect();
    };

    this._connection.onmessage = function (evt) {
        var data = evt.data.toString();
        // console.log(data);
        options.onData(data);
    };


    this._connection.onclose = function (evt) {
        options.onClose();
    };
};

WSSHClient.prototype.send = function (data) {
    this._connection.send(JSON.stringify(data));
};
WSSHClient.prototype.sendInitData = function (options) {
    this._connection.send(JSON.stringify({"tp": "init", "data": options}))
};

WSSHClient.prototype.sendClientData = function (data) {
    this._connection.send(JSON.stringify({"tp": "client", "data": data}))
};

var client = new WSSHClient();

