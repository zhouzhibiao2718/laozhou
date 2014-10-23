package com.maizuo.util;

import com.google.gson.Gson;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Table on 14-4-1.
 */
public class Util {

    private static Gson gson = new Gson();

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


    private static String bean2Json(Object obj) {
        String json = gson.toJson(obj);
        return json;
    }

    public static <T> T json2Bean(String json, Class<T> classOfT) {

        return gson.fromJson(json, classOfT);
    }


    public static Map<String, String> bean2Map(Object bean) {
        Map<String, String> map = new HashMap<String, String>();
        if (bean == null) {
            return map;
        }
        String json = gson.toJson(bean);
        map = gson.fromJson(json, Map.class);
        return map;
    }

    public static <T> T map2Bean(Map<?, ?> map, Class<T> classOfT) {
        String jsonStr = map2Json(map);
        return (T) gson.fromJson(jsonStr, classOfT);
    }


    private static String map2Json(Map<?, ?> map) {
        StringBuilder json = new StringBuilder();
        json.append("{");
        if (map != null && map.size() > 0) {
            for (Object key : map.keySet()) {
                json.append(bean2Json(key));
                json.append(":");
                json.append(bean2Json(map.get(key)));
                json.append(",");
            }
            json.setCharAt(json.length() - 1, '}');
        } else {
            json.append("}");
        }
        return json.toString();
    }

    public static Map<String, String> json2Map(String json) {

        Map<String, String> map = gson.fromJson(json, Map.class);
        return map;
    }


    public static <T> T json2List(String json, Type typeOfT) {
        return (T) gson.fromJson(json, typeOfT);
    }

}
