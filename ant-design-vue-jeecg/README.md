## 享受更快的jeecg-boot

原加载时间19.83s 8.4M trans(传输的文件大小,选的其中一个比较大的js为典型)
1. 移除 prefetch 插件 done
    config.plugins.delete('prefetch')
2. component 异步 jeecg/index.js ()
    5.32s 5.5M trans
3. 删除不需要的库 vxe-table antv (根据自己的需要,我这边是没用到这个,Viser库文档并不友好,开发想用其他库o(╯□╰)o,
  考虑到万一有人要用这个,这个版本没有删除,需自己手动)
    修改main.js  package.json 2个文件
    3.77s 5.1M trans
4. config修改
  // （缺省值5）按需加载时的最大并行请求数
      config.optimization.splitChunks.maxAsyncRequests = 30
      // （默认值3）入口点上的最大并行请求数
      config.optimization.splitChunks.maxInitialRequests = 20

搜索 //x优化 可以找到对应代码

其他:
- 显示分析报告
  package.json
  "buildReport": "vue-cli-service build --report",
- 也尝试过antd异步加载等 但是得不偿失 修改代码异常麻烦 很多地方的代码应用不符合异步加载的规定就坑了
- 还可以提取依赖到外部cdn 但是首页到了3s左右这个效果比较微弱了 作为一个后台管理系统已经符合要求没在继续优化 有兴趣的可以自行尝试
- 还尝试过干掉antd-online-mini依赖, 但是动态菜单有依赖里面一个方法,报错. 有兴趣的可以重写方法干掉这个依赖.

### 服务器压缩等 nginx配置
```
server
{
    listen 80;
	listen 443 ssl http2;
    server_name front.yzzh.tech;
	index index.html index.htm default.php default.htm default.html index.php;
    root /www/wwwroot/front.yzzh.tech;
    
    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    ssl_certificate    /www/server/panel/vhost/cert/front.yzzh.tech/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/front.yzzh.tech/privkey.pem;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    add_header Strict-Transport-Security "max-age=31536000";
    error_page 497  https://$host$request_uri;


    #SSL-END
	#引用重定向规则，注释后配置的重定向代理将无效
	include /www/server/panel/vhost/nginx/redirect/front.yzzh.tech/*.conf;
    
    #ERROR-PAGE-START  错误页配置，可以注释、删除或修改
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END
    
    #压缩 ##这里选的等级5 
    gzip on;
    gzip_min_length 30k;
    gzip_comp_level 5;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    
    #PHP-INFO-START  PHP引用配置，可以注释或修改
    include enable-php-00.conf;
    #PHP-INFO-END
    
    #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效
    include /www/server/panel/vhost/rewrite/front.yzzh.tech.conf;
    #REWRITE-END
    
    #禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }
    # location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    # {
    #   expires      30d;
    #   error_log off;
    #   access_log /dev/null;
    # }
    
    location ~ .*\.(js|css)?$
    {
        expires      28h;
        error_log off;
        access_log /dev/null; 
    }
    
    location ^~/imgurl/
    {
  	#expires      30d;
      	#root  /www/temp/userimg/;
 	alias  /www/temp/userimg/;
        autoindex on;
 	
    } 
    location /test/ {
      root /www/wwwroot/front.yzzh.tech;
      try_files $uri $uri/ /test/index.html; 
    }
    
    location /xxx-api/
    {
      proxy_pass http://localhost:8970/jeecg-boot/;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_read_timeout 300s;
      allow all;
    }
    
    location /xxx-static/
    {
      alias /www/server/yha-test/D:/opt/upFiles/;
    }
    
     #设置html不缓存读取本地，永远走200，拿到最新的
    location ~.*\.(htm|html)$
    {
        add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
        # add_header Cache-Control no-cache;
        add_header Pragma no-cache;
        add_header Expires 0;
        # add_header Cache-Control "no-cache, no-store";
    }
    
    access_log  /www/wwwlogs/front.yzzh.tech.log;
    error_log  /www/wwwlogs/front.yzzh.tech.error.log;
}
```

Ant Design Jeecg Vue
====

当前最新版本： 3.1.0（发布日期：20220301）

Overview
----

基于 [Ant Design of Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/) 实现的 Ant Design Pro  Vue 版
Jeecg-boot 的前端UI框架，采用前后端分离方案，提供强大代码生成器的低代码平台。
前端页面代码和后端功能代码一键生成，不需要写任何代码，保持jeecg一贯的强大！！



#### 前端技术
 
- 基础框架：[ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现
- JavaScript框架：Vue
- Webpack
- node
- yarn
- eslint
- @vue/cli 3.2.1
- [vue-cropper](https://github.com/xyxiao001/vue-cropper) - 头像裁剪组件
- [@antv/g2](https://antv.alipay.com/zh-cn/index.html) - Alipay AntV 数据可视化图表
- [Viser-vue](https://viserjs.github.io/docs.html#/viser/guide/installation)  - antv/g2 封装实现



项目下载和运行
----

- 拉取项目代码
```bash
git clone https://github.com/zhangdaiscott/jeecg-boot.git
cd  jeecg-boot/ant-design-vue-jeecg
```

- 安装依赖
```
yarn install
```

- 开发模式运行
```
yarn run serve
```

- 编译项目
```
yarn run build
```

- Lints and fixes files
```
yarn run lint
```



其他说明
----

- 项目使用的 [vue-cli3](https://cli.vuejs.org/guide/), 请更新您的 cli

- 关闭 Eslint (不推荐) 移除 `package.json` 中 `eslintConfig` 整个节点代码

- 修改 Ant Design 配色，在文件 `vue.config.js` 中，其他 less 变量覆盖参考 [ant design](https://ant.design/docs/react/customize-theme-cn) 官方说明
```ecmascript 6
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
        },
        javascriptEnabled: true,
      }
    }
  }
```



附属文档
----
- [Ant Design Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn)

- [报表 viser-vue](https://viserjs.github.io/demo.html#/viser/bar/basic-bar)

- [Vue](https://cn.vuejs.org/v2/guide)

- [路由/菜单说明](https://github.com/zhangdaiscott/jeecg-boot/tree/master/ant-design-vue-jeecg/src/router/README.md)

- [ANTD 默认配置项](https://github.com/zhangdaiscott/jeecg-boot/tree/master/ant-design-vue-jeecg/src/defaultSettings.js)

- 其他待补充...


备注
----

> @vue/cli 升级后，eslint 规则更新了。由于影响到全部 .vue 文件，需要逐个验证。既暂时关闭部分原本不验证的规则，后期维护时，在逐步修正这些 rules


Docker 镜像使用
----

 ``` 
# 1.修改前端项目的后台域名
    .env.development
    域名改成： http://jeecg-boot-system:8080/jeecg-boot
   
# 2.先进入打包前端项目
  yarn run build

# 3.构建镜像
  docker build -t nginx:jeecgboot .

# 4.启动镜像
  docker run --name jeecg-boot-nginx -p 80:80 -d nginx:jeecgboot

# 5.配置host

    # jeecgboot
    127.0.0.1   jeecg-boot-redis
    127.0.0.1   jeecg-boot-mysql
    127.0.0.1   jeecg-boot-system
  
# 6.访问前台项目
  http://localhost:80
``` 