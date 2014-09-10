package com.maizuo.web.controller;

import com.maizuo.constant.Constant;
import com.maizuo.domain.Result;
import com.maizuo.entity.User;

import javax.servlet.http.HttpServletRequest;

/**
 * Controller的基类
 * </pre>
 *
 * @see
 */
public class BaseController {

    /**
     * 获取保存在Session中的用户对象
     *
     * @param request
     * @return
     */
    protected User getSessionUser(HttpServletRequest request) {
        return (User) request.getSession().getAttribute(Constant.USER_CONTEXT);
    }

    /**
     * 保存用户对象到Session中
     *
     * @param request
     * @param user
     */
    protected void setSessionUser(HttpServletRequest request, User user) {
        User u = new User();
        u.setId(user.getId());
        u.setUserName(user.getUserName());
        request.getSession().setAttribute(Constant.USER_CONTEXT, u);
    }

    public Result result(int status, Object data, String msg) {
        return new Result(status, data, msg);
    }

    public Result result(int status, Object data, String msg, Object extra) {
        return new Result(status, data, msg, extra);
    }

}
