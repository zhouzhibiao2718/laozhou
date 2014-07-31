package com.maizuo.web.controller;

/**
 * Created by Table on 14-2-31.
 */

import com.maizuo.domain.Result;
import com.maizuo.entity.User;
import com.maizuo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class IndexController extends BaseController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(HttpServletRequest request, ModelMap m) {
		User user = new User();//userService.getUserById(1);
		m.put("user", user);
		return "view/index";
	}

	@RequestMapping("/user/{userId}")
	@ResponseBody
	public Result user(HttpServletRequest request, ModelMap mm, @PathVariable int userId) {
		User user = new User();//userService.getUserById(userId);
		if (user.getId() > 0) {
			return result(0, user, "拉取用户数据成功!");
		} else {
			return result(1, null, "拉取用户数据失败,不存在该用户!");
		}
	}
}