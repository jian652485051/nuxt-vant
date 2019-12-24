import Vue from "vue";

import { 
  //setInteractionMode,
  ValidationObserver,
  ValidationProvider,
  localize,
  extend 
} from "vee-validate/dist/vee-validate.full";

import * as rules from 'vee-validate/dist/rules'

for (let rule in rules) {
  extend(rule, rules[rule]);
}

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
//setInteractionMode('passive');

// const formatFileSize = function(size) {
//   let units = ["Byte", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
//   let threshold = 1024;
//   size = Number(size) * threshold;
//   let i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold));
//   return (size / Math.pow(threshold, i)).toFixed(2) * 1 + " " + units[i];
// };
const fieldName = ""; //原来的i18n的fieldName会显示绑定的name值，就是英文，实际项目中不需要

localize('zh_CN', {
  code: "zh_CN",
  messages: {
    alpha: `${fieldName}只能包含字母字符`,
    alpha_dash: `${fieldName}能够包含字母数字字符、破折号和下划线`,
    alpha_num: `${fieldName}只能包含字母数字字符`,
    alpha_spaces: `${fieldName}只能包含字母字符和空格`,
    between: `${fieldName}必须在{min}与{max}之间`,
    confirmed: `${fieldName}不能和{target}匹配`,
    digits: `${fieldName}必须是数字，且精确到{length}位数`,
    dimensions: `${fieldName}必须在{width}像素与{height}像素之间`,
    email: `${fieldName}不是一个有效的邮箱`,
    excluded: `${fieldName}不是一个有效值`,
    ext: `${fieldName}不是一个有效的文件`,
    image: `${fieldName}不是一张有效的图片`,
    oneOf: `${fieldName}不是一个有效值`,
    integer: `${fieldName}必须是整数`,
    length: `${fieldName}长度必须为{length}`,
    max: `${fieldName}不能超过{length}个字符`,
    max_value: `${fieldName}必须小于或等于{max}`,
    mimes: `${fieldName}不是一个有效的文件类型`,
    min: `${fieldName}必须至少有{length}个字符`,
    min_value: `${fieldName}必须大于或等于{min}`,
    numeric: `${fieldName}只能包含数字字符`,
    regex: `${fieldName}格式无效`,
    required: `${fieldName}不能为空`,
    required_if: `${fieldName}不能为空`,
    size: `${fieldName}必须小于{size}KB`,
    //size: `${fieldName}必须小于${formatFileSize('{size}')}`
  }
})

// 手机号码验证
extend("mobile", {
  message: () => `请输入正确的手机号码`,
  validate: value =>
    value.length === 11 &&
    /^(((13[0-9]{1})|(14[57]{1})|(15[012356789]{1})|(17[03678]{1})|(18[0-9]{1})|(19[89]{1})|(16[6]{1}))+\d{8})$/.test(
      value
    )
});