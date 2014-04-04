package com.maizuo.service;

import com.maizuo.dao.UserDao;
import com.maizuo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public User getUserById(int userId) {
        return userDao.getUserById(userId);
    }


}
