(this["webpackJsonphack-the-bay"]=this["webpackJsonphack-the-bay"]||[]).push([[0],{218:function(e,t,a){e.exports=a(417)},416:function(e,t,a){},417:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(76),o=a.n(c),i=a(17),u=a.n(i),l=a(26),s=a(15),m=a(30),p=a(47),d=a(116),f=a.n(d),h=a(183),b=a.n(h);function O(){return v.apply(this,arguments)}function v(){return(v=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get("./data/map.json");case 2:return e.abrupt("return",e.sent.data);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(e,t,a){return E.apply(this,arguments)}function E(){return(E=Object(l.a)(u.a.mark((function e(t,a,n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get("./data/".concat(t,"/").concat(a,"/").concat(n,"/data.json"));case 2:return e.abrupt("return",e.sent.data);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(e,t,a,n){return j.apply(this,arguments)}function j(){return(j=Object(l.a)(u.a.mark((function e(t,a,n,r){var c,o,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(c=[],o=n;o<=r;o++)c.push(g(t,o,a));return e.next=4,Promise.all(c);case 4:return i=e.sent,e.abrupt("return",b()(i));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var S=function(e){var t=e.fips,a=e.parameter,c=e.startYear,o=e.endYear,i=Object(n.useState)([]),d=Object(s.a)(i,2),f=d[0],h=d[1],b=Object(n.useState)([]),O=Object(s.a)(b,2),v=O[0],g=O[1],E=Object(n.useState)(),j=Object(s.a)(E,2),S=j[0],N=j[1],T=Object(n.useState)("dataMin"),D=Object(s.a)(T,2),k=D[0],P=D[1],w=Object(n.useState)("dataMax"),x=Object(s.a)(w,2),F=x[0],C=x[1],M=Object(n.useState)(""),Y=Object(s.a)(M,2),W=Y[0],A=Y[1],H=Object(n.useState)(""),I=Object(s.a)(H,2),L=I[0],B=I[1],U=o-c+1,_=U>=3;function K(){return(K=Object(l.a)(u.a.mark((function e(){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(t,a,c,o);case 2:R(n=e.sent),J(n);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function J(e){var t=e.map((function(e){var t=e.MeasureValue,a=e.SampleDate,n=e.SampleTime;return{value:t,time:new Date("".concat(a.substring(0,10),"T").concat(n,"Z")).getTime()}})).sort((function(e,t){return e.time-t.time}));h(t)}function R(e){N(e[0].Unit)}return Object(n.useEffect)((function(){!function(){K.apply(this,arguments)}()}),[t,a,c,o]),Object(n.useEffect)((function(){f.length&&function(){var e=p.a().domain(["dataMin"!==k?k:f[0].time,f[f.length-1].time]).ticks(_?p.d.every(1):p.c.every(U));g(e)}()}),[f,k,F]),f.length&&v.length?r.a.createElement(r.a.Fragment,null,r.a.createElement(m.c,{width:600,height:400,data:f,onMouseDown:function(e){return e&&e.activeLabel&&A(e.activeLabel)},onMouseMove:function(e){return e&&e.activeLabel&&W&&B(e.activeLabel)},onMouseUp:function(){if(W===L||""===L)return A(""),void B("");W>L?(P(L),C(W)):(P(W),C(L)),A(""),B("")}},r.a.createElement(m.b,{type:"monotone",dataKey:"value",stroke:"#8884d8",dot:!1,connectNulls:!0}),r.a.createElement(m.a,{stroke:"#ccc"}),r.a.createElement(m.f,{name:"Time",dataKey:"time",type:"number",scale:"time",domain:[k,F],ticks:v,tickFormatter:function(e){return p.b("%B %Y")(e)},angle:-45,textAnchor:"end",interval:0,height:85,allowDataOverflow:!0}),r.a.createElement(m.g,{name:S,unit:" ".concat(S),domain:["dataMin","dataMax"],padding:{top:20,bottom:20},allowDataOverflow:!0}),r.a.createElement(m.e,{labelFormatter:function(e){return"date: ".concat(p.b("%m/%d/%Y")(e))}}),W&&L?r.a.createElement(m.d,{x1:W,x2:L,strokeOpacity:.3}):null),"dataMin"!==k?r.a.createElement("button",{onClick:function(){P("dataMin"),C("dataMax")}},"Zoom Out"):null):r.a.createElement(r.a.Fragment,null)},N={CHLA:"Chlorophyll A",CLW:"Cloud Liquid Water",DIN:"Dissolved Inorganic Nitrogen",DO:"Dissolved Oxygen",DO_SAT_P:"Dissolved Oxygen Saturation %",DOC:"Dissolved Organic Carbon",DON:"Dissolved Organic Nitrogen",DOP:"Dissolved Organic Phosphorus",HARDNESS:"Water Hardness",IBOD5W:"Inhibited 5-Day Biochemical Oxygen Demand (Whole Sample)",NH4F:"Ammonium Fluoride",NH4W:"Ammonium Nitrogen",NO2F:"Nitrite Nitrogen",NO23F:"Nitrite+Nitrate Nitrogen",NO3F:"Nitrate Nitrogen",PC:"Particulate Carbon",PH:"pH",PHEO:"Pheophytin",PN:"Particulate Nitrogen",PO4F:"Orthophosphate Phosphorus (Filtered Sample)",PP:"Particulate Phosphorus",SALINITY:"Salinity",SECCHI:"Secchi Disk (Water Transparency)",SIGMA_T:"Sigma-t (Water Density)",SPCOND:"Specific Conductance",TALK:"Total Alkalinity",TDN:"Total Dissolved Nitrogen",TDP:"Total Dissolved Phosphorus",TN:"Total Nitrogen",TON:"Total Organic Nitrogen",TP:"Total Phosphorus",TSS:"Total Suspended Solids",TURB_NTU:"Turbidity (NTU)",WTEMP:"Water Temperature"};var T=function(){var e=Object(n.useState)(),t=Object(s.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)("10001"),i=Object(s.a)(o,2),m=i[0],p=i[1],d=Object(n.useState)("PH"),f=Object(s.a)(d,2),h=f[0],b=f[1],v=Object(n.useState)(2015),g=Object(s.a)(v,2),E=g[0],y=g[1],j=Object(n.useState)(2019),T=Object(s.a)(j,2),D=T[0],k=T[1];function P(){return(P=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=c,e.next=3,O();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){!function(){P.apply(this,arguments)}()}),[]),a?r.a.createElement(r.a.Fragment,null,r.a.createElement("form",null,r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"fips"},"FIPS:")," ",r.a.createElement("select",{id:"fips",value:m,onChange:function(e){return p(e.target.value)}},Object.keys(a).map((function(e){return r.a.createElement("option",{key:e},e)})))),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"startYear"},"Start Year:")," ",r.a.createElement("select",{id:"startYear",value:E,onChange:function(e){return y(e.target.value)}},Object.keys(a[m]).map((function(e){return r.a.createElement("option",{disabled:e>D,key:e},e)})))," ",r.a.createElement("label",{htmlFor:"endYear"},"End Year:")," ",r.a.createElement("select",{id:"endYear",value:D,onChange:function(e){return k(e.target.value)}},Object.keys(a[m]).map((function(e){return r.a.createElement("option",{disabled:e<E,key:e},e)})))),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"parameter"},"Parameter:")," ",r.a.createElement("select",{id:"parameter",value:h,onChange:function(e){return b(e.target.value)}},a[m][E].map((function(e){return r.a.createElement("option",{value:e,key:e},N[e]?N[e]:e)}))))),r.a.createElement("h2",null,N[h]?N[h]:h," ","over Time"),r.a.createElement(S,{fips:m,parameter:h,startYear:E,endYear:D})):r.a.createElement(r.a.Fragment,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(416);o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[218,1,2]]]);
//# sourceMappingURL=main.b5e8767c.chunk.js.map