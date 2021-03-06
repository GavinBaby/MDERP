/**
 * Created by Administrator on 2017/5/19 0019.
 */
$(function () {
    //页面id
    var $p_id = $("#staff_parameter_page");
    //弹出框居中
    $('.modal').on('show.bs.modal', function () {
        $(this).addClass('modal-outer');
    }).on('hidden.bs.modal', function () {
        $(this).removeClass('modal-outer');
    });


    //获取角色列表
    $.ajax({
        "dataType": 'jsonp',
        "type": "get",
        "timeout": 20000,
        "async": false,
        "url": sys_client+'/JCSW/web/publicmenus/Role_List_ajax.action',
        "data": {seqNo:$(this).attr("data-id"),state:1},
        "jsonp":"callback",
        "jsonpCaback":"handle",
        "success": function (data) {
            $p_id.find("#roleId").empty();
            $p_id.find("#roleId_s").empty();
            $p_id.find("#roleId_s").append('<option value="">请选择</option>');
            if(data&&data.rows.length>0){
                for(var i=0;i<data.rows.length;i++){
                    $p_id.find("#roleId_s").append('<option value="'+data.rows[i].seqNo+'">'+data.rows[i].roleName+'</option>');
                    $p_id.find("#roleId").append('<option value="'+data.rows[i].seqNo+'">'+data.rows[i].roleName+'</option>');
                }
            }
        },
        "error": function (data) {
            console.log(data);
        }
    });

    //抄表区域
    $.ajax({
        "dataType": 'jsonp',
        "type": "get",
        "timeout": 20000,
        "async": false,
        "url": sys_client+'/JCSW/web/publicmenus/Area_List_ajax.action',
        "data": {state:1,p_id:sys_pId},
        "jsonp":"callback",
        "jsonpCaback":"handle",
        "success": function (data) {
            $p_id.find("#areaId").empty();
            /*$p_id.find("#areaId").append('<option value="0">全部</option>');*/
            if(data&&data.rows.length>0){
                for(var i=0;i<data.rows.length;i++){
                    $p_id.find("#areaId").append('<option value="'+data.rows[i].seqNo+'">'+data.rows[i].name+'</option>');
                }
            }
        },
        "error": function (data) {
            Showbo.Msg.alert("系统错误，获得区域数据失败！");
        }
    });

    //营业厅
    $.ajax({
        "dataType": 'jsonp',
        "type": "get",
        "timeout": 20000,
        "async": false,
        "url": sys_client+'/JCSW/web/publicmenus/Sellingarea_List_ajax.action',
        "data": {state:1,p_id:sys_pId},
        "jsonp":"callback",
        "jsonpCaback":"handle",
        "success": function (data) {
            $p_id.find("#businessId").empty();
            /*$p_id.find("#areaId").append('<option value="">全部</option>');*/
            if(data&&data.rows.length>0){
                for(var i=0;i<data.rows.length;i++){
                    $p_id.find("#businessId").append('<option value="'+data.rows[i].id+'">'+data.rows[i].name+'</option>');
                }
            }
        },
        "error": function (data) {
            Showbo.Msg.alert("系统错误，获得区域数据失败！");
        }
    });


//查询（绘画表格）
    function into() {
        var num_size = 0;
        var params = { // 查询查询参数
            state:1,
            p_id:sys_pId,
            username:$p_id.find("#username_s").val(),//名称
            roleId:$p_id.find("#roleId_s").val(),//角色名称
            state:$p_id.find("#status_q").val(),//状态
            createUser:sys_username
        };

        var table_src = $p_id.find('#account_Table'); // 定义指向
        var ajax_url = '/account/list'; // 定义数据请求路径 http://localhost:8080/JCSW/web/publicmenus/Acctest_List_ajax.action
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "username"},
            {"col_id": "roleName"},
            {"col_id": "operatName"},
            {"col_id": "operatTime"},
            {"col_id": "status"}
        ]; // 定义表格数据列id
        var aoColumnDefs = [{
            "colIndex": 0,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return  '<td><div class="text-center" style="font-size: 14px;">'+data+'</div></td>';

            }
        }, {
            "colIndex": 1,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return  '<td><div class="text-center" style="font-size: 14px;">'+data+'</div></td>';
            }
        },{
            "colIndex": 2,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return  '<td><div class="text-center" style="font-size: 14px;">'+data+'</div></td>';
            }
        },{
            "colIndex": 3,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return  '<td><div class="text-center" style="font-size: 14px;">'+data.substring(0,20)+'</div></td>';

            }
        },{
            "colIndex": 4,
            "html": function (data, type, full) {
                if(data==1){
                    return  '<td><div class="text-center" style="font-size: 14px;">正常</div></td>';
                }else{
                    return  '<td><div class="text-center" style="font-size: 14px;">停用</div></td>';
                }

            }
        },{
            "colIndex": 5,
            "html": function (data, type, full) {
                var html=""
                if(full.roleId!=1000){
                    if(full.status==1){
                        html='<li><a class="employee_stop"  href="javascript:void(0)" data-id="'+full.seqNo+'" data-name="'+full.username+'"  data-toggle="modal">停用</a></li>'+
                            '<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.seqNo+'" data-name="'+full.username+'"   data-toggle="modal">删除</a></li>';
                    }else{
                        html='<li><a class="employee_start"  href="javascript:void(0)" data-id="'+full.seqNo+'" data-name="'+full.username+'" data-toggle="modal">启用</a></li>'+
                            '<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.seqNo+'" data-name="'+full.username+'"   data-toggle="modal">删除</a></li>';
                    }
                }
                if(full.state==1){
                    return  '<td><div class="drop-opt"><a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">操作列表<span class="icon-chevron-down"></span></a>'+
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">'+
                        '<li><a class="employee_edit"  href="javascript:void(0)" data-id="'+full.seqNo+'"  data-toggle="modal">更改</a></li>'+html +
                        '   </ul></div></td>';
                }else{
                    return  '<td><div class="drop-opt"><a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">操作列表<span class="icon-chevron-down"></span></a>'+
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">'+
                        '<li><a class="employee_edit"  href="javascript:void(0)" data-id="'+full.seqNo+'"  data-toggle="modal">更改</a></li>'+html +
                        '   </ul></div></td>';
                }

            }
        }]; // 定义需要改变的列

        // 列表为空时的数据
        var sZeroRecords = '<p class="text-gray-light ml-2 font-18">没有满足搜索条件的结果</p>';

        // 绘画表格
        TableAjax.drawTable(table_src, ajax_url, pageSize, aoColumns, aoColumnDefs, params, sZeroRecords, fnChangeDataCallback,fnDrawCallback);
    };
    //获取到数据的回调函数，需要更该时可定义
    function fnChangeDataCallback(data){
        var $p_id = $("#staff_parameter_page");
        return data;
    }
    //绘画完成之后的回调函数
    function fnDrawCallback(data){
        var $p_id = $("#staff_parameter_page");
        //编辑
        $p_id.find(".employee_edit").on("click",function () {
            $p_id.find("#seq_no_edit").val($(this).attr("data-id"));
            $.ajax({
                "dataType": 'jsonp',
                "type": "get",
                "timeout": 20000,
                "async": false,
                "url": sys_client+'/JCSW/web/publicmenus/Acctest_List_ajax.action',
                "data": {seqNo:$(this).attr("data-id")},
                "jsonp":"callback",
                "jsonpCaback":"handle",
                "success": function (data) {
                    if(data&&data.rows.length>0){
                        $p_id.find("#seq_no").val(data.rows[0].seqNo);
                        $p_id.find("#username").val(data.rows[0].username);
                        $p_id.find("#roleId").val(data.rows[0].roleId);
                        if(data.rows[0].roleId==1002){
                            $p_id.find("#area_div").css("display","block");
                            $p_id.find("#dot_div").css("display","none");
                            $p_id.find("#areaId").val(data.rows[0].areaId);

                        }else if(data.rows[0].roleId){
                            $p_id.find("#area_div").css("display","none");
                            $p_id.find("#dot_div").css("display","block");
                            $p_id.find("#businessId").val(data.rows[0].businessId);
                        }
                    }
                    $p_id.find("#addAccountModel").modal('show');
                },
                "error": function (data) {
                    console.log(data);
                }
            });
        });

        //删除
        $p_id.find(".employee_del").on("click",function () {

            $p_id.find("#seq_no_edit").val($(this).attr("data-id"));
            $p_id.find("#sureDel").modal('show');
        });
        //停用
        $p_id.find(".employee_stop").on("click",function () {
            $p_id.find("#seq_no_edit").val($(this).attr("data-id"));
            $p_id.find("#name_edit").val($(this).attr("data-name"));
            $p_id.find("#sureStop").modal('show');
        });
        //启用
        $p_id.find(".employee_start").on("click",function () {
            $p_id.find("#seq_no_edit").val($(this).attr("data-id"));
            $p_id.find("#name_edit").val($(this).attr("data-name"));
            $p_id.find("#sureStart").modal('show');
        });

        return data;
    }
