package com.maizuo.tool;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;

import java.io.UnsupportedEncodingException;

/**
 * Created by Table on 14-4-1.
 */
public class Util {

	public static String md5(String v) {
		try {
			v = new String(DigestUtils.md5Hex(v.getBytes("UTF-8")));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return v;
	}

	public static String encodeBase64(String v) {
		return new String(Base64.encodeBase64(v.getBytes(), true));
	}

	public static String decodeBase64(String v) {
		return new String(Base64.decodeBase64(v.getBytes()));
	}

}
