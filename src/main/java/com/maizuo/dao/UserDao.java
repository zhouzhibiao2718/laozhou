package com.maizuo.dao;

import com.maizuo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class UserDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public User getUserById(final int id) {
        String sql = "SELECT * FROM User WHERE id=?";
        final User user = new User();
        jdbcTemplate.query(sql, new Object[]{id}, new RowCallbackHandler() {
            public void processRow(ResultSet rs) throws SQLException {
                user.setId(id);
                user.setUserName(rs.getString("userName"));
                user.setEmail(rs.getString("email"));
            }
        });
        return user;
    }


}
