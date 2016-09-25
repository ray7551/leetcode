'use strict';
const should = require('should');
const isNumber = require('../../algorithms/65. Valid Number/validNumberDFA.js');

// '004', '0.1', '.2', '3.', '-1.', '46.e3', .3e3, ' 005047e+6' are valid numbers
describe('#isNumber', () => {
  context('invalid input', () => {
    it('should false if get alphabet', () => {
      isNumber('abc').should.be.false();
      isNumber('1 c').should.be.false();
      isNumber('1e').should.be.false();
      isNumber('e9').should.be.false();
    });
    it('should false if get spaces', () => {
      isNumber('   ').should.be.false();
    });
  });
  context('valid input', () => {
    it('should true if get integer', () => {
      isNumber('1').should.be.true();
      isNumber('-1').should.be.true();
      isNumber('+1').should.be.true();
      isNumber('3.').should.be.true();
      isNumber('+33.').should.be.true();
      isNumber('-33.').should.be.true();
    });
    it('should true if get decimal', () => {
      isNumber('.2').should.be.true();
      isNumber('+.22').should.be.true();
      isNumber('-.22').should.be.true();
      isNumber('22.22').should.be.true();
      isNumber('-22.22').should.be.true();
      isNumber('+22.22').should.be.true();
    });
    it('should true if get e,E', () => {
      isNumber('1e2').should.be.true();
      isNumber('-1E0').should.be.true();
      isNumber('+1e32').should.be.true();
      isNumber('3.3e+12').should.be.true();
      isNumber('+33.e-1').should.be.true();
    });
    it('should ignore spaces', () => {
      isNumber(' 1').should.be.true();
      isNumber('-1  ').should.be.true();
      isNumber('   3.').should.be.true();
      isNumber(' .2   ').should.be.true();
      isNumber(' +.2 ').should.be.true();
      isNumber(' 2.2 ').should.be.true();
    });
    it('should ignore zeros', () => {
      isNumber('   01').should.be.true();
      isNumber(' +01').should.be.true();
      isNumber(' -02.2 ').should.be.true();
    });
  });
});
