!function(e,n,t){function s(e,n){return typeof e===n}function o(){var e,n,t,o,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=s(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?d[r[0]]=o:(!d[r[0]]||d[r[0]]instanceof Boolean||(d[r[0]]=new Boolean(d[r[0]])),d[r[0]][r[1]]=o),p.push((o?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=d._config.classPrefix||"";if(h&&(n=n.baseVal),d._config.enableJSClass){var s=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(s,"$1"+t+"js$2")}d._config.enableClasses&&(n+=" "+t+e.join(" "+t),h?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):h?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(h?"svg":"body"),e.fake=!0),e}function l(e,t,s,o){var a,l,c,f,d="modernizr",p=i("div"),h=r();if(parseInt(s,10))for(;s--;)c=i("div"),c.id=o?o[s]:d+(s+1),p.appendChild(c);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",f=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=f,u.offsetHeight):p.parentNode.removeChild(p),!!l}var c=[],f={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},d=function(){};d.prototype=f,d=new d;var p=[],u=n.documentElement,h="svg"===u.nodeName.toLowerCase(),v=f._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];f._prefixes=v;var m=f.testStyles=l;d.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var s=["@media (",v.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(s,function(e){t=9===e.offsetTop})}return t}),d.addTest("svg",!!n.createElementNS&&!!n.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),d.addTest("inlinesvg",function(){var e=i("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)}),d.addTest("csscalc",function(){var e="width:",n="calc(10px);",t=i("a");return t.style.cssText=e+v.join(n+e),!!t.style.length}),o(),a(p),delete f.addTest,delete f.addAsyncTest;for(var w=0;w<d._q.length;w++)d._q[w]();e.Modernizr=d}(window,document);