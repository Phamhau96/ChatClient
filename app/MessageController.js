/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('app', []);
app.controller('MessageChat', function ($scope, $rootScope) {
//    var $scope = this;
    $scope.items = [];
    $scope.customerId = null;
    $scope.agentName = "Tiếp viên";
    $scope.sessionId = null;

    var checkConnect = false;
//    document.addEventListener('onload', function ()
    window.onload = function () {
//        debugger;
//        if (!window.WebSocket) {
//            window.WebSocket = window.MozWebSocket;
//        }
        if (window.WebSocket) {
            if (!checkConnect) {
                $rootScope.wsChat = new WebSocket('ws://localhost:8080');
                $rootScope.wsChat.onopen = function (event) {
                    if (localStorage.getItem("sessionId") !== null) {
                        $scope.customerId = localStorage.getItem('customerId');
                        $scope.sessionId = localStorage.getItem("sessionId");
                        //get message đã gửi từ trước
                        var data = {
                            action: "GetConversation",
                            sessionId: $scope.sessionId,
                            id: $scope.customerId
                        };
                        $rootScope.wsChat.send(JSON.stringify(data));

                    } else {
                        debugger;
                        if (localStorage.getItem("customerId") === null) {
                            $scope.customerId = new Date().getTime();
                            localStorage.setItem("customerId", $scope.customerId);
                        } else {
                            $scope.customerId = localStorage.getItem('customerId');
                        }
                        localStorage.setItem("action", "Login");
                        FirstChat();
                    }
                }
                ;

                $rootScope.wsChat.onmessage = function (event) {
                    var data = JSON.parse(event.data);
                    var action = data.event;
                    switch (action) {
                        case "JoinEvent":
                            $scope.sessionId = data.value.sessionId;
                            localStorage.setItem("sessionId", $scope.sessionId);
                            var object = {
                                "name": data.value.name,
                                "msg": data.value.msgClient,
                                clientType: data.value.clientType
                            };
                            $scope.items.push(object);
                            $scope.$apply();
                            break;
                        case "AcceptChat":
                            $scope.sessionId = data.value.sessionId;
                            localStorage.setItem("sessionId", $scope.sessionId);
                            localStorage.setItem("action", "SendChat");
                            break;
                        case "SendChat":
                            var object = {
                                "name": data.value.name,
                                "msg": data.value.msgClient,
                                clientType: data.value.clientType
                            };
                            $scope.items.push(object);
                            $scope.$apply();
                            break;

                        case "GetMessage":
                            var object = {
                                "name": data.value.name,
                                "msg": data.value.msgClient
                            };
                            $scope.items.push(object);
                            $scope.$apply();
                            break;
                        case "EndChat":
                            debugger;
                            localStorage.clear();
                            $('#inbox').hide();
                            $('#customernumber').show();
                            break;
                        case "GetConversation":
                            var conversation = data.value.chatSessions;
                            for (var i = 0; i < conversation.length; i++) {
                                var object = {
                                    "name": conversation[i].name,
                                    "msg": conversation[i].msgClient,
                                    clientType: conversation[i].clientType
                                };
                                $scope.items.push(object);
                            }
                            $scope.$apply();
                            break
                        case 'FirstChat':
                            break;
                    }

                };

                $rootScope.wsChat.onclose = function (event) {
                    checkConnect = true;
                };
            }
        }
    };

    function FirstChat() {
        var msg = {'action': 'FirstChat', 'clientType': 'customer'};
        $rootScope.wsChat.send(JSON.stringify(msg));
    }
    ;

    $scope.submit = function (e) {

        if (e.keyCode === 13) {
            e.stopPropagation();
            var action = localStorage.getItem("action");

            var message = $("#txtChat").val();
            if ('' !== message.trim('')) {
                debugger;
                var msg = {
                    'action': action,
                    'id': $scope.customerId,
                    'msg': message,
                    'clientType': 'customer',
                    'sessionId': $scope.sessionId
                };
                if ($rootScope.wsChat
                        && $rootScope.wsChat.readyState === WebSocket.OPEN) {
                    $rootScope.wsChat.send(JSON.stringify(msg));
                } else {
                    $rootScope.wsChat = new WebSocket('ws://localhost:8080');
                    $rootScope.wsChat.send(JSON.stringify(msg));
                }

                $("#txtChat").val('');
                e.preventDefault();
            }

        }

    };

    $scope.createSession = function () {
        $('#inbox').show()();
        $('#customernumber').hide();
        $scope.customerId = new Date().getTime();
        localStorage.setItem("customerId", $scope.customerId);
    };

    $scope.endChat = function () {
        var msg = {
            action: 'EndChat',
            sessionId: $scope.sessionId,
            clientType: 'customer'
        };
        $rootScope.wsChat.send(JSON.stringify(msg));
    };

    $scope.Export2Doc = function (element, filename = '') {
        var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        var postHtml = "</body></html>";
        var html = preHtml + document.getElementById(element).innerHTML + postHtml;

        var blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });

        // Specify link url
        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

        // Specify file name
        filename = filename ? filename + '.doc' : 'document.doc';

        // Create download link element
        var downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // Create a link to the file
            downloadLink.href = url;

            // Setting the file name
            downloadLink.download = filename;

            //triggering the function
            downloadLink.click();
        }

        document.body.removeChild(downloadLink);
    };
});
