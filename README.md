用快应用开发开发工具作为IDE，使用前端技术栈开发的ToDoList（快应用只能运行于安卓）

# DDList含义

DDL is there/terrible/tomorrow/troublesome



# 项目结构

- Home
  - UnfinishedList
    - PastDDL（标红）
    - NearDDL （接近DDL时震动提示,时间标黄）
    - DoingDDL (标绿)
    - ToDoDDL (灰色)

---

- FinishedList [两个List都从原始listData里面筛选获得自己的LIST,并且自己排序]
  - DoneDDL
- bottomMenu

---

- DDL最基本三元素
  - 内容 content
  - 截止日期 deadline
  - 时间尺度 time scale 
- DDL详细设置
  - 重要程度 Priority (十万火急，重要，一般，无所谓)。默认一般
  - 开始时间/待办时间 StartTime。默认为创建DDL时间
  - 进度Progress 用滑动条设置,0-10,大于0代表Doing
  - 完成时间 DoneTime



# 使用

1. 新建DDL时点击加号，给一个简单的快速新建的box，设置基本三要素content,deadline,timeScale

可以选择直接创建,或者进入详细设置。

1. 点击DDL的文字显示具体信息,可以直接设置（用覆盖主页面的小视图实现，单击其他地方一下就消失）
2. 点击空心圆即可✓标记完成任务，完成的任务记录完成时间;可点击×删除任务，消除记录。



# 实现功能

- 语音输入（需要service.asr支持）
- 修改待办
- 添加完成时间DoneTime
- 样式优化->不同重要性,不同状态DDL都有各自样式提醒用户
- 本地存取,震动提醒
- 底部菜单持续显示DDL数目统计
- 多状态,从需要的ToDo/Doing/Done三种增加成了五种状态ToDo/Doing/Near/Past/Done
- 引入了TimeScale,可以针对不同的时间敏感度进行DDL临近的提醒
