# glup

标签（空格分隔）： 未分类

---

### 1.glup是基于node流的威力构建的自动化工具。
 so，node是一个让js脱离浏览器也能运行的工作环境。毕竟js是为了浏览器而生，现在让它在node中也有发挥的余地，这样js写写后端的功能了。
 这里有个概念，node流。glup是基于流的话，node官话是说

> 事件驱动、非阻塞式 I/O 的模型

我理解就是，node它运行的代码有顺序。毕竟js在浏览器里面是以“抽象语法树”（Abstract Syntax Tree，AST）的一块套一块，一块连一块的方式，纠结着运行代码。一旦有了，first运行a代码，second运行b代码···思路清晰的代码流程。放到gulp中也可以把文件先做1处理，再2处理。
 
###2.glup是为了解决什么需求？
 毕竟没有人是为了无聊写个没人用的东西。原因是人太懒了。把名字改一改，压缩代码，合并代码···把这些东西都自动交给程序好了。在之前呆的公司并没有对代码行进压缩啊，合并的。所以都没有学.
 
### 3.让我们把眼睛投向node。
node是个神奇的东西，控制它的手段就是，用模块。node有很多模块，不同的模块应对不同的功能需求，此次用到的是glup的功能，只要用`nmp install -g gulp`就有了配置全局的gulp模块。还有，虽然有了gulp的功能，模块依赖也要，就是gulp的衍生功能。`gulp-sass，gulp-uglify···`应对gulp的sass预编译（下次试一下less和sass写个demo）和压缩的功能。
then，在根目录下创建`gulpfile.js`，通过`gulpfile.js`编写需要实现的压缩啥，编译啥，移动，改名字···代码功能。运行它的话在node bash里面敲一下gulp一下，node就实现了gulpfile.js里面的代码功，不做什么，注解掉代码就ok了。所以，gulpfile.js代码越丰富，模块功能越多。你能干的事情就越多。
 
 
##例子：
gulpfile.js代码展示。
解决问题：合并压缩重命名js代码；
思路很简单，引入你的目标文件夹，对里面的js文件先合并，再命名，再压缩，再流入新建的文件的js中
```
var gulp = require("gulp");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
//引入的模块有四个

gulp.task('minifyjs', function() {
    gulp.src('demo/js/*.js')   //你要处理的文件地址，地址前面没有其他的话说明是根目录里面的文件
        .pipe(concat('min.js'))  //合并成名字叫做min.js
        .pipe(rename({suffix:'.min'})) 
        //使文件的后缀为.min
        //dirname: "文件列表",
        //basename: "中间",
        //prefix: "前缀",
        //extname: "扩展名"
        .pipe(uglify()) //压缩吧！代码
        .pipe(gulp.dest('demo/minified/js')); //dest是gulp自带的api表示压缩整合好后存放的目录
});


gulp.task('default',['minifyjs']); //调用minifyjs代码，本来还有一个gulp.run()的api，不造为嘛运行不起来。只能这么调用先。

gulp.watch('demo/js/*.js',['minifyjs']); //开始的时候看到这个api以为是说，watch原来的未压缩的js变了没有。后来看了node才知道，这就是你改变js，它立马也改变mini js。这样你就可以在开发环境里自由的运行了。反正最后都mini了js。
```
实际应用中若用gulp干更多自动化的事情，可以搜索gulp相应插件，npm配置到node。再搜下相应模块处理代码，加进去gulpfile
.js。run下，watch下。再去node，gulp下。就ok了。
尼玛，太方便了吧！

 




