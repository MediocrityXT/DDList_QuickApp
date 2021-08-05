(function(){
    
    var createPageHandler = function() {
      return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&cacheDirectory&plugins[]=d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList\\babel.config.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\access-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/home/index.ux?uxType=page":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&cacheDirectory&plugins[]=d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=c:\Users\11848\Desktop\TODOLIST\DDList\babel.config.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\access-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./src/home/index.ux?uxType=page ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _system = _interopRequireDefault($app_require$("@app-module/system.prompt"));

var _system2 = _interopRequireDefault($app_require$("@app-module/system.storage"));

var _system3 = _interopRequireDefault($app_require$("@app-module/system.vibrator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  private: {
    listData: [],
    finishedList: [],
    indexAdd: 0,
    showModal: false,
    showQuickAddBox: false,
    showDetailBox: false,
    showFinished: false
  },

  onInit() {
    this.getList();
    this.sortUnfinished();
    this.sortFinished();
    this.$on('nearDDL', evt => {
      this.showHint("Deadlines are near!");

      _system3.default.vibrate({
        mode: 'long'
      });
    });
    this.$on('sendNewDDL', evt => {
      this.quitModal();
      this.addNewDDL(evt);
      this.sortUnfinished();
    });
    this.$on('setDetailsOfNewDDL', evt => {
      this.quitModal();
      this.addNewDDL(evt);
      this.popDetailBox(this.listData.length - 1, 1);
    });
    this.$on('editDDL', evt => {
      const idx = evt.detail.idx;
      this.listData[idx].ddl = evt.detail.ddl;
      console.log(this.listData);
      this.sortUnfinished();
      console.log(this.listData);
    });
    this.$on('callDetails', evt => {
      this.popDetailBox(evt.detail.idx, evt.detail.type);
    });
    this.$on('doneDDL', evt => {
      const idx = evt.detail.idx;
      console.log("done the ddl ", idx);
      this.listData[idx].ddl.DoneTime = {
        date: this.$app.$def.getDate(),
        time: this.$app.$def.getTime()
      };
      this.finishedList.push(this.listData[idx]);
      this.sortFinished();
      this.listData.splice(idx, 1);
    });
    this.$on('removeDDL', evt => {
      const type = evt.detail.type;
      const idx = evt.detail.idx;
      this.$broadcast("hideRow", {});

      if (type == 1) {
        this.listData.splice(idx, 1);
      } else if (type == 2) {
        this.finishedList.splice(idx, 1);
      } else {
        console.log("remove error");
      }
    });
  },

  onDestroy() {
    this.storeList();
  },

  listSwitch(showFinished) {
    if (showFinished == 0) {
      this.showFinished = false;
    } else {
      this.showFinished = true;
    }
  },

  popQuickAddBox() {
    this.showModal = true;
    this.showQuickAddBox = true;
    this.$broadcast('quickAddBox', {
      showQuickAddBox: true
    });
  },

  popDetailBox(idx, type) {
    this.showModal = true;
    this.showDetailBox = true;
    console.log("type:", type);

    if (type == 1) {
      var ddl = this.listData[idx].ddl;
    } else if (type == 2) {
      var ddl = this.finishedList[idx].ddl;
    }

    this.$broadcast('detailBox', {
      showDetailBox: true,
      type: type,
      idx: idx,
      ddl: ddl
    });
  },

  quitModal() {
    this.showModal = false;

    if (this.showQuickAddBox) {
      this.showQuickAddBox = false, this.$broadcast('quickAddBox', {
        showQuickAddBox: false
      });
    } else if (this.showDetailBox) {
      this.showDetailBox = false, this.$broadcast('detailBox', {
        showDetailBox: false,
        type: '',
        idx: '',
        ddl: {}
      });
    }
  },

  addNewDDL(evt) {
    console.log(evt.type);
    const params = evt.detail;
    this.indexAdd = this.listData.length;
    var startTime = {
      date: this.$app.$def.getDate(),
      time: this.$app.$def.getTime()
    };
    console.log("add ddl:", params.deadline);
    this.listData.push({
      ddl: {
        content: params.content,
        deadline: params.deadline,
        timeScale: params.timeScale,
        Priority: "normal",
        StartTime: startTime,
        repeatRule: "None",
        Progress: "0",
        Order: '',
        DoneTime: {}
      }
    });
  },

  sortUnfinished() {
    this.listData.sort((a, b) => {
      return this.$app.$def.AisBefore(a, b);
    });
  },

  sortFinished() {
    this.finishedList.sort((a, b) => {
      return this.$app.$def.AisBefore(b, a);
    });
  },

  getList() {
    _system2.default.get({
      key: "data1",
      success: data => {
        console.log("get data1", data);

        if (data != '') {
          console.log("parse data1", JSON.parse(data));
          this.listData = JSON.parse(data);
        } else {
          console.log("empty data1");
        }
      },
      fail: function (data, code) {
        console.log(`data1 fail, code = ${code}`);
      }
    });

    _system2.default.get({
      key: "data2",
      success: data => {
        console.log("get data2", data);

        if (data != '') {
          console.log("parse data2", JSON.parse(data));
          this.finishedList = JSON.parse(data);
        } else {
          console.log("empty data2");
        }
      },
      fail: function (data, code) {
        console.log(`data2 fail, code = ${code}`);
      }
    });
  },

  storeList() {
    var data1 = JSON.stringify(this.listData);
    console.log("data1", data1);
    var data2 = JSON.stringify(this.finishedList);

    _system2.default.set({
      key: "data1",
      value: data1,
      success: function (data) {
        console.log('storing data1 success');
      },
      fail: function (data, code) {
        console.log(`data1 fail to Store, code = ${code}`);
      }
    });

    _system2.default.set({
      key: "data2",
      value: data2,
      success: function (data) {
        console.log('storing data2 success');
      },
      fail: function (data, code) {
        console.log(`data2 fail to Store, code = ${code}`);
      }
    });
  },

  showHint(msg) {
    _system.default.showToast({
      message: msg
    });
  }

};
exports.default = _default;
const moduleOwn = exports.default || module.exports;
const accessors = ['public', 'protected', 'private'];

if (moduleOwn.data && accessors.some(function (acc) {
  return moduleOwn[acc];
})) {
  throw new Error('页面VM对象中的属性data不可与"' + accessors.join(',') + '"同时存在，请使用private替换data名称');
} else if (!moduleOwn.data) {
  moduleOwn.data = {};
  moduleOwn._descriptor = {};
  accessors.forEach(function (acc) {
    const accType = typeof moduleOwn[acc];

    if (accType === 'object') {
      moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);

      for (const name in moduleOwn[acc]) {
        moduleOwn._descriptor[name] = {
          access: acc
        };
      }
    } else if (accType === 'function') {
      console.warn('页面VM对象中的属性' + acc + '的值不能是函数，请使用对象');
    }
  });
}}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&cacheDirectory&plugins[]=d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList\\babel.config.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/home/ddl-item-2.ux?uxType=comp":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&cacheDirectory&plugins[]=d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=c:\Users\11848\Desktop\TODOLIST\DDList\babel.config.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./src/home/ddl-item-2.ux?uxType=comp ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _system = _interopRequireDefault($app_require$("@app-module/system.prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  props: ["ddl", "idx"],
  data: {
    type: 2,
    showFinishRow: false
  },

  onInit() {},

  callDetails() {
    this.$dispatch('callDetails', {
      idx: this.idx,
      type: this.type
    });
  },

  showRowSwitch() {
    this.showFinishRow = !this.showFinishRow;
  },

  removeDDL() {
    this.$dispatch('removeDDL', {
      idx: this.idx,
      type: this.type
    });
  },

  showHint(msg) {
    _system.default.showToast({
      message: msg
    });
  }

};
exports.default = _default;}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&cacheDirectory&plugins[]=d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList\\babel.config.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/home/ddl-item.ux?uxType=comp":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&cacheDirectory&plugins[]=d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=c:\Users\11848\Desktop\TODOLIST\DDList\babel.config.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./src/home/ddl-item.ux?uxType=comp ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _system = _interopRequireDefault($app_require$("@app-module/system.prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  props: ["ddl", "idx"],
  data: {
    type: 1,
    near: false,
    showFinishRow: false
  },

  onInit() {
    this.near = this.isNear();

    if (this.near) {
      console.log(this.ddl.content, " is Near");
      this.$dispatch('nearDDL', {});
    }

    this.$on("hideRow", evt => {
      this.showFinishRow = false;
    });
  },

  isPast() {
    var time = this.ddl.deadline.date + ' ' + this.ddl.deadline.time;
    return !this.$app.$def.isFutureTime(time);
  },

  isNear() {
    return this.$app.$def.nearDDL(this.ddl.deadline, this.ddl.timeScale);
  },

  callDetails() {
    this.$dispatch('callDetails', {
      idx: this.idx,
      type: this.type
    });
  },

  showRowSwitch() {
    this.showFinishRow = !this.showFinishRow;
  },

  setDoneDDL() {
    this.$dispatch('doneDDL', {
      idx: this.idx
    });
  },

  removeDDL() {
    this.$dispatch('removeDDL', {
      idx: this.idx,
      type: this.type
    });
  },

  showHint(msg) {
    _system.default.showToast({
      message: msg
    });
  }

};
exports.default = _default;}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&cacheDirectory&plugins[]=d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList\\babel.config.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/home/detailBox.ux?uxType=comp":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&cacheDirectory&plugins[]=d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=c:\Users\11848\Desktop\TODOLIST\DDList\babel.config.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./src/home/detailBox.ux?uxType=comp ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _system = _interopRequireDefault($app_require$("@app-module/system.prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  props: [],
  data: {
    idx: '',
    ddl: {
      content: "",
      deadline: {
        date: "",
        time: ""
      },
      timeScale: '',
      time: '',
      Priority: "",
      StartTime: {},
      repeatRule: "",
      Progress: "",
      Order: "",
      DoneTime: {}
    },
    timeScaleRange: ["minute", "hour", "day", "month"],
    priorityRange: ["vital", "important", "normal", "casual"],
    action: '',
    showBox: false,
    showDoneTime: false,
    disabled: false,
    micStatus: 'micOff'
  },

  contentChange(e) {
    this.ddl.content = e.value;
  },

  dateChange_deadline(e) {
    var year = e.year.toString();
    var mon = this.fillString(e.month + 1);
    var day = this.fillString(e.day);
    this.ddl.deadline.date = year + "-" + mon + "-" + day;
  },

  timeChange_deadline(e) {
    this.ddl.deadline.time = this.fillString(e.hour) + ":" + this.fillString(e.minute);
  },

  dateChange_StartTime(e) {
    var year = e.year.toString();
    var mon = this.fillString(e.month + 1);
    var day = this.fillString(e.day);
    this.ddl.StartTime.date = year + "-" + mon + "-" + day;
  },

  timeChange_StartTime(e) {
    this.ddl.StartTime.time = this.fillString(e.hour) + ":" + this.fillString(e.minute);
  },

  scaleChange(e) {
    this.ddl.timeScale = e.newValue;
  },

  priorityChange(e) {
    this.ddl.Priority = e.newValue;
  },

  progressChange(e) {
    this.ddl.Progress = e.progress;
  },

  fillString(i) {
    var s = i.toString();

    if (s.length == 1) {
      s = '0' + s;
    }

    return s;
  },

  onInit() {
    this.$on('detailBox', evt => {
      const show = evt.detail.showDetailBox;

      if (show) {
        console.log("show the", evt.detail.idx, "detailBox.");
        this.show(evt);
      } else {
        if (!this.$app.$def.isFutureTime(this.ddl.deadline.date + " " + this.ddl.deadline.time)) {
          this.showHint("Deadline should be in the future!");
        }

        if (JSON.stringify(this.ddl.DoneTime) == "{}") {
          console.log("Edit detailBox's idx:", this.idx);
          this.$dispatch("editDDL", {
            ddl: this.ddl,
            idx: this.idx
          });
        } else {
          console.log("not Edit", this.idx, "detailBox");
        }

        this.hide();
      }
    });
  },

  show(evt) {
    this.showBox = true;
    this.idx = evt.detail.idx;
    this.ddl = evt.detail.ddl;

    if (evt.detail.type == 2) {
      this.disabled = true;
    }

    this.$app.$def.init();
  },

  hide() {
    this.idx = '';
    this.ddl = {
      content: "",
      deadline: {
        date: "",
        time: ""
      },
      timeScale: '',
      Priority: "",
      StartTime: {},
      repeatRule: "",
      Progress: "",
      Order: "",
      DoneTime: {}
    };
    this.showBox = false, this.showDoneTime = false, this.disabled = false, this.$app.$def.close();
  },

  computeOrder(deadline, timeScale, Priority) {
    time = (PresentTime() - deadline) / timeScale;
    Order = time / Priority;
  },

  voiceOn() {
    this.micStatus = 'micOn';
    this.$app.$def.start();
  },

  voiceOff() {
    this.micStatus = 'micOff';
    const temp = this.$app.$def.stop();
    console.log(temp);
    this.ddl.content = this.ddl.content + temp;
  },

  voiceSwitch() {
    if (this.micStatus == "micOn") {
      this.voiceOff();
    } else if (this.micStatus == "micOff") {
      this.voiceOn();
    } else {
      console.log("mic Status error!");
    }
  },

  showHint(msg) {
    _system.default.showToast({
      message: msg
    });
  }

};
exports.default = _default;}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&cacheDirectory&plugins[]=d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList\\babel.config.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/home/quickAddBox.ux?uxType=comp":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&cacheDirectory&plugins[]=d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=c:\Users\11848\Desktop\TODOLIST\DDList\babel.config.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./src/home/quickAddBox.ux?uxType=comp ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _system = _interopRequireDefault($app_require$("@app-module/system.prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  props: [],
  data: {
    content: '',
    deadline: {
      date: "",
      time: ""
    },
    timeScale: 'day',
    timeScaleRange: ["minute", "hour", "day", "month"],
    action: '',
    showBox: false,
    micStatus: 'micOff'
  },

  test() {
    console.log(this.deadline);
  },

  contentChange(e) {
    this.content = e.value;
  },

  scaleChange(e) {
    this.timeScale = e.newValue;
  },

  dateChange(e) {
    var year = e.year.toString();
    var mon = this.fillString(e.month + 1);
    var day = this.fillString(e.day);
    this.deadline.date = year + "-" + mon + "-" + day;
  },

  timeChange(e) {
    this.deadline.time = this.fillString(e.hour) + ":" + this.fillString(e.minute);
    console.log("timeChange", this.deadline);
  },

  onInit() {
    this.deadline.date = this.$app.$def.getDate();
    this.deadline.time = this.$app.$def.getTime();
    this.$on('quickAddBox', evt => {
      const show = evt.detail.showQuickAddBox;
      this.showBox = show;

      if (show) {
        console.log("show the quickAddBox.");
        this.show();
      } else {
        this.hide();
      }
    });
  },

  show() {
    this.deadline.date = this.$app.$def.getDate();
    this.deadline.time = this.$app.$def.getTime();
    this.$app.$def.init();
  },

  hide() {
    this.content = '';
    this.deadline.date = '';
    this.deadline.time = '';
    this.timeScale = "day";
    this.$app.$def.close();
  },

  showHint(msg) {
    _system.default.showToast({
      message: msg
    });
  },

  setDetail() {
    if (this.confirmDDL()) {
      this.$dispatch('setDetailsOfNewDDL', {
        content: this.content,
        deadline: JSON.parse(JSON.stringify(this.deadline)),
        timeScale: this.timeScale
      });
    } else {
      this.showHint(`Please enter your DDL in the FUTURE`);
    }
  },

  sendDDL() {
    if (this.confirmDDL()) {
      this.$dispatch('sendNewDDL', {
        content: this.content,
        deadline: JSON.parse(JSON.stringify(this.deadline)),
        timeScale: this.timeScale
      });
    } else {
      this.showHint(`Please enter your DDL in the FUTURE`);
    }
  },

  confirmDDL() {
    if (this.content === '') {
      return false;
    } else {
      return true;
    }
  },

  fillString(i) {
    var s = i.toString();

    if (s.length == 1) {
      s = '0' + s;
    }

    return s;
  },

  voiceOn() {
    this.micStatus = 'micOn';
    this.$app.$def.start();
  },

  voiceOff() {
    this.micStatus = 'micOff';
    const temp = this.$app.$def.stop();
    console.log(temp);
    this.content = this.content + temp;
  },

  voiceSwitch() {
    if (this.micStatus == "micOn") {
      this.voiceOff();
    } else if (this.micStatus == "micOff") {
      this.voiceOn();
    } else {
      console.log("mic Status error!");
    }
  }

};
exports.default = _default;}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/home/ddl-item-2.ux?uxType=comp":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./src/home/ddl-item-2.ux?uxType=comp ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  ".btn": {
    "borderTopWidth": "0px",
    "borderRightWidth": "0px",
    "borderBottomWidth": "0px",
    "borderLeftWidth": "0px",
    "borderStyle": "solid",
    "borderTopColor": "#000000",
    "borderRightColor": "#000000",
    "borderBottomColor": "#000000",
    "borderLeftColor": "#000000",
    "borderRadius": "10%"
  },
  ".item": {
    "width": "100%",
    "flexDirection": "column"
  },
  ".ddlRow": {
    "justifyContent": "flex-start"
  },
  ".finishRow": {
    "backgroundColor": "#dad8d8",
    "flexDirection": "row",
    "justifyContent": "space-around",
    "paddingTop": "20px",
    "paddingBottom": "20px"
  },
  ".finishRow .completedImg": {
    "borderTopWidth": "0px",
    "borderRightWidth": "0px",
    "borderBottomWidth": "0px",
    "borderLeftWidth": "0px",
    "borderStyle": "solid",
    "borderTopColor": "#000000",
    "borderRightColor": "#000000",
    "borderBottomColor": "#000000",
    "borderLeftColor": "#000000",
    "borderRadius": "10%",
    "width": "64px",
    "height": "64px",
    "backgroundImage": "/common/select.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "finishRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "completedImg"
        }
      ]
    }
  },
  ".finishRow .removedImg": {
    "borderTopWidth": "0px",
    "borderRightWidth": "0px",
    "borderBottomWidth": "0px",
    "borderLeftWidth": "0px",
    "borderStyle": "solid",
    "borderTopColor": "#000000",
    "borderRightColor": "#000000",
    "borderBottomColor": "#000000",
    "borderLeftColor": "#000000",
    "borderRadius": "10%",
    "width": "64px",
    "height": "64px",
    "backgroundImage": "/common/delete.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "finishRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "removedImg"
        }
      ]
    }
  },
  ".circle": {
    "marginTop": "50px",
    "marginRight": "50px",
    "marginBottom": "50px",
    "marginLeft": "50px",
    "width": "50px",
    "height": "50px",
    "borderTopWidth": "15px",
    "borderRightWidth": "15px",
    "borderBottomWidth": "15px",
    "borderLeftWidth": "15px",
    "borderRadius": "50%",
    "alignSelf": "center"
  },
  ".vital": {
    "borderTopColor": "#f81e0f",
    "borderRightColor": "#f81e0f",
    "borderBottomColor": "#f81e0f",
    "borderLeftColor": "#f81e0f"
  },
  ".important": {
    "borderTopColor": "#f8cb00",
    "borderRightColor": "#f8cb00",
    "borderBottomColor": "#f8cb00",
    "borderLeftColor": "#f8cb00"
  },
  ".normal": {
    "borderTopColor": "#0cdf98",
    "borderRightColor": "#0cdf98",
    "borderBottomColor": "#0cdf98",
    "borderLeftColor": "#0cdf98"
  },
  ".casual": {
    "borderTopColor": "#0cb5df",
    "borderRightColor": "#0cb5df",
    "borderBottomColor": "#0cb5df",
    "borderLeftColor": "#0cb5df"
  },
  ".finished": {
    "borderTopColor": "#7a7979",
    "borderRightColor": "#7a7979",
    "borderBottomColor": "#7a7979",
    "borderLeftColor": "#7a7979"
  },
  ".ddl-text": {
    "flexDirection": "row",
    "flexGrow": 1,
    "justifyContent": "space-between"
  },
  ".ddl-text .content": {
    "marginTop": "0px",
    "marginRight": "20px",
    "marginBottom": "0px",
    "marginLeft": "auto",
    "fontSize": "40px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ddl-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        }
      ]
    }
  },
  ".ddl-text .deadline": {
    "marginTop": "0px",
    "marginRight": "20px",
    "marginBottom": "0px",
    "marginLeft": "auto",
    "fontSize": "35px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ddl-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deadline"
        }
      ]
    }
  },
  ".ddl-done": {
    "textDecoration": "line-through"
  }
}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/home/ddl-item.ux?uxType=comp":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./src/home/ddl-item.ux?uxType=comp ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  ".item": {
    "width": "100%",
    "flexDirection": "column"
  },
  ".ddlRow": {
    "justifyContent": "flex-start"
  },
  ".finishRow": {
    "backgroundColor": "#dad8d8",
    "flexDirection": "row",
    "justifyContent": "space-around",
    "paddingTop": "20px",
    "paddingBottom": "20px"
  },
  ".finishRow .completedImg": {
    "width": "64px",
    "height": "64px",
    "backgroundImage": "/common/select.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "finishRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "completedImg"
        }
      ]
    }
  },
  ".finishRow .removedImg": {
    "width": "64px",
    "height": "64px",
    "backgroundImage": "/common/delete.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "finishRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "removedImg"
        }
      ]
    }
  },
  ".circle": {
    "marginTop": "50px",
    "marginRight": "50px",
    "marginBottom": "50px",
    "marginLeft": "50px",
    "width": "50px",
    "height": "50px",
    "borderTopWidth": "15px",
    "borderRightWidth": "15px",
    "borderBottomWidth": "15px",
    "borderLeftWidth": "15px",
    "borderRadius": "50%",
    "alignSelf": "center"
  },
  ".vital": {
    "borderTopColor": "#fc650e",
    "borderRightColor": "#fc650e",
    "borderBottomColor": "#fc650e",
    "borderLeftColor": "#fc650e"
  },
  ".important": {
    "borderTopColor": "#f8cb00",
    "borderRightColor": "#f8cb00",
    "borderBottomColor": "#f8cb00",
    "borderLeftColor": "#f8cb00"
  },
  ".normal": {
    "borderTopColor": "#0cdf98",
    "borderRightColor": "#0cdf98",
    "borderBottomColor": "#0cdf98",
    "borderLeftColor": "#0cdf98"
  },
  ".casual": {
    "borderTopColor": "#0cb5df",
    "borderRightColor": "#0cb5df",
    "borderBottomColor": "#0cb5df",
    "borderLeftColor": "#0cb5df"
  },
  ".ddl-text": {
    "flexDirection": "row",
    "flexGrow": 1,
    "justifyContent": "space-between"
  },
  ".ddl-text .past": {
    "color": "#ff0000",
    "marginTop": "0px",
    "marginRight": "20px",
    "marginBottom": "0px",
    "marginLeft": "auto",
    "fontSize": "40px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ddl-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "past"
        }
      ]
    }
  },
  ".ddl-text .content": {
    "marginTop": "0px",
    "marginRight": "20px",
    "marginBottom": "0px",
    "marginLeft": "auto",
    "fontSize": "40px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ddl-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        }
      ]
    }
  },
  ".ddl-text .deadline": {
    "marginTop": "0px",
    "marginRight": "20px",
    "marginBottom": "0px",
    "marginLeft": "auto",
    "fontSize": "35px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ddl-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deadline"
        }
      ]
    }
  },
  ".doing": {
    "color": "#049710"
  },
  ".near": {
    "color": "#e98e17",
    "fontSize": "50px",
    "textDecoration": "underline"
  },
  "@KEYFRAMES": {
    "colorShift": [
      {
        "color": "#e98e17",
        "fontSize": "30px",
        "time": 0
      },
      {
        "color": "#ff0a0a",
        "fontSize": "50px",
        "time": 100
      }
    ]
  }
}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/home/detailBox.ux?uxType=comp":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./src/home/detailBox.ux?uxType=comp ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  ".modalAbove": {
    "zIndex": 20,
    "flexDirection": "column",
    "backgroundColor": "#ededed"
  },
  ".box": {
    "marginTop": "0px",
    "marginRight": "auto",
    "marginBottom": "300px",
    "marginLeft": "auto",
    "position": "fixed",
    "top": "350px",
    "left": "75px",
    "paddingTop": "0px",
    "paddingRight": "20px",
    "paddingBottom": "0px",
    "paddingLeft": "20px",
    "borderRadius": "50px",
    "height": "700px",
    "width": "600px",
    "backgroundColor": "#ededed",
    "flexDirection": "column"
  },
  ".box .inputTextRow": {
    "flexDirection": "row",
    "height": "100px",
    "alignSelf": "center",
    "justifyContent": "space-around",
    "paddingTop": "10px",
    "paddingRight": "30px",
    "paddingBottom": "0px",
    "paddingLeft": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "inputTextRow"
        }
      ]
    }
  },
  ".box .inputTextRow .text": {
    "marginTop": "0px",
    "marginRight": "auto",
    "marginBottom": "0px",
    "marginLeft": "auto",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "inputTextRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "text"
        }
      ]
    }
  },
  ".box .inputTextRow .micOff": {
    "height": "80px",
    "width": "80px",
    "borderRadius": "20%",
    "backgroundImage": "/common/mic.png",
    "alignSelf": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "inputTextRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micOff"
        }
      ]
    }
  },
  ".box .inputTextRow .micOn": {
    "height": "80px",
    "width": "80px",
    "borderRadius": "20%",
    "backgroundImage": "/common/mic.png",
    "alignSelf": "center",
    "backgroundColor": "#888888",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "inputTextRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micOn"
        }
      ]
    }
  },
  ".box .deadline": {
    "fontSize": "35px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deadline"
        }
      ]
    }
  },
  ".box .date": {
    "marginRight": "10px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "date"
        }
      ]
    }
  },
  ".box .scalesRow": {
    "flexDirection": "row",
    "height": "100px",
    "justifyContent": "flex-start",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "scalesRow"
        }
      ]
    }
  },
  ".box .scalesRow .picker": {
    "marginLeft": "40px",
    "alignSelf": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "scalesRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "picker"
        }
      ]
    }
  },
  ".box .timeRow": {
    "justifyContent": "space-around",
    "height": "100px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "timeRow"
        }
      ]
    }
  },
  ".box .row4": {
    "justifyContent": "space-around",
    "height": "100px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "row4"
        }
      ]
    }
  },
  ".box .row5": {
    "justifyContent": "space-around",
    "height": "100px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "row5"
        }
      ]
    }
  },
  ".box .row6": {
    "justifyContent": "space-around",
    "height": "100px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "row6"
        }
      ]
    }
  },
  ".box .row7": {
    "justifyContent": "space-around",
    "height": "100px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "row7"
        }
      ]
    }
  },
  ".box .sliderArea": {
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "sliderArea"
        }
      ]
    }
  },
  ".box .sliderArea .sliderText": {
    "fontStyle": "italic",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "sliderArea"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "sliderText"
        }
      ]
    }
  },
  ".box .sliderArea .slider": {
    "width": "250px",
    "height": "60px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "sliderArea"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "slider"
        }
      ]
    }
  },
  ".box .HintText": {
    "marginTop": "0px",
    "marginRight": "50px",
    "marginBottom": "0px",
    "marginLeft": "50px",
    "justifyContent": "space-around",
    "color": "#000000",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "HintText"
        }
      ]
    }
  },
  ".box .confirmRow": {
    "flexGrow": 1,
    "flexDirection": "row",
    "justifyContent": "space-around",
    "borderTopWidth": "2px",
    "borderTopColor": "#000000",
    "borderStyle": "dotted",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "confirmRow"
        }
      ]
    }
  },
  ".box .confirmRow .detailSet": {
    "fontWeight": "bold",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "confirmRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "detailSet"
        }
      ]
    }
  },
  ".box .confirmRow .confirmDDLImg": {
    "height": "64px",
    "width": "64px",
    "alignSelf": "center",
    "backgroundImage": "/common/select.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "confirmRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "confirmDDLImg"
        }
      ]
    }
  },
  ".slider": {
    "height": "80px",
    "width": "60%",
    "borderRadius": "10px",
    "color": "#888888",
    "selectedColor": "#77f346",
    "blockColor": "#161414"
  },
  ".inputDate": {
    "height": "100px",
    "alignSelf": "center"
  },
  ".addButtonImg": {
    "height": "80px",
    "width": "80px",
    "alignSelf": "center",
    "backgroundImage": "/common/plus.png",
    "marginBottom": "5%"
  }
}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/home/index.ux?uxType=page":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./src/home/index.ux?uxType=page ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  ".page": {
    "flexDirection": "column"
  },
  ".page .page-main": {
    "width": "100%",
    "height": "90%",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "page-main"
        }
      ]
    }
  },
  ".modal": {
    "position": "absolute",
    "width": "100%",
    "height": "100%",
    "backgroundColor": "#000000",
    "opacity": 0.5,
    "top": "0px",
    "left": "0px"
  },
  ".bottomMenu": {
    "position": "fixed",
    "bottom": "0px",
    "left": "0px",
    "right": "0px",
    "height": "10%",
    "width": "100%",
    "flexDirection": "row",
    "flexGrow": 1,
    "justifyContent": "center",
    "alignItems": "center"
  },
  ".bottomMenu .addButtonImg": {
    "height": "80px",
    "width": "80px",
    "alignSelf": "center",
    "backgroundImage": "/common/plus.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "bottomMenu"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "addButtonImg"
        }
      ]
    }
  },
  ".bottomMenu .ListLength1": {
    "paddingRight": "50px",
    "alignSelf": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "bottomMenu"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ListLength1"
        }
      ]
    }
  },
  ".bottomMenu .ListLength2": {
    "paddingLeft": "50px",
    "alignSelf": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "bottomMenu"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ListLength2"
        }
      ]
    }
  }
}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/home/quickAddBox.ux?uxType=comp":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./src/home/quickAddBox.ux?uxType=comp ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  ".modalAbove": {
    "zIndex": 20,
    "flexDirection": "column",
    "backgroundColor": "#ededed"
  },
  ".box": {
    "marginTop": "0px",
    "marginRight": "auto",
    "marginBottom": "300px",
    "marginLeft": "auto",
    "position": "fixed",
    "top": "350px",
    "left": "75px",
    "paddingTop": "0px",
    "paddingRight": "20px",
    "paddingBottom": "0px",
    "paddingLeft": "20px",
    "borderRadius": "50px",
    "height": "420px",
    "width": "600px",
    "backgroundColor": "#ededed",
    "flexDirection": "column"
  },
  ".box .inputTextRow": {
    "flexDirection": "row",
    "height": "150px",
    "alignSelf": "center",
    "justifyContent": "space-around",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "inputTextRow"
        }
      ]
    }
  },
  ".box .inputTextRow .text": {
    "marginTop": "0px",
    "marginRight": "auto",
    "marginBottom": "0px",
    "marginLeft": "auto",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "inputTextRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "text"
        }
      ]
    }
  },
  ".box .inputTextRow .micOff": {
    "height": "65px",
    "width": "65px",
    "borderRadius": "20%",
    "backgroundImage": "/common/mic.png",
    "alignSelf": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "inputTextRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micOff"
        }
      ]
    }
  },
  ".box .inputTextRow .micOn": {
    "height": "65px",
    "width": "65px",
    "borderRadius": "20%",
    "backgroundImage": "/common/mic.png",
    "alignSelf": "center",
    "backgroundColor": "#888888",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "inputTextRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micOn"
        }
      ]
    }
  },
  ".box .deadline": {
    "fontSize": "35px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "deadline"
        }
      ]
    }
  },
  ".box .timeRow": {
    "justifyContent": "space-around",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "timeRow"
        }
      ]
    }
  },
  ".box .date": {
    "marginRight": "10px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "date"
        }
      ]
    }
  },
  ".box .scalesRow": {
    "flexDirection": "row",
    "height": "150px",
    "justifyContent": "flex-start",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "scalesRow"
        }
      ]
    }
  },
  ".box .scalesRow .HintText": {
    "marginTop": "0px",
    "marginRight": "50px",
    "marginBottom": "0px",
    "marginLeft": "50px",
    "justifyContent": "space-around",
    "color": "#000000",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "scalesRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "HintText"
        }
      ]
    }
  },
  ".box .scalesRow .scalePicker": {
    "marginLeft": "40px",
    "alignSelf": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "scalesRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "scalePicker"
        }
      ]
    }
  },
  ".box .confirmRow": {
    "flexShrink": 1,
    "flexDirection": "row",
    "justifyContent": "space-around",
    "borderTopWidth": "2px",
    "borderTopColor": "#000000",
    "borderStyle": "dotted",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "confirmRow"
        }
      ]
    }
  },
  ".box .confirmRow .detailSet": {
    "fontWeight": "bold",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "confirmRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "detailSet"
        }
      ]
    }
  },
  ".box .confirmRow .confirmDDLImg": {
    "height": "64px",
    "width": "64px",
    "alignSelf": "center",
    "backgroundImage": "/common/select.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "confirmRow"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "confirmDDLImg"
        }
      ]
    }
  },
  ".inputDate": {
    "height": "150px",
    "alignSelf": "center"
  },
  ".addButtonImg": {
    "height": "80px",
    "width": "80px",
    "alignSelf": "center",
    "backgroundImage": "/common/plus.png",
    "marginBottom": "5%"
  }
}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/home/ddl-item-2.ux?uxType=comp&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./src/home/ddl-item-2.ux?uxType=comp& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "item"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "ddlRow"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "circleArea"
          ],
          "events": {
            "click": "showRowSwitch"
          },
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "circle",
                "finished"
              ]
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "ddl-text"
          ],
          "events": {
            "click": "callDetails"
          },
          "children": [
            {
              "type": "text",
              "attr": {
                "value": function () {return this.ddl.content}
              },
              "classList": [
                "content",
                "ddl-done"
              ]
            },
            {
              "type": "text",
              "attr": {
                "value": function () {return '' + (this.ddl.deadline.date) + ' ' + (this.ddl.deadline.time)}
              },
              "classList": [
                "deadline"
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {
        "show": function () {return this.showFinishRow}
      },
      "classList": [
        "finishRow"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "removedImg"
          ],
          "events": {
            "click": "removeDDL"
          }
        }
      ]
    }
  ]
}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/home/ddl-item.ux?uxType=comp&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./src/home/ddl-item.ux?uxType=comp& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "item"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "ddlRow"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "circleArea"
          ],
          "events": {
            "click": "showRowSwitch"
          },
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": function () {return ['circle', this.ddl.Priority]}
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "ddl-text"
          ],
          "events": {
            "click": "callDetails"
          },
          "children": [
            {
              "type": "text",
              "attr": {
                "value": function () {return this.ddl.content}
              },
              "classList": function () {return [this.isPast()?'past':'content', this.ddl.Progress==0?'':'doing']}
            },
            {
              "type": "text",
              "attr": {
                "value": function () {return '' + (this.ddl.deadline.date) + ' ' + (this.ddl.deadline.time)}
              },
              "classList": function () {return ['deadline', this.isNear()?'near':'']}
            }
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {
        "show": function () {return this.showFinishRow}
      },
      "classList": [
        "finishRow"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "completedImg"
          ],
          "events": {
            "click": "setDoneDDL"
          }
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "removedImg"
          ],
          "events": {
            "click": "removeDDL"
          }
        }
      ]
    }
  ]
}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/home/detailBox.ux?uxType=comp&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./src/home/detailBox.ux?uxType=comp& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {
    "show": function () {return this.showBox}
  },
  "classList": [
    "box",
    "modalAbove"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "inputTextRow"
      ],
      "children": [
        {
          "type": "input",
          "attr": {
            "type": "text",
            "placeholder": "What's your next DDL?",
            "disabled": function () {return this.disabled},
            "value": function () {return this.ddl.content}
          },
          "classList": [
            "text"
          ],
          "events": {
            "change": "contentChange",
            "focus": "focusOnInput"
          }
        },
        {
          "type": "div",
          "attr": {
            "show": function () {return !this.disabled}
          },
          "classList": function () {return [this.micStatus]},
          "events": {
            "click": "voiceSwitch"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "timeRow"
      ],
      "children": [
        {
          "type": "picker",
          "attr": {
            "type": "date",
            "disabled": function () {return this.disabled},
            "value": function () {return this.ddl.deadline.date}
          },
          "classList": [
            "date",
            "deadline"
          ],
          "events": {
            "change": "dateChange_deadline"
          }
        },
        {
          "type": "picker",
          "attr": {
            "type": "time",
            "disabled": function () {return this.disabled},
            "value": function () {return this.ddl.deadline.time}
          },
          "classList": [
            "timePicker",
            "deadline"
          ],
          "events": {
            "change": "timeChange_deadline"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "scalesRow"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "Time Scale: "
          },
          "classList": [
            "HintText"
          ]
        },
        {
          "type": "picker",
          "attr": {
            "type": "text",
            "disabled": function () {return this.disabled},
            "range": function () {return this.timeScaleRange},
            "value": function () {return this.ddl.timeScale}
          },
          "classList": [
            "picker"
          ],
          "events": {
            "change": "scaleChange"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "row4"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "Priority: "
          },
          "classList": [
            "HintText"
          ]
        },
        {
          "type": "picker",
          "attr": {
            "type": "text",
            "disabled": function () {return this.disabled},
            "range": function () {return this.priorityRange},
            "value": function () {return this.ddl.Priority}
          },
          "classList": [
            "picker"
          ],
          "events": {
            "change": "priorityChange"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "row5"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "Progress: "
          },
          "classList": [
            "HintText"
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "sliderArea"
          ],
          "events": {
            "click": "sliderSwitch"
          },
          "children": [
            {
              "type": "text",
              "attr": {
                "value": function () {return this.ddl.Progress}
              },
              "classList": [
                "sliderText"
              ]
            },
            {
              "type": "slider",
              "attr": {
                "value": function () {return this.ddl.Progress},
                "disabled": function () {return this.disabled},
                "min": "0",
                "max": "10"
              },
              "classList": [
                "slider"
              ],
              "events": {
                "change": "progressChange"
              }
            }
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "row6"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "StartTime: "
          },
          "classList": [
            "HintText"
          ]
        },
        {
          "type": "picker",
          "attr": {
            "type": "date",
            "value": function () {return this.ddl.StartTime.date},
            "disabled": function () {return this.disabled}
          },
          "classList": [
            "date"
          ],
          "events": {
            "change": "dateChange_StartTime"
          }
        },
        {
          "type": "picker",
          "attr": {
            "type": "time",
            "value": function () {return this.ddl.StartTime.time},
            "disabled": function () {return this.disabled}
          },
          "classList": [
            "timePicker"
          ],
          "events": {
            "change": "timeChange_StartTime"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {
        "show": function () {return this.disabled}
      },
      "classList": [
        "row7"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "DoneTime: "
          },
          "classList": [
            "HintText"
          ]
        },
        {
          "type": "div",
          "attr": {},
          "children": [
            {
              "type": "text",
              "attr": {
                "value": function () {return this.ddl.DoneTime.date}
              },
              "classList": [
                "date"
              ]
            },
            {
              "type": "text",
              "attr": {
                "value": function () {return this.ddl.DoneTime.time}
              },
              "classList": [
                "timePicker"
              ]
            }
          ]
        }
      ]
    }
  ]
}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/home/index.ux?uxType=page&importNames[]=ddl-item,importNames[]=ddl-item-2,importNames[]=quickaddbox,importNames[]=detailbox":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./src/home/index.ux?uxType=page&importNames[]=ddl-item,importNames[]=ddl-item-2,importNames[]=quickaddbox,importNames[]=detailbox ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "page"
  ],
  "children": [
    {
      "type": "div",
      "attr": {
        "show": function () {return !this.showFinished}
      },
      "classList": [
        "unfinishedList"
      ],
      "children": [
        {
          "type": "list",
          "attr": {},
          "classList": [
            "page-main"
          ],
          "children": [
            {
              "type": "block",
              "attr": {},
              "repeat": function () {return this.listData},
              "children": [
                {
                  "type": "list-item",
                  "attr": {
                    "type": "ddl"
                  },
                  "classList": function () {return [this.indexAdd===this.$idx?'addingAnime':'']},
                  "children": [
                    {
                      "type": "ddl-item",
                      "attr": {
                        "ddl": function () {return this.$item.ddl},
                        "idx": function () {return this.$idx}
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {
        "show": function () {return this.showFinished}
      },
      "classList": [
        "finishedList"
      ],
      "children": [
        {
          "type": "list",
          "attr": {},
          "classList": [
            "page-main"
          ],
          "children": [
            {
              "type": "block",
              "attr": {},
              "repeat": function () {return this.finishedList},
              "children": [
                {
                  "type": "list-item",
                  "attr": {
                    "type": "ddl"
                  },
                  "children": [
                    {
                      "type": "ddl-item-2",
                      "attr": {
                        "ddl": function () {return this.$item.ddl},
                        "idx": function () {return this.$idx}
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {
        "show": function () {return this.showModal}
      },
      "classList": [
        "modal"
      ],
      "events": {
        "click": "quitModal"
      }
    },
    {
      "type": "div",
      "attr": {},
      "children": [
        {
          "type": "quickaddbox",
          "attr": {}
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "children": [
        {
          "type": "detailbox",
          "attr": {}
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "bottomMenu"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": function () {return '' + 'Unfinished: ' + (this.listData.length)}
          },
          "classList": [
            "ListLength1"
          ],
          "events": {
            "click": function (evt) { return this.listSwitch(0,evt)}
          }
        },
        {
          "type": "div",
          "attr": {
            "show": function () {return !this.showModal}
          },
          "classList": [
            "addButtonImg"
          ],
          "events": {
            "click": "popQuickAddBox"
          }
        },
        {
          "type": "text",
          "attr": {
            "value": function () {return '' + 'Finished: ' + (this.finishedList.length)}
          },
          "classList": [
            "ListLength2"
          ],
          "events": {
            "click": function (evt) { return this.listSwitch(1,evt)}
          }
        }
      ]
    }
  ]
}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/home/quickAddBox.ux?uxType=comp&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./src/home/quickAddBox.ux?uxType=comp& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {
    "show": function () {return this.showBox}
  },
  "classList": [
    "box",
    "modalAbove"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "inputTextRow"
      ],
      "children": [
        {
          "type": "input",
          "attr": {
            "type": "text",
            "placeholder": "What's your next DDL?",
            "value": function () {return this.content}
          },
          "classList": [
            "text"
          ],
          "events": {
            "change": "contentChange",
            "focus": "focusOnInput"
          }
        },
        {
          "type": "div",
          "attr": {},
          "classList": function () {return [this.micStatus]},
          "events": {
            "click": "voiceSwitch"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "timeRow"
      ],
      "children": [
        {
          "type": "picker",
          "attr": {
            "type": "date",
            "start": "2021-01-01",
            "end": "2050-12-31",
            "value": function () {return this.deadline.date}
          },
          "classList": [
            "date",
            "deadline"
          ],
          "events": {
            "change": "dateChange"
          }
        },
        {
          "type": "picker",
          "attr": {
            "type": "time",
            "value": function () {return this.deadline.time}
          },
          "classList": [
            "timePicker",
            "deadline"
          ],
          "events": {
            "change": "timeChange"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "scalesRow"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "Time Scale: "
          },
          "classList": [
            "HintText"
          ],
          "events": {
            "click": "test"
          }
        },
        {
          "type": "picker",
          "attr": {
            "type": "text",
            "range": function () {return this.timeScaleRange},
            "value": function () {return this.timeScale}
          },
          "classList": [
            "scalePicker"
          ],
          "events": {
            "change": "scaleChange"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "confirmRow"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "Set Details"
          },
          "classList": [
            "detailSet"
          ],
          "events": {
            "click": "setDetail"
          }
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "confirmDDLImg"
          ],
          "events": {
            "click": "sendDDL"
          }
        }
      ]
    }
  ]
}

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&type=import!./src/home/ddl-item-2.ux?uxType=comp&name=ddl-item-2":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&type=import!./src/home/ddl-item-2.ux?uxType=comp&name=ddl-item-2 ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!less-loader!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./ddl-item-2.ux?uxType=comp */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/home/ddl-item-2.ux?uxType=comp")

var $app_script$ = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&cacheDirectory&plugins[]=d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=c:\Users\11848\Desktop\TODOLIST\DDList\babel.config.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./ddl-item-2.ux?uxType=comp */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&cacheDirectory&plugins[]=d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList\\babel.config.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/home/ddl-item-2.ux?uxType=comp")

$app_define$('@app-component/ddl-item-2', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
         if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./ddl-item-2.ux?uxType=comp& */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/home/ddl-item-2.ux?uxType=comp&")

     $app_module$.exports.style = $app_style$
})

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&type=import!./src/home/ddl-item.ux?uxType=comp&name=ddl-item":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&type=import!./src/home/ddl-item.ux?uxType=comp&name=ddl-item ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!less-loader!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./ddl-item.ux?uxType=comp */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/home/ddl-item.ux?uxType=comp")

var $app_script$ = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&cacheDirectory&plugins[]=d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=c:\Users\11848\Desktop\TODOLIST\DDList\babel.config.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./ddl-item.ux?uxType=comp */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&cacheDirectory&plugins[]=d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList\\babel.config.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/home/ddl-item.ux?uxType=comp")

$app_define$('@app-component/ddl-item', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
         if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./ddl-item.ux?uxType=comp& */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/home/ddl-item.ux?uxType=comp&")

     $app_module$.exports.style = $app_style$
})

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&type=import!./src/home/detailBox.ux?uxType=comp&name=detailbox":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&type=import!./src/home/detailBox.ux?uxType=comp&name=detailbox ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!less-loader!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./detailBox.ux?uxType=comp */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/home/detailBox.ux?uxType=comp")

var $app_script$ = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&cacheDirectory&plugins[]=d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=c:\Users\11848\Desktop\TODOLIST\DDList\babel.config.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./detailBox.ux?uxType=comp */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&cacheDirectory&plugins[]=d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList\\babel.config.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/home/detailBox.ux?uxType=comp")

$app_define$('@app-component/detailbox', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
         if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./detailBox.ux?uxType=comp& */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/home/detailBox.ux?uxType=comp&")

     $app_module$.exports.style = $app_style$
})

/***/ }),

/***/ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&type=import!./src/home/quickAddBox.ux?uxType=comp&name=quickaddbox":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&type=import!./src/home/quickAddBox.ux?uxType=comp&name=quickaddbox ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!less-loader!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./quickAddBox.ux?uxType=comp */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/home/quickAddBox.ux?uxType=comp")

var $app_script$ = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&cacheDirectory&plugins[]=d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=c:\Users\11848\Desktop\TODOLIST\DDList\babel.config.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./quickAddBox.ux?uxType=comp */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&cacheDirectory&plugins[]=d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList\\babel.config.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/home/quickAddBox.ux?uxType=comp")

$app_define$('@app-component/quickaddbox', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
         if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./quickAddBox.ux?uxType=comp& */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/home/quickAddBox.ux?uxType=comp&")

     $app_module$.exports.style = $app_style$
})

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./src/home/index.ux?uxType=page ***!
  \***************************************/
__webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&type=import!./ddl-item.ux?uxType=comp&name=ddl-item */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&type=import!./src/home/ddl-item.ux?uxType=comp&name=ddl-item")
__webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&type=import!./ddl-item-2.ux?uxType=comp&name=ddl-item-2 */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&type=import!./src/home/ddl-item-2.ux?uxType=comp&name=ddl-item-2")
__webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&type=import!./quickAddBox.ux?uxType=comp&name=quickaddbox */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&type=import!./src/home/quickAddBox.ux?uxType=comp&name=quickaddbox")
__webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&type=import!./detailBox.ux?uxType=comp&name=detailbox */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&type=import!./src/home/detailBox.ux?uxType=comp&name=detailbox")

var $app_style$ = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!less-loader!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./index.ux?uxType=page */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/home/index.ux?uxType=page")

var $app_script$ = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=c:\Users\11848\Desktop\TODOLIST\DDList&cacheDirectory&plugins[]=d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=c:\Users\11848\Desktop\TODOLIST\DDList\babel.config.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\access-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./index.ux?uxType=page */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList&cacheDirectory&plugins[]=d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=c:\\Users\\11848\\Desktop\\TODOLIST\\DDList\\babel.config.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\access-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/home/index.ux?uxType=page")

$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
         if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = __webpack_require__(/*! !d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quickapp\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./index.ux?uxType=page&importNames[]=ddl-item,importNames[]=ddl-item-2,importNames[]=quickaddbox,importNames[]=detailbox */ "d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quickapp\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/home/index.ux?uxType=page&importNames[]=ddl-item,importNames[]=ddl-item-2,importNames[]=quickaddbox,importNames[]=detailbox")

     $app_module$.exports.style = $app_style$
})
$app_bootstrap$('@app-component/index',{ packagerVersion: "1.9.4" })
})();

/******/ })()
;
    };
    if (typeof window === "undefined") {
      return createPageHandler();
    }
    else {
      window.createPageHandler = createPageHandler
    }
  })();