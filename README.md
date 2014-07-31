###Maizuo Spring MVC Project Snapshot
-----------------------------------
###相关说明:

-	本项目是基于Spring MVC 3.1.X构建;

-	本项目是通过Maven构建,已加入常用基础包,各系统如有需求,请自行添加相关包;

-	项目默认增加了Hibernate支持,如有需要请自行修改包括不限于:
	- /WEB-INF/web.xml中的Hibernate OpenSession支持,
	- /resources/applicationContext.xml中的sessionFactory & Hibernate & EHCache相关支持;

-  类com.maizuo.dao.BaseDao是提供基础的Hibernate 泛型DAO支持,如有需要,请将自己的业务DAO直接extends BaseDao即可;

-  为统一各种系统数据解析,接口数据格式的返回,请使用com.maizuo.domain.Result对象进行返回数据的处理,相关示例代码在	com.maizuo.web.controller.IndexController#user中,请务必严格遵守!

-  相关工具类:  

	- /resources/applicationContext.xml中定义了相关常用工具:
	- jdbcTemplate:
		- jdbc操作,无需再重新定义JDBC工具类,相关示例可查询Spring jdbcTemplate相关文档;或参考本项目中的com.maizuo.dao.UserDao#getUserById方法;
		-  restTemplate:
			该类位于org.springframework.web.client包中，提供Http的各类方法：如Get，Head，Post，Put，Delete等，
			用于访问rest接口,无需再重新定义相关http工具类;
		-  自定义工具代码类放在com.maizuo.tool.Util中,默认增加了MD5和Base64的支持;

-  项目为标准Maven目录,请务自行修改目录结构,另外项目的业务逻辑层分为如下包:

	-  com.maizuo.constant包:存放通用的常量;
	
	-  com.maizuo.dao包:存放各业务DAO相关操作;
	
	-  com.maizuo.domain:存放领域对象,区别于JPA持久化对象,自定义的与数据库不相干的业务模型存放在该处;
	
	-  com.maizuo.entity:存放JPA持久化对象,该包仅存放数据库表映射的实体;
	
	-  com.maizuo.service:存放相应的业务逻辑;
	
	-  com.maizuo.web:存在控制器和相关过滤器逻辑,分别在controller包和filter包中;
	
	-  补充说明
		-  Dao         主要做数据库的交互工作
		-  Service     做相应的业务逻辑处理
		-  Controller  控制器层,负责请求转发等
		-  Entity      是模型层,存放你的实体类,就是对应的数据库表的实体类。
		-  Dao层：是使用了包Hibernate或JDBC连接数据库、操作数据库（增删改查）
		-  Service层：引用对应的Dao数据库操作，在这里可以编写自己需要的代码（比如简单的判断）
		-  Action层：引用对应的Service层，在这里可结合Struts的配置文件(本项目中通过Spring MVC相关逻辑进行处理)，
		    -  跳转到指定的页面，也能接受页面传递的请求数据，也可以做些计算处理。
		    -  相关操作会被注入到Spring的配置文件中，Spring把这些联系起来，成为一个整体。

-  数据库相关:
	-  /resources/jdbc.properties中配置有示例数据库相关信息;
	-  /resources/springmvc.sql为数据库构表sql;
	-  示例的数据库名为springmvc;
	-  数据库默认连接的是mysql;

-  页面模板:
	-  本项目引入了thymeleaf模板支持,用于替换传统jsp页面模板;
	-  thymeleaf相关资料可以直接查看:http://www.thymeleaf.org;

- 本地Server容器:  
	- 默认Server容器为jetty,相关配置在pom.xml最下方;

- 启动示例项目:
	-  建立好数据库,即可直接启动项目运行;
	-  访问http://localhost即可以演示数据查询,页面跳转,thymeleaf页面数据渲染等逻辑;
	-  访问http://localhost/user/1即可以演示数据查询,通过com.maizuo.domain.Result返回JSON格式数据等逻辑;

- 同步服务器端git项目代码:
	-  初次通过git clone ssh://git@192.168.1.203:10000/springmvc_template.git
	-  拉取到本来的代码为样板代码;
	-  每次新启一个项目,git管理员会重新生成一个git源;
	-  请先删除刚才通过git clone拉取到本地的项目目录(默认为springmvc_template,可以根据项目自定义)中的.git文件夹;
	-  然后根据git管理员提供的git源地址,拉取正式项目的git记录, 将刚才拉取的样板文件全部放到正式项目的文件夹,
	-  执行git上传等操作既可完成与服务器端git项目代码的同步;  
- 静态文件目录:
	- /App
		- /css    css文件
		- /bootstrap boostrap目录 项目基础css库采用bootstrap 无需另外添加css reset等代码
		- /image  图片文件
		- /lib    javascript公共库目录
			- /jquery jquery目录
			- /plugin 相关js插件目录
		- /widget javascript文件

- 更新日志:
	- 2014-04-25: 新建了dao分支,演示了Hibernate泛型DAO的使用,具体代码逻辑请查看dao分支;
	- 2014-05-06: 将jackson的版本升级到了2.3.3,处理了通@ResponseBody往前台写json格式数据未处理字段返回NULL的问题;