//页面加载时自动调用查询的方法
    into();
//搜索后列表重构
    $p_id.find("#employeeSeatchBut").on("click", function () {
        into();
    });
    //添加弹窗
    $p_id.find("#addAccount").on("click",function () {
        $p_id.find('#seq_no').val();
        $p_id.find("#add_form")[0].reset();
        $p_id.find("#addAccountModel").modal('show');
    });

    $p_id.find("#roleId").on("change",function () {
        if($(this).val()==1002){
            $p_id.find("#area_div").css("display","block");
            $p_id.find("#dot_div").css("display","none");
        }else if($(this).val()==1003){
            $p_id.find("#area_div").css("display","none");
            $p_id.find("#dot_div").css("display","block");
        }
    });



    //新建
    function add(){
        if ($p_id.find('#add_form').isValid()) {
            if (holdSubmit) {
                // 只提交一次
                holdSubmit = false;
                var  addlist = {
                    username: $p_id.find('#username').val(),
                    password: $p_id.find('#password').val(),
                    roleId: Number($p_id.find('#roleId').val()),
                    roleName: $p_id.find('#roleId').find("option:selected").text(),
                    areaId: Number($p_id.find('#areaId').val()),
                    areaName: $p_id.find('#areaId').find("option:selected").text(),
                    businessId: Number($p_id.find('#businessId').val()),
                    businessName: $p_id.find('#businessId').find("option:selected").text(),
                    p_id:sys_pId,
                    p_name:sys_pname,
                    create_user:sys_username
                }
                $("#popDiv").show();
                $p_id.find("#addAccountModel").modal('hide');
                $.ajax({
                    "dataType": 'jsonp',
                    "type": "get",
                    "timeout": 20000,
                    "async": false,
                    "url": sys_client+'/JCSW/web/publicmenus/Acctest_add_edit.action',
                    "data": addlist,
                    "jsonp":"callback",
                    "jsonpCaback":"handle",
                    "success": function (data) {

                        if(data.statejson&&data.statejson.success){
                            Showbo.Msg.alert("保存成功！");
                            into();
                            holdSubmit = true;
                        }else if(data.statejson&&data.statejson.errCode==2){
                            Showbo.Msg.alert("名称重复！");
                            holdSubmit = true;
                        }else{
                            Showbo.Msg.alert("保存失败！");
                            holdSubmit = true;
                        }
                        $("#popDiv").hide();
                    },
                    "error": function (data) {

                        Showbo.Msg.alert("系统错误！");
                        $("#popDiv").hide();
                        console.log(data);
                        holdSubmit = true;
                    }
                });
            }
        }
    }
    //更新
    function update(){
        if ($p_id.find('#add_form').isValid()) {
            if (holdSubmit) {
                // 只提交一次
                holdSubmit = false;
                var  addlist = {
                    seqNo:Number($p_id.find("#seq_no").val()),
                    username: $p_id.find('#username').val(),
                    password: $p_id.find('#password').val(),
                    roleId: Number($p_id.find('#roleId').val()),
                    roleName: $p_id.find('#roleId').find("option:selected").text(),
                    areaId: Number($p_id.find('#areaId').val()),
                    areaName: $p_id.find('#areaId').find("option:selected").text(),
                    businessId: Number($p_id.find('#businessId').val()),
                    businessName: $p_id.find('#businessId').find("option:selected").text(),
                    p_id:sys_pId,
                    create_user:sys_name
                }
                $("#popDiv").show();
                $p_id.find("#addAccountModel").modal('hide');
                $.ajax({
                    "dataType": 'jsonp',
                    "type": "get",
                    "timeout": 20000,
                    "async": false,
                    "url": sys_client+'/JCSW/web/publicmenus/Acctest_update_edit.action',
                    "data": addlist,
                    "jsonp":"callback",
                    "jsonpCaback":"handle",
                    "success": function (data) {

                        if(data.statejson&&data.statejson.success){
                            into();
                            holdSubmit = true;
                        }else if(data.statejson&&data.statejson.errCode==2){
                            Showbo.Msg.alert("名称重复！");
                            holdSubmit = true;
                        }else{
                            Showbo.Msg.alert("更新失败！");
                            holdSubmit = true;
                        }
                        $("#popDiv").hide();
                    },
                    "error": function (data) {

                        holdSubmit = true;
                        Showbo.Msg.alert("系统错误！");
                        $("#popDiv").hide();
                        console.log(data);

                    }
                });
            }
        }
    }
    // 默认允许提交
    var holdSubmit = true;
    //添加和编辑窗口中的确认事件
    $p_id.find("#save_account").on("click", function () {
        if($p_id.find("#seq_no").val()&&$p_id.find("#seq_no").val()!=""){
            update();
        }else{
            add();
        }

    });
    //启用
    $p_id.find("#start_button").on("click",function () {
        if (holdSubmit) {
            // 只提交一次
            holdSubmit = false;
            var  addlist = {
                seqNo: $p_id.find('#seq_no_edit').val(),
                username: $p_id.find('#name_edit').val(),
                state:1,
                create_user:sys_username
            }
            $("#popDiv").show();
            $p_id.find("#sureStart").modal('hide');
            $.ajax({
                "dataType": 'jsonp',
                "type": "get",
                "timeout": 20000,
                "async": false,
                "url": sys_client+'/JCSW/web/publicmenus/Acctest_update_edit.action',
                "data": addlist,
                "jsonp":"callback",
                "jsonpCaback":"handle",
                "success": function (data) {

                    if(data.statejson&&data.statejson.success){
                        into();
                        holdSubmit = true;
                    }else{
                        Showbo.Msg.alert("启用失败！");
                        holdSubmit = true;
                    }
                    $("#popDiv").hide();
                },
                "error": function (data) {

                    holdSubmit = true;
                    Showbo.Msg.alert("系统错误！");
                    $("#popDiv").hide();
                    console.log(data);

                }
            });
        }
    });
    //停用
    $p_id.find("#stop_button").on("click",function () {
        if (holdSubmit) {
            // 只提交一次
            holdSubmit = false;
            var  addlist = {
                seqNo: $p_id.find('#seq_no_edit').val(),
                username: $p_id.find('#name_edit').val(),
                state:2,
                create_user:sys_username
            }
            $("#popDiv").show();
            $p_id.find("#sureStop").modal('hide');
            $.ajax({
                "dataType": 'jsonp',
                "type": "get",
                "timeout": 20000,
                "async": false,
                "url": sys_client+'/JCSW/web/publicmenus/Acctest_update_edit.action',
                "data": addlist,
                "jsonp":"callback",
                "jsonpCaback":"handle",
                "success": function (data) {

                    if(data.statejson&&data.statejson.success){
                        into();
                        holdSubmit = true;
                    }else{
                        Showbo.Msg.alert("停用失败！");
                        holdSubmit = true;
                    }
                    $("#popDiv").hide();
                },
                "error": function (data) {

                    holdSubmit = true;
                    Showbo.Msg.alert("系统错误！");
                    $("#popDiv").hide();
                    console.log(data);

                }
            });
        }
    });
    //删除
    $p_id.find("#del_button").on("click",function () {
        $p_id.find("#sureDel").modal('hide');
        if (holdSubmit) {
            // 只提交一次
            holdSubmit = false;
            var  addlist = {
                seqNo: $p_id.find('#seq_no_edit').val(),
                create_user:sys_username
            }
            $("#popDiv").show();
            $p_id.find("#sureDel").modal('hide');
            $.ajax({
                "dataType": 'jsonp',
                "type": "get",
                "timeout": 20000,
                "async": false,
                "url": sys_client+'/JCSW/web/publicmenus/Acctest_delete_edit.action',
                "data": addlist,
                "jsonp":"callback",
                "jsonpCaback":"handle",
                "success": function (data) {

                    if(data.statejson&&data.statejson.success){
                        Showbo.Msg.alert("删除成功！");
                        into();
                        holdSubmit = true;
                    }else{
                        Showbo.Msg.alert("删除失败！");
                        holdSubmit = true;
                    }
                    $("#popDiv").hide();
                },
                "error": function (data) {

                    Showbo.Msg.alert("系统错误！");
                    $("#popDiv").hide();
                    console.log(data);
                    holdSubmit = true;
                }
            });
        }
    });

});

