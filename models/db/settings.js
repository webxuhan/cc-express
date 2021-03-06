/**
 * 创建数据库连接
 * 系统配置参数
 * 该模块只会被加载一次
 * */

module.exports = {
    // debugger为true时，用于本地调试
    debug: false,
    session_secret : 'cc_company_secret', //务必修改
    auth_cookie_name : 'cc_company',
    encrypt_key : 'xinleaf',
    // 数据库配置
    URL : 'mongodb://127.0.0.1:27017/xinleaf_company',
    DB : 'cc_company',
    HOST: '',
    PORT: 27017,
    USERNAME: '',
    PASSWORD: '',

    // 信息提示相关
    system_illegal_param : '非法参数',
    system_noPower : '对不起，您无权执行该操作！',
    system_atLeast_one : '请选择至少一项后再执行删除操作！',
    system_batch_delete_not_allowed : '对不起，该模块不允许批量删除！'
}