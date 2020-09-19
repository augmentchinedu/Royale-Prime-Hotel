!function(){var a=!1;window.JQClass=function(){},JQClass.classes={},JQClass.extend=function t(e){var n=this.prototype;a=!0;var i=new this;for(var s in a=!1,e)i[s]="function"==typeof e[s]&&"function"==typeof n[s]?function(i,s){return function(){var t=this._super;this._super=function(t){return n[i].apply(this,t)};var e=s.apply(this,arguments);return this._super=t,e}}(s,e[s]):e[s];function o(){!a&&this._init&&this._init.apply(this,arguments)}return((o.prototype=i).constructor=o).extend=t,o}}(),function($){function camelCase(t){return t.replace(/-([a-z])/g,function(t,e){return e.toUpperCase()})}JQClass.classes.JQPlugin=JQClass.extend({name:"plugin",defaultOptions:{},regionalOptions:{},_getters:[],_getMarker:function(){return"is-"+this.name},_init:function(){$.extend(this.defaultOptions,this.regionalOptions&&this.regionalOptions[""]||{});var i=camelCase(this.name);$[i]=this,$.fn[i]=function(t){var e=Array.prototype.slice.call(arguments,1);return $[i]._isNotChained(t,e)?$[i][t].apply($[i],[this[0]].concat(e)):this.each(function(){if("string"==typeof t){if("_"===t[0]||!$[i][t])throw"Unknown method: "+t;$[i][t].apply($[i],[this].concat(e))}else $[i]._attach(this,t)})}},setDefaults:function(t){$.extend(this.defaultOptions,t||{})},_isNotChained:function(t,e){return"option"===t&&(0===e.length||1===e.length&&"string"==typeof e[0])||-1<$.inArray(t,this._getters)},_attach:function(t,e){if(!(t=$(t)).hasClass(this._getMarker())){t.addClass(this._getMarker()),e=$.extend({},this.defaultOptions,this._getMetadata(t),e||{});var i=$.extend({name:this.name,elem:t,options:e},this._instSettings(t,e));t.data(this.name,i),this._postAttach(t,i),this.option(t,e)}},_instSettings:function(t,e){return{}},_postAttach:function(t,e){},_getMetadata:function(d){try{var f=d.data(this.name.toLowerCase())||"";for(var g in f=f.replace(/'/g,'"'),f=f.replace(/([a-zA-Z0-9]+):/g,function(t,e,i){var s=f.substring(0,i).match(/"/g);return s&&s.length%2!=0?e+":":'"'+e+'":'}),f=$.parseJSON("{"+f+"}"),f){var h=f[g];"string"==typeof h&&h.match(/^new Date\((.*)\)$/)&&(f[g]=eval(h))}return f}catch(t){return{}}},_getInst:function(t){return $(t).data(this.name)||{}},option:function(t,e,i){var s=(t=$(t)).data(this.name);if(!e||"string"==typeof e&&null==i)return(n=(s||{}).options)&&e?n[e]:n;if(t.hasClass(this._getMarker())){var n=e||{};"string"==typeof e&&((n={})[e]=i),this._optionsChanged(t,s,n),$.extend(s.options,n)}},_optionsChanged:function(t,e,i){},destroy:function(t){(t=$(t)).hasClass(this._getMarker())&&(this._preDestroy(t,this._getInst(t)),t.removeData(this.name).removeClass(this._getMarker()))},_preDestroy:function(t,e){}}),$.JQPlugin={createPlugin:function(t,e){"object"==typeof t&&(e=t,t="JQPlugin"),t=camelCase(t);var i=camelCase(e.name);JQClass.classes[i]=JQClass.classes[t].extend(e),new JQClass.classes[i]}}}(jQuery),function(m){var t="rokka_countdown";m.JQPlugin.createPlugin({name:t,defaultOptions:{until:null,since:null,timezone:null,serverSync:null,format:"dHMS",layout:"",compact:!1,padZeroes:!1,significant:0,description:"",expiryUrl:"",expiryText:"",alwaysExpire:!1,onExpiry:null,onTick:null,tickInterval:1},regionalOptions:{"":{labels:["Years","Months","Weeks","Days","Hours","Minutes","Seconds"],labels1:["Year","Month","Week","Day","Hour","Minute","Second"],compactLabels:["y","m","w","d"],whichLabels:null,digits:["0","1","2","3","4","5","6","7","8","9"],timeSeparator:":",isRTL:!1}},_getters:["getTimes"],_rtlClass:t+"-rtl",_sectionClass:t+"-section",_amountClass:t+"-amount",_periodClass:t+"-period",_rowClass:t+"-row",_holdingClass:t+"-holding",_showClass:t+"-show",_descrClass:t+"-descr",_timerElems:[],_init:function(){var s=this;this._super(),this._serverSyncs=[];var n="function"==typeof Date.now?Date.now:function(){return(new Date).getTime()},o=window.performance&&"function"==typeof window.performance.now;var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null,r=0;!a||m.noRequestAnimationFrame?(m.noRequestAnimationFrame=null,setInterval(function(){s._updateElems()},980)):(r=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||n(),a(function t(e){var i=e<1e12?o?performance.now()+performance.timing.navigationStart:n():e||n();1e3<=i-r&&(s._updateElems(),r=i),a(t)}))},UTCDate:function(t,e,i,s,n,o,a,r){"object"==typeof e&&e.constructor==Date&&(r=e.getMilliseconds(),a=e.getSeconds(),o=e.getMinutes(),n=e.getHours(),s=e.getDate(),i=e.getMonth(),e=e.getFullYear());var l=new Date;return l.setUTCFullYear(e),l.setUTCDate(1),l.setUTCMonth(i||0),l.setUTCDate(s||1),l.setUTCHours(n||0),l.setUTCMinutes((o||0)-(Math.abs(t)<30?60*t:t)),l.setUTCSeconds(a||0),l.setUTCMilliseconds(r||0),l},periodsToSeconds:function(t){return 31557600*t[0]+2629800*t[1]+604800*t[2]+86400*t[3]+3600*t[4]+60*t[5]+t[6]},_instSettings:function(t,e){return{_periods:[0,0,0,0,0,0,0]}},_addElem:function(t){this._hasElem(t)||this._timerElems.push(t)},_hasElem:function(t){return-1<m.inArray(t,this._timerElems)},_removeElem:function(e){this._timerElems=m.map(this._timerElems,function(t){return t==e?null:t})},_updateElems:function(){for(var t=this._timerElems.length-1;0<=t;t--)this._updateCountdown(this._timerElems[t])},_optionsChanged:function(t,e,i){i.layout&&(i.layout=i.layout.replace(/&lt;/g,"<").replace(/&gt;/g,">")),this._resetExtraLabels(e.options,i);var s=e.options.timezone!=i.timezone;m.extend(e.options,i),this._adjustSettings(t,e,null!=i.until||null!=i.since||s);var n=new Date;(e._since&&e._since<n||e._until&&e._until>n)&&this._addElem(t[0]),this._updateCountdown(t,e)},_updateCountdown:function(t,e){if(t=t.jquery?t:m(t),e=e||t.data(this.name)){if(t.html(this._generateHTML(e)).toggleClass(this._rtlClass,e.options.isRTL),m.isFunction(e.options.onTick)){var i="lap"!=e._hold?e._periods:this._calculatePeriods(e,e._show,e.options.significant,new Date);1!=e.options.tickInterval&&this.periodsToSeconds(i)%e.options.tickInterval!=0||e.options.onTick.apply(t[0],[i])}if("pause"!=e._hold&&(e._since?e._now.getTime()<e._since.getTime():e._now.getTime()>=e._until.getTime())&&!e._expiring){if(e._expiring=!0,this._hasElem(t[0])||e.options.alwaysExpire){if(this._removeElem(t[0]),m.isFunction(e.options.onExpiry)&&e.options.onExpiry.apply(t[0],[]),e.options.expiryText){var s=e.options.layout;e.options.layout=e.options.expiryText,this._updateCountdown(t[0],e),e.options.layout=s}e.options.expiryUrl&&(window.location=e.options.expiryUrl)}e._expiring=!1}else"pause"==e._hold&&this._removeElem(t[0])}},_resetExtraLabels:function(t,e){var i=!1;for(var s in e)if("whichLabels"!=s&&s.match(/[Ll]abels/)){i=!0;break}if(i)for(var s in t)s.match(/[Ll]abels[02-9]|compactLabels1/)&&(t[s]=null)},_adjustSettings:function(t,e,i){for(var s,n=0,o=null,a=0;a<this._serverSyncs.length;a++)if(this._serverSyncs[a][0]==e.options.serverSync){o=this._serverSyncs[a][1];break}if(null!=o)n=e.options.serverSync?o:0,s=new Date;else{var r=m.isFunction(e.options.serverSync)?e.options.serverSync.apply(t[0],[]):null;s=new Date,n=r?s.getTime()-r.getTime():0,this._serverSyncs.push([e.options.serverSync,n])}var l=e.options.timezone;l=null==l?-s.getTimezoneOffset():l,(i||!i&&null==e._until&&null==e._since)&&(e._since=e.options.since,null!=e._since&&(e._since=this.UTCDate(l,this._determineTime(e._since,null)),e._since&&n&&e._since.setMilliseconds(e._since.getMilliseconds()+n)),e._until=this.UTCDate(l,this._determineTime(e.options.until,s)),n&&e._until.setMilliseconds(e._until.getMilliseconds()+n)),e._show=this._determineShow(e)},_preDestroy:function(t,e){this._removeElem(t[0]),t.empty()},pause:function(t){this._hold(t,"pause")},lap:function(t){this._hold(t,"lap")},resume:function(t){this._hold(t,null)},toggle:function(t){this[(m.data(t,this.name)||{})._hold?"resume":"pause"](t)},toggleLap:function(t){this[(m.data(t,this.name)||{})._hold?"resume":"lap"](t)},_hold:function(t,e){var i=m.data(t,this.name);if(i){if("pause"==i._hold&&!e){i._periods=i._savePeriods;var s=i._since?"-":"+";i[i._since?"_since":"_until"]=this._determineTime(s+i._periods[0]+"y"+s+i._periods[1]+"o"+s+i._periods[2]+"w"+s+i._periods[3]+"d"+s+i._periods[4]+"h"+s+i._periods[5]+"m"+s+i._periods[6]+"s"),this._addElem(t)}i._hold=e,i._savePeriods="pause"==e?i._periods:null,m.data(t,this.name,i),this._updateCountdown(t,i)}},getTimes:function(t){var e=m.data(t,this.name);return e?"pause"==e._hold?e._savePeriods:e._hold?this._calculatePeriods(e,e._show,e.options.significant,new Date):e._periods:null},_determineTime:function(t,e){var i,s,_=this,n=null==t?e:"string"==typeof t?function(t){t=t.toLowerCase();for(var e=new Date,i=e.getFullYear(),s=e.getMonth(),n=e.getDate(),o=e.getHours(),a=e.getMinutes(),r=e.getSeconds(),l=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g,p=l.exec(t);p;){switch(p[2]||"s"){case"s":r+=parseInt(p[1],10);break;case"m":a+=parseInt(p[1],10);break;case"h":o+=parseInt(p[1],10);break;case"d":n+=parseInt(p[1],10);break;case"w":n+=7*parseInt(p[1],10);break;case"o":s+=parseInt(p[1],10),n=Math.min(n,_._getDaysInMonth(i,s));break;case"y":i+=parseInt(p[1],10),n=Math.min(n,_._getDaysInMonth(i,s))}p=l.exec(t)}return new Date(i,s,n,o,a,r,0)}(t):"number"==typeof t?(i=t,(s=new Date).setTime(s.getTime()+1e3*i),s):t;return n&&n.setMilliseconds(0),n},_getDaysInMonth:function(t,e){return 32-new Date(t,e,32).getDate()},_normalLabels:function(t){return t},_generateHTML:function(i){var s=this;i._periods=i._hold?i._periods:this._calculatePeriods(i,i._show,i.options.significant,new Date);for(var t=!1,e=0,n=i.options.significant,o=m.extend({},i._show),a=0;a<=6;a++)t|="?"==i._show[a]&&0<i._periods[a],o[a]="?"!=i._show[a]||t?i._show[a]:null,e+=o[a]?1:0,n-=0<i._periods[a]?1:0;var r=[!1,!1,!1,!1,!1,!1,!1];for(a=6;0<=a;a--)i._show[a]&&(i._periods[a]?r[a]=!0:(r[a]=0<n,n--));var l=i.options.compact?i.options.compactLabels:i.options.labels,p=i.options.whichLabels||this._normalLabels,_=function(t){var e=i.options["compactLabels"+p(i._periods[t])];return o[t]?s._translateDigits(i,i._periods[t])+(e?e[t]:l[t])+" ":""},h=i.options.padZeroes?2:1,u=function(t){var e=i.options["labels"+p(i._periods[t])];return!i.options.significant&&o[t]||i.options.significant&&r[t]?'<span class="'+s._sectionClass+'"><span class="rokka_time-mid main-txt-color"><span class="'+s._amountClass+' border-color">'+s._minDigits(i,i._periods[t],h)+'</span><span class="'+s._periodClass+'">'+(e?e[t]:l[t])+"</span></span></span>":""};return i.options.layout?this._buildLayout(i,o,i.options.layout,i.options.compact,i.options.significant,r):(i.options.compact?'<span class="'+this._rowClass+" "+this._amountClass+(i._hold?" "+this._holdingClass:"")+'">'+_(0)+_(1)+_(2)+_(3)+(o[4]?this._minDigits(i,i._periods[4],2):"")+(o[5]?(o[4]?i.options.timeSeparator:"")+this._minDigits(i,i._periods[5],2):"")+(o[6]?(o[4]||o[5]?i.options.timeSeparator:"")+this._minDigits(i,i._periods[6],2):""):'<span class="'+this._rowClass+" "+this._showClass+(i.options.significant||e)+(i._hold?" "+this._holdingClass:"")+'">'+u(0)+u(1)+u(2)+u(3)+u(4)+u(5)+u(6))+"</span>"+(i.options.description?'<span class="'+this._rowClass+" "+this._descrClass+'">'+i.options.description+"</span>":"")},_buildLayout:function(i,t,e,s,n,o){for(var a=i.options[s?"compactLabels":"labels"],r=i.options.whichLabels||this._normalLabels,l=function(t){return(i.options[(s?"compactLabels":"labels")+r(i._periods[t])]||a)[t]},p=function(t,e){return i.options.digits[Math.floor(t/e)%10]},_={desc:i.options.description,sep:i.options.timeSeparator,yl:l(0),yn:this._minDigits(i,i._periods[0],1),ynn:this._minDigits(i,i._periods[0],2),ynnn:this._minDigits(i,i._periods[0],3),y1:p(i._periods[0],1),y10:p(i._periods[0],10),y100:p(i._periods[0],100),y1000:p(i._periods[0],1e3),ol:l(1),on:this._minDigits(i,i._periods[1],1),onn:this._minDigits(i,i._periods[1],2),onnn:this._minDigits(i,i._periods[1],3),o1:p(i._periods[1],1),o10:p(i._periods[1],10),o100:p(i._periods[1],100),o1000:p(i._periods[1],1e3),wl:l(2),wn:this._minDigits(i,i._periods[2],1),wnn:this._minDigits(i,i._periods[2],2),wnnn:this._minDigits(i,i._periods[2],3),w1:p(i._periods[2],1),w10:p(i._periods[2],10),w100:p(i._periods[2],100),w1000:p(i._periods[2],1e3),dl:l(3),dn:this._minDigits(i,i._periods[3],1),dnn:this._minDigits(i,i._periods[3],2),dnnn:this._minDigits(i,i._periods[3],3),d1:p(i._periods[3],1),d10:p(i._periods[3],10),d100:p(i._periods[3],100),d1000:p(i._periods[3],1e3),hl:l(4),hn:this._minDigits(i,i._periods[4],1),hnn:this._minDigits(i,i._periods[4],2),hnnn:this._minDigits(i,i._periods[4],3),h1:p(i._periods[4],1),h10:p(i._periods[4],10),h100:p(i._periods[4],100),h1000:p(i._periods[4],1e3),ml:l(5),mn:this._minDigits(i,i._periods[5],1),mnn:this._minDigits(i,i._periods[5],2),mnnn:this._minDigits(i,i._periods[5],3),m1:p(i._periods[5],1),m10:p(i._periods[5],10),m100:p(i._periods[5],100),m1000:p(i._periods[5],1e3),sl:l(6),sn:this._minDigits(i,i._periods[6],1),snn:this._minDigits(i,i._periods[6],2),snnn:this._minDigits(i,i._periods[6],3),s1:p(i._periods[6],1),s10:p(i._periods[6],10),s100:p(i._periods[6],100),s1000:p(i._periods[6],1e3)},h=e,u=0;u<=6;u++){var c="yowdhms".charAt(u),d=new RegExp("\\{"+c+"<\\}([\\s\\S]*)\\{"+c+">\\}","g");h=h.replace(d,!n&&t[u]||n&&o[u]?"$1":"")}return m.each(_,function(t,e){var i=new RegExp("\\{"+t+"\\}","g");h=h.replace(i,e)}),h},_minDigits:function(t,e,i){return(e=""+e).length>=i?this._translateDigits(t,e):(e="0000000000"+e,this._translateDigits(t,e.substr(e.length-i)))},_translateDigits:function(e,t){return(""+t).replace(/[0-9]/g,function(t){return e.options.digits[t]})},_determineShow:function(t){var e=t.options.format,i=[];return i[0]=e.match("y")?"?":e.match("Y")?"!":null,i[1]=e.match("o")?"?":e.match("O")?"!":null,i[2]=e.match("w")?"?":e.match("W")?"!":null,i[3]=e.match("d")?"?":e.match("D")?"!":null,i[4]=e.match("h")?"?":e.match("H")?"!":null,i[5]=e.match("m")?"?":e.match("M")?"!":null,i[6]=e.match("s")?"?":e.match("S")?"!":null,i},_calculatePeriods:function(t,i,e,s){t._now=s,t._now.setMilliseconds(0);var n=new Date(t._now.getTime());t._since?s.getTime()<t._since.getTime()?t._now=s=n:s=t._since:(n.setTime(t._until.getTime()),s.getTime()>t._until.getTime()&&(t._now=s=n));var o=[0,0,0,0,0,0,0];if(i[0]||i[1]){var a=this._getDaysInMonth(s.getFullYear(),s.getMonth()),r=this._getDaysInMonth(n.getFullYear(),n.getMonth()),l=n.getDate()==s.getDate()||n.getDate()>=Math.min(a,r)&&s.getDate()>=Math.min(a,r),p=function(t){return 60*(60*t.getHours()+t.getMinutes())+t.getSeconds()},_=Math.max(0,12*(n.getFullYear()-s.getFullYear())+n.getMonth()-s.getMonth()+(n.getDate()<s.getDate()&&!l||l&&p(n)<p(s)?-1:0));o[0]=i[0]?Math.floor(_/12):0,o[1]=i[1]?_-12*o[0]:0;var h=(s=new Date(s.getTime())).getDate()==a,u=this._getDaysInMonth(s.getFullYear()+o[0],s.getMonth()+o[1]);s.getDate()>u&&s.setDate(u),s.setFullYear(s.getFullYear()+o[0]),s.setMonth(s.getMonth()+o[1]),h&&s.setDate(u)}var c=Math.floor((n.getTime()-s.getTime())/1e3),d=function(t,e){o[t]=i[t]?Math.floor(c/e):0,c-=o[t]*e};if(d(2,604800),d(3,86400),d(4,3600),d(5,60),d(6,1),0<c&&!t._since)for(var m=[1,12,4.3482,7,24,60,60],g=6,f=1,w=6;0<=w;w--)i[w]&&(o[g]>=f&&(o[g]=0,c=1),0<c&&(o[w]++,c=0,g=w,f=1)),f*=m[w];if(e)for(w=0;w<=6;w++)e&&o[w]?e--:e||(o[w]=0);return o}})}(jQuery);