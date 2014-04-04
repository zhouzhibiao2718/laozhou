Maizuo Spring MVC Project Snapshot Create By Table.

相关说明:

1.	本项目是基于Spring MVC 3.1.X构建;

2.	本项目是通过Maven构建,已加入常用基础包,
	各系统如有需求,请自行添加相关包;

3.	项目默认增加了Hibernate支持,如有需要请自行修改包括不限于:
	/WEB-INF/web.xml中的Hibernate OpenSession支持,
	/resources/applicationContext.xml中的sessionFactory & Hibernate & EHCache相关支持;

4.  类com.maizuo.dao.BaseDao是提供基础的Hibernate 泛型DAO支持,
	如有需要,请将自己的业务DAO直接extends BaseDao即可;

5.  为统一各种系统数据解析,接口数据格式的返回,
	请使用com.maizuo.domain.Result对象进行返回数据的处理,
	相关示例代码在com.maizuo.web.controller.IndexController#user中,
	请务必严格遵守!

6.  相关工具类:
		1.  /resources/applicationContext.xml中定义了相关常用工具:
    		1.  jdbcTemplate:
    			jdbc操作,无需再重新定义JDBC工具类,
    			相关示例可查询Spring jdbcTemplate相关文档;
    			或参考本项目中的com.maizuo.dao.UserDao#getUserById方法;

    		2.  restTemplate:
    			该类位于org.springframework.web.client包中，
    			提供Http的各类方法：如Get，Head，Post，Put，Delete等，
    			用于访问rest接口,无需再重新定义相关http工具类;

		2.  自定义工具代码类放在com.maizuo.tool.Util中,默认增加了MD5和Base64的支持;

7.  项目为标准Maven目录,请务自行修改目录结构,另外项目的业务逻辑层分为如下包:

	1.  com.maizuo.constant包:存放通用的常量;

	2.  com.maizuo.dao包:存放各业务DAO相关操作;

	3.  com.maizuo.domain:存放领域对象,区别于JPA持久化对象,自定义的与数据库不相干的业务模型存放在该处;

	4.  com.maizuo.entity:存放JPA持久化对象,该包仅存放数据库表映射的实体;

	5.  com.maizuo.service:存放相应的业务逻辑;

	6.  com.maizuo.web:存在控制器和相关过滤器逻辑,分别在controller包和filter包中;

	7.  补充说明:
			Dao         主要做数据库的交互工作
            Entity      是模型,存放你的实体类
            Service     做相应的业务逻辑处理
            controller  是一个控制器
            Entity      层就是对应的数据库表的实体类。
            Dao层：是使用了包Hibernate或JDBC连接数据库、操作数据库（增删改查）
            Service层：引用对应的Dao数据库操作，在这里可以编写自己需要的代码（比如简单的判断）
            Action层：引用对应的Service层，在这里可结合Struts的配置文件(本项目中通过Spring MVC相关逻辑进行处理)，
            跳转到指定的页面，也能接受页面传递的请求数据，也可以做些计算处理。
            相关操作会被注入到Spring的配置文件中，Spring把这些联系起来，成为一个整体。

8.  数据库相关:
		1.  /resources/jdbc.properties中配置有示例数据库相关信息;

		2.  /resources/maizuo.sql为数据库构表sql;

		3.	示例的数据库名为maizuo;

		4.  数据库默认连接的是mysql;

9.  页面模板:
		1.  本项目引入了thymeleaf模板支持,用于替换传统jsp页面模板;

		2.  thymeleaf相关资料可以直接查看:http://www.thymeleaf.org;

10. 本地Server容器:
		默认Server容器为jetty,相关配置在pom.xml最下方;

11. 启动示例项目:
		1.  建立好数据库,即可直接启动项目运行,不出意外的话,在正常启动项目后;

		2.  访问http://localhost即可以演示数据查询,页面跳转,thymeleaf页面数据渲染等逻辑;

		3.  访问http://localhost/user/1即可以演示数据查询,通过com.maizuo.domain.Result返回JSON格式数据等逻辑;
