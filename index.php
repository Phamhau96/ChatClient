<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <!-- jQuery 3 -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <!-- Bootstrap 3.3.7 -->
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <!-- Font Awesome -->
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <!-- Ionicons -->
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        <!-- jQuery 3 -->

        <link href="include/css/chat.css" rel="stylesheet" type="text/css"/>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
        <!--<script src="include/lib/angular.min.js" type="text/javascript"></script>-->
        <script src="include/js/adminlte.js" type="text/javascript"></script>

        <script src="app/MessageController.js" type="text/javascript"></script>

    </head>
    <body ng-app="app">
        <div class="col-md-3 pull-right" ng-controller="MessageChat as chat">
            <!-- DIRECT CHAT PRIMARY -->
            <div class="box box-primary direct-chat direct-chat-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Hỗ trợ trực tuyến</h3>

                    <div class="box-tools pull-right">
                        <span data-toggle="tooltip" title="" class="badge bg-light-blue" data-original-title="3 New Messages">3</span>
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                        </button>
                        <button type="button" class="btn btn-box-tool" ng-click="Export2Doc('exportContent', 'Nội dung cuộc trò chuyện')">
                            <i class="glyphicon glyphicon-download-alt"></i></button>
                            <button type="button" class="btn btn-box-tool" ng-click="endChat()"><i class="fa fa-times"></i></button>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body" >
                    <!-- Conversations are loaded here -->
                    <div class="direct-chat-messages" id="exportContent">
                        <div  ng-repeat="item in items">
                            <!-- Message. Default to the left -->
                            <div class="direct-chat-msg" ng-if="item.clientType == 'agent'">
                                <div class="direct-chat-info clearfix">
                                    <span class="direct-chat-name pull-left">Tiếp viên</span>
                                    <!--<span class="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>-->
                                </div>
                                <!-- /.direct-chat-info -->
                                <img class="direct-chat-img" src="./images/agent.png" alt="Message User Image">
                                <!--/.direct-chat-img--> 
                                <div class="direct-chat-text">
                                    {{item.msg}} 
                                </div>
                                <!-- /.direct-chat-text -->
                            </div>
                            <!-- /.direct-chat-msg -->

                            <!-- Message to the right -->
                            <div class="direct-chat-msg right"ng-if="item.clientType == 'customer'">
                                <div class="direct-chat-info clearfix">
                                    <!--<span class="direct-chat-name pull-right">Sarah Bullock</span>-->
                                    <!--<span class="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span>-->
                                </div>
                                <!-- /.direct-chat-info -->
                                <img class="direct-chat-img" src="./images/customer.png" alt="Message User Image">
                                <!--/.direct-chat-img--> 
                                <div class="direct-chat-text">
                                    {{item.msg}} 
                                </div>
                                <!-- /.direct-chat-text -->
                            </div>
                            <!-- /.direct-chat-msg -->
                        </div>
                    </div>
                    <!--/.direct-chat-messages-->

                </div>
                <!-- /.box-body -->
                <div class="box-footer">
                    <form action="#" method="post">
                        <div id="inbox">
                            <input type="text" name="message" placeholder="Type Message ..." class="form-control" id="txtChat" ng-keypress="submit($event)">
                        </div>
                        <div id= "customernumber" style="display: none">
                            <span style="color: red">Phiên chat kết thúc</span>
                            <button class="btn btn-primary btn-flat pull-right" ng-click="createSession()">Tạo phiên chat mới</button>
                        </div>
                    </form>
                </div>
                <!-- /.box-footer-->
            </div>
            <!--/.direct-chat -->
        </div>
    </body>
</html>
