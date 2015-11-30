'use strict';

var request = require('supertest'),
    require = require('really-need'),
    sinon = require('sinon'),
    expect = require('chai').expect;

describe('#jexia-ecomod [ core ]', function () {
    var ecomod = require('../index.js');

    it('should have ecomod module', function(done) {
        expect(ecomod).to.not.be.null;
        done();
    });

    it('should be a function', function(done) {
        expect(ecomod).to.be.a('function');
        done();
    });

    it('should return a middleware function', function(done) {
        var eco = ecomod({
            interval: 1000
        });
        expect(eco).to.be.a('function');
        done();
    });

    it('should return a middleware function without options', function(done) {
        var eco = ecomod();
        expect(eco).to.be.a('function');
        done();
    });

    it('should return a middleware function with custom options', function(done) {
        var eco = ecomod({
            interval: 1000
        });
        expect(eco).to.be.a('function');
        done();
    });
});



describe('#jexia-ecomod [ without PM2 ]', function () {
    var server,
        clock,
        ecomodInterval = 1500;

    beforeEach(function () {
        // clock = sinon.useFakeTimers();
        server = require('./servers/simple-server.js', {bustCache: true});
    });

    afterEach(function (done) {
        // clock.restore();
        server.close(done);
    });

    it('Sample application running normally', function(done) {
        setTimeout(function() {
            done();
            expect(server.address()).to.not.be.null;
        }, 500);
    });

    it('Sample application not running after ecomod', function(done) {
        this.timeout(ecomodInterval + 1000);
        setTimeout(function() {
            done();
            expect(server.address()).to.be.null;
        }, ecomodInterval);
    });
});


describe('#jexia-ecomod [ with PM2 ]', function () {
    var server,
        clock,
        ecomodInterval = 2500;

    beforeEach(function () {
        // clock = sinon.useFakeTimers();
        server = require('./servers/pm2-server.js', {bustCache: true});
    });

    afterEach(function (done) {
        // clock.restore();
        server.close(done);
    });

    it('Sample application running normally', function(done) {
        setTimeout(function() {
            done();
            expect(server.address()).to.not.be.null;
        }, 500);
    });

    it('Sample application not running after ecomod', function(done) {
        this.timeout(ecomodInterval + 1000);
        setTimeout(function() {
            done();
            expect(server.address()).to.be.null;
        }, ecomodInterval);
    });
});
