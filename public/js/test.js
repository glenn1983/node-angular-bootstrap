'use strict'
var assert = require("assert");
var myMath = require("./myTest/test_demo.js");
var util = require('gulp-util');
var a = 1,
    b = 2;
assert.equal(a,b-1,'少年郎，这个断言要正确哦');
assert.notEqual(a - 1, b, 'a - 1 不等于 b');
assert(a < b, 'a 大，相对于 b');
describe('运算', function() {
    describe('算出结果', function () {
        it('返回相加的结果', function () {
            assert.equal(1, myMath.add(1, 0));
            assert.notEqual(10,myMath.add(1,2,3,4,5));
        });
        it('对数组里的数字进行排序', function () {
            assert.equal('45,6,2', myMath.rang([2,45,6], 'quik'));
        });
        it('测试覆盖率', function () {
            assert.equal('mocha', myMath.name(2));
        });
    });
});
