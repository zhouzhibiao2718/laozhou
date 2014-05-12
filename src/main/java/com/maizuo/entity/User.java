package com.maizuo.entity;

import com.maizuo.domain.Result;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Table on 2014/4/3.
 */
@Entity
public class User {
	private int id;
	private String account = "";
	private String userName;
	private String password;
	private String email;
	private String picture = "";
	private int groupId;
	private String lastLoginTime;
	private String lastLoginIp;
	private Result result;
	private boolean boo;
	private List list=new ArrayList();
	private Object obj;

	@Id
	@Column(name = "id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Basic
	@Column(name = "account")
	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	@Basic
	@Column(name = "userName")
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Basic
	@Column(name = "password")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Basic
	@Column(name = "email")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Basic
	@Column(name = "picture")
	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	@Id
	@Column(name = "groupId")
	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	@Basic
	@Column(name = "lastLoginTime")
	public String getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(String lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	@Basic
	@Column(name = "lastLoginIp")
	public String getLastLoginIp() {
		return lastLoginIp;
	}

	public void setLastLoginIp(String lastLoginIp) {
		this.lastLoginIp = lastLoginIp;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		User user = (User) o;

		if (groupId != user.groupId) return false;
		if (id != user.id) return false;
		if (account != null ? !account.equals(user.account) : user.account != null) return false;
		if (email != null ? !email.equals(user.email) : user.email != null) return false;
		if (lastLoginIp != null ? !lastLoginIp.equals(user.lastLoginIp) : user.lastLoginIp != null) return false;
		if (lastLoginTime != null ? !lastLoginTime.equals(user.lastLoginTime) : user.lastLoginTime != null) return false;
		if (password != null ? !password.equals(user.password) : user.password != null) return false;
		if (picture != null ? !picture.equals(user.picture) : user.picture != null) return false;
		if (userName != null ? !userName.equals(user.userName) : user.userName != null) return false;

		return true;
	}

	@Override
	public int hashCode() {
		int result = id;
		result = 31 * result + (account != null ? account.hashCode() : 0);
		result = 31 * result + (userName != null ? userName.hashCode() : 0);
		result = 31 * result + (password != null ? password.hashCode() : 0);
		result = 31 * result + (email != null ? email.hashCode() : 0);
		result = 31 * result + (picture != null ? picture.hashCode() : 0);
		result = 31 * result + groupId;
		result = 31 * result + (lastLoginTime != null ? lastLoginTime.hashCode() : 0);
		result = 31 * result + (lastLoginIp != null ? lastLoginIp.hashCode() : 0);
		return result;
	}

	public Result getResult() {
		return result;
	}

	public void setResult(Result result) {
		this.result = result;
	}

	public boolean isBoo() {
		return boo;
	}

	public void setBoo(boolean boo) {
		this.boo = boo;
	}

	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}
}
