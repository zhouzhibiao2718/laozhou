package com.maizuo.dao;

import org.hibernate.LockMode;
import org.hibernate.criterion.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

/**
 * DAO基类，其它DAO可以直接继承这个DAO，不但可以复用共用的方法，还可以获得泛型的好处。
 * 泛型Dao(Data Access Object)接口 定义通用的save,find,update,delete等操作
 *
 * @param <ENTITY> 实体的类型
 * @param <ID>     主键的类型
 * @author Table
 */
@Repository
public abstract class BaseDao<ENTITY, ID extends Serializable> {
    private Class<ENTITY> entityClass;
    @Autowired
    private HibernateTemplate hibernateTemplate;

    /**
     * 通过反射获取子类确定的泛型类
     */
    public BaseDao() {
        Type genType = getClass().getGenericSuperclass();
        Type[] params = ((ParameterizedType) genType).getActualTypeArguments();
        entityClass = (Class) params[0];
    }


    /**
     * {@inheritDoc}
     */
    public void refresh(ENTITY entity) {
        getHibernateTemplate().refresh(entity);
    }

    /**
     * {@inheritDoc}
     */
    public Integer count() {
        DetachedCriteria criteria = DetachedCriteria.forClass(entityClass).setProjection(Projections.rowCount());
        return (Integer) getHibernateTemplate().findByCriteria(criteria).get(0);
    }

    /**
     * 执行HQL查询
     *
     * @param hql
     * @return 查询结果
     */
    public List find(String hql) {
        return this.getHibernateTemplate().find(hql);
    }

    /**
     * 执行带参的HQL查询
     *
     * @param hql
     * @param params
     * @return 查询结果
     */
    public List find(String hql, Object... params) {
        return this.getHibernateTemplate().find(hql, params);
    }

    /**
     * 通过给定的一个对象，查找与其模糊匹配的对象。
     *
     * @param entity 实体
     * @return 实体集合
     */
    @SuppressWarnings("unchecked")
    public List<ENTITY> findByExampleLikeAnyWhere(ENTITY entity) {
        DetachedCriteria criteria = DetachedCriteria.forClass(entityClass).add(Example.create(entity).enableLike(MatchMode.ANYWHERE));
        return getHibernateTemplate().findByCriteria(criteria);
    }

    /**
     * 通过给定的一个对象，查找与其匹配的对象。
     *
     * @param entity 实体
     * @return 实体集合
     */
    public List<ENTITY> findByExample(ENTITY entity) {
        DetachedCriteria criteria = DetachedCriteria.forClass(entityClass).add(Example.create(entity));
        return getHibernateTemplate().findByCriteria(criteria);
    }

    /**
     * 通过给定的一个对象，查找与其匹配的对象。
     *
     * @param entity      实体
     * @param firstResult 第一条记录
     * @param maxResults  最大记录数
     * @param matchMode   匹配模式
     * @return 实体集合
     */
    @SuppressWarnings("unchecked")
    public List<ENTITY> findByExample(ENTITY entity, int firstResult, int maxResults, MatchMode matchMode) {
        DetachedCriteria criteria = DetachedCriteria.forClass(entityClass).add(Example.create(entity).enableLike(matchMode));
        return getHibernateTemplate().findByCriteria(criteria, firstResult, maxResults);
    }

    /**
     * 通过给定的属性名和值，查找与其匹配的对象。
     *
     * @param propertyName 属性名
     * @param value        属性值
     * @return 实体集合
     */
    @SuppressWarnings("unchecked")
    public List<ENTITY> findByProperty(String propertyName, Object value) {
        String queryString = "from " + entityClass.getName() + " as model where model." + propertyName + "= ?";
        return getHibernateTemplate().find(queryString, value);
    }

    /**
     * {@inheritDoc}
     */
    public List<ENTITY> findByProperties(Map<String, Object> properties) {
        return findByProperties(properties, -1, -1);
    }

    /**
     * 得到所有的对象
     *
     * @return 实体集合
     */
    @SuppressWarnings("unchecked")
    public List<ENTITY> findAll() {
        String queryString = "from " + entityClass.getName();
        return getHibernateTemplate().find(queryString);
    }

    /**
     * 得到所有的对象....
     *
     * @return 实体集合
     */
    @SuppressWarnings("unchecked")
    public List<ENTITY> findAll(int firstResult, int maxResults) {
        DetachedCriteria criteria = DetachedCriteria.forClass(entityClass);
        return getHibernateTemplate().findByCriteria(criteria, firstResult, maxResults);
    }


    /**
     * 通过主键标识查找某个对象，可以锁定表中对应的记录
     *
     * @param id       对象标识
     * @param lockMode 锁定的方式
     * @return 实体
     */
    @SuppressWarnings("unchecked")
    public ENTITY findById(ID id, LockMode lockMode) {
        return (ENTITY) getHibernateTemplate().load(entityClass, id, lockMode);
    }

    /**
     * 通过主键标识查找某个对象
     *
     * @param id 对象标识
     * @return 实体
     */
    @SuppressWarnings("unchecked")
    public ENTITY findById(ID id) {
        return (ENTITY) getHibernateTemplate().load(entityClass, id);
    }

    /**
     * {@inheritDoc}
     */
    @SuppressWarnings("unchecked")
    public List<ENTITY> findByProperties(Map<String, Object> properties, int firstResult, int maxResults) {
        DetachedCriteria criteria = DetachedCriteria.forClass(entityClass);
        for (Map.Entry<String, Object> entry : properties.entrySet()) {
            criteria.add(Restrictions.eq(entry.getKey(), entry.getValue()));
        }
        return getHibernateTemplate().findByCriteria(criteria, firstResult, maxResults);
    }

    /**
     * 持久化entity,返回对象标识
     *
     * @param entity 实体
     * @return 对象标识
     */
    public ID save(ENTITY entity) {
        return (ID) getHibernateTemplate().save(entity);
    }

    /**
     * 持久化对象
     *
     * @param entity 实体
     */
    public void saveOrUpdate(ENTITY entity) {
        getHibernateTemplate().saveOrUpdate(entity);
    }

    /**
     * 返回entity的持久化对象，并不持久化entity
     *
     * @param entity 实体
     * @return 实体
     */
    @SuppressWarnings("unchecked")
    public ENTITY merge(ENTITY entity) {
        return (ENTITY) getHibernateTemplate().merge(entity);
    }

    /**
     * 将entity持久化
     *
     * @param entity 实体
     */
    public void update(ENTITY entity) {
        getHibernateTemplate().update(entity);
    }

    /**
     * 删除PO
     *
     * @param entity
     */
    @SuppressWarnings("unchecked")
    public void detele(ENTITY entity) {
        getHibernateTemplate().delete(entity);
    }

    /**
     * 对延迟加载的实体PO执行初始化
     *
     * @param entity
     */
    public void initialize(Object entity) {
        this.getHibernateTemplate().initialize(entity);
    }

    public HibernateTemplate getHibernateTemplate() {
        return hibernateTemplate;
    }
}