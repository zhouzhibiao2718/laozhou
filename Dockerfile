FROM 192.168.1.203/tomcat:7.0.69
RUN rm /etc/localtime && \
    ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
ENV JAVA_OPTS $JAVA_OPTS -Duser.timezone=GMT+08"
ADD docker/hosts.temp /usr/local/tomcat/springmvc_template/
ADD target/springmvc_template/ /usr/local/tomcat/springmvc_template/ROOT
