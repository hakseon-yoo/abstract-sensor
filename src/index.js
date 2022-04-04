class Sensor {
    constructor(){
        this.powerStatus = 'off';
        this.status = 'idle';
        this.reportingInterval = 10000
    }
    turn(power){
        if(power === 'off') this.powerStatus = 'off';
        if(this.powerStatus === 'on') throw Error();

        this.powerStatus = power;

        setTimeout(() => { this.status = 'sensingDistance'; }, this.reportingInterval);
        setTimeout(() => { this.status = 'reportingData'; }, this.reportingInterval + 500);
        setTimeout(() => { this.status = 'idle'; }, this.reportingInterval + 500 + 1000);

        console.log(this.reportingInterval);
    }
}

class IotServer {
    constructor(){
        this.Sensor;
    }
    
    start(arrSensor){
        this.Sensor = arrSensor[0];
    }
    
    publish(obj){
        if(this.Sensor.powerStatus === 'off') return;
        if(obj.actionId === 'CHANGE_REPORTING_INTERVAL') this.Sensor.reportingInterval = obj.payload;
    }
}

module.exports = {
    Sensor,
    IotServer,
};
