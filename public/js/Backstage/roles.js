/**
 * Created by Administrator on 2017/5/19 0019.
 */
$(function () {
    var $p_id = $("#roles_page");
    //弹出框居中
    $('.modal').on('show.bs.modal', function () {
        $(this).addClass('modal-outer');
    }).on('hidden.bs.modal', function () {
        $(this).removeClass('modal-outer');
    });
//树形菜单
    function getTree(type){
        var list=[];
        $.ajax({
            "dataType": 'jsonp',
            "type": "get",
            "timeout": 20000,
            "async": false,
            "url": sys_client+'/JCSW/web/publicmenus/Role_getMenuid_ajax.action',
            "data": {},
            "jsonp": "callback",
            "jsonpCaback": "handle",
            "success": function (data) {
                var a;
                var obj_list;

                for(i=0;i<data.rows.length;i++){
                    a="N";
                    obj_list="";
                    if(data.rows[i].parentId ==""){
                        obj_list ={
                            id:data.rows[i].sysSet,
                            text:data.rows[i].name,
                            children:[]
                        };
                        a = data.rows[i].sysSet;
                    }
                    for(j=0;j<data.rows.length;j++) {
                        if (data.rows[j].parentId == a) {
                            obj_list.children.push({id: data.rows[j].sysSet, text: data.rows[j].name,children:[]});
                        }
                    }
                    if(obj_list!=""){
                        for(j=0;j<obj_list.children.length;j++) {
                            for(k=0;k<data.rows.length;k++) {
                                if (data.rows[k].parentId == obj_list.children[j].id) {
                                    obj_list.children[j].children.push({id: data.rows[k].sysSet, text: data.rows[k].name,children:[]});
                                }
                            }
                        }
                        for(j=0;j<obj_list.children.length;j++) {
                            for(z=0;z<obj_list.children[j].children.length;z++) {
                                for(k=0;k<data.rows.length;k++) {
                                    if (data.rows[k].parentId == obj_list.children[j].children[z].id) {
                                        obj_list.children[j].children[z].children.push({id: data.rows[k].sysSet, text: data.rows[k].name});
                                    }
                                }
                            }
                        }
                        list.push(obj_list);
                    }

                }

            if(type=="add"){
                $p_id.find('.tree_add').unbind();
                $p_id.find('.tree_add').tree(list);
                }else{
                $p_id.find('.tree_edit').unbind();
                $p_id.find('.tree_edit').tree(list);
            }
            },
            "error": function (data) {
                console.log(data);
            }
        });

    }

//查询

    function into() {
        var num_size = 0;
        var params = { // 查询查询参数
            rolename:$p_id.find("#rolename").val(),//角色名称
            create_user:sys_username
        };

        var table_src = $p_id.find('#role_Table'); // 定义指向
        var ajax_url = sys_client+'/JCSW/web/publicmenus/Role_List_ajax.action'; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "roleNo"},
            {"col_id": "roleNo"},
            {"col_id": "roleName"},
            {"col_id": "remarks"},
            {"col_id": "createUser"},
            {"col_id": "createTime"}
        ]; // 定义表格数据列id
        var aoColumnDefs = [{
            "colIndex": 0,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return  '<td><div class="text-center" style="font-size: 14px;">'+full.s_num+'</div></td>';
            }
        }, {
            "colIndex": 1,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return  '<td><div class="text-center" style="font-size: 14px;">'+data+'</div></td>';

            }
        }, {
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
                return  '<td><div class="text-center" style="font-size: 14px;">'+data+'</div></td>';
            }
        },{
            "colIndex": 4,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return  '<td><div class="text-center" style="font-size: 14px;">'+data+'</div></td>';
            }
        },{
            "colIndex": 5,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return  '<td><div class="text-center" style="font-size: 14px;">'+data.substring(0,20)+'</div></td>';
            }
        },{
            "colIndex": 6,
            "html": function (data, type, full) {
                var html=""
                if(full.roleNo!=1000&&full.roleNo!=1001){
                    html='<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.seqNo+'"  menu_id = "'+full.roleNo+'" data-toggle="modal">删除</a></li>';
                }
                return  '<td><div class="drop-opt"><a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">操作列表<span class="icon-chevron-down"></span></a>'+
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">'+
                        '<li><a class="employee_edit"  href="javascript:void(0)"data-id="'+full.seqNo+'"data-type="'+full.roleNo+'"data-name="'+full.roleName+'" data-title="'+full.remarks+'" data-toggle="modal">更改</a></li>'+ html+
                    '   </ul></div></td>';
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
        getdata()
        return data;
    }




    /*function into(){
        var str=[];
        var params = {rolename:$p_id.find("#rolename").val(),recordStart:1,pageSize:10};
        $.ajax({
            "dataType": 'jsonp',
            "type": "get",
            "timeout": 20000,
            "async": false,
            "url":sys_client+'/JCSW/web/publicmenus/Role_List_ajax.action',
            "data": params,
            "jsonp":"callback",
            "jsonpCaback":"handle",
            "success": function (data) {
                $p_id.find("#start").empty();
                str = data.rows;
                var ml = "";
                for(var i=0;i<str.length;i++){
                    var  htmls='<td><div class="drop-opt"><a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">操作列表<span class="icon-chevron-down"></span></a>'+
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">'+
                        '<li><a class="employee_edit"  href="javascript:void(0)" data-id="'+str[i].seqNo+'" data-toggle="modal">更改</a></li>'+
                        '<li><a class="employee_del" href="javascript:void(0)" data-id="'+str[i].seqNo+'"  menu_id = "'+str[i].roleNo+'" data-toggle="modal">删除</a></li></ul></div></td>';
                    ml += '<tr><td><div class="text-center" style="font-size: 14px;">'+(i+1)+'</div></td><td><div class="text-center" style="font-size: 14px;">'+str[i].roleNo+'</div></td><td><div class="text-center" style="font-size: 14px;">'+str[i].roleName+'</div></td>' +
                        '<td><div class="text-center" style="font-size: 14px;">'+str[i].remarks+'</div></td><td><div class="text-center" style="font-size: 14px;">'+str[i].createUser+'</div></td><td><div class="text-center" style="font-size: 14px;">'+(str[i].createTime).substring(0,20)+'</div></td>'+htmls+'</tr>';
                }
                $p_id.find("#start").append(ml);

              getdata();

            },
            "error": function (data) {
                console.log(data);
            }
        });
    }*/

//页面加载时自动调用查询的方法
   into();

//搜索后列表重构
    $p_id.find("#employeeSeatchBut").on("click", function () {
        into();
    });

//点击添加新数据的触发事件
    $p_id.find("#addStaffModal").on("click", function () {
        $p_id.find("#add_form")[0].reset();
        getTree("add");
        $p_id.find("#newusername").modal('show');
    });

//添加窗口中的确认事件
    $p_id.find("#open_user").on("click", function () {
        // 默认允许提交
        var holdSubmit = true;
         var str=[];
         var clast = $p_id.find(".tree_add").find(".tree-node-checkbox.checked");
        var clast1 = $p_id.find(".tree_add").find(".tree-node-checkbox.half-checked");
       for(var i=0;i< clast.length;i++){
            str.push(clast[i].id);
       }
        for(var i=0;i< clast1.length;i++){
            str.push(clast1[i].id);
        }

         if(str.length==0){
            alert("请授权相关菜单");
             return;
         }
        if ($p_id.find('#add_form').isValid()) {
            if (holdSubmit) {
                // 只提交一次
                holdSubmit = false;
                var  addlist = {
                    rolename: $p_id.find('#a_rolename').val(),
                    remarks: $p_id.find('#a_remarks').val(),
                    listtrs:str.join('-'),
                    create_user:sys_username
                }
                $.ajax({
                    "dataType": 'jsonp',
                    "type": "get",
                    "timeout": 20000,
                    "async": false,
                    "url": sys_client+'/JCSW/web/publicmenus/Role_add_ajax.action',
                    "data": addlist,
                    "jsonp": "callback",
                    "jsonpCaback": "handle",
                    "success": function (data) {
                        Showbo.Msg.alert("保存成功！");
                        $('.tabReload').trigger("click");
                    },
                    "error": function (data) {
                        console.log(data);
                    }
                });
            }
        }
    });

    var d_seqno = {};
//详情下按钮的再次渲染
    function getdata(){
        getTree("edit");
       // window.location.reload();


//更改的触发事件
        $p_id.find(".employee_edit").on("click",function(){



        $p_id.find("#edit_form")[0].reset();
            $p_id.find('#e_seq_no').val($(this).attr('data-id'));
            $p_id.find('#e_roleno').val($(this).attr('data-type'));
            $p_id.find('#e_rolename').val($(this).attr('data-name'))
            $p_id.find('#e_remarks').val($(this).attr('data-title'));
        var cc =  $p_id.find(".tree_edit").find(".tree-node-checkbox");
        cc.removeClass("checked half-checked");
        var $node = cc.closest('.tree-node');
        $p_id.find(".tree_edit").find(".tree-nodes").css("display" , "block");
        $p_id.find(".tree_edit").find('.tree-node').removeClass('expand');
        $p_id.find(".tree_edit").find(".tree-node-toggle").addClass("expand");

        var seqno = $(this).attr('data-id');
        var sys=[];
        $.ajax({
            "dataType": 'jsonp',
            "type": "get",
            "timeout": 20000,
            "async": false,
            "url": sys_client+'/JCSW/web/publicmenus/Role_getAuthid_ajax.action',
            "data": {seqNo:seqno,create_user:sys_username},
            "jsonp": "callback",
            "jsonpCaback": "handle",
            "success": function (data) {
                sys = data.rows;
                for(var j=0;j<sys.length;j++){
                    var bb =sys[j].sysSet;//标签id
                    var bbr = sys[j].parentId;//父级id
                    var $checkboxes = $node.find("#"+bb+"");
                    var $checkb = $node.find("#"+bbr+"");
                    $checkboxes.addClass('checked');
                }


                $p_id.find("#editusername").modal('show');
            },
            "error": function (data) {
                console.log(data);
            }
        });
    });

//删除的触发事件
    $p_id.find(".employee_del").on("click",function(){
        d_seqno = {seqNo:$(this).attr('data-id'),roleNo:$(this).attr('menu_id'),create_user:sys_username};
        $p_id.find("#sureDel").modal('show');
    });

    }


    $p_id.find("#confirmDialog").on("click", function () {
        $("#popDiv").show();
        $.ajax({
            "dataType": 'jsonp',
            "type": "get",
            "timeout": 20000,
            "async": false,
            "url": sys_client+'/JCSW/web/publicmenus/Role_delete_edit.action',
            "data": d_seqno,
            "jsonp": "callback",
            "jsonpCaback": "handle",
            "success": function (data) {
                into();
            },
            "error": function (data) {
                $("#popDiv").hide();
                console.log(data);
            }
        });
    });


//修改页面的确认触发事件
    $p_id.find("#open_edit").on('click', function () {
        var str=[];
        var clast = $p_id.find(".tree_edit").find(".tree-node-checkbox.checked");
        var clast1 = $p_id.find(".tree_edit").find(".tree-node-checkbox.half-checked");
        for(var i=0;i< clast.length;i++){
            str.push(clast[i].id);
        }
        for(var i=0;i< clast1.length;i++){
            str.push(clast1[i].id);
        }
        if(str.length==0){
            alert("请授权相关菜单");
            return;
        }

        var editlist={
           remarks: $p_id.find('#e_remarks').val(),
            rolename: $p_id.find('#e_rolename').val(),
            roleNo : $p_id.find('#e_roleno').val(),
            seqNo : Number($p_id.find('#e_seq_no').val()),
            listtrs:str.join('-'),
            create_user:sys_username
        };
        $("#popDiv").show();
        $.ajax({
            "dataType": 'jsonp',
            "type": "get",
            "timeout": 20000,
            "async": false,
            "url": sys_client+'/JCSW/web/publicmenus/Role_update_edit.action',
            "data": editlist,
            "jsonp": "callback",
            "jsonpCaback": "handle",
            "success": function (data) {
                Showbo.Msg.alert("修改成功！");
                into();

            },
            "error": function (data) {
                $("#popDiv").hide();
                console.log(data);
            }
        });
    });
});

