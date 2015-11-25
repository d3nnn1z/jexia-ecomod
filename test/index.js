'use strict';

var request = require('supertest'),
    require = require('really-need'),
    sinon = require('sinon'),
    expect = require('chai').expect;

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
            expect(server.address()).to.be.not.null;
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
            expect(server.address()).to.be.not.null;
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
