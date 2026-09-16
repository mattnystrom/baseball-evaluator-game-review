(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  root.GameReviewCore=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const MRO_TYPES=['MRO-F','MRO-D','MRO-T','MRO-R','MRO-1B'];
  const EVENT_TYPES=['RO',...MRO_TYPES,'XA','COV','PLUS'];

  function isMro(type){return MRO_TYPES.includes(type);}

  function eventContribution(type){
    if(!EVENT_TYPES.includes(type)) return null;
    const counts={RO:0,'MRO-F':0,'MRO-D':0,'MRO-T':0,'MRO-R':0,'MRO-1B':0,XA:0,COV:0,PLUS:0};
    if(type==='RO') counts.RO=1;
    else if(isMro(type)){counts.RO=1;counts[type]=1;}
    else counts[type]=1;
    return counts;
  }

  function summarize(events){
    const totals={RO:0,'MRO-F':0,'MRO-D':0,'MRO-T':0,'MRO-R':0,'MRO-1B':0,XA:0,COV:0,PLUS:0};
    (Array.isArray(events)?events:[]).forEach(event=>{
      const contribution=eventContribution(event&&event.eventType);
      if(!contribution)return;
      Object.keys(totals).forEach(key=>{totals[key]+=contribution[key];});
    });
    totals.missedRoutineOuts=MRO_TYPES.reduce((sum,key)=>sum+totals[key],0);
    totals.routineOutsConverted=Math.max(0,totals.RO-totals.missedRoutineOuts);
    totals.roc=totals.RO?totals.routineOutsConverted/totals.RO:null;
    return totals;
  }

  function summarizeByPlayer(events){
    const groups={};
    (Array.isArray(events)?events:[]).forEach(event=>{
      if(!event||!event.playerId)return;
      if(!groups[event.playerId]) groups[event.playerId]={events:[],positions:[]};
      groups[event.playerId].events.push(event);
      if(event.position&&!groups[event.playerId].positions.includes(event.position)) groups[event.playerId].positions.push(event.position);
    });
    return Object.keys(groups).reduce((result,playerId)=>{
      result[playerId]=Object.assign({positions:groups[playerId].positions},summarize(groups[playerId].events));
      return result;
    },{});
  }

  return {MRO_TYPES,EVENT_TYPES,isMro,eventContribution,summarize,summarizeByPlayer};
});
