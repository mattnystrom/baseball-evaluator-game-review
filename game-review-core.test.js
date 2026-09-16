const assert=require('node:assert/strict');
const core=require('./game-review-core.js');

assert.deepEqual(core.eventContribution('RO'),{
  RO:1,'MRO-F':0,'MRO-D':0,'MRO-T':0,'MRO-R':0,'MRO-1B':0,XA:0,COV:0,PLUS:0
});
assert.equal(core.eventContribution('MRO-D').RO,1);
assert.equal(core.eventContribution('MRO-D')['MRO-D'],1);
assert.equal(Object.values(core.eventContribution('MRO-D')).reduce((sum,value)=>sum+value,0),2);
assert.equal(core.MRO_TYPES.filter(type=>core.eventContribution('MRO-D')[type]===1).length,1);
assert.equal(core.eventContribution('XA').RO,0);
assert.equal(core.eventContribution('PLUS').RO,0);

const summary=core.summarize([
  {eventType:'RO'},
  {eventType:'RO'},
  {eventType:'MRO-F'},
  {eventType:'MRO-D'},
  {eventType:'XA'}
]);
assert.equal(summary.RO,4);
assert.equal(summary.missedRoutineOuts,2);
assert.equal(summary.routineOutsConverted,2);
assert.equal(summary.roc,0.5);
assert.equal(core.summarize([]).roc,null);

console.log('Game Review calculation tests passed.');
