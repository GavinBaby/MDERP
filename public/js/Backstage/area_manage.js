﻿/**
 * Created by Administrator on 2017/5/19 0019.
 */
$(function () {
    //页面id
    var $p_id = $("#area_manage_page");
    //弹出框居中
    $('.modal').on('show.bs.modal', function () {
        $(this).addClass('modal-outer');
    }).on('hidden.bs.modal', function () {
        $(this).removeClass('modal-outer');
    });

//查询（绘画表格）
    function into() {
        var num_size = 0;
        var params = { // 查询查询参数
            areaname:$p_id.find("#areaname_s").val(),//角色名称
            state:$p_id.find("#status_q").val(),//状态
            p_id:sys_pId
        };

        var table_src = $p_id.find('#area_Table'); // 定义指向
        var ajax_url = '/area/list'; // 定义数据请求路径 http://localhost:8080/JCSW/web/publicmenus/Area_List_ajax.action
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "seqNo"},
            {"col_id": "name"},
            {"col_id": "createUser"},
            {"col_id": "createTime"},
            {"col_id": "state"}
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
                if(full.state==1){
                    return  '<td><div class="drop-opt"><a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">操作列表<span class="icon-chevron-down"></span></a>'+
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">'+
                        '<li><a class="employee_edit"  href="javascript:void(0)" data-id="'+full.seqNo+'" data-name="'+full.name+'" data-toggle="modal">更改</a></li>'+
                        '<li><a class="employee_stop"  href="javascript:void(0)" data-id="'+full.seqNo+'" data-name="'+full.name+'" data-toggle="modal">停用</a></li>'+
                        '<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.seqNo+'"   data-toggle="modal">删除</a></li>' +
                        '   </ul></div></td>';
                }else{
                    return  '<td><div class="drop-opt"><a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">操作列表<span class="icon-chevron-down"></span></a>'+
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">'+
                        '<li><a class="employee_edit"  href="javascript:void(0)" data-id="'+full.seqNo+'" data-name="'+full.name+'" data-toggle="modal">更改</a></li>'+
                        '<li><a class="employee_start"  href="javascript:void(0)" data-id="'+full.seqNo+'" data-name="'+full.name+'" data-toggle="modal">启用</a></li>'+
                        '<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.seqNo+'"   data-toggle="modal">删除</a></li>' +
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
        return data;
    }
    //绘画完成之后的回调函数
    function fnDrawCallback(data){
        //编辑
        $p_id.find(".employee_edit").on("click",function () {
            $p_id.find("#seq_no_edit").val($(this).attr("data-id"));
            $p_id.find("#name_edit").val($(this).attr("data-name"));
            $p_id.find("#seq_no").val($(this).attr("data-id"));
            $p_id.find("#areaname").val($(this).attr("data-name"));
            $p_id.find("#addAreaModal").modal('show');
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
        //停用
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
    //添加区域弹窗
    $p_id.find("#addStaffModal").on("click",function () {
        $p_id.find('#add_form')[0].reset();
        $p_id.find('#seq_no').val();
        $p_id.find("#addAreaModal").modal('show');
    });
    //新建
    function add(){
        if ($p_id.find('#add_form').isValid()) {
            if (holdSubmit) {
                // 只提交一次
                holdSubmit = false;
                var  addlist = {
                    areaname: $p_id.find('#areaname').val(),
                    p_id:sys_pId,
                    createUser:sys_username
                }
                $("#popDiv").show();
                $p_id.find("#addAreaModal").modal('hide');
                $.ajax({
                    "dataType": 'jsonp',
                    "type": "get",
                    "timeout": 20000,
                    "async": false,
                    "url": sys_client+'/JCSW/web/publicmenus/Area_add_edit.action',
                    "data": addlist,
                    "jsonp":"callback",
                    "jsonpCaback":"handle",
                    "success": function (data) {
                        $("#popDiv").hide();
                        if(data.statejson&&data.statejson.success){
                            Showbo.Msg.alert("保存成功！");
                            $('.tabReload').trigger("click");
                            holdSubmit = true;
                        }else if(data.statejson&&data.statejson.errCode==2){
                            Showbo.Msg.alert("区域名称重复！");
                            holdSubmit = true;
                        }else{
                            Showbo.Msg.alert("保存失败！");
                            holdSubmit = true;
                        }
                    },
                    "error": function (data) {
                        $("#popDiv").hide();
                        Showbo.Msg.alert("系统错误！");
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
                    seq_no: $p_id.find('#seq_no').val(),
                    p_id:sys_pId,
                    areaname:$p_id.find("#areaname").val()
                }
                $("#popDiv").show();
                $p_id.find("#addAreaModal").modal('hide');
                $.ajax({
                    "dataType": 'jsonp',
                    "type": "get",
                    "timeout": 20000,
                    "async": false,
                    "url": sys_client+'/JCSW/web/publicmenus/Area_update_edit.action',
                    "data": addlist,
                    "jsonp":"callback",
                    "jsonpCaback":"handle",
                    "success": function (data) {
                        $("#popDiv").hide();
                        if(data.statejson&&data.statejson.success){
                            $('.tabReload').trigger("click");
                            holdSubmit = true;
                        }else if(data.statejson&&data.statejson.errCode==2){
                            Showbo.Msg.alert("区域名称重复！");
                            holdSubmit = true;
                        }else{
                            Showbo.Msg.alert("更新失败！");
                            holdSubmit = true;
                        }
                    },
                    "error": function (data) {
                        $("#popDiv").hide();
                        holdSubmit = true;
                        Showbo.Msg.alert("系统错误！");
                        console.log(data);

                    }
                });
            }
        }
    }
    // 默认允许提交
    var holdSubmit = true;
    //添加和编辑窗口中的确认事件
    $p_id.find("#save_area").on("click", function () {
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
                seq_no: $p_id.find('#seq_no_edit').val(),
                p_id:1,
                areaname:$p_id.find("#name_edit").val(),
                state:1,
            }
            $("#popDiv").show();
            $p_id.find("#sureStart").modal('hide');
            $.ajax({
                "dataType": 'jsonp',
                "type": "get",
                "timeout": 20000,
                "async": false,
                "url": sys_client+'/JCSW/web/publicmenus/Area_update_edit.action',
                "data": addlist,
                "jsonp":"callback",
                "jsonpCaback":"handle",
                "success": function (data) {
                    $("#popDiv").hide();
                    if(data.statejson&&data.statejson.success){
                        $('.tabReload').trigger("click");
                        holdSubmit = true;
                    }else{
                        Showbo.Msg.alert("启用失败！");
                        holdSubmit = true;
                    }
                },
                "error": function (data) {

                    $("#popDiv").hide();
                    holdSubmit = true;
                    Showbo.Msg.alert("系统错误！");
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
                seq_no: $p_id.find('#seq_no_edit').val(),
                p_id:1,
                areaname:$p_id.find("#name_edit").val(),
                state:2,
            }
            $("#popDiv").show();
            $p_id.find("#sureStop").modal('hide');
            $.ajax({
                "dataType": 'jsonp',
                "type": "get",
                "timeout": 20000,
                "async": false,
                "url": sys_client+'/JCSW/web/publicmenus/Area_update_edit.action',
                "data": addlist,
                "jsonp":"callback",
                "jsonpCaback":"handle",
                "success": function (data) {
                    $("#popDiv").hide();
                    if(data.statejson&&data.statejson.success){
                        $('.tabReload').trigger("click");
                        holdSubmit = true;
                    }else{
                        Showbo.Msg.alert("停用失败！");
                        holdSubmit = true;
                    }
                },
                "error": function (data) {
                    $("#popDiv").hide();
                    holdSubmit = true;
                    Showbo.Msg.alert("系统错误！");
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
                seq_no: $p_id.find('#seq_no_edit').val()
            }
            $("#popDiv").show();
            $p_id.find("#sureDel").modal('hide');
            $.ajax({
                "dataType": 'jsonp',
                "type": "get",
                "timeout": 20000,
                "async": false,
                "url": sys_client+'/JCSW/web/publicmenus/Area_delete_edit.action',
                "data": addlist,
                "jsonp":"callback",
                "jsonpCaback":"handle",
                "success": function (data) {
                    $("#popDiv").hide();
                    if(data.statejson&&data.statejson.success){
                        Showbo.Msg.alert("删除成功！");
                        $('.tabReload').trigger("click");
                        holdSubmit = true;
                    }else{
                        Showbo.Msg.alert("删除失败！");
                        holdSubmit = true;
                    }
                },
                "error": function (data) {
                    $("#popDiv").hide();
                    Showbo.Msg.alert("系统错误！");
                    console.log(data);
                    holdSubmit = true;
                }
            });
        }
    });

});

